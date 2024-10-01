import { Company } from "./columns";
import { getCollection, getDocument } from "../../db/db";
import { ReviewsTableWrapper } from "./review-table-wrapper";
import { getAltObj } from "@/lib/altprovider";
import { ColumnKeys } from "./columns";
import DataTable from "@/components/aria-table/data-table";

export const dynamic = 'force-dynamic';


export default async function Reviews() {
  const data: Company[] | undefined = await getCollection<Company>("companies");
  // const alt = await getAltObj("reviews");

  return (
    <div className="container mx-auto py-10">
      {/* <ReviewsTableWrapper data={data ?? []} alt={alt}/> */}
      <DataTable data={data} columns={ColumnKeys} tableCaption={"Rental Reviews Data"}/>
    </div>
  );
}