"use client"

import { useEffect, useState } from "react"
import { getFooter } from "@/app/utilities/config-provider"
import type { FooterItem } from "./footertypes"


export const Footer = (data : FooterItem) => {
    const [footerItems, setFooterItems] = useState({});

    useEffect(() => {
        const data = getFooter();
        setFooterItems(data);
    }, []);

    return (
        <div>

        </div>
    )
}