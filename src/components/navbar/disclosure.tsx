import { Disclosure as DisclosureComp } from "@headlessui/react";
import { NavItem } from "./nav-item";
import type { NavbarItem } from "./navbartypes";
import Icon from "../icons/icon";

export const Disclosure = (link: NavbarItem) => {
    return (
        <DisclosureComp>
            {({ open }) => (
                <>
                    <DisclosureComp.Button className={`${link.className ?? ""} inline-flex w-full justify-center rounded focusable`}>
                        {link.name}
                        <Icon type="fas-chevron-down" className={`text-black w-5 ${open ? 'rotate-180 transform' : ''}`}/>
                    </DisclosureComp.Button>
                    <DisclosureComp.Panel as="div" className="text-black w-screen grid grid-cols-1 justify-center border border-y-2 border-slate-300 bg-white shadow-lg divide-y divide-dashed hover:divide-solid">
                        {link.children?.map((child: NavbarItem, i: number) => {
                            return (<NavItem key={i} {...child} className="text-black text-2xl p-2 hover:bg-blue-600 hover:text-white text-center rounded" />)
                        })}
                    </DisclosureComp.Panel>

                </>
            )}
        </DisclosureComp>
    )
}