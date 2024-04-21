"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { Logo } from "./logo";

let nav_item: { name: string; url: string };

const nav_items = [
  { name: "Home", url: "/" },
  { name: "Reviews", url: "/reviews" },
  { name: "Resources", url: "/resources" },
  { name: "About", url: "/about" },
  { name: "Contact", url: "/contact" },
];

const isActivePath = (path: string) => {
  const pathname = usePathname();
  return path == pathname;
}

export const Nav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currIndex, setCurrIndex] = useState(0);

  return (
    <Navbar maxWidth="full" isBordered onMenuOpenChange={setIsMenuOpen}>
      <NavbarBrand>
        <Logo />
        <a href="/">
          <p className="font-bold text-inherit">Bellingham Rental Reviews</p>
        </a>
      </NavbarBrand>

      {/* NavMenu Toggle */}
      <NavbarContent className="md:hidden" justify="end">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      {/* Navbar Items */}
      <NavbarContent className="hidden md:flex gap-4" justify="end">
        {nav_items.map((item, i) => (
          <NavbarItem
            className="navbar-item"
            key={i}
            isActive={isActivePath(item.url)}
          >
            <Link
              className="navbar-item-link w-full"
              href={item.url}
              color="foreground"
              onClick={() => {setCurrIndex(i); console.log("PING!")}}
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Hamburger Menu */}
      <NavbarMenu className="md:flex gap-4">
        {nav_items.map((item, i) => (
          <NavbarMenuItem
            className="navbar-item"
            key={i}
            isActive={isActivePath(item.url)}
          >
            <Link
              className="navbar-item-link w-full"
              href={item.url}
              color="foreground"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};
