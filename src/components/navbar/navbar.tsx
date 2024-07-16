"use client";

import { useState } from "react";
import { NavDropdownMenu } from "./dropdown";
import { Disclosure } from "./disclosure";
import { NavItem } from "./nav-item";
import Icon from "../icons/icon";
import type { NavbarItem } from "./navbartypes";
import type { Config } from "@/lib/configtype";
import Accordion from "../accordion/accordion";

export const Navbar = ({ nav }: Config) => {
  const [isNavOpen, setNavOpen] = useState(false);

  return (
    <>
      <ol className="hidden md:flex">
        {nav?.map((link: NavbarItem, i: number) => (
          <li key={i} className="focusable md:text-lg">
            {link.type == "link" ? (
              <NavItem {...link} />
            ) : (
              <NavDropdownMenu {...link} />
            )}
          </li>
        ))}
      </ol>

      <button
        className="focusable cursor-pointer pr-4 text-gray-500 md:hidden"
        onClick={() => setNavOpen(!isNavOpen)}
      >
        <Icon type={isNavOpen ? "fas-x" : "fas-bars"} className="w-4" />
      </button>

      {isNavOpen && (
        <ul className="flex flex-col justify-center items-center overflow-hidden absolute top-0 left-0 w-full h-screen bg-white">
          {nav?.map((link: NavbarItem, i: number) => (
            <li
              key={i}
              className="px-4 cursor-pointer capitalize py-5 text-4xl hover:text-blue-900"
              role="link"
            >
              {link.type === "link" ? (
                <NavItem {...link} />
              ) : (
                <Accordion triggerText={link.name} className={{ comp: "no-underline" }}>
                  {
                    link.children?.map((child: NavbarItem, i: number) => (<NavItem key={i} {...child} className="text-black text-2xl p-2 hover:bg-blue-600 hover:text-white text-center rounded" />)
                    )}
                </Accordion>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
