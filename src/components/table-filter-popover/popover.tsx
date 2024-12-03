"use client";

/*
 * Company Type: Select
 * Average Rating: Select
 * Adjusted Average Rating: Select
 * Review Count: Select
 * E.g. "Average Rating: 3+"
 * */

import React, { useRef, useState, useEffect } from "react";

const FilterProps = [
  {
    title: "Company Type",
    key: "company_type",
    type: "select",
    value: [
      { title: "Company", key: "company" },
      { title: "Property", key: "property" },
    ],
  },
  {
    title: "Average Rating",
    key: "average_rating",
    type: "select",
    value: [
      {
        title: 1,
        key: 1,
      },
      {
        title: 2,
        key: 2,
      },
      {
        title: 3,
        key: 3,
      },
      {
        title: 4,
        key: 4,
      },
      {
        title: 5,
        key: 5,
      },
    ],
  },
  {
    title: "Adjusted Average Rating",
    key: "adjusted_average_rating",
    type: "select",
    value: [
      {
        title: 1,
        key: 1,
      },
      {
        title: 2,
        key: 2,
      },
      {
        title: 3,
        key: 3,
      },
      {
        title: 4,
        key: 4,
      },
      {
        title: 5,
        key: 5,
      },
    ],
  },
  {
    title: "Review Count",
    key: "review_count",
    type: "select",
    value: [
      {
        title: 10,
        key: 10,
      },
      {
        title: 20,
        key: 20,
      },
      {
        title: 30,
        key: 30,
      },
      {
        title: 40,
        key: 40,
      },
      {
        title: 50,
        key: 50,
      },
    ],
  },
];

export default function Popover() {
  const [isVisible, setIsVisible] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const popoverVisibilityHandler = () => {
    setIsVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (event.target &&
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
    <div className="relative flex flex-row justify-center">
      <button
        ref={triggerRef}
        onClick={popoverVisibilityHandler}
        className="cursor-pointer rounded pt-2 "
        aria-haspopup="true"
        aria-expanded={isVisible}
        aria-controls="popover-content"
      >
        Filters
      </button>
      {isVisible && (
        <div
          id="popover-content"
          ref={popoverRef}
          className="flex flex-col bg-white border border-black absolute top-full left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 shadow-md rounded-md p-4 z-[1000] whitespace-nowrap"
          role="dialog"
          aria-modal="true"
        >
          {FilterProps.map(prop => <div key={Math.random()}>{prop.title}</div>)}
        </div>
      )}
    </div>
  );
}
