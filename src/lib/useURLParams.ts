"use client";

import React, { useMemo, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {SortDescriptor} from "react-stately";
import {FilterItem} from "@/lib/types";

const inputTestRegex = new RegExp("[()[\\]{};.=<>:+\\-*\\/%]");

export function useURLParams() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const params: { [key: string]: string } = useMemo(
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
        (newParams: { [key: string]: FilterItem }, callbackFn?: () => void) => {
            const currSearchParams = new URLSearchParams(searchParams.toString());
            Object.entries(newParams).forEach(([key, data]) => {
                if ((data?.value === null || data?.value === undefined) || `${data.value}`.trim().length === 0) {
                    currSearchParams.delete(key);
                } else {
                    currSearchParams.set(key, `${data.value}`);
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
        (newParams: SortDescriptor, callbackFn?: () => void) => {
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
