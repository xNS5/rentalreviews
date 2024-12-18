"use client"

import { useState } from "react";
import { Dropdown as DropdownComp, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Button } from "../ui/button";
import type { Link as LinkType } from "@/lib/linktype";
import Icon from "@/components/icon/icon";
import Link from "next/link";

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
  props?: {
    comp?: {[key: string]: any};
    menu?: {[key: string]: any};
    trigger?: {[key: string]: any};
    item?: {[key: string]: any};
  }
}>) {

  const [isNavOpen, setIsNavOpen] = useState(false);

  if (data.children === undefined) return;

  return (
    <DropdownComp onOpenChange={() => setIsNavOpen(!isNavOpen)} className={`${className?.comp ?? ""}`} {...(props?.comp && props.comp)}>
      <DropdownTrigger>
        <Button id={props?.trigger?.id} variant={"ghost"} className={` p-0 ${className?.trigger ?? ""} font-normal`} {...(props?.trigger && props.trigger)}>
          {data.name}
          <Icon
            type="fas-chevron-down"
            className={`h-4 w-4 ml-1 text-inherit transition-transform ${isNavOpen ? "rotate-180 transform" : ""}`}
          />
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="flat" className={`${className?.menu ?? ""} bg-white border border-slate-200 shadow rounded p-2`} items={data.children} {...(props?.menu && props.menu)}>
        {(child: LinkType) => (
          <DropdownItem key={`${child.name}`} textValue={child.name} variant="flat" className={`${className?.item ?? ""}`}>
            <Link href={child.url} onClick={() => setIsNavOpen(!isNavOpen)} target={child.target}>
              <p>{child.name}</p>
            </Link>
          </DropdownItem>
        )}
      </DropdownMenu>
    </DropdownComp>
  );
}
