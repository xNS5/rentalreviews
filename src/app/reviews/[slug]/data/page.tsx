"use server"

import { notFound } from "next/navigation";
import type { Company } from "../../columns";
import { getDocument } from "@/app/db/db";
import { Data } from "./data";
import { getCompanyData } from "../page";


export default async function ReviewData({ params: { slug } }: any) {
    const slug_regex_test = new RegExp('[^0-9a-z-]')
    if (slug == undefined || slug_regex_test.test(slug)) {
        notFound();
    }
    const data: Company | undefined = await getCompanyData(slug);

    return <Data {...data as Company}/>
}