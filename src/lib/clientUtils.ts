"use client"

export function getIsMobileWidth(): boolean {
    if (typeof window !== "undefined") {
        return window.innerWidth < 750;
    }
    return false;
}