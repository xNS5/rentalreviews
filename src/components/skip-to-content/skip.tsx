"use client";

import React from "react";
import Link from "next/link";

export default function SkipToContent({
  className,
    href,
  ...rest
}: Readonly<{
  href: string
  className?: string;
}> & React.AnchorHTMLAttributes<HTMLAnchorElement>) {

  return (
    <Link
    id="skip-link"
    href={"/"}
    className={`transition left-0 bg-primary text-primary-content absolute p-3 m-3 -translate-y-16 focus:translate-y-0 ${className}`}
    {...rest}
    >
      <p>Skip to main content</p>
    </Link>
  );
}

