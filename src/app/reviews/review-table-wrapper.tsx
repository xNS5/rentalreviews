"use client"

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/button/button";
import { DataTable } from "@/components/table/data-table";
import { Company } from "./columns";
import { columns } from "./columns";
import Icon from "@/components/icons/icon";

interface Props {
  data: Company[]
}

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
          className={`${visible ? "visible" : "invisible"} rounded mx-1 bg-blue-500 hover:bg-blue-900 h-8 w-auto text-white content-center`}
        >
          <button className="px-1">
            Read
            <Icon type="fas-arrow-right" className="px-1" />
          </button>
        </Link>
      </span>
    )
  }

  return (
    <DataTable columns={columns} data={data} />
  );
}
