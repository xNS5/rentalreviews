import { getDocument } from "@/db/db";
import { Company } from "@/app/reviews/columns";

export async function getCompanyData(slug: string): Promise<Company> {
  const companyPromise: Promise<Company> = getDocument<Company>("properties_and_companies", slug, 604800000);
  const reviewPromise: Promise<Company> = getDocument<Company>("reviews", slug, 604800000);
  
  const [company, review] = await Promise.all([companyPromise, reviewPromise]);

  if (company) {
    delete company[process.env.DB_ENV === "local"? "_id" : "id"];
  }

  if (review) {
    delete review[process.env.DB_ENV === "local" ? "_id" : "id"];
  }

  return {
    ...(review ?? {}),
    ...(company ?? {}),
  } as Company;
}

export async function getCompanyMetadata(slug: string): Promise<Company>{
  const companyPromise: Promise<Company> = getDocument<Company>("properties_and_companies", slug, 604800000);
  const [company] = await Promise.all([companyPromise]);

  if (company) {
    delete company[process.env.DB_ENV === "local"? "_id" : "id"];
  }

  return {
    ...(company ?? {}),
  } as Company;

}

