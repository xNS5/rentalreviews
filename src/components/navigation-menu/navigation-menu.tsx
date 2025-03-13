"use client"

import Link from "next/link";
import {useState, useEffect, useRef} from "react";
import Icon from "@/components/icon/icon";
import Button from "@/components/button/button";
import type {Link as LinkType} from "@/lib/types";
import FocusTrap from "@/components/focus-trap/focustrap";
import {getIsMobileWidth} from "@/lib/clientUtils";

export default function NavigationMenu({
      data,
      className,
      props
  }: Readonly<{
    data: LinkType;
    className?: {
        comp?: string;
        menu?: string;
        trigger?: string;
        item?: string;
    };
    props: {
        trigger: {[key: string]: string};
    }
}>){
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isMobileWidth, setIsMobileWidth] = useState(getIsMobileWidth());
    const accordionId = `accordion-group-${Math.floor(Math.random() * 100) + 1}`;
    const navMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const escHandler = (e: KeyboardEvent) => {
            if (e.key === "Escape" && navMenuRef.current !== null) {
                setIsNavOpen((prev) => !prev);
            }
        };

        const resizeHandler = () => {
            const isMobile = window.innerWidth <= 768;
            if (isMobile !== isMobileWidth) {
                setIsMobileWidth(isMobile);
                if (navMenuRef.current !== null) {
                    setIsNavOpen((prev) => !prev);
                }
            }
        };

        const clickHandler = ({ target }: MouseEvent) => {
          if (navMenuRef.current && !navMenuRef.current?.contains(target as Node)) {
              setIsNavOpen((prev) => !prev);
          }
        };


        window.addEventListener("resize", resizeHandler);
        document.addEventListener("keydown", escHandler);
        document.addEventListener("mousedown", clickHandler);

        return () => {
            window.removeEventListener("resize", resizeHandler);
            document.removeEventListener("keydown", escHandler);
            document.removeEventListener("mousedown", clickHandler);
        };
    }, [isNavOpen]);

    return (
    <FocusTrap
        disabled={isNavOpen}>
        <div id={"dropdown-menu"} className={`${className?.comp ?? ''}`}>
            <Button
                id={props.trigger?.id}
                type={"button"}
                disabled={false}
                aria-expanded={isNavOpen}
                onClick={() => setIsNavOpen((prev) => !prev)}
                className={`flex flex-row justify-center items-center ${className?.trigger ?? ''}`}
            >
                {data.name}
                <Icon
                    type="fas-chevron-down"
                    className={`h-4 w-4 ml-1 text-inherit transition-transform ${isNavOpen ? "rotate-180 transform" : ""}`}
                />
            </Button>
            {isNavOpen && (
                    <div ref={navMenuRef} className={`relative text-left ${className?.menu ?? ""}`}>
                        <ol id={accordionId}
                            className={`flex flex-col rounded-xl absolute bg-neutral-100 shadow-lg p-5 my-2 text-nowrap right-0 border-2 border-neutral-300`}>
                            {
                                data.children?.map((child: LinkType, i: number) =>
                                    <li
                                        key={i}
                                        className={`${className?.item ?? ""} my-2`}
                                    >
                                        <Link
                                            className={`my-2`}
                                            href={child.url}
                                            target={child.target}
                                            onClick={() => setIsNavOpen((prev) => !prev)}
                                        >
                                            {child.name}
                                        </Link>
                                    </li>)
                            }
                        </ol>
                    </div>
            )}
        </div>
    </FocusTrap>
    )
}