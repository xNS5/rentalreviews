import { Disclosure } from "@headlessui/react";
import { NavItem } from "./nav-item";
import type { NavbarItem } from "./navbartypes";
import Icon from "../icons/icon";

export const Accordion = (link: NavbarItem) => {
    return (
        <Disclosure>
            {({ open }) => (
                <>
                    <Disclosure.Button className={`${link.className ?? ""} inline-flex w-full justify-center rounded focusable`}>
                        {link.name}
                        <Icon type="fas-chevron-down" className={`mt-3 h-5 w-5 ml-1 text-black ${open ? 'rotate-180 transform' : ''}`}/>
                    </Disclosure.Button>
                    <Disclosure.Panel as="div" className="text-black w-screen grid grid-cols-1 justify-center border border-y-2 border-slate-300 bg-white shadow-lg divide-y divide-dashed hover:divide-solid">
                        {link.children?.map((child: NavbarItem, i: number) => {
                            return (<NavItem key={i} {...child} className="text-black text-2xl p-2 hover:bg-blue-600 hover:text-white text-center rounded" />)
                        })}
                    </Disclosure.Panel>

                </>
            )}
        </Disclosure>
    )
}