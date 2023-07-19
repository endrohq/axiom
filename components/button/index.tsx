import clsx from 'clsx';
import * as React from 'react';

import { LoadingOutlined } from '../icons/LoadingOutlined';

type ButtonProps = {
  children?: React.ReactNode;
  variant?: 'primary' | 'default' | 'black' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  ghost?: boolean;
  icon?: React.ReactNode;
  fullSize?: boolean;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
};

function getClassName(className?: string) {
  return clsx(
    className,
    'group relative inline-flex text-lg !no-underline opacity-100 transition focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  );
}

function ButtonInner({
  children,
  variant = 'default',
  size = 'medium',
  ghost,
  icon: Icon,
  className,
  loading,
}: ButtonProps) {
  const iconOnly = !children && !!Icon;
  return (
    <>
      <div
        className={clsx(
          'absolute inset-0 rounded-full border opacity-100 transition disabled:opacity-50',
          {
            '!bg-transparent': ghost,
            'group-hover:brightness-110 group-focus:brightness-90 bg-accent border-accent':
              variant === 'primary',
            'group-hover:brightness-110 group-focus:brightness-90 bg-secondary border-secondary':
              variant === 'secondary',
            'bg-white border-gray-200 group-hover:border-gray-700':
              variant === 'default',
            'bg-black border-gray-900': variant === 'black',
            'group-hover:brightness-110 group-focus:brightness-90 bg-red-600 border-red-600':
              variant === 'danger',
          },
          className,
        )}
      />
      <div
        className={clsx(
          'relative flex h-full w-full items-center justify-center whitespace-nowrap !leading-none transition',
          {
            'text-white group-hover:brightness-110 group-focus:brightness-90':
              variant === 'primary' && !ghost,
            'group-hover:brightness-110 group-focus:brightness-90 text-white':
              variant === 'primary' && ghost,
            'group-hover:brightness-110 group-focus:brightness-90 text-secondary':
              variant === 'secondary' && ghost,
            'text-primary-500 group-hover:text-accent': variant === 'default',
            'text-white':
              variant === 'black' ||
              variant === 'secondary' ||
              variant === 'danger',
            'p-2 space-x-2 text-sm': size === 'small',
            'py-2 px-4 space-x-2 text-sm': size === 'medium',
            'py-3 px-4 space-x-2 text-base': size === 'large',
            '!p-2 !space-x-0':
              iconOnly && (size === 'small' || size === 'medium'),
            '!p-3 !space-x-0': iconOnly && size === 'large',
          },
        )}
      >
        {loading ? (
          <LoadingOutlined />
        ) : (
          <>
            {Icon && (
              <span
                className={clsx({
                  'w-3 h-3': size === 'small',
                  'w-4 h-4': size === 'medium' || size === 'large',
                })}
              >
                {Icon}
              </span>
            )}
            {children && <span>{children}</span>}
          </>
        )}
      </div>
    </>
  );
}

function Button({
  children,
  className,
  ghost,
  icon,
  size,
  variant,
  fullSize,
  loading = false,
  disabled = false,
  ...props
}: ButtonProps & JSX.IntrinsicElements['button']) {
  return (
    <button
      disabled={loading || disabled}
      {...props}
      className={clsx(getClassName(className), {
        'w-full': fullSize,
      })}
    >
      <ButtonInner
        ghost={ghost}
        loading={loading}
        icon={icon}
        size={size}
        variant={variant}
      >
        {children}
      </ButtonInner>
    </button>
  );
}

export { Button };
