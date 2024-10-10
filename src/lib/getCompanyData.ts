import { getDocument, getCollection } from "@/db/db";
import { Company } from "@/app/reviews/columns";
import { development } from "./config-provider";

export default async function getCompanyData(slug: string): Promise<Company> {
  const company: Company | undefined = await getDocument<Company>("properties_and_companies", slug);
  const review: Company | undefined = await getDocument<Company>("reviews", slug);

  if (company) {
    delete company[development ? "_id" : "id"];
  }

  if (review) {
    delete review[development ? "_id" : "id"];
  }

  return {
    ...(review ?? {}),
    ...(company ?? {}),
  } as Company;
}

