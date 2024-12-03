"use client";

import React, { useRef, useState, useEffect } from "react";

export default function Popover({
  children,
  toggle,
  className,
  props,
}: Readonly<{
  children: React.ReactNode;
  toggle: React.ReactNode;
  className?: {
    toggle: string;
    popover: string;
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`relative flex flex-row justify-center ${className?.popover ?? ""}`}
      {...props}
    >
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
        <div
          id="popover-content"
          ref={popoverRef}
          className="flex flex-col bg-white border border-black absolute animate ease-in-out top-full left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 shadow-md rounded-md p-4 z-[1000] whitespace-nowrap"
          role="dialog"
          aria-modal="true"
        >
          {children}
        </div>
      )}
    </div>
  );
}
