"use client"

import { useState } from "react";
import { Button } from "@/components/button/button";
import { DataTable } from "@/components/table/data-table";
import { Company } from "./columns";
import { columns } from "./columns";
import { useRouter } from "next/navigation";
import Icon from "@/components/icons/icon";
import styles from "./review-table.module.css"

interface Props {
  data: Company[]
}

export function ReviewsTableWrapper({ data }: Props) {
  const router = useRouter();

  const onNameClickHandler = ({ row, cell }: any) => {
    const { slug } = row.original;
    router.push(`/reviews/${slug}`);
  }

  columns[0].cell = ({ cell, row }) => {
    const [visible, setVisible] = useState(false)
    return (
        <span
        className={`flex h-max w-full`}
        onMouseOver={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        >
          {cell.getValue() as string}
          <Button
            onClickFn={() => onNameClickHandler({ row, cell })}
            className={`${visible ? "visible" : "invisible"} rounded mx-1`}
          >
            Open
            <Icon type="fas-link" />
          </Button>
        </span>
    )
  }

  return (
    <DataTable columns={columns} data={data}/>
  );
}
