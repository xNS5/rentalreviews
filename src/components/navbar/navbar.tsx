"use client";

import { useEffect, useState } from "react";
import { NavItem } from "./nav-item";
import {NavigationMenu} from "../navigation-menu/navigation-menu";
import Icon from "../icons/icon";
import Accordion from "../accordion/accordion";
import type { NavbarItem } from "./navbartypes";
import type { Config } from "@/lib/configtype";
import { usePathname as getPathname, usePathname, useRouter } from "next/navigation";


function getActiveClassName(url: string) {
  const pathname = getPathname();
  return pathname === url || (pathname.includes(url) && pathname.length == url.length)? "underline decoration-2 font-bold text-black" : "";
}

export const Navbar = ({ nav }: Config) => {
  const pathname = usePathname();
  const [isNavOpen, setNavOpen] = useState(false);

  
  useEffect(() => {
    if (isNavOpen) {
      setNavOpen(!isNavOpen);
    }
  }, [pathname]); 

  return (
    <>
      <ol className="hidden md:flex flex-row justify-center items-center">
        {nav?.map((link: NavbarItem, i: number) => (
          <li key={i} className="focusable md:text-lg mx-2">
            {link.type == "link" ? (
              <NavItem link={link} className={`${getActiveClassName(link.url)}`}/>
            ) : (
              <NavigationMenu link={link} className={`${getActiveClassName(link.url)}`}/>
            )}
          </li>
        ))}
      </ol>

      <button
        className="focusable cursor-pointer z-20 pr-4 text-gray-500 md:hidden"
        onClick={() => setNavOpen(!isNavOpen)}
      >
        <Icon type={isNavOpen ? "fas-x" : "fas-bars"} className="w-8" />
      </button>

      {isNavOpen && (
        <ul className="flex z-10 flex-col justify-center items-center overflow-hidden absolute top-0 left-0 w-full h-screen bg-white">
          {nav?.map((link: NavbarItem, i: number) => (
            <li
              key={i}
              className="py-4 cursor-pointer capitalize  text-4xl hover:text-blue-900"
              role="link"
            >
              {link.type === "link" ? (
                <NavItem link={link} className={`${getActiveClassName(link.url)}`}/>
              ) : (
                <Accordion triggerText={link.name} className={{ trigger: "text-4xl justify-center", content: "flex flex-col" }}>
                  {
                    link.children?.map((child: NavbarItem, i: number) => 
                      (<NavItem key={i} link={child} className="p-3 text-black text-xl hover:bg-blue-600 hover:text-white text-center rounded" />)
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
