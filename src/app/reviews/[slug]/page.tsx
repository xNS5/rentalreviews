import { notFound } from "next/navigation";
import { Review } from "./review";
import getCompanyData from "@/lib/getCompanyData";
import type { Company } from "../columns";
import { isValidSlug } from "@/lib/utils";
import Article from "@/components/article/article";
import { AltRecord, getAltObj } from "@/lib/altprovider";
export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: Readonly<{
  params: { [key: string]: string };
}>) {
  const { slug } = params;

  if (slug == undefined || !isValidSlug(slug)) {
    notFound();
  }

  const companyPromise: Promise<Company> = getCompanyData(slug);
  const altPromise: Promise<AltRecord> = getAltObj("review");

  const [company, alt] = await Promise.all([companyPromise, altPromise]);

  return <Review data={company} altObj={alt} />;
}

