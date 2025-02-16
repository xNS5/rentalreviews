import {getDocument} from "@/db/db"
import { Config } from "@/lib/types";
import { headers } from 'next/headers';

export default async function robots(){
    const { metadata } = await getDocument<Config>("config", "config");
    const {robots} = metadata;

    if(!robots){
        console.error("Robots.txt data not found, check DB connection")
        return {};
    }
    const myHeaders = headers();
    const origin = (await myHeaders).get('host');
    const proto = (await myHeaders).get("x-forwarded-proto");

    return {sitemap: `${proto ?? "http"}://${origin}/sitemap.xml`, ...robots};
}