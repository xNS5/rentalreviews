"use client";

import Icon from "@/components/icon/icon";
import React, { useState } from "react";
import Button from "@/components/button/button";
import FocusTrap from "@/components/focus-trap/focustrap";
import { Disclosure, DisclosurePanel, Heading } from "react-aria-components";

interface ClassName {
  comp?: string;
  item?: string;
  children?: string;
  content?: string;
  trigger?: string;
}

export default function Accordion({
  triggerText,
  children,
  className,
    id,
  ...rest
}: Readonly<{
  id: string
  triggerText: string;
  children: React.ReactNode;
  className?: ClassName;
}>) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Disclosure
        id={id}
      isExpanded={isExpanded}
      className={`${className?.comp ?? ""}`}
      {...(rest ? { ...rest } : undefined)}
      data-accordion="collapse"
    >
      <FocusTrap disabled={isExpanded}>
        <Heading className={`flex flex-col justify-center items-center`}>
          <Button
              disabled={false}
            onClick={() => setIsExpanded((prev) => !prev)}
            slot="trigger"
            className={`flex flex-row justify-center items-centerT rounded-xl hover:underline ${className?.trigger ?? ""}`}
          >
            {triggerText}
            <Icon
              type="fas-chevron-down"
              className={`h-4 w-4 ml-1 text-inherit transition-transform ${isExpanded ? "rotate-180 transform" : ""}`}
            />
          </Button>
        </Heading>
        <DisclosurePanel
          className={`border-2 rounded-xl my-2 shadow-lg ${className?.content ?? ""}`}
        >
          {children}
        </DisclosurePanel>
      </FocusTrap>
    </Disclosure>
  );
}
