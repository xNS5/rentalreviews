"use client";

import { announce } from "@react-aria/live-announcer";
import React from "react";

export default function Article({
  children,
  className = "",
  ...props
}: Readonly<{
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}>) {
  if (props.announcement && typeof window !== "undefined") {
    announce(props.announcement, "assertive", 500);
  }

  return (
    <article className={`flex flex-col ${className}`} tabIndex={-1} {...props}>
      {children}
    </article>
  );
}
