import { isValidSlug } from "@/lib/serverUtils";
import {getCompanyData} from "@/lib/getCompanyData";
import { notFound } from "next/navigation";
import { JsonWrapper } from "./json-wrapper";
import Article from "@/components/article/article";

export const dynamic = "force-dynamic";

export default async function Page(props: { params: Promise<{ slug: string }> }) {
    const slug = (await props.params).slug;

  if (slug == undefined || !isValidSlug(slug)) {
    notFound();
  }

  const companyData = await getCompanyData(slug);

  return (
    <div className="container mx-auto py-10">
       <Article>
       <h1 className="text-center text-lg my-2">Raw Data for {companyData.name}</h1>
       <h2>Please note this page is still a work in progress</h2>
            <div className="rounded border border-slate-500 p-5 shadow-lg">
                <JsonWrapper data={companyData}/>
            </div>
       </Article>
    </div>
  );
}