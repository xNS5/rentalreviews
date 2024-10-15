import { notFound } from "next/navigation";
import { Review } from "./review";
import getCompanyData from "@/lib/getCompanyData";
import type { Company } from "../columns";
import { isValidSlug } from "@/lib/utils";
import Article from "@/components/article/article";
import { AltRecord, getAltObj } from "@/lib/altprovider";

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
  const altObj: AltRecord = await getAltObj("review");


  return (
    <Article>
      <Review data={companyObj} altObj={altObj} />
    </Article>
  );
}

