import { Company } from "./columns";
import { getDocument } from "@/db/db";
import DataTable from "@/app/reviews/data-table";
import Article from "@/components/article/article";
import {notFound} from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Reviews() {
  const reviewData: Company | undefined = await getDocument<Company>("index", "properties_and_companies_index");

    const ColumnKeys = [
        {
            key: "name",
            title: "Name",
        },
        {
            key: "company_type",
            title: "Company Type",
        },
        {
            key: "average_rating",
            title: "Average Rating",
        },
        {
            key: "adjusted_average_rating",
            title: "Adjusted Average Rating",
        },
        {
            key: "review_count",
            title: "Review Count",
        },
    ];

    if(reviewData === undefined){
        console.error("Data is undefined. Check DB connection.");
        notFound();
    }

  return (
    <Article className="flex flex-col justify-center text-center container mx-auto py-10">
        <DataTable data={reviewData.data} columns={ColumnKeys}/>
    </Article>
  );
}
