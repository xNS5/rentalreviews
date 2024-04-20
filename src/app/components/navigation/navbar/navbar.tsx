'use client'

import React, {useState} from "react";
import { usePathname } from 'next/navigation'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button,   Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem} from "@nextui-org/react";
import { Logo } from "./logo";


let nav_item: {name: string, url: string};

const nav_items = [
  {name: "Home", url: "/"},
  {name: "Reviews", url: "/reviews"},
  {name: "Resources", url: "/resources"},
  {name: "About", url: "/about"},
  {name: "Contact", url: "/contact"}
]

export const Nav = () => {
  const pathname = usePathname();

  return (
    <Navbar isBordered>
      <a href="/">
      <NavbarBrand>
        <Logo />
        <p className="font-bold text-inherit">Bellingham Rental Reviews</p>
      </NavbarBrand>
      </a>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
            {nav_items.map((item, i) =>
              <NavbarItem 
              className="navbar-item"
              key={i} 
              isActive={item.url == pathname}>
              <Link className="navbar-item-link" href={item.url} color="foreground">
                  {item.name}
              </Link>
          </NavbarItem>
        )}
        </NavbarContent>
    </Navbar>
  );
}
