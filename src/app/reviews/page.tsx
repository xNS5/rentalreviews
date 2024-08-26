import { Company } from "./columns";
import { getCollection, getDocument } from "../db/db";
import { ReviewsTableWrapper } from "./review-table-wrapper";
import type { Alt } from "@/lib/alttype";

export default async function Reviews() {
  let data: Company[] | undefined = await getCollection<Company>("companies");
  let alt: Alt | undefined = await getDocument<Alt>("config", "alt");

  return (
    <div className="container mx-auto py-10">
      <ReviewsTableWrapper data={data ?? []} alt={alt ?? undefined}/>
    </div>
  );
}