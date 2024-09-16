"use client";

import { Fragment, useEffect, useState } from "react";
import Icon from "../icons/icon";
import Accordion from "../accordion/accordion";
import Logo from "../logo/logo";
import Link from "next/link";
import { NavItem } from "./nav-item";
import { usePathname as getPathname } from "next/navigation";
import NavigationMenu from "../navigation-menu/navigation-menu";
import { FocusTrap } from "@headlessui/react";
import type { Link as LinkType } from "@/lib/linktype";
import type { Config } from "@/lib/config-provider";

import "./navbar.css";

export function getActiveClassProps(url: string) {
  const pathnameArr: string[] = getPathname().split("/");
  const urlArr: string[] = url.split("/");
  if (pathnameArr[1] == urlArr[1]) {
    return {
      className: "rounded underline decoration-2 font-bold text-black underline-offset-8",
      "aria-label": `${urlArr[1]} current page`,
    };
  } else {
    return {
      className: "rounded hover:underline hover:text-slate-500 underline-offset-8",
    };
  }
}

export default function Navbar({
  data,
  title,
  description,
}: Readonly<{
  data: Config;
  title: string;
  description: string;
}>) {
  const [isNavOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const escHandler = (e: KeyboardEvent) => {
      if (e.key == "Escape") {
        setNavOpen(!isNavOpen);
      }
    };
    if (isNavOpen) {
      document.addEventListener("keydown", escHandler);
      document.body.style.overflow = "hidden"
    } else {
      window.removeEventListener("keydown", escHandler);
      document.body.style.overflow = "visible"
    }
  }, [isNavOpen]);

  // Mobile Navbar
  if (isNavOpen) {
    return (
      <FocusTrap id="navbar-menu" as="div" className={"flex flex-col w-full h-screen bg-white"}>
        <button className="self-end cursor-pointer pr-4 text-gray-500 md:hidden" onClick={() => setNavOpen(!isNavOpen)} aria-controls="navbar-menu" aria-label="Close menu" aria-expanded={true}>
          <Icon type="fas-x" className="w-8" />
        </button>
        <ol className="flex flex-col relative justify-center items-center">
          {data?.map((link: LinkType, i: number) => (
            <li key={i} className="py-4 cursor-pointer capitalize text-4xl hover:text-blue-900">
              {link.type === "link" ? (
                <NavItem id={`nav-link-${i}`} href={link.url} name={link.name} {...getActiveClassProps(link.url)} onClick={() => setNavOpen(false)} />
              ) : (
                <Accordion
                  id={`nav-accordion-${i}`}
                  triggerText={link.name}
                  as="button"
                  className={{
                    trigger: "justify-center",
                    content: "rounded border border-slate-400 my-2",
                  }}
                >
                  <ol className="text-center">
                    {link.children?.map((child: LinkType, j: number) => (
                      <li key={j} className="my-4 px-2">
                        <NavItem href={child.url} name={child.name} className="!inline-block text-black text-xl text-center rounded" />
                      </li>
                    ))}
                  </ol>
                </Accordion>
              )}
            </li>
          ))}
        </ol>
      </FocusTrap>
    );
  }

  // Normal navbar
  return (
    <Fragment>
      <Logo>
        <Link href="/" className="rounded px-2 grid grid-rows-2" role="link">
          <span className="text-lg md:text-2xl">{title}</span>
          <span className="text-sm md:text-lg">{description}</span>
        </Link>
      </Logo>
      <ol className="hidden md:flex flex-row justify-center items-center">
        {data?.map((link: LinkType, i: number) => (
          <li key={i} className="md:text-xl mx-2">
            {link.type == "link" ? (
              <NavItem id={`nav-link-${i + 1}`} href={link.url} name={link.name} {...getActiveClassProps(link.url)} />
            ) : (
              <NavigationMenu data={link} className={{trigger: `${getActiveClassProps(link.url)?.className} text-xl`}} />
            )}
          </li>
        ))}
      </ol>

      <button className="cursor-pointer z-20 pr-4 text-gray-500 md:hidden" onClick={() => setNavOpen(!isNavOpen)} aria-controls="navbar-menu" aria-label="Open menu" aria-expanded={false}>
        <Icon type="fas-bars" className="w-8" altText="Open navigation menu" />
      </button>
    </Fragment>
  );
}

