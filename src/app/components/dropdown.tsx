"use client";

import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import type { navbarItem } from "./navbartypes";

export const NavDropdownMenu = (link: navbarItem) => {
  return (
    <div className="relative inline-block text-left">
      <Menu>
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md font-medium font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
            {link.name}
            <FaCaretDown
                className="-mr-1 ml-2 h-5 w-5 text-black"
                aria-hidden="true"
              />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            {link?.children.map((child: navbarItem) => {
              return (
                <div className="px-1 py-1 ">
                  <Menu.Item
                  as="a"
                  key={child.url}
                  href={child.url}
                  target={child.target}>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-blue-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {child.name}
                      </button>
                    )}
                  </Menu.Item>
                </div>
              );
            })}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
