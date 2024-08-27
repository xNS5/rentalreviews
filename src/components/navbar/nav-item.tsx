import Link from "next/link";
import type { Link as LinkType } from "@/lib/link";

export function NavItem({ link, className, onClickHandler = () => {}}: Readonly<{
  link: LinkType,
  className?: string,
  onClickHandler?: any
}>) {
  return (
    <Link
      className={`${link.className ?? ""
        } ${className} rounded px-3`}
      href={link.url ?? ""}
      target={link.target ?? ""}
      replace
    >
     {link.name}
    </Link>
  );
};
