"use client";

import Link from "next/link";
import { DataTable } from "@/components/table/data-table";
import { Company, columns } from "./columns";
import { AltRecord } from "@/lib/altprovider";
import Icon from "@/components/icons/icon";

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
        className={`flex mx-3 font-medium items-center justify-center`}
      >
        {`${cell.getValue()}`}
        <Icon type="fas-arrow-up-right-from-square" ariahidden={true} className="mx-1 !h-3 w-auto"/>
      </Link>
    );
  };

  for(let i = 1; i < columns.length; i++){
    let column = columns[i];
    column.cell = ({cell, row}) => {
      const altKey = cell.column.id;
      if(alt[altKey] != undefined){
        const {prefix, postfix} = alt[altKey];
        return (
          <span
          aria-label={`${prefix} ${cell.getValue()} ${postfix}`}
          >
            {`${cell.getValue()}`}
          </span>
        )
      }
      return (
        <span>{cell.getValue() as string}</span>
      )
    }
  }
  
  const initialState = {
    sorting: [
      {
        id: 'name',
        desc: false
      },
      {
        id: 'company_type',
        desc: false
      },
      {
        id: 'average_rating',
        desc: false
      },
      {
        id: 'adjusted_average_rating',
        desc: false
      },
      {
        id: 'review_count',
        desc: false
      },
    ]
  }

  return <DataTable columns={columns} data={data} tableCaption={"Rental Reviews Data"} alt={alt} initialState={initialState}/>;
}
