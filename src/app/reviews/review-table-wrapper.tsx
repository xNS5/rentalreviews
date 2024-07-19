"use client"

import Link from "next/link";
import { useState } from "react";
import { DataTable } from "@/components/table/data-table";
import { Company } from "./columns";
import { columns } from "./columns";
import Icon from "@/components/icons/icon";

interface Props {
  data: Company[]
}
// ${visible ? "visible" : "invisible"} 
export function ReviewsTableWrapper({ data }: Props) {

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
          className={`${visible ? "visible" : "invisible"} rounded mx-1 bg-blue-500 hover:bg-blue-900 text-white`}
        >
          <button className="px-1 mx-1 flex items-center justify-center ">
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
