'use client'

import React from "react";
import { usePathname } from 'next/navigation'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import { Logo } from "./logo";

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
