"use client";
import Link from "next/link";
import type { navbarItem } from "./types";
import { usePathname as getPathname } from "next/navigation";

function getActiveClassName(url: string) {
  const pathname = getPathname();
  return pathname === url ? "underline font-bold text-black" : "";
}

export const NavItem = (
  link: navbarItem
) => {
  return (
    <Link onClick={link.onClick ?? undefined} className={`${getActiveClassName(link.url)} ${link.className ?? ""} rounded `} href={link.url ?? ""} target={link.target ?? ""}>
      {link.name}
    </Link>
  );
};
