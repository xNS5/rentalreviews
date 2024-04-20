'use client'

import React from "react";
import { usePathname } from 'next/navigation'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button,   Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem} from "@nextui-org/react";
import { Logo } from "./logo";

const nav_items = [
  {name: "Home", url: "/", children: []},
  {name: "Reviews", url: "/reviews", children: []},
  {name: "Resources", url: "/resources", children: [
    {name: "WA Tenants Union", url: "https://tenantsunion.org/"},
  ]},
  {name: "About", url: "/about", children: []},
  {name: "Contact", url: "/contact", children: []}
]

export const Nav = () => {
  const pathname = usePathname();
  return (
    <Navbar isBordered>
      <NavbarBrand>
        <Logo />
        <p className="font-bold text-inherit">Bellingham Rental Reviews</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
            {nav_items.map(x =>
              <NavbarItem key={x.name} isActive={pathname == x.url}>
              <Link href={x.url} color="foreground">
                  {x.name}
              </Link>
          </NavbarItem>
               
        )}
        </NavbarContent>
    </Navbar>
  );
}
