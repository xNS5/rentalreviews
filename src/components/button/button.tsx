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
    <AriaButton onPress={() => isDisabled === false && onClick ? onClick() : ""} className={`rounded-lg p-3 transition-colors ease-in-out duration-400 hover:bg-slate-500 hover:text-white disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed ${className}`} isDisabled={isDisabled} {...props}>
      {children}
    </AriaButton>
  );
};
