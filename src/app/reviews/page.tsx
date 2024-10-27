import { Company } from "./columns";
import { getDocument } from "@/db/db";
import DataTable from "@/components/aria-table/data-table";
import Article from "@/components/article/article";
import DataList from "@/components/data-list/data-list";

export default async function Reviews() {
  const reviewData: Company | undefined = await getDocument<Company>("index", "properties_and_companies_index");
  const tableCaption = "Rental Reviews Data";

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

  return (
    <Article className="flex flex-col justify-center text-center container mx-auto py-10">
      <h1 className=" md:text-4xl my-4">{tableCaption}</h1>
      {/*<DataTable data={reviewData.data} columns={ColumnKeys} tableCaption={tableCaption} />*/}
        <DataList data={reviewData.data}/>
    </Article>
  );
}
