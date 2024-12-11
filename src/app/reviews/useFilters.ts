"use client";

import React, { useMemo, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getColumnKeys } from "./columns";

const inputTestRegex = new RegExp("[^a-zA-Z0-9\+]");

function isNumeric(val: any) {
  return !isNaN(val) && !isNaN(parseFloat(val));
}

export function useFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filter: { [key: string]: any } = useMemo(
    () =>
      getColumnKeys().reduce(
        (acc, curr) => ({
          ...acc,
          ...(searchParams.has(curr.key) /*&&
          !inputTestRegex.test(searchParams.get(curr.key) as string)*/
            ? {
                [curr.key]: isNumeric(searchParams.get(curr.key))
                  ? parseFloat(`${searchParams.get(curr.key)}`)
                  : searchParams.get(curr.key)?.replaceAll('\++', '\s'),
              }
            : undefined),
        }),
        {},
      ),
    [searchParams],
  );

  const setFilters = useCallback(
    (newFilters: { [key: string]: any }) => {
      const currSearchParams = new URLSearchParams(searchParams.toString());
      Object.entries(newFilters).forEach(([key, value]) => {
        if (value === null || `${value}`.trim().length === 0) {
          currSearchParams.delete(key);
        } else {
            console.log(key, value);
          currSearchParams.set(key, value);
        }
      });

      router.replace(`?${currSearchParams.toString()}`, { scroll: false });
    },
    [searchParams],
  );
  return { filter, setFilters };
}
