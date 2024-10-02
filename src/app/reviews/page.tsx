import { Company } from "./columns";
import { getCollection, getDocument } from "../../db/db";
import { ReviewsTableWrapper } from "./review-table-wrapper";
import { getAltObj } from "@/lib/altprovider";
import { ColumnKeys } from "./columns";
import DataTable from "@/components/aria-table/data-table";

export const dynamic = 'force-dynamic';


export default async function Reviews() {
  const data: Company[] | undefined = await getCollection<Company>("companies");
  const alt = await getAltObj("reviews");
  const tableCaption = "Rental Reviews Data";

  return (
    <div className="flex flex-col justify-center text-center container mx-auto py-10">
      <h1 className="my-4">{tableCaption}</h1>
      <DataTable data={data} columns={ColumnKeys} alt={alt} tableCaption={tableCaption}/>
    </div>
  );
}