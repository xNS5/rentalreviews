"use client"

import Link from "next/link";
import { createContext, useContext, useState } from "react";
import { DataTable } from "@/components/table/data-table";
import { Company, columns } from "./columns";
import Icon from "@/components/icons/icon";

export function ReviewsTableWrapper({ data }: Readonly<{
  data: Company[]
}>) {
  columns[0].cell = ({ cell, row }) => {
    const [visible, setVisible] = useState(false)
   
    return (
      <span
        className={`flex h-max items-center`}
        onMouseOver={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        {cell.getValue() as string}
          <Link
            href={`/reviews/${row.original.slug}`}
            className={`${visible ? "visible" : "invisible"} rounded bg-blue-500 mx-3`}
          >
            <button className="px-2 flex items-center justify-center ">
              Read
              <Icon type="fas-arrow-right" className={` px-2 h-4 w-4 color-black`} />
            </button>
          </Link>
      </span>
    )
  }

  return (
    <DataTable columns={columns} data={data} />
  );
}
