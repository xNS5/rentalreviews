"use server"

import Icon from "../icons/icon";
import Link from "next/link";
import type { FooterItem } from "./footertypes";
import type { Config } from "@/lib/configtype";

function getConfigEntries<T extends Config>(obj: Record<string, T>): [number, T][] {
    return Object.entries(obj).map(([key, value]) => [parseInt(key, 10), value] as [number, T]);
  }

export const Footer = ({footer}: Config) => {
    const entries = getConfigEntries<FooterItem[]>(footer);

    return (
        <footer className="grid auto-rows-max">
            {footer &&
                entries.map((elem: [number, FooterItem[]], i: number) => (
                    <div key={i} className="my-1 flex inline-flex items-center justify-center focus-visible:ring-2 focus-visible:ring-white/75">
                        {elem[1].map((item: FooterItem, j: number) => {
                            if (item.type === "text") {
                                return <span className={"rounded"} key={j} tabIndex={0}>{item.text}</span>;
                            }
                            return (
                                <Link key={j} href={item?.url ?? ""} target={item.target} className={"mx-1"}>
                                    {item.icon && item.icon.length > 0 ? (
                                        <Icon type={item.icon} className="!w-10 !h-10 px-3" aria-hidden={true}/>
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