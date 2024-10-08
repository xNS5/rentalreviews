import { Company } from "./columns";
import { getCollection, getDocument } from "../../db/db";
import { getAltObj } from "@/lib/altprovider";
import { ColumnKeys } from "./columns";
import DataTable from "@/components/aria-table/data-table";
import Article from "@/components/article/article";

export default async function Reviews() {
  const data: Company[] | undefined = await getCollection<Company>("companies");
  const tableCaption = "Rental Reviews Data";

  return (
    <Article className="flex flex-col justify-center text-center container mx-auto py-10">
      <h1 className="my-4">{tableCaption}</h1>
      <DataTable data={data} columns={ColumnKeys} tableCaption={tableCaption}/>
    </Article>
  );
}