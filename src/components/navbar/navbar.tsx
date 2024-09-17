"use client";

import { useEffect, useState } from "react";
import Icon from "../icons/icon";
import Accordion from "../accordion/accordion";
import Logo from "../logo/logo";
import Link from "next/link";
import { usePathname as getPathname } from "next/navigation";
import NavigationMenu from "../navigation-menu/navigation-menu";
import { FocusTrap, FocusTrapFeatures } from "@headlessui/react";
import type { Link as LinkType } from "@/lib/linktype";
import type { Config } from "@/lib/config-provider";


function NavItem({name, ...rest}: Readonly<{
  name: string,
  [key: string]: any
}>) {
  const {href} = rest;
  const activeClassProps = getActiveClassProps(href)
  const activeClassPropsCount = Object.keys(activeClassProps).length;
  const combinedProps = {...rest, ...activeClassProps};
  return (
    <Link href={"/"} {...combinedProps} aria-current={activeClassPropsCount > 1 ? "page" : undefined}>
      {name}
      {activeClassPropsCount > 1 && <span className="sr-only">current page</span>}
    </Link>
  );
}

function IsMobileWidth(): boolean {
  if (typeof window !== "undefined") {
    return window.innerWidth < 750;
  }
  return false;
}

export function getActiveClassProps(url: string) {
  const pathnameArr: string[] = getPathname().split("/");
  const urlArr: string[] = url.split("/");
  const baseStyle = "rounded underline-offset-8 px-2";
  if (pathnameArr[1] === urlArr[1]) {
    return {
      className: `${baseStyle} underline decoration-2 font-bold text-black`,
    };
  } else {
    return {
      className: `${baseStyle} hover:underline hover:text-slate-500`,
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
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isMobileWidth, setIsMobileWidth] = useState(IsMobileWidth());

  /* handles the following scenarios:
   User hits `escape` to exit out of navbar
   User resizes window while mobile navbar is open
   User attempts to tab away from mobile navbar while it's expanded
  */
  useEffect(() => {
    const escHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileNavOpen((prev) => !prev);
      }
    };

    const resizeHandler = () => {
      const isMobile = window.innerWidth <= 768;
      if (isMobile !== isMobileWidth) {
        setIsMobileWidth(isMobile);
        if (isMobileNavOpen) {
          setIsMobileNavOpen((prev) => !prev);
        }
      }
    };

    if (isMobileNavOpen) {
      window.addEventListener("resize", resizeHandler);
      document.addEventListener("keydown", escHandler);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("resize", resizeHandler);
      document.removeEventListener("keydown", escHandler);
      document.body.style.overflow = "visible";
    };
  }, [isMobileNavOpen, isMobileWidth]);


  return (
    <nav className="flex flex-col flex-wrap shadow-lg py-3 px-5">
      {/* Features: conditionally enables/disables the focus trap based on isMobileNavOpen state */}
        <FocusTrap id="navbar-menu" as="div" className={"w-full bg-white"} features={isMobileNavOpen ? FocusTrapFeatures.TabLock : FocusTrapFeatures.None}>
        <div className="flex flex-row flex-wrap space-between w-full justify-between align-center">
        <Logo>
          <Link href="/" className="self-start rounded px-2 grid grid-rows-2" role="link">
            <span className="text-lg md:text-2xl">{title}</span>
            <span className="text-sm md:text-lg">{description}</span>
          </Link>
        </Logo>
        <button
          className={`self-end cursor-pointer z-20 pr-4 text-gray-500 md:hidden transition-transform`}
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          aria-controls="navbar-menu"
          aria-label={`${isMobileNavOpen ? "Close" : "Open"} navigation menu`}
          aria-expanded={isMobileNavOpen}
        >
          <Icon type={`${isMobileNavOpen ? "fas-x" : "fas-bars"}`} className="w-8" />
        </button>
        {/* Wanted to keep this inside the same div as the logo */}
        {!isMobileNavOpen && (
          <ol className="hidden md:flex flex-row justify-center items-center">
            {data?.map((link: LinkType, i: number) => (
              <li key={i} className="md:text-xl mx-2">
                {link.type == "link" ? (
                  <NavItem href={link.url} name={link.name}/>
                ) : (
                  <NavigationMenu data={link} className={{ trigger: `${getActiveClassProps(link.url)?.className} text-xl` }} />
                )}
              </li>
            ))}
          </ol>
        )}
      </div>
      {isMobileNavOpen && (
        <ol className="flex flex-col relative justify-center items-center w-full h-screen">
          {data?.map((link: LinkType, i: number) => (
            <li key={i} className="py-4 cursor-pointer capitalize text-2xl hover:text-blue-900">
              {link.type === "link" ? (
                <NavItem id={`nav-link-${i}`} href={link.url} name={link.name} onClick={() => setIsMobileNavOpen(false)} />
              ) : (
                <Accordion
                  id={`nav-accordion-${i}`}
                  triggerText={link.name}
                  as="button"
                  className={{
                    trigger: "justify-center text-[length:inherit] px-2",
                    content: "rounded border border-slate-400 ",
                  }}
                >
                  <ol className="text-center">
                    {link.children?.map((child: LinkType, j: number) => (
                      <li key={j} className="my-4 px-2">
                        <NavItem
                          href={child.url}
                          name={child.name}
                          className="!inline-block text-black text-xl text-center rounded"
                          target={child.target}
                          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                        />
                      </li>
                    ))}
                  </ol>
                </Accordion>
              )}
            </li>
          ))}
        </ol>
      )}
        </FocusTrap>
    </nav>
  );
}

