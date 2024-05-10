"use client"

import { useEffect, useState } from "react";
import { getFooter } from "@/app/utilities/config-provider";
import IconProvider from "@/app/utilities/icon-provider";
import type { FooterItem } from "./footertypes";


export const Footer = () => {
    const [footerItems, setFooterItems] = useState<any>(null);

    useEffect(() => {
        const data = getFooter();
        setFooterItems(data);
    }, []);

    return (
        <footer className="grid grid-rows-3 gap-4">
            <div>
                {footerItems && footerItems[0].map((item: FooterItem) => {
                    return (
                        <a key={item.title} href={item.url} target={item.target}>
                            {/* <IconProvider type={"Github"} className="px-2" /> */}
                        </a>
                    )
                })}
            </div>
            <div className="grid grid-cols-2 gap-4">
                World!
            </div>
        </footer>
    )
}