"use client";

import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import type { navbarItem } from "./types";
import { DownOutlined } from "@ant-design/icons";
import Icon from "../icons/icon";

export const NavDropdownMenu = (link: navbarItem) => {
  return (
    <div className="relative inline-block text-left">
      <Menu>
        {({ open }) => (
          <>
            <div>
              <Menu.Button className="inline-flex w-full justify-center rounded-md font-medium font-medium focus-visible:ring-2 focus-visible:ring-white/75">
                {link.name}
                <Icon type="fas-chevron-down" className={`mt-1.5 h-3 w-3 ml-1 text-black ${open ? 'rotate-180 transform' : ''}`}/>
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
                      target={child.target}
                    >
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
