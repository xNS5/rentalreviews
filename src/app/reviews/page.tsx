"use server"

import { ReviewsTableWrapper } from "./review-table-wrapper";
import { getCollection } from "../db/firebase";
import { Company } from "./columns";


export default async function Reviews() {

  const articles: Company[] | undefined = await getCollection<Company[]>("articles", 0, 25);
  const data = [...(articles ?? [])];

  return (
    <div className="container mx-auto py-10">
      <ReviewsTableWrapper data={data} />
    </div>
  );
}