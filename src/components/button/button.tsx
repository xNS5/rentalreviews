import React from "react";
import {Button as AriaButton} from 'react-aria-components';

export default function Button({
  onClick,
  className,
  children,
  ...props
}: Readonly<{
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  [key: string]: any;
}>) {
  const isDisabled = props.disabled
  return (
    <AriaButton onPress={() => onClick ? onClick() : undefined} className={`rounded-lg p-2 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed hover:bg-gray-300 active:bg-gray-500 active:text-white ${className}`} isDisabled={isDisabled} {...props}>
      {children}
    </AriaButton>
  );
};
