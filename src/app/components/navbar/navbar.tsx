"use client";

import React, { useEffect, useState, FC } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { usePathname as getPathname } from "next/navigation";
import { Logo } from "./nav-logo";
import { getNavbarConfig } from "../../utilities/config-provider";
import { NavDropdownMenu } from "./dropdown";
import { Accordion } from "./accordion";
import { NavItem } from "./nav-item";
import type { navbarItem } from "./types";

export const Navbar = () => {
  const [isNavOpen, setNavOpen] = useState(false);
  const [navbarLinks, setNavbarLinks] = useState([]);
  const pathname = getPathname();

  useEffect(() => {
    const config = getNavbarConfig();
    setNavbarLinks(config.list);
  }, []);

  return (
    <nav className="flex justify-between items-center w-full px-4 py-4 border-b-2 shadow-sm bg-white focus-visible:ring-2 focus-visible:ring-white/75">
      <a href="/" className="rounded">
        <Logo title="Bellingham Rental Reviews" />
      </a>
      <ul className="hidden md:flex">
        {navbarLinks.map((link: navbarItem) => (
          <li
            key={link.name}
            className="nav-links px-4 cursor-pointer capitalize rounded font-medium text-gray-600 hover:text-blue-900"
          >
            {link.type == "link" ? (
              <NavItem {...link} />
            ) : (
              <NavDropdownMenu {...link} />
            )}
          </li>
        ))}
      </ul>

      <button
        className="focus-visible:ring-2 focus-visible:ring-white/75 cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
        onClick={() => setNavOpen(!isNavOpen)}
      >
        {isNavOpen ? (
          <FaTimes size={30} aria-label="close" />
        ) : (
          <FaBars size={30} aria-label="close" />
        )}
      </button>

      {isNavOpen && (
        <ul className="flex flex-col justify-center items-center overflow-hidden absolute top-0 left-0 w-full h-screen bg-white focus-visible:ring-2 focus-visible:ring-white/75">
          {navbarLinks.map((link: navbarItem) => (
            <li
            className="px-4 cursor-pointer capitalize py-5 text-4xl hover:text-blue-900"
            >
              {link.type === "link" ? (
                <NavItem
                  {...link}
                  onClick={() => setNavOpen(!isNavOpen)}
                  
                />
              ) : (
                <Accordion
                  {...link}
                  onClick={() => setNavOpen(!isNavOpen)}
                /*   className="px-4 cursor-pointer capitalize py-2 text-4xl hover:text-blue-900" */
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};
