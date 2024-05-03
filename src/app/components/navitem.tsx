"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import type { navbarItem, navbarObject } from "./navbartypes";
import { FaCaretDown } from "react-icons/fa";
import { usePathname as getPathname } from "next/navigation";


function getActiveClassName(url: string) {
  const pathname = getPathname();
  return pathname === url ? "underline font-bold text-black" : "";
}

export const NavItem = (
  { name, type, url, children }: navbarItem
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
        <div className="relative">
          <button className="hover:text-blue-600 flex" onClick={toggleIsOpen}>
            {name}
            <FaCaretDown />
          </button>

          <div
            className={`absolute top-8 z-30 w-[250px] min-h-[300px] flex flex-col border border-slate-400 py-4 bg-white shadow-lg rounded-md ${transClass}`}
          >
            <Dropdown>
              <NavbarItem>
                <DropdownTrigger>
                  <Button
                    disableRipple
                    className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                    radius="sm"
                    variant="light"
                  >
                    Features
                  </Button>
                </DropdownTrigger>
              </NavbarItem>
              <DropdownMenu
                aria-label="ACME features"
                className="w-[340px]"
                itemClasses={{
                  base: "gap-4",
                }}
              >
                <DropdownItem
                  key="autoscaling"
                  description="ACME scales apps to meet user demand, automagically, based on load."
                >
                  Autoscaling
                </DropdownItem>
                <DropdownItem
                  key="usage_metrics"
                  description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where."
                >
                  Usage Metrics
                </DropdownItem>
                <DropdownItem
                  key="production_ready"
                  description="ACME runs on ACME, join us and others serving requests at web scale."
                >
                  Production Ready
                </DropdownItem>
                <DropdownItem
                  key="99_uptime"
                  description="Applications stay on the grid with high availability and high uptime guarantees."
                >
                  +99% Uptime
                </DropdownItem>
                <DropdownItem
                  key="supreme_support"
                  description="Overcome any challenge with a supporting team ready to respond."
                >
                  +Supreme Support
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            {/* {children.map((item: navbarItem) => (
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
            ))} */}
          </div>
        </div>
        {/* {isOpen ? <div onMou={toggleIsOpen}></div> : <></>} */}
      </>
    );
  }

  return (
    <Link className={getActiveClassName(url)} href={url ?? ""}>
      {name}
    </Link>
  );
};
