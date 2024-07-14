"use client";

import { useState } from "react";
import { NavDropdownMenu } from "./dropdown";
import { Accordion } from "./accordion";
import { NavItem } from "./nav-item";
import Icon from "../icons/icon";
import type { NavbarItem } from "./navbartypes";
import type { Config } from "@/lib/configtype";

export const NavbarComp = ({ nav }: Config) => {
  const [isNavOpen, setNavOpen] = useState(false);

  return (
    <>
      <ol className="hidden md:flex">
        {nav?.map((link: NavbarItem, i: number) => (
          <li key={i} className="focusable md:text-xl">
            {link.type == "link" ? (
              <NavItem {...link} />
            ) : (
              <NavDropdownMenu {...link} />
            )}
          </li>
        ))}
      </ol>

      <button
        className="focusable cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
        onClick={() => setNavOpen(!isNavOpen)}
      >
        <Icon type={isNavOpen ? "fas-x" : "fas-bars"} />
      </button>

      {isNavOpen && (
        <ul className="flex flex-col justify-center items-center overflow-hidden absolute top-0 left-0 w-full h-screen bg-white">
          {nav?.map((link: NavbarItem, i: number) => (
            <li
              key={i}
              className="px-4 cursor-pointer capitalize py-5 text-4xl hover:text-blue-900"
              role="link"
              onClick={() => setNavOpen(!isNavOpen)}
            >
              {link.type === "link" ? (
                <NavItem {...link} />
              ) : (
                <Accordion {...link} />
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
