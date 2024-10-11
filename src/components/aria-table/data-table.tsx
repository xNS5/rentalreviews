"use client";

import { Table, TableHeader, TableBody, Row, Cell, Caption, Column } from "../ui/aria-table";

import Icon from "../icons/icon";
import { Input } from "@/components/ui/input";
import { Company, ColumnType } from "@/app/reviews/columns";
import { useMemo, useState } from "react";
import { SortDescriptor } from "react-stately";
import { Button } from "../ui/button";
import { AltRecord } from "@/lib/altprovider";
import Link from "next/link";

const DEFAULT_PAGINATION_VALUE = 10;
export default function DataTable({
  columns,
  data,
  // alt,
  tableCaption,
  paginationValue = DEFAULT_PAGINATION_VALUE,
}: Readonly<{
  columns: ColumnType[];
  data: Company;
  // alt: AltRecord;
  tableCaption: string;
  paginationValue?: number;
}>) {
  const colKeys = ["name", "company_type", "average_rating", "adjusted_average_rating", "review_count"];
  const [currentPageNumber, setcurrentPageNumberNumber] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [hoverStates, setHoverStates] = useState<{ [key: string]: boolean }>({});
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  // Filters data based on searchTerm
  const filteredData = useMemo(() => {
    return data.filter((item: Company) => item["name"].includes(searchTerm));
  }, [searchTerm]);

  // Sorts filteredData if searchTerm is > 0, else uses data
  const sortedData = useMemo(() => {
    let inputData = searchTerm.length > 0 ? filteredData : data;

    return inputData.sort((a: Company, b: Company) => {
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
  }, [sortDescriptor, searchTerm]);

  // Memoizes page count. Might not need to.
  const pageCount = useMemo(() => {
    return Math.ceil(sortedData.length / paginationValue);
  }, [sortedData]);

  // Paginates page data based on currPageNumber
  const paginatedPageData = useMemo(() => {
    if (currentPageNumber === pageCount) {
      return sortedData.slice((currentPageNumber - 1) * paginationValue);
    }
    return sortedData.slice((currentPageNumber - 1) * paginationValue, currentPageNumber * paginationValue);
  }, [searchTerm, currentPageNumber, sortDescriptor, sortedData]);

  // Handles mouse enter link
  const handleMouseEnter = (key: any) => {
    setHoverStates((prev) => ({ ...prev, [key]: true }));
  };

  // Handles mouse leave link
  const handleMouseLeave = (key: any) => {
    setHoverStates((prev) => ({ ...prev, [key]: false }));
  };

  // Handles page change, sets current page number and resets the hover state object
  const handlePageChange = (page: number) => {
    setcurrentPageNumberNumber(page);
    setHoverStates({});
  };

  return (
    <div className="relative overflow-auto border-2 border-solid border-slate-500 rounded-lg">
      <div className="flex flex-row flex-nowrap items-center gap-3 justify-end m-2">
       <label htmlFor="searchBox">Search</label> <Input id={"searchBox"} value={searchTerm} placeholder="Company Name" onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      <div className="relative overflow-auto border-t-1 border-x-0.5 border-solid border-slate-500 rounded-lg">
        <Table aria-label={tableCaption} sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor} className="w-full">
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
                <p>{column.title}</p>
              </Column>
            ))}
          </TableHeader>
          <TableBody>
            {paginatedPageData.map((item: Company, i: number) => (
              <Row key={i}>
                {colKeys.map((key: string, j: number) => (
                  <Cell key={j} className={`${j < colKeys.length - 1 ? "border-black border-r-1" : ""}`}>
                    {j == 0 ? (
                      <Link
                        id={`${item.slug}`}
                        href={`/reviews/${item.slug}`}
                        aria-label={`Link to ${item[key]}`}
                        tabIndex={-1}
                        className={`flex mx-3 font-medium items-center justify-center`}
                        onMouseEnter={() => handleMouseEnter(item.slug)}
                        onMouseLeave={() => handleMouseLeave(item.slug)}
                      >
                        <p className="px-2">{`${item[key]}`}</p>
                        <Icon type="fas-link" ariahidden={true} className={`${hoverStates[item.slug] ? "visible" : "invisible"} mx-1 h-4 w-4`} />
                      </Link>
                    ) : (
                      <p>{`${item[key]}${key.includes("rating") ? "/5" : ""}`}</p>
                    )}
                  </Cell>
                ))}
              </Row>
            ))}
          </TableBody>
        </Table>
        <span className="py-2 flex flex-col justify-center text-center">
          <span className="flex flex-row justify-center text-center">
            <Button variant={"ghost"} aria-label="last page" disabled={currentPageNumber === 1} aria-disabled={currentPageNumber === 1} onClick={() => handlePageChange(1)}>
              {"<<"}
            </Button>
            <Button
              variant={"ghost"}
              aria-label="previous page"
              disabled={currentPageNumber === 1}
              aria-disabled={currentPageNumber === 1}
              onClick={() => handlePageChange(currentPageNumber - 1)}
            >
              {"<"}
            </Button>
            <Button
              variant={"ghost"}
              aria-label="next page"
              disabled={currentPageNumber === pageCount}
              aria-disabled={currentPageNumber === pageCount}
              onClick={() => handlePageChange(currentPageNumber + 1)}
            >
              {">"}
            </Button>
            <Button
              variant={"ghost"}
              aria-label="last page"
              disabled={currentPageNumber === pageCount}
              aria-disabled={currentPageNumber === pageCount}
              onClick={() => handlePageChange(pageCount)}
            >
              {">>"}
            </Button>
          </span>
        <div aria-live="polite" aria-atomic="true">
        <p id="page-announcement">
            Page {currentPageNumber} of {pageCount}
          </p>
        </div>
        </span>
      </div>
    </div>
  );
}

