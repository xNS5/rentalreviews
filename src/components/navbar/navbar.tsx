"use client";

import { useEffect, useState } from "react";
import Icon from "../icons/icon";
import Accordion from "../accordion/accordion";
import Logo from "../logo/logo";
import Link from "next/link";
import { usePathname as getPathname } from "next/navigation";
import NavigationMenu from "../navigation-menu/navigation-menu";
import { FocusTrap } from "@headlessui/react";
import type { Link as LinkType } from "@/lib/linktype";
import type { Config } from "@/lib/config-provider";

import "./navbar.css";

function NavItem(props: Readonly<{ [key: string]: any }>) {
  return (
    <Link href={"/"} {...props}>
      {props.name}
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
  if (pathnameArr[1] == urlArr[1]) {
    return {
      className: `${baseStyle} underline decoration-2 font-bold text-black`,
      "aria-current": "page",
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
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMobileWidth, setIsMobileWidth] = useState(IsMobileWidth());

  useEffect(() => {
    const escHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsNavOpen((prev) => !prev);
      }
    };

    const resizeHandler = () => {
      const isMobile = window.innerWidth <= 768;
      if (isMobile !== isMobileWidth) {
        setIsMobileWidth(isMobile);
        if (isNavOpen) {
          setIsNavOpen(prev => !prev);
        }
      }
    };

    if (isNavOpen) {
      window.addEventListener('resize', resizeHandler);
      document.addEventListener("keydown", escHandler);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener('resize', resizeHandler);
      document.removeEventListener("keydown", escHandler);
      document.body.style.overflow = "visible";
    };
  }, [isNavOpen, isMobileWidth]);

  return (
    <div>
      <Logo>
        <Link href="/" className="rounded px-2 grid grid-rows-2" role="link">
          <span className="text-lg md:text-2xl">{title}</span>
          <span className="text-sm md:text-lg">{description}</span>
        </Link>
      </Logo>
      <button
        className={`self-end cursor-pointer z-20 pr-4 text-gray-500 md:hidden transition-transform`}
        onClick={() => setIsNavOpen(!isNavOpen)}
        aria-controls="navbar-menu"
        aria-label={`${isNavOpen ? "Close" : "Open"} navigation menu`}
        aria-expanded={isNavOpen}
      >
        <Icon type={`${isNavOpen ? "fas-x" : "fas-bars"}`} className="w-8" />
      </button>
      {isNavOpen ? (
        <FocusTrap id="navbar-menu" as="div" className={"md:hidden w-full h-screen bg-white"}>
          <ol className="flex flex-col relative justify-center items-center">
            {data?.map((link: LinkType, i: number) => (
              <li key={i} className="py-4 cursor-pointer capitalize text-2xl hover:text-blue-900">
                {link.type === "link" ? (
                  <NavItem id={`nav-link-${i}`} href={link.url} name={link.name} {...getActiveClassProps(link.url)} onClick={() => setIsNavOpen(false)} />
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
                            onClick={() => setIsNavOpen(!isNavOpen)}
                          />
                        </li>
                      ))}
                    </ol>
                  </Accordion>
                )}
              </li>
            ))}
          </ol>
        </FocusTrap>
      ) : (
        <ol className="hidden md:flex flex-row justify-center items-center">
          {data?.map((link: LinkType, i: number) => (
            <li key={i} className="md:text-xl mx-2">
              {link.type == "link" ? (
                <NavItem id={`nav-link-${i + 1}`} href={link.url} name={link.name} {...getActiveClassProps(link.url)} />
              ) : (
                <NavigationMenu data={link} className={{ trigger: `${getActiveClassProps(link.url)?.className} text-xl` }} />
              )}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

