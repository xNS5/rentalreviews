import Link from "next/link";
import type { NavbarItem } from "./navbartypes";

export function NavItem({link, className}: Readonly<{
  link: NavbarItem,
  className?: string
}>){
  return (
    <Link
      className={`${
        link.className ?? ""
      } ${className} rounded px-3`}
      href={link.url ?? ""}
      target={link.target ?? ""}
      tabIndex={0}
      replace
    >
      {link.name}
    </Link>
  );
};
