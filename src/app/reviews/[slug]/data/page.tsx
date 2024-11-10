import { isValidSlug } from "@/lib/utils";
import getCompanyData from "@/lib/getCompanyData";
import { notFound } from "next/navigation";
import { JsonWrapper } from "./json-wrapper";
import Article from "@/components/article/article";


export default async function Data({params}: Readonly<{
    params: { [key: string]: string }
}>) {
  const { slug } = params;

  if (slug == undefined || !isValidSlug(slug)) {
    notFound();
  }

  const companyData = await getCompanyData(slug);

  return (
    <div className="container mx-auto py-10">
       <Article announcement={"Main content contains collapsed elements and text in key-value pairs"}>
       <h1 className="text-center text-lg my-2">Raw Data for {companyData.name}</h1>
            <div className="rounded border border-slate-500 p-5 shadow-lg">
                <JsonWrapper data={companyData}/>
            </div>
       </Article>
    </div>
  );
}