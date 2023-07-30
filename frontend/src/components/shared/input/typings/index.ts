import * as React from 'react';

export interface BaseInputProps<T>
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'value' | 'defaultValue' | 'onChange' | 'className'
  > {
  value: T | undefined;
  onChange(value: T): void;
  loading?: boolean;
  isValid?: boolean;
  validator?: (value: T) => Promise<void>;
  validatorWaitFor?: number;
  icon?: JSX.Element;
  wrapperClassName?: string;
  className?: string;
  tabIndex?: number;
  inputRef?: React.Ref<HTMLInputElement>;
}

export interface BaseTextAreaProps<T>
  extends Omit<
    React.InputHTMLAttributes<HTMLTextAreaElement>,
    'value' | 'defaultValue' | 'onChange' | 'className'
  > {
  value: T | undefined;
  onChange(value: T): void;
  isValid?: boolean;
  validator?: (value: T) => Promise<void>;
  validatorWaitFor?: number;
  wrapperClassName?: string;
  className?: string;
  tabIndex?: number;
  inputRef?: React.Ref<HTMLTextAreaElement>;
}
