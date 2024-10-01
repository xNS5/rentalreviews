"use client";

import { Table, TableHeader, TableBody, TableHead, Row, Cell, Caption, Column } from "../ui/aria-table";

import Icon from "../icons/icon";
import { Input } from "@/components/ui/input";
import { Company, ColumnType } from "@/app/reviews/columns";
import { useMemo, useState } from "react";
import { SortDescriptor } from "react-stately";
import { Button } from "../ui/button";

const DEFAULT_PAGINATION_VALUE = 10;

export default function DataTable({
  columns,
  data,
  tableCaption,
  paginationValue = DEFAULT_PAGINATION_VALUE,
}: Readonly<{
  columns: ColumnType[];
  data: Company[];
  tableCaption: string;
  paginationValue?: number;
}>) {
  if (!data) return;

  const rowKeys = ["name", "company_type", "average_rating", "adjusted_average_rating", "review_count"];
  const [currentPage, setCurrentPage] = useState(1);

  let [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  let sortedItems = useMemo(() => {
    return data.sort((a, b) => {
      let first = a[sortDescriptor.column as keyof Company];
      let second = b[sortDescriptor.column as keyof Company];

      if (typeof first === "number" && typeof second === "number") {
        if(sortDescriptor.direction === "descending"){
          return second - first;
        } 
        return first - second;
      }
      let cmp = first.localeCompare(second);
      if (sortDescriptor.direction === "descending") {
        cmp *= -1;
      }
      return cmp;
    });
  }, [sortDescriptor]);
  
  const currentPageData = useMemo(() => {
    return sortedItems.slice(
      (currentPage - 1) * paginationValue,
      currentPage * paginationValue
    )
  }, [sortedItems, currentPage]) 



  

  return (
    <div className="relative w-full overflow-auto border-2 border-solid border-slate-500 rounded-lg">
      <Table aria-label={tableCaption} sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor}>
        <TableHeader>
          {columns.map((column, i: number) => (
            <Column id={column.key} key={i} {...(i === 0 ? { isRowHeader: true } : undefined)} sortDescriptor={sortDescriptor} allowsSorting className={`border-black ${i < columns.length - 1 ? "border-r-1" : ""}`}>
              {column.title}
            </Column>
          ))}
        </TableHeader>
        <TableBody>
          {currentPageData.map((item, i: number) => (
            <Row key={i}>
              {rowKeys.map((key: string, j: number) => (
                <Cell key={j} className={`${j < rowKeys.length - 1 ? "border-black border-r-1" : ""}`}>{`${item[key]}${
                  key.includes("rating") ? "/5" : ""
                }`}</Cell>
              ))}
            </Row>
          ))}
        </TableBody>
      </Table>
      <span className="py-2 flex flex-col justify-center text-center">
        <span className="flex flex-row justify-center text-center">
        <Button variant={"ghost"}>
          {"<<"}
        </Button>
        <Button variant={"ghost"}>
          {"<"}
        </Button>
        <Button variant={"ghost"}>
          {">"}
        </Button>
        <Button variant={"ghost"}>
          {">>"}
        </Button>
        </span>
        <p>Page {currentPage} of {Math.ceil(sortedItems.length / paginationValue)}</p>
      </span>
    </div>
  );
}

