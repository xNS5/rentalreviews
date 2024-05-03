"use client";
import Link from "next/link";
import type { navbarItem } from "./navbartypes";

import { usePathname as getPathname } from "next/navigation";


function getActiveClassName(url: string) {
  const pathname = getPathname();
  return pathname === url ? "underline font-bold text-black" : "";
}

export const NavItem = (
  { name, type, url, children }: navbarItem
) => {
  return (
    <Link className={getActiveClassName(url)} href={url ?? ""}>
      {name}
    </Link>
  );
};
