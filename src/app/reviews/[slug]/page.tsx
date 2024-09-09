import { notFound } from "next/navigation";
import { Review } from "./review";
import { Suspense } from "react";
import getCompanyData from "@/lib/getCompanyData";
import type { Company } from "../columns";
import Loading from "@/app/loading";
import { isValidSlug } from "@/lib/utils";

export default async function Page({ params }: Readonly<{
    params: { [key: string]: string }
}>) {
    const { slug } = params;

    if (slug == undefined || !isValidSlug(slug)) {
        notFound();
    }

    const companyObj: Company | undefined = await getCompanyData(slug);

    return (
            <Suspense key={Math.random()} fallback={<Loading/>}>
                <Review {...companyObj as Company} />
            </Suspense>
        )
}