"use server"

import { notFound } from "next/navigation";
import { Review } from "./review";
import { Spinner } from "@/components/spinner/spinner";
import { Suspense } from "react";
import { getDocument } from "@/app/db/firebase";
import { Company } from "../columns";


export default async function Page({params}: any) {
    const slug_regex_test = new RegExp('[^0-9a-z-]')
    const {slug} = params;

    if(slug == undefined || slug_regex_test.test(slug)){
        notFound();
    }

    const article: Company | undefined = await getDocument<Company>("articles", {query_key: "slug", query_value: slug});

    return(
    <Suspense fallback={<Spinner/>}>
        <Review {...(article ? article : {}) as Company}/>
    </Suspense>)
}