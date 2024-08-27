"use client";

import Link from "next/link";
import { DataTable } from "@/components/table/data-table";
import { Company, columns } from "./columns";
import { AltRecord } from "@/lib/altprovider";

export function ReviewsTableWrapper({
  data,
  alt
}: Readonly<{
  data: Company[];
  alt: AltRecord;
}>) {
  columns[0].cell = ({ cell, row }) => {
    return (
      <Link
        href={`/reviews/${row.original.slug}`}
        className={`mx-3`}
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

  return <DataTable columns={columns} data={data} tableCaption={"Rental Reviews Data"} alt={alt} initialState={initialState}/>;
}
