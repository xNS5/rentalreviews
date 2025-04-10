"use client";

import React, { useRef, useState, useEffect } from "react";
import FocusTrap from "@/components/focus-trap/focustrap";
import Icon from "@/components/icon/icon";

export default function Popover({
  children,
  toggle,
  className,
  ariaLabel,
    label,
  ...rest
}: Readonly<{
  children: React.ReactNode;
  toggle: React.ReactNode;
  ariaLabel: string;
  label: string;
  className?: {
    toggle?: string;
    popover?: string;
  };
}>) {
  const [isVisible, setIsVisible] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        event.target &&
        popoverRef.current &&
        triggerRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsVisible((prev) => !prev);
      }
    };

    const escHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && popoverRef.current !== null) {
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
      <div className={`flex flex-row justify-center items-center`} {...rest}>
        <FocusTrap
            disabled={isVisible}
        >
          <button
              ref={triggerRef}
              onClick={() =>  setIsVisible((prev) => !prev)}
              className={`flex flex-row cursor-pointer rounded pt-2 ${className?.toggle ?? ""}`}
              aria-haspopup="true"
              aria-expanded={isVisible}
              aria-controls="popover-content"
              aria-label={`${isVisible ? "close" : "open"} ${ariaLabel}`}
          >
            {toggle}
          </button>
          {isVisible && (
              <span className={`relative`}>
              <div
                  title={label}
                  id="popover-content"
                  ref={popoverRef}
                  className={`flex flex-col bg-white border border-black absolute animate ease-in-out shadow-md rounded-md p-2 whitespace-nowrap ${className?.popover ?? ""}`}
                  role="dialog"
                  aria-modal="true"
              >

              {children}
            </div>
           </span>
          )}
        </FocusTrap>
      </div>
    </div>
  );
}
