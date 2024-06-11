"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "../components/table/data-table";
import { Company } from "./columns";
import { columns } from "./columns";
import { useRouter } from "next/navigation";
import Icon from "../components/icons/icon";
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

  // Setting custom actions for elements in the cell
  /* ${visible ? "visible" : "invisible"} */

  columns[0].cell = ({ cell, row }) => {
    const [visible, setVisible] = useState(false)
    return (<span
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className={`w-full m-4`}>
      {cell.getValue() as string}
      <Button
        onClick={() => onNameClickHandler({ row, cell })}
        className={`${visible ? "visible bg-blue text-white rounded" : "invisible"}`}
      >
        Open
        <Icon type="fas-link" />
      </Button>
    </span>)
  }

  return (
    <DataTable columns={columns} data={data} /* onRowSelectProps={{ fn: onClickHandler}} */ />
  );
}
