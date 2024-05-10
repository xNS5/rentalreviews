"use client";

import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { FaCaretDown } from "react-icons/fa";
import type { navbarItem } from "./types";

export const NavDropdownMenu = (link: navbarItem) => {
  return (
    <div className="relative inline-block text-left">
      <Menu>
        {({ open }) => (
          <>
            <div>
              <Menu.Button className="inline-flex w-full justify-center rounded-md font-medium font-medium focus-visible:ring-2 focus-visible:ring-white/75">
                {link.name}
                <FaCaretDown
                  className={`ml-1 mt-0.5 h-5 w-5 text-black ${open ? 'rotate-180 transform' : ''}`}
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
              <Menu.Items className="absolute right-0 mt-2 w-60 border border-solid border-slate-300 origin-top-right rounded-md bg-white shadow-lg">
                {link?.children.map((child: navbarItem) => {
                  return (
                    <Menu.Item
                    as="a"
                    key={child.url}
                    href={child.url}
                    target={child.target}>
                    {({ active }) => (
                      <button
                        className={`${active ? "bg-blue-600 text-white" : "text-gray-900"
                          } group flex w-full rounded-md py-3 px-2 text-left`}
                      >
                        {child.name}
                      </button>
                    )}
                  </Menu.Item>
                  );
                })}
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
};
