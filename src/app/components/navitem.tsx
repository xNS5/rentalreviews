"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import type { navbarItem, navbarObject } from "./navbartypes";
import { FaCaretDown } from "react-icons/fa";
import { usePathname as getPathname } from "next/navigation";


function getActiveClassName(pathname: string, url: string) {
  return pathname === url ? "underline font-bold text-slate-600" : "";
}

export const NavItem = (
  { name, type, url, children }: navbarItem
) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = getPathname();

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const transClass = isOpen ? "flex" : "hidden";

  if (type === "dropdown") {
    console.log(name);
    return (
      <>
        <div className="relative">
          <button className="hover:text-blue-600 flex" onClick={toggleIsOpen}>
          {name}
          <FaCaretDown/>
          </button>

          <div
            className={`absolute top-8 z-30 w-[250px] min-h-[300px] flex flex-col border border-slate-400 py-4 bg-white shadow-lg rounded-md ${transClass}`}
          >
            {children.map((item: navbarItem) => (
              <Link
                key={item.name}
                className={
                  "hover:bg-zinc-300 hover:text-black px-4 py-1 "
                }
                href={item?.url || ""}
                onClick={toggleIsOpen}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        {/* {isOpen ? <div onMou={toggleIsOpen}></div> : <></>} */}
      </>
    );
  }

  return (
    <Link className={getActiveClassName(pathname, url)} href={url ?? ""}>
      {name}
    </Link>
  );
};
