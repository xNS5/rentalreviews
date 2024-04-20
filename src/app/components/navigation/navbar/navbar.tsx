"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
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

export const Nav = () => {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar maxWidth="full" isBordered onMenuOpenChange={setIsMenuOpen}>
      <a href="/">
        <NavbarBrand>
          <Logo />
          <p className="font-bold text-inherit">Bellingham Rental Reviews</p>
        </NavbarBrand>
      </a>

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
            isActive={item.url == pathname}
          >
            <Link
              className="navbar-item-link w-full"
              href={item.url}
              color="foreground"
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
            isActive={item.url == pathname}
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
