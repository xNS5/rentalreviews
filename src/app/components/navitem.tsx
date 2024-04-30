"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import type { navbarItem, navbarObject } from "./navbartypes";

export const NavItem = (
  { name, type, url, children }: navbarItem,
  classname: string
) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const transClass = isOpen ? "flex" : "hidden";

  if (type === "dropdown") {
    console.log(name);
    return (
      <>
        <div className="relative" onMouseOut={toggleIsOpen}>
          <button className="hover:text-blue-900" onMouseOver={toggleIsOpen}>
            {name}
          </button>
          <div
            className={`absolute top-8 z-30 w-[250px] min-h-[300px] flex flex-col py-4 bg-white shadow-sm rounded-md ${transClass}`}
          >
            {children.map((item: navbarItem) => (
              <Link
                key={item.name}
                className={
                  "hover:bg-zinc-300 hover:text-black px-4 py-1 " + classname
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
    <Link className={classname} href={url ?? ""}>
      {name}
    </Link>
  );
};
