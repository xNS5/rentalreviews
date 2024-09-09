import { Company } from "./columns";
import { getCollection, getDocument } from "../../db/db";
import { ReviewsTableWrapper } from "./review-table-wrapper";
import { getAltObj } from "@/lib/altprovider";
import { Suspense } from "react";
import Loading from "../loading";

export default async function Reviews() {
  const data: Company[] | undefined = await getCollection<Company>("companies");
  const alt = await getAltObj("reviews");

  return (
    <div className="container mx-auto py-10">
      <ReviewsTableWrapper data={data ?? []} alt={alt}/>
    </div>
  );
}