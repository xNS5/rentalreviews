"use client";

import Link from "next/link";

export default function SkipToContent({
  className,
  ...props
}: Readonly<{
  className?: string;
  [key: string]: any | any[];
}>) {
  return (
    <Link
    id="skip-link"
    href={props.url}
    className={`transition left-0 bg-primary text-primary-content absolute p-3 m-3 -translate-y-16 focus:translate-y-0 ${className}`}
    onClick={e => {
      e.currentTarget.blur();
    }}
    {...props}
    >
      <p>Skip to main content</p>
    </Link>
  );
}

