"use server"

import { development } from "@/lib/config-provider";
import { notFound } from "next/navigation";
import { Review } from "./review";
import { Spinner } from "@/components/spinner/spinner";
import { Suspense } from "react";
import { getDocument } from "@/app/db/db";
import type { Company } from "../columns";


export async function getCompanyData(slug: string): Promise<Company> {
    const article: Company | undefined = await getDocument<Company>("articles", slug);
    const review: Company | undefined = await getDocument<Company>("reviews", slug);
    const company: Company | undefined = await getDocument<Company>("companies", slug);

    if(article){
        delete article[development? "_id": "id"];
    }

    if(review){
        delete review[development? "_id": "id"];
    }

    return {
        article: { ...(article ?? {}) },
        reviews: { ...(review ?? {}) },
        ...(company ?? {})
    } as Company;
}


export default async function Page({ params }: Readonly<{
    params: { [key: string]: string }
}>) {
    const slug_regex_test = new RegExp('[^0-9a-z-]')
    const { slug } = params;

    if (slug == undefined || slug_regex_test.test(slug)) {
        notFound();
    }

    const companyObj: Company | undefined = await getCompanyData(slug);

    return (
        <Suspense fallback={<Spinner />}>
            <Review {...companyObj as Company} />
        </Suspense>
        )
}