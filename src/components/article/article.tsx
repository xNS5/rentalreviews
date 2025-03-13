"use client";

import React from "react";

export default function Article({
  children,
  className = "",
  ...rest
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}> & React.HTMLAttributes<HTMLElement>) {

  return (
    <article className={`flex flex-col ${className}`} tabIndex={-1} {...rest}>
      {children}
    </article>
  );
}
