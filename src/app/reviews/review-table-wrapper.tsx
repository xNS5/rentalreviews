import { Suspense } from "react";
import { Spinner } from "../components/spinner/spinner";
import { DataTable } from "../components/table/data-table";
import { getCollection } from "../db/firebase";
import { Company } from "./columns";
import { columns } from "./columns";

export async function ReviewsTableWrapper() {
  const articles: Company[] | undefined = await getCollection<Company[]>("articles", 0, 25);
  const data = [...(articles ?? [])];

  return (
    <div className="container mx-auto py-10">
      <Suspense fallback={<Spinner/>}>
       <DataTable columns={columns} data={data} />
    </Suspense>
    </div>
  );
}
