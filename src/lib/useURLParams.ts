"use client";

import React, { useMemo, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const inputTestRegex = new RegExp("[()[\\]{};.=<>:+\\-*\\/%]");

function isNumeric(val: any) {
    return !isNaN(val) && !isNaN(parseFloat(val));
}

export function useURLParams() {
    const router = useRouter();
    const searchParams = useSearchParams();


    const params: { [key: string]: any } = useMemo(
        () =>
            searchParams.entries().reduce(
                (acc, [key, value]) => ({
                    ...acc,
                    ...(!inputTestRegex.test(value)
                        ? {
                            [key]: isNumeric(value)
                                ? parseFloat(`${value}`)
                                : value?.replaceAll('\++', '\s'),
                        }
                        : undefined),
                }),
                {},
            ),
        [searchParams],
    );

    console.log(params);

    const setParams = useCallback(
        (newFilters: { [key: string]: any }, callbackFn?: () => any) => {
            const currSearchParams = new URLSearchParams(searchParams.toString());
            Object.entries(newFilters).forEach(([key, value]) => {
                if (value === null || `${value}`.trim().length === 0) {
                    currSearchParams.delete(key);
                } else {
                    currSearchParams.set(key, value);
                }
            });
            router.replace(`?${currSearchParams.toString()}`, { scroll: false });
            if(callbackFn){
                callbackFn();
            }
        },
        [searchParams],
    );
    return { params, setParams };
}
