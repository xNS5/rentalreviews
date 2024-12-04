"use client";

import React, { useRef, useState, useEffect } from "react";
import { FocusTrap, FocusTrapFeatures } from "@headlessui/react";

export default function Popover({
  children,
  toggle,
  className,
  props,
}: Readonly<{
  children: React.ReactNode;
  toggle: React.ReactNode;
  className?: {
    toggle?: string;
    popover?: string;
  };
  [key: string]: any;
}>) {
  const [isVisible, setIsVisible] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const popoverVisibilityHandler = () => {
    setIsVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        event.target &&
        popoverRef.current &&
        triggerRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        popoverVisibilityHandler();
      }
    };

    const escHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsVisible((prev) => !prev);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", escHandler);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", escHandler);
    };
  }, []);

  return (
    <div className={`w-10 h-10`}>
      <div className={`flex flex-row justify-center`} {...props}>
        <button
          ref={triggerRef}
          onClick={popoverVisibilityHandler}
          className={`flex flex-row cursor-pointer rounded pt-2 ${className?.toggle ?? ""}`}
          aria-haspopup="true"
          aria-expanded={isVisible}
          aria-controls="popover-content"
        >
          {toggle}
        </button>
        {isVisible && (
          <FocusTrap
            id={"filter-menu"}
            features={
              isVisible ? FocusTrapFeatures.TabLock : FocusTrapFeatures.None
            }
          >
            <div
              id="popover-content"
              ref={popoverRef}
              className={`flex flex-col bg-white border border-black absolute animate ease-in-out bg-white border border-gray-300 shadow-md rounded-md p-4 z-50 whitespace-nowrap ${className?.popover ?? ""}`}
              role="dialog"
              aria-modal="true"
            >
              {children}
            </div>
          </FocusTrap>
        )}
      </div>
    </div>
  );
}
