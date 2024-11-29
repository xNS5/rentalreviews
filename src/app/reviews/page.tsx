import {Company, getColumnKeys} from "./columns";
import { getDocument } from "@/db/db";
import DataTable from "@/app/reviews/data-table";
import Article from "@/components/article/article";
import {notFound} from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Reviews() {
  const reviewData: Company | undefined = await getDocument<Company>("index", "properties_and_companies_index");
  const ColumnKeys = getColumnKeys();

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
