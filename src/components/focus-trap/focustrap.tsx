"use client"

import React from "react";
import { FocusScope } from 'react-aria'

export default function FocusTrap({ children, disabled, className, ...rest}: Readonly<{
    disabled?: boolean;
    className?: string;
    children: React.ReactNode;
}>) {
  return (
    <FocusScope contain={disabled ?? true} restoreFocus autoFocus {...rest}>
      {children}
    </FocusScope>
  );
}