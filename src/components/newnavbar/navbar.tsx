"use client";

import { Config } from "@/lib/config-provider";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import Link from "next/link";
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
  const baseClass: string = "rounded underline-offset-8 text-xl font-normal";
  return {
    className: baseClass + (isActive ? "underline decoration-2 font-bold text-black" : "rounded hover:underline hover:text-slate-500")
  }
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
          let tempChildComponent: React.ReactElement | undefined = undefined;
          if(link){
            const isActive: boolean = isCurrentPath(link.url);
            const props = getActiveClassProps(isActive);
            if(link.type == "link"){
              tempChildComponent = (
                <Link color="foreground" href={link.url} aria-current={isActive ? "page" : undefined} {...props}>
                  {link.name}
                </Link>
                );
            } else {
              tempChildComponent = (<Dropdown  data={link} className={{trigger: `${props.className}`}}/>)
            }
            return (
              <NavbarItem key={i} isActive={isActive}>
                {tempChildComponent}
              </NavbarItem>
            )
          }
        })}
      </NavbarContent>
    </Navbar>
  );
}
