import { columns, Company } from "../components/table/columns"
import { DataTable } from "../components/table/data-table"
import { getCollection } from "../db/firebase";

export default async function Reviews() {
  const companies: Company[] | undefined = await getCollection<Company[]>("summary_companies", 0, 10);
  const properties: Company[] | undefined = await getCollection<Company[]>("summary_properties",  0, 10);
  const data = [...(companies ?? []), ...(properties ?? [])];

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
