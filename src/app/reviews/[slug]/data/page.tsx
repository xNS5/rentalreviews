"use server"

import { notFound } from "next/navigation";
import type { Company } from "../../columns";
import { Data } from "./data";
import { getCompanyData } from "../page";


export default async function ReviewData({ params: { slug } }: Readonly<{
    params: {
        slug: string
    }
}>) {
    const slug_regex_test = new RegExp('[^0-9a-z-]')

    if (slug == undefined || slug_regex_test.test(slug)) {
        notFound();
    }
    const data: Company = await getCompanyData(slug);

    return (
        <div
            className="py-4 px-8">
            <Data data={data} />
        </div>
    )
}