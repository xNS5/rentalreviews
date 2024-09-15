"use client";

import { Config } from "@/lib/config-provider";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/react";
import Link from "next/link";
import { usePathname as getPathname } from "next/navigation";
import type { Link as LinkType } from "@/lib/linktype";
import Logo from "../logo/logo";
import Dropdown from "../navigation-menu/navigation-menu";
import { Fragment, useState } from "react";

function isCurrentPath(url: string) {
  const pathnameArr: string[] = getPathname().split("/");
  const urlArr: string[] = url.split("/");
  return pathnameArr[1] == urlArr[1];
}

function getActiveClassProps(isActive: boolean) {
  const baseClass: string = "rounded underline-offset-8 text-xl font-normal";
  return {
    className: baseClass + (isActive ? "underline decoration-2 font-bold text-black" : "rounded hover:underline hover:text-slate-500"),
  };
}

export default function NewNavbar({
  data,
  title,
  description,
}: Readonly<{
  data: Config;
  title: string;
  description: string;
}>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function onMenuChangeHandler() {
    if (!isMenuOpen) {
      document.body.classList.add("no-scroll");
    }
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={onMenuChangeHandler}>
      <NavbarBrand>
        <Logo>
          <Link href="/" className="rounded px-2 grid grid-rows-2" role="link">
            <span className="text-lg md:text-2xl">{title}</span>
            <span className="text-sm md:text-lg">{description}</span>
          </Link>
        </Logo>
      </NavbarBrand>
      <NavbarMenuToggle id="menubotton" aria-controls="menu" aria-label={isMenuOpen ? "Close Menu" : "Open Menu"} className="sm:hidden h-10 w-auto" />
      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        {data?.map((link: LinkType, i: number) => {
          let tempChildComponent: React.ReactElement | undefined = undefined;
          if (link) {
            const isActive: boolean = isCurrentPath(link.url);
            const props = getActiveClassProps(isActive);
            if (link.type == "link") {
              tempChildComponent = (
                <Link color="foreground" href={link.url} aria-current={isActive ? "page" : undefined} {...props}>
                  {link.name}
                </Link>
              );
            } else {
              tempChildComponent = <Dropdown data={link} className={{ trigger: `${props.className} p-0 m-0` }} />;
            }
            return (
              <NavbarItem key={i} isActive={isActive}>
                {tempChildComponent}
              </NavbarItem>
            );
          }
        })}
      </NavbarContent>
      <NavbarMenu id="menu" className="my-10 fixed" role="menu" aria-labelledby="menubutton">
        {data?.map((link: LinkType, i: number) => {
          let tempChildComponent: React.ReactElement | undefined = undefined;
          if (link) {
            const isActive: boolean = isCurrentPath(link.url);
            const props = getActiveClassProps(isActive);
            if (link.type == "link") {
              tempChildComponent = (
                <Link color="foreground" href={link.url} aria-current={isActive ? "page" : undefined} {...props} onClick={() => setIsMenuOpen(false)}>
                  {link.name}
                </Link>
              );
            } else {
              tempChildComponent = <Dropdown data={link} className={{ trigger: `${props.className} p-0 m-0` }} onClickFn={setIsMenuOpen} />;
            }
            return (
              <NavbarMenuItem key={i} isActive={isActive} tabIndex={i + 1}>
                {tempChildComponent}
              </NavbarMenuItem>
            );
          }
        })}
      </NavbarMenu>
    </Navbar>
  );
}

