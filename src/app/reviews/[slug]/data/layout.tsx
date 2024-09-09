"use client"

import Loading from "@/app/loading"
import { Suspense } from "react"


export default function DataLayout({children}: Readonly<{
    children: React.ReactNode
}>){
    return  (<Suspense key={Math.random()} fallback={<Loading/>}>
        {children}
    </Suspense>)
}