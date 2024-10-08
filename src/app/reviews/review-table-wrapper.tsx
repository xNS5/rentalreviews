"use client";

import Link from "next/link";
import { DataTable } from "@/components/table/data-table";
import { Company, columns } from "./columns";
import { AltRecord } from "@/lib/altprovider";
import Icon from "@/components/icons/icon";
import { useState } from "react";

export function ReviewsTableWrapper({
  data,
  alt,
}: Readonly<{
  data: Company[];
  alt: AltRecord;
}>) {
  columns[0].cell = ({ cell, row }) => {
    const [isHover, setIsHover] = useState(false);
    const cellValue: string = cell.getValue() as string;
    return (
      <Link
        id={cell.id}
        href={`/reviews/${row.original.slug}`}
        className={`flex mx-3 font-medium items-center justify-center`}
        onMouseEnter={() => setIsHover((prev) => !prev)}
        onMouseLeave={() => setIsHover((prev) => !prev)}
      >
        {`${cellValue}`}
        <Icon type="fas-link" ariahidden={true} className={`${isHover ? "visible" : "invisible"} mx-1 h-4 w-4`} />
      </Link>
    );
  };

  for (let i = 1; i < columns.length; i++) {
    let column = columns[i];
    column.cell = ({ cell, row }) => {
      const altKey = cell.column.id;
      let ret: React.ReactNode;
      if (alt[altKey] != undefined) {
        const { prefix, postfix } = alt[altKey];
        const aria_label_string = `${prefix} ${cell.getValue()} ${postfix}`;
        ret = <p id={cell.id}>{`${cell.getValue()}${["average_rating", "adjusted_average_rating"].includes(altKey) ? "/5" : ""}`}</p>;
      } else {
        ret = <p id={cell.id}>{cell.getValue() as string}</p>;
      }
      return ret;
    };
  }

  const initialState = {
    sorting: [
      {
        id: "name",
        desc: false,
      },
    ],
  };
  

  return <DataTable columns={columns} data={data} tableCaption={"Rental Reviews Data"} alt={alt} initialState={initialState} />;
}

