import { Disclosure } from "@headlessui/react";
import { NavItem } from "./nav-item";
import type { navbarItem } from "./types";
import Icon from "../icons/icon";

export const Accordion = (link: navbarItem) => {
    return (
        <Disclosure>
            {({ open }) => (
                <>
                    <Disclosure.Button className={`${link.className ?? ""} inline-flex w-full justify-center rounded focus-visible:ring-2 focus-visible:ring-white/75`}>
                        {link.name}
                       <Icon type="fa-chevron-down" />
                    </Disclosure.Button>
                    <Disclosure.Panel as="div" className="text-black grid grid-cols-1 justify-center">
                        {link.children.map((child: navbarItem, i: number) => {
                            return (<NavItem key={i} {...child} className="text-black text-2xl p-2 hover:bg-blue-600 hover:text-white text-center rounded" />)
                        })}
                    </Disclosure.Panel>

                </>
            )}
        </Disclosure>
    )
}