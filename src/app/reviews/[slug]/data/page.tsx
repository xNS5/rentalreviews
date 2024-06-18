"use server"

import { notFound } from "next/navigation";
import type { Company } from "../../columns";
import { getDocument } from "@/app/db/firebase";
import {RawData} from "./raw-data";


export default async function ReviewData({ params: { slug } }: any) {
    const slug_regex_test = new RegExp('[^0-9a-z-]')
    if (slug == undefined || slug_regex_test.test(slug)) {
        notFound();
    }
    const raw_data: Company | undefined = await getDocument<Company>("articles", { query_key: "slug", query_value: slug });
    const jsonBlob = new Blob([JSON.stringify(raw_data, null, 2)], { type: 'application/json' });

    return (<>{JSON.stringify(raw_data, null, 2)}</>)
}