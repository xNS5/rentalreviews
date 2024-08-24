"use client"

import Link from "next/link";
import { DataTable } from "@/components/table/data-table";
import { Company, columns } from "./columns";

export function ReviewsTableWrapper({ data }: Readonly<{
  data: Company[]
}>) {

  columns[0].cell = ({ cell, row }) => {
    return (
      <Link
      href={`/reviews/${row.original.slug}`}
      className={`mx-3`}
      tabIndex={0}
    >
        {cell.getValue() as string}
    </Link>
    )
  }


  return (
    <DataTable columns={columns} data={data} tableCaption={"Rental Reviews Data"}/>
  );
}
