"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { usePathname as getPathname } from "next/navigation";
import { Logo } from "./logo";

type navItem = {
  name: string,
  description: string,
  text: [],
  nav_list: []
}

const Navbar = (config : navItem[]) => {
  const [isNavOpen, setNavOpen] = useState(false);
  const pathname = getPathname();

  console.log("CONFIG", config);

  const links = [
    {
      id: 1,
      name: "Home",
      link: "/",
    },
    {
      id: 2,
      name: "Reviews",
      link: "/reviews",
    },
    {
      id: 3,
      name: "Resources",
      link: "/resources",
    },
    {
      id: 4,
      name: "About",
      link: "/about",
    },
    {
      id: 5,
      name: "Contact",
      link: "/contact",
    },
  ];

  return (
    <nav className="flex justify-between items-center w-full px-4 py-4 border-b-2 border-gray-500 bg-white">
      <div>
        <Logo title="Bellingham Rental Reviews" />
      </div>
      <ul className="hidden md:flex">
        {links.map(({ id, name, link }) => (
          <li
            key={id}
            className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-600 hover:text-blue-900"
          >
            <Link 
            className={pathname === link ? "underline font-bold text-black" : ""}
            href={link}>{name}</Link>
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
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500">
          {links.map(({ id, name, link }) => (
            <li
              key={id}
              className="px-4 cursor-pointer capitalize py-6 text-4xl"
            >
              <Link onClick={() => setNavOpen(!isNavOpen)} href={link}>
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
