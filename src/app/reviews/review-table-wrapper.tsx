"use client"

import { DataTable } from "../components/table/data-table";
import { Company } from "./columns";
import { columns } from "./columns";
import { useRouter } from "next/navigation";

interface Props {
  data: Company[]
}

export function ReviewsTableWrapper({ data }: Props) {
  const router = useRouter();


  const onClickHandler = (row: any) => {
    const { slug } = row.original;
    router.push(`/reviews/${slug}`);
  }

  const onClickProps = {
    url: "",
    slugProp: "slug",
    target: "_blank",
    fn: onClickHandler
  }

  return (
    <DataTable columns={columns} data={data} onRowSelectProps={onClickProps} />
  );
}
