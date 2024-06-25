"use server"

import { Company } from "./columns";
import { getCollection } from "../db/db";
import { ReviewsTableWrapper } from "./review-table-wrapper";
import { Suspense } from "react";
import { Spinner } from "@/components/spinner/spinner";

export default async function Reviews() {
  const data: Company[] | undefined = await getCollection<Company>("companies");

  return (
    <div className="container mx-auto py-10">
      <Suspense fallback={<Spinner />}>
        <ReviewsTableWrapper data={data ?? []} />
      </Suspense>
    </div>
  );
}