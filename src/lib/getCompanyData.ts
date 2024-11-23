import { getDocument, getCollection} from "@/db/db";
import { Company } from "@/app/reviews/columns";

export default async function getCompanyData(slug: string): Promise<Company> {
  const companyPromise: Promise<Company> = getDocument<Company>("properties_and_companies", slug);
  const reviewPromise: Promise<Company> = getDocument<Company>("reviews", slug);
  
  const [company, review] = await Promise.all([companyPromise, reviewPromise]);

  if (company) {
    delete company[process.env.NEXT_PUBLIC_DB_ENV === "local"? "_id" : "id"];
  }

  if (review) {
    delete review[process.env.NEXT_PUBLIC_DB_ENV === "local" ? "_id" : "id"];
  }

  return {
    ...(review ?? {}),
    ...(company ?? {}),
  } as Company;
}

