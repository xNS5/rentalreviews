"use client";

import { useEffect, useState } from "react";
import { NavItem } from "./nav-item";
import { NavigationMenu } from "../navigation-menu/navigation-menu";
import Icon from "../icons/icon";
import Accordion from "../accordion/accordion";
import { usePathname as getPathname, usePathname, useRouter } from "next/navigation";
import type { Link } from "@/lib/link";
import type { Config } from "@/lib/config-provider";

function getActiveClassProps(url: string){
  const pathnameArr: string[] = getPathname().split("/");
  const urlArr: string[] = url.split("/")
  if(pathnameArr[1] == urlArr[1]){
    return {
      "className": "underline decoration-2 font-bold text-black",
      "aria-label": `${urlArr[1]} current page`
    }
  }
}

export default function Navbar({ nav }: Readonly<{
  nav: Config
}>){
  const pathname = usePathname();
  const [isNavOpen, setNavOpen] = useState(false);

  useEffect(() => {
    if (isNavOpen) {
      setNavOpen(!isNavOpen);
    }
  }, [pathname]);

  return (
    <>
      <ol className="hidden md:flex flex-row justify-center items-center">
        {nav?.map((link: Link, i: number) => (
          <li key={i} className="md:text-lg mx-2">
            {link.type == "link" ? (
              <NavItem href={link.url} name={link.name} {...getActiveClassProps(link.url)} />
            ) : (
              <NavigationMenu link={link} className={getActiveClassProps(link.url)?.className}/>
            )}
          </li>
        ))}
      </ol>

      <button
        className="cursor-pointer z-20 pr-4 text-gray-500 md:hidden"
        onClick={() => setNavOpen(!isNavOpen)}
      >
        {isNavOpen ? <Icon type="fas-x" className="w-8" altText="Close navigation menu"/> : <Icon type="fas-bars" className="w-8" altText="Open navigation menu"/>}
      </button>

      {isNavOpen && (
        <ol className="flex z-10 flex-col justify-center items-center overflow-hidden absolute top-0 left-0 w-full h-screen bg-white">
          {nav?.map((link: Link, i: number) => (
            <li
              key={i}
              className="py-4 cursor-pointer capitalize  text-4xl hover:text-blue-900"
            >
              {link.type === "link" ? (
               <NavItem href={link.url} name={link.name} {...getActiveClassProps(link.url)}/>
              ) : (
                <Accordion triggerText={link.name} className={{ trigger: "text-4xl justify-center", content: "rounded border border-slate-400"}}>
                  <ol className="text-center">
                  {
                      link.children?.map((child: Link, i: number) => 
                        (
                          <li key={i} className="my-4 px-2">
                            <NavItem key={i} link={child} className="!inline-block p-3 text-black text-xl hover:bg-blue-600 hover:text-white text-center rounded" />
                          </li>
                        )
                      )}
                  </ol>
                </Accordion>
              )}
            </li>
          ))}
        </ol>
      )}
    </>
  );
};
