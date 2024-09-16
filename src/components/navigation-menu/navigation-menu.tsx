"use client"

import { useState } from "react";
import { Dropdown as DropdownComp, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@nextui-org/dropdown";
import { Button } from "../ui/button";
import type { Link as LinkType } from "@/lib/linktype";
import Icon from "../icons/icon";
import Link from "next/link";

export default function NavigationMenu({
  data,
  className,
}: Readonly<{
  data: LinkType;
  className?: {
    comp?: string;
    menu?: string;
    trigger?: string;
    item?: string;
  };
}>) {

  const [isNavOpen, setIsNavOpen] = useState(false);



  if (data.children === undefined) return;

  return (
    <DropdownComp onOpenChange={() => setIsNavOpen(!isNavOpen)} className={`${className?.comp}`}>
      <DropdownTrigger>
        <Button variant={"ghost"} className={` p-0 ${className?.trigger} font-normal`}>
          {data.name}
          <Icon
            type="fas-chevron-down"
            className={`mt-2 h-3 w-3 ml-1 text-black transition-transform focus:!border-blue-500 ${isNavOpen ? "rotate-180 transform" : ""}`}
          />
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="light" className={`${className?.menu}`} items={data.children}>
        {(child: LinkType) => (
          <DropdownItem key={`${child.name}-${Math.random()}`} value={child.name} variant="flat">
            <Link href={child.url} onClick={() => setIsNavOpen(!isNavOpen)} target={child.target}>
              <p tabIndex={-1}> {child.name}</p>
            </Link>
          </DropdownItem>
        )}
      </DropdownMenu>
    </DropdownComp>
  );
}
