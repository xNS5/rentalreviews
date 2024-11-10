"use client";

import { announce } from "@react-aria/live-announcer";

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
    <article className={`flex flex-col ${className}`} {...props}>
      {children}
    </article>
  );
}
