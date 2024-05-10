"use client"

import { useEffect, useState } from "react";
import { getFooter } from "@/app/utilities/config-provider";
import Icon from "../icons/icon";
import type { FooterItem } from "./footertypes";


export const Footer = () => {
    const [footerItems, setFooterItems] = useState<any>(null);

    useEffect(() => {
        const data = getFooter();
        setFooterItems(data);
    }, []);

    return (
        <footer className="grid grid-rows-2 gap-4 content-start mb-0">
            <div className="flex inline-flex items-center justify-center">
                {footerItems && footerItems[0].map((item: FooterItem) => {
                    return (
                        <a key={item.title} href={item.url} target={item.target}>
                            <Icon type={`${item.icon}`} className="w-10 h-auto"/>
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