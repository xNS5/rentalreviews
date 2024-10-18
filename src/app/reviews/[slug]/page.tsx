import { notFound } from "next/navigation";
import { Review } from "./review";
import getCompanyData from "@/lib/getCompanyData";
import { isValidSlug } from "@/lib/utils";
import Article from "@/components/article/article";
import { AltRecord, getAltObj, getAltString } from "@/lib/altProvider";
import type { Company } from "../columns";

import "./review.css";

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

  const altObj = ["review_count", "average_rating", "adjusted_review_count", "adjusted_average_rating"].reduce((obj, curr) => ({...obj, [curr]: getAltString(alt, curr, company[curr])}), {})

  return (
    <Article className="container mx-auto py-10 review-summary">
      <Review data={company} altObj={altObj} />;
    </Article>
  );
}

