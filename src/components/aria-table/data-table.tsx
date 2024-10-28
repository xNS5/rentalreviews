"use client";

import { Table, TableHead, TableBody, Row, Cell, Caption, Column } from "../ui/aria-table";

import Icon from "../icons/icon";
import { Input } from "@/components/ui/input";
import {cn} from "../../lib/utils";
import { Company, ColumnType } from "@/app/reviews/columns";
import { useMemo, useState } from "react";
import { SortDescriptor } from "react-stately";
import { Button } from "../button/button";
import Link from "next/link";

const DEFAULT_PAGINATION_VALUE = 10;
export default function DataTable({
  columns,
  data,
  tableCaption,
  paginationValue = DEFAULT_PAGINATION_VALUE, className,
}: Readonly<{
  columns: ColumnType[];
  data: Company;
  tableCaption: string;
  className?: string;
  paginationValue?: number;
}>) {
  const colKeys = ["name", "company_type", "average_rating", "adjusted_average_rating", "review_count"];
  const [currentPageNumber, setCurrentPageNumberNumber] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [hoverStates, setHoverStates] = useState<{ [key: string]: boolean }>({});
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  // Filters data based on searchTerm
  const filteredData = useMemo(() => {
    return data.filter((item: Company) => item["name"].includes(searchTerm));
  }, [searchTerm, data]);

  // Sorts filteredData if searchTerm is > 0, else uses data
  const sortedData = useMemo(() => {
    let inputData = searchTerm.length > 0 ? filteredData : data;

    return inputData.sort((a: Company, b: Company) => {
      let first: any = a[sortDescriptor.column as keyof Company]
      let second: any = b[sortDescriptor.column as keyof Company];

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
  }, [sortDescriptor, searchTerm, filteredData, data]);

  // Memoizes page count. Might not need to.
  const pageCount = useMemo(() => {
    return Math.ceil(sortedData.length / paginationValue);
  }, [sortedData, paginationValue]);

  // Paginates page data based on currPageNumber
  const paginatedPageData = useMemo(() => {
    if (currentPageNumber === pageCount) {
      return sortedData.slice((currentPageNumber - 1) * paginationValue);
    }
    return sortedData.slice((currentPageNumber - 1) * paginationValue, currentPageNumber * paginationValue);
  }, [currentPageNumber, sortDescriptor, sortedData, pageCount, paginationValue]);

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
    setCurrentPageNumberNumber(page);
    setHoverStates({});
  };

  return (
    <div className={cn("relative overflow-auto border-2 border-solid border-slate-500 rounded-lg", className)}>
      <div className="flex flex-row flex-nowrap items-center gap-3 justify-end m-2">
       <label htmlFor="searchBox">Search</label> <Input id={"searchBox"} value={searchTerm} placeholder="Company Name" onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      <div className="flex flex-col relative overflow-auto border-t-1 border-x-0.5 border-solid border-slate-500">
        <Table aria-label={tableCaption} sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor}
               className="hidden md:table w-full">
          <TableHead>
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
          </TableHead>
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
                              <Icon type="fas-link" ariahidden={true}
                                    className={`${hoverStates[item.slug] ? "visible" : "invisible"} mx-1 h-4 w-4`}/>
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
        <ol
            className={"visible md:hidden justify-center items-center px-10 space-y-3 py-5"}
        >
          {paginatedPageData.map((item: Company, i: number) => (
              <li
                  key={i}
                  className={`flex flex-col text-start flex-1 bg-white border border-black rounded-lg p-5 my-1 shadow-lg`}
                  onMouseEnter={() => handleMouseEnter(item.slug)}
                  onMouseLeave={() => handleMouseLeave(item.slug)}
              >
                <Link
                    id={`${item.slug}`}
                    href={`/reviews/${item.slug}`}
                    aria-label={`Link to ${item.name} data page`}
                    tabIndex={-1}
                    className={`text-start font-medium items-center justify-center hover:!no-underline`}
                >
                <span className={`flex flex-row`}>
                  <h2 className={"text-2xl underline"}>{item.name}</h2>
                  <Icon
                      type="fas-arrow-right"
                      ariahidden={true}
                      className={`${hoverStates[item.slug] ? "visible" : "invisible"} mx-1 h-4 w-4`}
                  />
                </span>
                  <p>
                    <b>Company Type</b>: {item.company_type}
                  </p>
                  <p>
                    <b>Average Rating</b>: {item.average_rating}/5
                  </p>
                  <p>
                    <b>Adjusted Average Rating</b>: {item.adjusted_average_rating}
                    /5
                  </p>
                  <p>
                    <b>Review Count</b>: {item.review_count}
                  </p>
                </Link>
              </li>
          ))}
        </ol>
        <span className="py-2 flex flex-col justify-center text-center">
          <span className="flex flex-row justify-center text-center space-x-1">
            <Button variant={"ghost"} aria-label="last page" disabled={currentPageNumber === 1}
                    aria-disabled={currentPageNumber === 1} onClick={() => handlePageChange(1)}>
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

