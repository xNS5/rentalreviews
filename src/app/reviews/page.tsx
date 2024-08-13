import { Company } from "./columns";
import { getCollection } from "../db/db";
import { ReviewsTableWrapper } from "./review-table-wrapper";

export default async function Reviews() {
  let data: Company[] | undefined = await getCollection("companies");

  return (
    <div className="container mx-auto py-10">
      <ReviewsTableWrapper data={data ?? []} />
    </div>
  );
}