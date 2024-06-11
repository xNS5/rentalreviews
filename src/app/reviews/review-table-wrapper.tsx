"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "../components/table/data-table";
import { Company } from "./columns";
import { columns } from "./columns";
import { useRouter } from "next/navigation";
import Icon from "../components/icons/icon";
import styles from "./revew-table.module.css"

interface Props {
  data: Company[]
}

export function ReviewsTableWrapper({ data }: Props) {
  const router = useRouter();

  const onCopyHandler = ({row, cell}: any) => {
    console.log(cell.getValue())
  }

  const onNameClickHandler = ({row, cell}: any) => {
    const { slug } = row.original;
      router.push(`/reviews/${slug}`);
  }

  // Setting custom actions for elements in the cell

  columns[0].cell = ({cell, row}) => {
    const [visible, setVisible] = useState(false)
    return (<Button 
      onMouseEnter={() => setVisible(true)} 
      onMouseOut={() => setVisible(false)} 
      onClick={() => onNameClickHandler({row, cell})}
      className={styles.name_cell}>
        {cell.getValue() as string}
        <Icon type="fas-link" className={`${visible ? "visible": "invisible"} mx-1`} />
        </Button>)
  }

  for(let i = 1; i < columns.length; i++){
    columns[i].cell = ({cell, row}) => {
      const [visible, setVisible] = useState(false)
      return (<Button 
        onMouseEnter={() => setVisible(true)} 
        onMouseOut={() => setVisible(false)} 
        onClick={() => onCopyHandler({row, cell})}
        className={`${styles.copy_cell} ${styles.table_button}`}>
          {cell.getValue() as string}
          <Icon type="fas-copy" className={`${visible ? "visible": "invisible"} mx-1`} />
          </Button>)
    }
  
  }

  return (
    <DataTable columns={columns} data={data} /* onRowSelectProps={{ fn: onClickHandler}} */ />
  );
}
