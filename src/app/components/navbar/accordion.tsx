import { Disclosure } from "@headlessui/react";
import { NavItem } from "./nav-item";
import type { navbarItem } from "./types";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { Fragment } from "react";

export const Accordion = (link: navbarItem) => {
    return (
        <Disclosure>
            {({ open }) => (
                <>
                    <Disclosure.Button className="inline-flex w-full justify-center rounded-md font-medium font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                        {link.name}
                        <FaCaretDown
                            className={`ml-1 mt-0.5 h-8 w-8 text-black ${open ? 'rotate-180 transform' : ''}`}
                            aria-hidden="true"
                        />
                    </Disclosure.Button>
                    <Disclosure.Panel as="div" className="text-black grid grid-cols-1 m-2 justify-center">
                        {link.children.map((child: navbarItem) => {
                            return (<NavItem {...child} className="text-black text-2xl p-2 hover:bg-blue-600 hover:text-white text-center rounded"/>)
                        })}
                    </Disclosure.Panel>

                </>
            )}
        </Disclosure>
    )
}