"use client";

import { useState } from "react";
import { NavItem } from "./nav-item";
import { NavigationMenu } from "../navigation-menu/navigation-menu";
import Icon from "../icons/icon";
import Accordion from "../accordion/accordion";
import {
  usePathname as getPathname,
} from "next/navigation";
import type { Link } from "@/lib/linktype";
import type { Config } from "@/lib/config-provider";

import "./navbar.css";

export function getActiveClassProps(url: string) {
  const pathnameArr: string[] = getPathname().split("/");
  const urlArr: string[] = url.split("/");
  if (pathnameArr[1] == urlArr[1]) {
    return {
      className: "underline decoration-2 font-bold text-black underline-offset-8",
      "aria-label": `${urlArr[1]} current page`,
    };
  } else {
    return {
      className: "hover:underline hover:text-slate-500 underline-offset-8",
    };
  }
}

export default function Navbar({
  nav,
}: Readonly<{
  nav: Config;
}>) {
  const [isNavOpen, setNavOpen] = useState(false);

  // Mobile Navbar
  if (isNavOpen) {
    return (
      <>
        <button
          className="cursor-pointer z-20 pr-4 text-gray-500 md:hidden"
          onClick={() => setNavOpen(!isNavOpen)}
        >
          <Icon type="fas-x" className="w-8" altText="Close navigation menu" />
        </button>

        <ol className="flex z-10 flex-col justify-center items-center overflow-hidden absolute top-0 left-0 w-full h-screen bg-white">
          {nav?.map((link: Link, i: number) => (
            <li
              key={i}
              className="py-4 cursor-pointer capitalize text-4xl hover:text-blue-900"
            >
              {link.type === "link" ? (
                <NavItem
                  id={`nav-link-${i}`}
                  href={link.url}
                  name={link.name}
                  {...getActiveClassProps(link.url)}
                  onClick={() => setNavOpen(false)}
                />
              ) : (
                <Accordion
                  triggerText={link.name}
                  className={{
                    trigger: "justify-center",
                    content: "rounded border border-slate-400 my-2",
                  }}
                >
                  <ol className="text-center">
                    {link.children?.map((child: Link, i: number) => (
                      <li key={i} className="my-4 px-2">
                        <NavItem
                          key={i}
                          href={child.url}
                          name={child.name}
                          className="!inline-block text-black text-xl text-center rounded"
                        />
                      </li>
                    ))}
                  </ol>
                </Accordion>
              )}
            </li>
          ))}
        </ol>
      </>
    );
  }

  // Normal navbar
  return (
    <>
      <ol className="hidden md:flex flex-row justify-center items-center">
        {nav?.map((link: Link, i: number) => (
          <li key={i} className="md:text-xl mx-2">
            {link.type == "link" ? (
              <NavItem
              id={`nav-link-${i+1}`}
                href={link.url}
                name={link.name}
                {...getActiveClassProps(link.url)}
              />
            ) : (
              <NavigationMenu
                link={link}
                className={`${getActiveClassProps(link.url)?.className} text-xl`}
              />
            )}
          </li>
        ))}
      </ol>

      <button
        className="cursor-pointer z-20 pr-4 text-gray-500 md:hidden"
        onClick={() => setNavOpen(!isNavOpen)}
      >
        <Icon type="fas-bars" className="w-8" altText="Open navigation menu" />
      </button>
    </>
  );
}
