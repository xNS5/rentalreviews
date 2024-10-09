import { notFound } from "next/navigation";
import { Review } from "./review";
import getCompanyData from "@/lib/getCompanyData";
import type { Company } from "../columns";
import { isValidSlug } from "@/lib/utils";
import Article from "@/components/article/article";

export default async function Page({
  params,
}: Readonly<{
  params: { [key: string]: string };
}>) {
  const { slug } = params;

  if (slug == undefined || !isValidSlug(slug)) {
    notFound();
  }

  const companyObj: Company | undefined = await getCompanyData(slug);

  return (
    <Article>
      <Review {...(companyObj as Company)} />
    </Article>
  );
}

