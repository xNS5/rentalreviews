"use client";

import { announce } from "@react-aria/live-announcer";
import React from "react";

export default function Article({
  children,
  className = "",
    announcement,
  ...rest
}: Readonly<{
  children: React.ReactNode;
  className?: string;
  announcement?: string;
}> & React.HTMLAttributes<HTMLElement>) {
  if (announcement && typeof window !== "undefined") {
    announce(announcement, "assertive", 500);
  }

  return (
    <article className={`flex flex-col ${className}`} tabIndex={-1} {...rest}>
      {children}
    </article>
  );
}
