"use client";
import Link from "next/link";
import type { NavbarItem } from "./navbartypes";
import { usePathname as getPathname } from "next/navigation";

function getActiveClassName(url: string) {
  const pathname = getPathname();
  return pathname === url ? "underline font-bold text-black" : "";
}

export const NavItem = (
  link: NavbarItem
) => {
  return (
    <Link onClick={link.onClick ?? undefined} className={`focusable ${getActiveClassName(link.url)} ${link.className ?? ""} rounded `} href={link.url ?? ""} target={link.target ?? ""} replace>
      <span tabIndex={0}>{link.name}</span>
    </Link>
  );
};
