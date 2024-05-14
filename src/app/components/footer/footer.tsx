"use server"

import { getRemoteConfig } from "@/app/utilities/config-provider";
import Icon from "../icons/icon";
import type { FooterItem } from "./footertypes";
import Link from "next/link";
import type { Config } from "@/app/configtype";

export const Footer = ({footer}: Config) => {
    return (
        <footer className="grid grid-rows-3 gap-2 mb-0 ">
            {footer &&
                footer?.map((row: FooterItem[], rowIndex: number) => (
                    <div key={rowIndex} className="flex inline-flex items-center justify-center focus-visible:ring-2 focus-visible:ring-white/75">
                        {row.map((item: FooterItem, itemIndex: number) => {
                            if (item.type === "text") {
                                return <span className={"rounded"} key={itemIndex} tabIndex={0}>{item.text}</span>;
                            }
                            return (
                                <Link key={itemIndex} href={item?.url ?? ""} target={item.target}>
                                    {item.icon && item.icon.length > 0 ? (
                                        <Icon type={item.icon} className="w-10 h-auto px-3" aria-hidden={true}/>
                                    ) : (
                                        <span className="hover:text-blue-900 rounded">
                                            {item.text}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                ))}
        </footer>
    )
}