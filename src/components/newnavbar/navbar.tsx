"use client";

import { Config } from "@/lib/config-provider";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { usePathname as getPathname } from "next/navigation";
import type { Link as LinkType } from "@/lib/linktype";
import Logo from "../logo/logo";
import Dropdown from "../navigation-menu/navigation-menu";

function isCurrentPath(url: string) {
  const pathnameArr: string[] = getPathname().split("/");
  const urlArr: string[] = url.split("/");
  return pathnameArr[1] == urlArr[1];
}

function getActiveClassProps(isActive: boolean) {
  const baseClass: string = "rounded underline-offset-8 text-xl font-normal"
  return isActive ? {
    className: baseClass + "underline decoration-2 font-bold text-black",
  } : {
    className: baseClass + "rounded hover:underline hover:text-slate-500",
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
  return (
    <Navbar>
      <NavbarBrand>
        <Logo>
          <a href="/" className="rounded px-2 grid grid-rows-2" role="link">
            <span className="text-lg md:text-2xl">{title}</span>
            <span className="text-sm md:text-lg">{description}</span>
          </a>
        </Logo>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        {data?.map((link: LinkType, i: number) => {
          if(link){
            const isActive: boolean = isCurrentPath(link.url);
            const props = getActiveClassProps(isActive);
            if(link.type == "link"){
              if (isActive) {
                return (
                  <NavbarItem key={i} isActive>
                    <Link color="foreground" href={link.url} aria-current="page" {...props}>
                      {link.name}
                    </Link>
                  </NavbarItem>
                );
              }
              return (
                <NavbarItem key={i}>
                  <Link color="foreground" href={link.url} {...props}>
                    {link.name}
                  </Link>
                </NavbarItem>
              );
            }
            return (
              <NavbarItem key={i}>
                <Dropdown  data={link} className={{trigger: `${props.className}`}}/>
              </NavbarItem>
            )
          }
        })}
      </NavbarContent>
    </Navbar>
  );
}
