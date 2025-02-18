import React from "react";
import {Button as AriaButton, ButtonProps} from 'react-aria-components';

export default function Button({
  onClick,
  className,
  children,
    disabled,
  ...rest
}: Readonly<{
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  disabled: boolean;
}> & ButtonProps) {
  return (
    <AriaButton onPress={() => onClick ? onClick() : undefined} className={`rounded-lg p-2 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed hover:bg-gray-300 active:bg-gray-500 active:text-white ${className}`} isDisabled={disabled} {...rest}>
      {children}
    </AriaButton>
  );
};
