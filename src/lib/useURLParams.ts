"use client";

import React, { useMemo, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {SortDescriptor} from "react-stately";

const inputTestRegex = new RegExp("[()[\\]{};.=<>:+\\-*\\/%]");

function isNumeric(val: any) {
    return !isNaN(val) && !isNaN(parseFloat(val));
}

export function useURLParams() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const params: { [key: string]: any } = useMemo(
        () =>
            [...searchParams.entries()].reduce((acc, [key, val]) =>
                ({...acc,
                ...(!inputTestRegex.test(val) && {
                    [key]: val
                    })
                })
                ,{}),
        [searchParams],
    );

    const setFilterParams = useCallback(
        (newParams: { [key: string]: any }, callbackFn?: () => any) => {
            const currSearchParams = new URLSearchParams(searchParams.toString());
            Object.entries(newParams).forEach(([key, data]) => {
                if ((data?.value === null || data?.value === undefined) || `${data.value}`.trim().length === 0) {
                    currSearchParams.delete(key);
                } else {
                    currSearchParams.set(key, data.value);
                }
            });
            router.replace(`?${currSearchParams.toString()}`, { scroll: false });
            if(callbackFn){
                callbackFn();
            }
        },
        [searchParams],
    );

    const setSortParams = useCallback(
        (newParams: SortDescriptor, callbackFn?: () => any) => {
            const currSearchParams = new URLSearchParams(searchParams.toString());
            Object.entries(newParams).forEach(([key, value]) => currSearchParams.set(key, value));
            router.replace(`?${currSearchParams.toString()}`, { scroll: false });
            if(callbackFn){
                callbackFn();
            }
        },
        [searchParams]
    );
    return { params, setFilterParams, setSortParams };
}
