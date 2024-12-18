"use client";

import {useEffect, useRef, useState} from "react";
import Icon from "@/components/icon/icon";
import Accordion from "../accordion/accordion";
import Logo from "../logo/logo";
import Link from "next/link";
import { usePathname as getPathname } from "next/navigation";
import NavigationMenu from "../navigation-menu/navigation-menu";
import {getIsMobileWidth} from "@/lib/clientUtils";
import { FocusTrap, FocusTrapFeatures } from "@headlessui/react";
import type { Link as LinkType } from "@/lib/linktype";
import type { Config } from "@/lib/configProvider";

function getActiveClassProps(url: string) {
  const pathnameArr: string[] = getPathname().split("/");
  const urlArr: string[] = url.split("/");
  const baseStyle = "rounded underline-offset-8 px-2 focus-visible:!ring-1";
  if (pathnameArr[1] === urlArr[1]) {
    return {
      className: `${baseStyle} underline decoration-2 font-bold text-black`,
    };
  } else {
    return {
      className: `${baseStyle} hover:bg-slate-500 hover:text-white py-2`,
    };
  }
}

function NavItem({
  name,
  ...rest
}: Readonly<{
  name: string;
  [key: string]: any;
}>) {
  // Hacky way to get the active class props
  const { href } = rest;
  const activeClassProps = getActiveClassProps(href);
  const activeClassPropsCount = Object.keys(activeClassProps).length;
  return (
    <Link href={"/"} {...activeClassProps} {...rest} aria-current={activeClassPropsCount > 1 ? "page" : undefined}>
      {name}
      {activeClassPropsCount > 1 && <span className="sr-only">current page</span>}
    </Link>
  );
}

export default function Navbar({
  data,
  title,
  description,
}: Readonly<{
  data: Config;
  title: string;
  description: string;
}>) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isMobileWidth, setIsMobileWidth] = useState(getIsMobileWidth());
  const MobileNavbarRef = useRef(null);

  /* handles the following scenarios:
   User hits `escape` to exit out of navbar
   User resizes window while mobile navbar is open
   User attempts to tab away from mobile navbar while it's expanded
  */
  useEffect(() => {
    const escHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && MobileNavbarRef.current !== null) {
        setIsMobileNavOpen((prev) => !prev);
      }
    };

    const resizeHandler = () => {
      const isMobile = window.innerWidth <= 768;
      if (isMobile !== isMobileWidth) {
        setIsMobileWidth(isMobile);
        if (MobileNavbarRef.current !== null) {
          setIsMobileNavOpen((prev) => !prev);
        }
      }
    };

    if (MobileNavbarRef.current !== null) {
      window.addEventListener("resize", resizeHandler);
      document.addEventListener("keydown", escHandler);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("resize", resizeHandler);
      document.removeEventListener("keydown", escHandler);
      document.body.style.overflow = "visible";
    };
  }, [isMobileNavOpen, isMobileWidth]);

  return (
    <>
      {/* Features: conditionally enables/disables the focus trap based on isMobileNavOpen state */}
      <FocusTrap
        id="navbar-menu"
        as="nav"
        className={"w-full bg-white flex flex-col flex-wrap shadow-lg py-1 px-5"}
        features={isMobileNavOpen ? FocusTrapFeatures.TabLock : FocusTrapFeatures.None}
      >
        <div className="flex flex-row flex-wrap space-between justify-between align-center content-center w-full m-auto">
          <Link href="/" className="self-start flex flex-col rounded px-2 py-4" role="link">
            <Logo id="website-logo" className="py-2">
              <span className="hidden sm:flex sm:flex-col justify-center content-center ml-2">
                <p className="md:text-2xl sm:text-lg">{title}</p>
                <p className="md:text-lg sm:text-sm">{description}</p>
              </span>
            </Logo>
          </Link>
          <button
            className={`md:hidden self-end cursor-pointer z-20 text-gray-500 transition-transform mb-7`}
            onClick={() => setIsMobileNavOpen((prev) => !prev)}
            aria-controls="navbar-menu"
            aria-label={`${isMobileNavOpen ? "Close" : "Open"} navigation menu`}
            aria-expanded={isMobileNavOpen}
          >
            <Icon type={`${isMobileNavOpen ? "fas-x" : "fas-bars"}`} className="w-8" />
          </button>
          {/* Wanted to keep this inside the same div as the logo */}
          {!isMobileNavOpen && (
            <ol className="hidden md:flex flex-row justify-center items-center" >
              {data?.map((link: LinkType, i: number) => (
                <li key={i} className="text-xl mx-2">
                  {link.type == "link" ? (
                    <NavItem id={`headlessui-menu-button-${i}`} href={link.url} name={link.name} />
                  ) : (
                    <NavigationMenu
                      data={link}
                      className={{ trigger: `${getActiveClassProps(link.url)?.className} text-xl` }}
                      props={{ trigger: { id: `headlessui-menu-button-${i}` } }}
                    />
                  )}
                </li>
              ))}
            </ol>
          )}
        </div>
        {isMobileNavOpen && (
            <div id={'mobile-navbar'} ref={MobileNavbarRef}>
              <ol className="flex flex-col relative justify-start items-center w-full h-screen">
                {data?.map((link: LinkType, i: number) => (
                    <li key={i} className="py-4 cursor-pointer capitalize text-2xl hover:text-blue-900">
                      {link.type === "link" ? (
                          <NavItem id={`nav-link-${i}`} href={link.url} name={link.name}
                                   onClick={() => setIsMobileNavOpen((prev) => !prev)}/>
                      ) : (
                          <Accordion
                              id={`nav-accordion-${i}`}
                              triggerText={link.name}
                              as="button"
                              className={{
                                trigger: "rounded justify-center text-2xl px-2",
                                content: "rounded border border-slate-400 shadow-lg",
                              }}
                          >
                            <ol className="text-center">
                              {link.children?.map((child: LinkType, j: number) => (
                                  <li key={j} className="my-4 px-2">
                                    <NavItem
                                        href={child.url}
                                        name={child.name}
                                        className="!inline-block text-black !text-xl text-center rounded"
                                        target={child.target}
                                        onClick={() => setIsMobileNavOpen((prev) => !prev)}
                                    />
                                  </li>
                              ))}
                            </ol>
                          </Accordion>
                      )}
                    </li>
                ))}
              </ol>
            </div>
        )}
      </FocusTrap>
    </>
  );
}

