import { LoadingOutlined } from '@shared/components/icons/LoadingOutlined';
import { BaseInputProps } from '@shared/components/input/typings';
import clsx from 'clsx';
import * as React from 'react';

import { useDebounce } from '../../hooks/useDebounce';

export type InputTextProps = BaseInputProps<string>;

function InputText({
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
  inputRef,
  ...inputProps
}: InputTextProps) {
  const [focus, setFocus] = React.useState(false);

  const debouncedValidator =
    validator && useDebounce(validator, validatorWaitFor);

  function handleFocus(): void {
    setFocus(true);
  }

  function handleBlur(): void {
    setFocus(false);
  }

  async function handleChange({
    currentTarget: { value: newValue },
  }: React.ChangeEvent<HTMLInputElement>) {
    if (typeof onChange === 'function') {
      onChange(newValue);
      if (typeof debouncedValidator === 'function') {
        await debouncedValidator(newValue);
      }
    }
  }

  return (
    <div
      className={clsx(
        'leading-11 m-0 flex h-9 rounded border border-gray-200 p-0 align-middle shadow-none transition-all duration-300',
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
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {icon && <div className="flex h-full items-center pl-3">{icon}</div>}
      <input
        value={value}
        onChange={handleChange}
        tabIndex={tabIndex}
        className={clsx(
          'leading-11 h-full w-full rounded-full border-0 p-0 px-3 text-base text-gray-600 outline-none transition-all duration-300 ease-in',
          { 'cursor-not-allowed': disabled },
          className,
        )}
        disabled={disabled}
        ref={inputRef}
        autoComplete="off"
        role="textbox"
        {...inputProps}
      />
      {loading && (
        <div className="flex h-full items-center">
          <LoadingOutlined className="float-right ml-2 mr-4" />
        </div>
      )}
    </div>
  );
}

export default InputText;
