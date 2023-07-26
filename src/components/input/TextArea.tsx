import clsx from 'clsx';
import * as React from 'react';

import { useEffect } from 'react';

import { debounce } from './utils/debounce';

import { ownerWindow } from './utils/ownerWindow';

import useEnhancedEffect from './utils/useEnhancedEffect';

import { useDebounce } from '../../hooks/useDebounce';

function getStyleValue(computedStyle: any, property: string) {
  return parseInt(computedStyle[property], 10) || 0;
}

const PADDING_SIZE = 12;

interface TextareaProps
  extends Omit<
    React.InputHTMLAttributes<HTMLTextAreaElement>,
    'value' | 'defaultValue' | 'onChange' | 'className' | 'children'
  > {
  value: string | undefined;
  onChange(value: string): void;
  loading?: boolean;
  isValid?: boolean;
  validator?: (value: string) => Promise<void>;
  validatorWaitFor?: number;
  icon?: JSX.Element;
  wrapperClassName?: string;
  className?: string;
  tabIndex?: number;
  inputRef?: React.Ref<HTMLTextAreaElement>;
  minRows?: number;
  maxRows?: number;
}

export interface AutoSizeType {
  minRows?: number;
  maxRows?: number;
}

function InputTextArea({
  value = '',
  onChange,
  wrapperClassName,
  className,
  isValid = true,
  validator,
  validatorWaitFor = 750,
  icon,
  loading,
  tabIndex,
  disabled,
  maxRows,
  minRows = 1,
  placeholder,
  ...inputProps
}: TextareaProps) {
  const [focus, setFocus] = React.useState(false);

  const debouncedValidator =
    validator && useDebounce(validator, validatorWaitFor);

  const { current: isControlled } = React.useRef(value != null);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  const shadowRef = React.useRef<HTMLTextAreaElement>(null);
  const renders = React.useRef(0);
  const [state, setState] = React.useState<{
    outerHeightStyle?: number;
    overflow?: number;
  }>({});

  const syncHeight = React.useCallback(() => {
    const input = inputRef.current;
    const containerWindow = ownerWindow(input);
    if (!input) return;
    const computedStyle: any = containerWindow.getComputedStyle(input);

    // If input's width is shrunk and it's not visible, don't sync height.
    if (computedStyle.width === '0px' || !shadowRef?.current || !input) {
      return;
    }

    const inputShallow = shadowRef.current;
    inputShallow.style.width = computedStyle.width;
    inputShallow.value = input.value || placeholder || 'x';
    if (inputShallow.value.slice(-1) === '\n') {
      // Certain fonts.scss which overflow the line height will cause the textarea
      // to report a different scrollHeight depending on whether the last line
      // is empty. Make it non-empty to avoid this issue.
      inputShallow.value += ' ';
    }

    const boxSizing = computedStyle['box-sizing'];
    const padding =
      getStyleValue(computedStyle, 'padding-bottom') +
      getStyleValue(computedStyle, 'padding-top') -
      PADDING_SIZE * 2;
    const border =
      getStyleValue(computedStyle, 'border-bottom-width') +
      getStyleValue(computedStyle, 'border-top-width');
    // The height of the inner content
    const innerHeight = inputShallow.scrollHeight;

    // Measure height of a textarea with a single row
    inputShallow.value = 'x';
    const singleRowHeight = inputShallow.scrollHeight;
    // The height of the outer content
    let outerHeight = innerHeight;

    if (minRows) {
      outerHeight = Math.max(Number(minRows) * singleRowHeight, outerHeight);
    }
    if (maxRows) {
      outerHeight = Math.min(Number(maxRows) * singleRowHeight, outerHeight);
    }
    outerHeight = Math.max(outerHeight, singleRowHeight);
    // Take the box sizing into account for applying this value as a style.
    const outerHeightStyle =
      outerHeight + (boxSizing === 'border-box' ? padding + border : 0);
    const overflow: number = Math.abs(outerHeight - innerHeight) <= 1 ? 1 : 0;

    setState((prevState: { outerHeightStyle?: number; overflow?: number }) => {
      // Need a large enough difference to update the height.
      // This prevents infinite rendering loop.
      if (
        renders.current < 20 &&
        ((outerHeightStyle > 0 &&
          Math.abs((prevState.outerHeightStyle || 0) - outerHeightStyle) > 1) ||
          prevState.overflow !== overflow)
      ) {
        renders.current += 1;
        return {
          overflow,
          outerHeightStyle,
        };
      }

      if (process.env['NODE_ENV'] !== 'production') {
        if (renders.current === 20) {
          console.error(
            [
              'MUI: Too many re-renders. The layout is unstable.',
              'TextareaAutosize limits the number of renders to prevent an infinite loop.',
            ].join('\n'),
          );
        }
      }

      return prevState;
    });
  }, [maxRows, minRows, placeholder]);

  React.useEffect(() => {
    const handleResize = debounce(() => {
      renders.current = 0;
      syncHeight();
    });
    const containerWindow = ownerWindow(inputRef.current || undefined);
    containerWindow.addEventListener('resize', handleResize);
    let resizeObserver: ResizeObserver;

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(handleResize);
      if (inputRef?.current) {
        resizeObserver.observe(inputRef.current);
      }
    }

    return () => {
      handleResize.clear();
      containerWindow.removeEventListener('resize', handleResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [syncHeight]);

  useEnhancedEffect(() => {
    syncHeight();
  });

  useEffect(() => {
    renders.current = 0;
  }, [value]);

  function handleFocus(): void {
    setFocus(true);
  }

  async function handleChange({
    currentTarget: { value: newValue },
  }: React.ChangeEvent<HTMLTextAreaElement>) {
    renders.current = 0;
    if (!isControlled) {
      syncHeight();
    }
    if (typeof onChange === 'function') {
      onChange(newValue);
      if (typeof debouncedValidator === 'function') {
        await debouncedValidator(newValue);
      }
    }
  }

  function handleBlur(): void {
    setFocus(false);
  }

  return (
    <div
      onFocus={handleFocus}
      onBlur={handleBlur}
      className="relative h-full w-full"
    >
      <textarea
        value={value}
        onChange={handleChange}
        tabIndex={tabIndex}
        style={{
          height: state.outerHeightStyle,
          // Need a large enough difference to allow scrolling.
          // This prevents infinite rendering loop.
          overflow: state.overflow ? 'hidden' : undefined,
          padding: PADDING_SIZE,
        }}
        className={clsx(
          'm-0 w-full rounded-lg border border-gray-200 p-3 shadow-none outline-none transition-all duration-300',
          {
            'ring-1': focus,
            'hover:border-blue-300 hover:shadow-blue-300': !focus && isValid,
            'border-blue-300 shadow-blue-300': focus && isValid,
            'border-red-300 hover:shadow-red-300': !focus && !isValid,
            'border-red-300 ring-red-300 shadow-red-300': focus && !isValid,
            'bg-gray-100 hover:!border-gray-300 hover:!shadow-none opacity-70':
              disabled,
          },
          wrapperClassName,
        )}
        disabled={disabled}
        ref={inputRef}
        autoComplete="off"
        role="textbox"
        rows={minRows}
        {...inputProps}
      />
      <textarea
        readOnly
        className="invisible absolute inset-0 h-0 overflow-hidden bg-gray-100"
        ref={shadowRef}
        tabIndex={-1}
        style={{
          padding: PADDING_SIZE,
          transform: 'translateZ(0)',
        }}
      />
    </div>
  );
}

export default InputTextArea;
