import { getDocument, getCollection } from "@/app/db/db";
import { Company } from "@/app/reviews/columns";
import { development } from "./config-provider";

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