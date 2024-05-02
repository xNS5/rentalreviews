"use client";

import Link from "next/link";
import React, { useEffect, useState, FC } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { usePathname as getPathname } from "next/navigation";
import { Logo } from "./navigation/navbar/logo";
import { getNavbarConfig } from "../utilities/config-provider";
import { NavItem } from "./navitem";
import type { navbarItem, navbarObject } from "./navbartypes";

const Navbar = () => {
  const [isNavOpen, setNavOpen] = useState(false);
  const [navbarLinks, setNavbarLinks] = useState([]);
  const pathname = getPathname();

  useEffect(() => {
    const config = getNavbarConfig();
    setNavbarLinks(config.list);
  }, []);

  return (
    <nav className="flex justify-between items-center w-full px-4 py-4 border-b-2 shadow-sm  bg-white">
      <div>
        <Logo title="Bellingham Rental Reviews" />
      </div>
      <ul className="hidden md:flex">
        {navbarLinks.map((link: navbarItem) => (
          <li
            key={link.name}
            className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-600 hover:text-blue-900"
          >
            <NavItem
              {...link}
            />
          </li>
        ))}
      </ul>

      <div
        onClick={() => setNavOpen(!isNavOpen)}
        className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
      >
        {isNavOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {isNavOpen && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-white">
          {navbarLinks.map(({ name, url }) => (
            <li
              key={name}
              className="px-4 cursor-pointer capitalize py-6 text-4xl"
            >
              <Link
                className={
                  pathname === url ? "underline font-bold text-black" : ""
                }
                onClick={() => setNavOpen(!isNavOpen)}
                href={url ?? ""}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
