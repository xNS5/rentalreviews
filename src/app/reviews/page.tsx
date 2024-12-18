import {Company, getColumnKeys} from "./columns";
import { getDocument } from "@/db/db";
import DataTable from "@/app/reviews/data-table";
import Article from "@/components/article/article";
import {notFound} from "next/navigation";
import { Config } from "@/lib/configProvider";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
    const {metadata, reviews}: Config | undefined = await getDocument<Config>("config", "config", 604800000);
    return {
        title: `${metadata.title} | ${reviews.title}`,
        description: metadata.description
    }
}

export default async function Page() {
  const reviewData: Company | undefined = await getDocument<Company>("index", "properties_and_companies_index");
  const {reviews, alt, disclaimer} = await getDocument<Config>("config", "config");
  const ColumnKeys = getColumnKeys();

    if(reviewData === undefined){
        console.error("Data is undefined. Check DB connection.");
        notFound();
    }

  return (
    <Article className="flex flex-col justify-center text-center container mx-auto py-10">
        <DataTable data={reviewData.data} columns={ColumnKeys} reviews={reviews} alt={alt} disclaimer={disclaimer['reviews']}/>
    </Article>
  );
}
