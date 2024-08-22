"use client";

import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import Icon from "../icons/icon";
import { NavbarItem } from "../navbar/navbartypes";

export const NavigationMenu = ({link, className}: Readonly<{
    link: NavbarItem,
    className?: string
}>) => {
  return (
    <div className="w-fit">
      <Menu>
        {({ open }) => (
          <>
            <MenuButton className="inline-flex w-full justify-center rounded-md">
              {link.name}
              <Icon type="fas-chevron-down" className={`mt-2 h-3 w-3 ml-1 text-black ${open ? 'rotate-180 transform' : ''}`} ariahidden={true} />
            </MenuButton>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <MenuItems className="fixed w-max -translate-x-1/2 mt-2 w-70 border border-solid border-slate-300 origin-top-right rounded-md bg-white shadow-lg z-10" aria-orientation="vertical" >
                {link.children?.map((child: NavbarItem) => {
                  return (
                    <MenuItem
                      as="a"
                      key={child.url}
                      href={child.url}
                      target={child.target}
                    >
                      {({ focus }) => (
                        <span
                          className={`flex ${focus ? "bg-blue-600 text-white" : "text-gray-900"
                            } rounded-md p-2 text-base md:text-lg`}
                        >
                          {child.name}
                        </span>
                      )}
                    </MenuItem>
                  );
                })}
              </MenuItems>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
};