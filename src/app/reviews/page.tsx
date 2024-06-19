"use server"

import { getCollection } from "../db/firebase";
import { Company } from "./columns";
import { ReviewsTableWrapper } from "./review-table-wrapper";
import { Suspense } from "react";
import { Spinner } from "@/components/spinner/spinner";

export default async function Reviews() {
  const articles: Company[] | undefined = await getCollection<Company[]>("articles");
  const data = [...(articles ?? [])];

  return (
    <div className="container mx-auto py-10">
      <Suspense fallback={<Spinner/>}>
        <ReviewsTableWrapper data={data} />
      </Suspense>
    </div>
  );
}