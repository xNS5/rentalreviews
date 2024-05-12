"use client";

import React, { useEffect, useState, FC } from "react";
import { Logo } from "./nav-logo";
import { getNavbarConfig } from "../../utilities/config-provider";
import { NavDropdownMenu } from "./dropdown";
import { Accordion } from "./accordion";
import { NavItem } from "./nav-item";
import Icon from "../icons/icon";
import type { NavbarItem } from "./navbartypes";

export const Navbar = () => {
  const [isNavOpen, setNavOpen] = useState(false);
  const [navbarLinks, setNavbarLinks] = useState([]);

  useEffect(() => {
    const config = getNavbarConfig();
    setNavbarLinks(config.list);
  }, []);

  return (
    <nav className="flex justify-between items-center w-full px-4 py-4 border-b-2 shadow-sm bg-white focusable">
      <a href="/" className="focusable rounded" tabIndex={0} role="link">
        <Logo title="Bellingham Rental Reviews" />
      </a>
      <ol className="hidden md:flex">
        {navbarLinks.map((link: NavbarItem, i: number) => (
          <li key={i} className="focusable">
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
          {navbarLinks.map((link: NavbarItem, i: number) => (
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
    </nav>
  );
};
