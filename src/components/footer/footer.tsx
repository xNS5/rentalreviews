"use server"

import Icon from "../icons/icon";
import type { FooterItem } from "./footertypes";
import Link from "next/link";
import type { Config } from "@/lib/configtype";

function getConfigEntries<T extends Config>(obj: Record<string, T>): [number, T][] {
    return Object.entries(obj).map(([key, value]) => [parseInt(key, 10), value] as [number, T]);
  }

export const FooterComp = ({footer}: Config) => {
    const entries = getConfigEntries<FooterItem[]>(footer);
    return (
        <footer className="grid grid-rows-3 gap-2 mb-0 ">
            {footer &&
                entries.map((elem: [number, FooterItem[]]) => (
                    <div key={elem[0]} className="flex inline-flex items-center justify-center focus-visible:ring-2 focus-visible:ring-white/75">
                        {elem[1].map((item: FooterItem, itemIndex: number) => {
                            if (item.type === "text") {
                                return <span className={"rounded"} key={itemIndex} tabIndex={0}>{item.text}</span>;
                            }
                            return (
                                <Link key={itemIndex} href={item?.url ?? ""} target={item.target}>
                                    {item.icon && item.icon.length > 0 ? (
                                        <Icon type={item.icon} className="px-3" aria-hidden={true}/>
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