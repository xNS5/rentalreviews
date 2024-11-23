import { notFound } from "next/navigation";
import { Review } from "./review";
import getCompanyData from "@/lib/getCompanyData";
import { isValidSlug } from "@/lib/utils";
import Article from "@/components/article/article";
import type { Company } from "../columns";

import "./review.css";


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

  const company: Company = await getCompanyData(slug);

  return (
    <Article className="container mx-auto py-10 review-summary" announcement={"Main content contains headings, a list containing text, and paragraph text"}>
      <Review data={company} />
    </Article>
  );
}

