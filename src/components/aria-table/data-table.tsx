"use client";

import { Table, TableHeader, TableBody, TableHead, Row, Cell, Caption, Column } from "../ui/aria-table";

import Icon from "../icons/icon";
import { Input } from "@/components/ui/input";
import { Company, ColumnType } from "@/app/reviews/columns";
import { useMemo, useState } from "react";
import { SortDescriptor } from "react-stately";

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

  if(!data) return;

  let [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  let sortedItems = useMemo(() => {
    return data.sort((a, b) => {
      let first = a[sortDescriptor.column as string];
      let second = b[sortDescriptor.column as string];
      let cmp = first.localeCompare(second);
      if (sortDescriptor.direction === "descending") {
        cmp *= -1;
      }
      return cmp;
    });
  }, [sortDescriptor]);

  const rowKeys = ["name", "company_type", "average_rating", "adjusted_average_rating", "review_count"];

  return (
    <div className="relative w-full overflow-auto border border-solid border-slate-500 rounded-lg">
      <Table aria-label={tableCaption} sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor}>
        <TableHeader>
          <Row>
            {columns.map((column, i: number) => (
              <Column id={column.key} key={i} {...(i === 0 ? { isRowHeader: true} : undefined)} sortDescriptor={sortDescriptor} allowsSorting>
                {column.title}
              </Column>
            ))}
          </Row>
        </TableHeader>
        <TableBody>
          {sortedItems.map((item, i: number) => (
            <Row key={i}>
              {rowKeys.map((key: string, j : number) => (
                <Cell key={j}>{item[key]}</Cell>
              ))}
            </Row>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

