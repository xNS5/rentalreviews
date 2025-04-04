import {getDocument} from "@/db/db"
import { headers } from 'next/headers';

type SitemapElem = {
    url: string,
    lastModified: string,
    changeFrequency: string,
    priority: number
}

type SitemapType = {
    _id?: string,
    id?: string,
    sitemap: SitemapElem[]
}

export default async function sitemap(){
    const {sitemap} = await getDocument<SitemapType>("sitemap", "sitemap", 604800000);
    if(!sitemap){
        console.error("Sitemap.xml data not found, check DB connection");
        return [];
    }
    const myHeaders = headers();
    const origin = (await myHeaders).get('host');
    const proto = (await myHeaders).get("x-forwarded-proto");

    return sitemap.map((e: SitemapElem) => ({...e, "url": `${proto ?? "http"}://${origin}/${e.url}`}));
}