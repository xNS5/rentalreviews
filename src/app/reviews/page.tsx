import { Company } from "./columns";
import { getCollection, getDocument } from "../../db/db";
import { getAltObj } from "@/lib/altprovider";
import { ColumnKeys } from "./columns";
import DataTable from "@/components/aria-table/data-table";
import Article from "@/components/article/article";

export default async function Reviews() {
  const reviewData: Company | undefined = await getDocument<Company>("index", "properties_and_companies_index");
  const tableCaption = "Rental Reviews Data";

  return (
    <Article className="flex flex-col container justify-center text-center container mx-auto py-10">
      <h1 className=" md:text-4xl my-4">{tableCaption}</h1>
      <DataTable data={reviewData.data} columns={ColumnKeys} tableCaption={tableCaption} />
    </Article>
  );
}
