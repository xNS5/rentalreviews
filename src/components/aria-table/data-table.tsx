"use client";

import { Table, TableHeader, TableBody, TableHead, Row, Cell, Caption, Column } from "../ui/aria-table";

import Icon from "../icons/icon";
import { Input } from "@/components/ui/input";
import { Company, ColumnType } from "@/app/reviews/columns";
import { Fragment, useMemo, useState } from "react";
import { SortDescriptor, SortDirection } from "react-stately";
import { Button } from "../ui/button";
import { AltRecord } from "@/lib/altprovider";
import Link from "next/link";

const DEFAULT_PAGINATION_VALUE = 10;

export default function DataTable({
  columns,
  data,
  alt,
  tableCaption,
  paginationValue = DEFAULT_PAGINATION_VALUE,
}: Readonly<{
  columns: ColumnType[];
  data: Company[];
  alt: AltRecord;
  tableCaption: string;
  paginationValue?: number;
}>) {
  const rowKeys = ["name", "company_type", "average_rating", "adjusted_average_rating", "review_count"];
  const [currentPage, setCurrentPage] = useState(1);
  const [hoverStates, setHoverStates] = useState<{ [key: string]: boolean }>({});
  const pageCount = Math.ceil(data.length / paginationValue);

  let [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  let sortedItems = useMemo(() => {
    return data.sort((a, b) => {
      let first = a[sortDescriptor.column as keyof Company];
      let second = b[sortDescriptor.column as keyof Company];

      if (typeof first === "number" && typeof second === "number") {
        if (sortDescriptor.direction === "descending") {
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
    if (currentPage === pageCount) {
      return sortedItems.slice((currentPage - 1) * paginationValue);
    }
    return sortedItems.slice((currentPage - 1) * paginationValue, currentPage * paginationValue);
  }, [sortedItems, currentPage, sortDescriptor]);

  const handleMouseEnter = (key: any) => {
    setHoverStates((prev) => ({ ...prev, [key]: true }));
  };

  const handleMouseLeave = (key: any) => {
    setHoverStates((prev) => ({ ...prev, [key]: false }));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setHoverStates({});
  };

  return (
    <div className="relative w-full overflow-auto border-2 border-solid border-slate-500 rounded-lg">
      <Table aria-label={tableCaption} sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor}>
        <TableHeader>
          {columns.map((column, i: number) => (
            <Column
              id={column.key}
              key={i}
              isRowHeader={i === 0}
              sortDescriptor={sortDescriptor}
              allowsSorting
              className={`border-black ${i < columns.length - 1 ? "border-r-1" : ""}`}
            >
              {column.title}
            </Column>
          ))}
        </TableHeader>
        <TableBody>
          {currentPageData.map((item, i: number) => (
            <Row key={i}>
              {rowKeys.map((key: string, j: number) => (
                <Cell key={j} className={`${j < rowKeys.length - 1 ? "border-black border-r-1" : ""}`}>
                  {j == 0 ? (
                    <Link
                      id={`${key}-link`}
                      href={`/reviews/${item.slug}`}
                      className={`flex mx-3 font-medium items-center justify-center`}
                      onMouseEnter={() => handleMouseEnter(item.slug)}
                      onMouseLeave={() => handleMouseLeave(item.slug)}
                    >
                      {`${item[key]}`}
                      <Icon type="fas-link" ariahidden={true} className={`${hoverStates[item.slug] ? "visible" : "invisible"} mx-1 h-4 w-4`} />
                    </Link>
                  ) : (
                    <>{`${item[key]}${key.includes("rating") ? "/5" : ""}`}</>
                  )}
                </Cell>
              ))}
            </Row>
          ))}
        </TableBody>
      </Table>
      <span className="py-2 flex flex-col justify-center text-center">
        <span className="flex flex-row justify-center text-center">
          <Button variant={"ghost"} aria-label="last page" disabled={currentPage === 1} aria-disabled={currentPage === 1} onClick={() => handlePageChange(1)}>
            {"<<"}
          </Button>
          <Button
            variant={"ghost"}
            aria-label="previous page"
            disabled={currentPage === 1}
            aria-disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            {"<"}
          </Button>
          <Button
            variant={"ghost"}
            aria-label="next page"
            disabled={currentPage === pageCount}
            aria-disabled={currentPage === pageCount}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            {">"}
          </Button>
          <Button
            variant={"ghost"}
            aria-label="last page"
            disabled={currentPage === pageCount}
            aria-disabled={currentPage === pageCount}
            onClick={() => handlePageChange(pageCount)}
          >
            {">>"}
          </Button>
        </span>
        <p>
          Page {currentPage} of {pageCount}
        </p>
      </span>
    </div>
  );
}

