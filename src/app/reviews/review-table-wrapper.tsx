"use client";

import Link from "next/link";
import { DataTable } from "@/components/table/data-table";
import { Company, columns } from "./columns";
import { Alt } from "@/lib/alttype";

export function ReviewsTableWrapper({
  data,
  alt,
}: Readonly<{
  data: Company[];
  alt: Alt | undefined;
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
    );
  };
  const initialState = {
    "sorting": [
      {
        "id": 'asc',
        "desc": false
      },
      {
        "id": 'desc',
        "desc": true
      }
    ]
  }

  return <DataTable columns={columns} data={data} tableCaption={"Rental Reviews Data"} alt={alt ?? undefined} initialState={initialState}/>;
}
