"use client";

import {
  Table,
  TableHeader,
  TableBody,
  Row,
  Cell,
  Column,
} from "@/components/aria-table/aria-table";

import React, { useEffect, useMemo, useState } from "react";
import Icon from "@/components/icon/icon";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Company, ColumnType } from "@/app/reviews/columns";
import { SortDescriptor } from "react-stately";
import Button from "@/components/button/button";
import Link from "next/link";
import Select from "@/components/select/select";
import { announce } from "@react-aria/live-announcer";
import { getAltString } from "@/lib/configProvider";
import { Filter } from "@/components/filter/filter";

import { useFilters } from "@/components/filter/useFilters";
import { compareData } from "@/app/reviews/tableUtils";
import Loading from "@/app/loading";
import { getIsMobileWidth } from "@/lib/clientUtils";

const DEFAULT_PAGINATION_VALUE = 10;

export default function DataTable({
  columns,
  data,
  paginationValue = DEFAULT_PAGINATION_VALUE,
  className,
  ...props
}: Readonly<{
  columns: ColumnType[];
  data: Company;
  className?: string;
  paginationValue?: number;
  [key: string]: any;
}>) {const { filter_props, title } = props.reviews;
  const altObj = props.alt["reviews"];

  const { filter, setFilters } = useFilters();

  const [tableFilters, setTableFilters] = useState(filter);
  const [searchTerm, setSearchTerm] = useState(filter.name ?? "");
  const [hoverStates, setHoverStates] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [currentPageNumber, setCurrentPageNumberNumber] = useState(1)
  const [isLoading, setIsLoading] = useState(false);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });
  const [isMobileWidth, setIsMobileWidth] = useState(getIsMobileWidth());

  const sortOptions = [
    { key: "ascending", title: "Ascending" },
    { key: "descending", title: "Descending" },
  ];

  // Maps name to comparison string (e.g. ">", ">=", "==", etc.)
  const filterComparisonObj = useMemo(
    () =>
      filter_props.reduce(
        (acc: any, curr: any) => ({
          ...acc,
          [curr.key]: {
            comparison: curr.comparison,
            title: curr.title,
            ...(curr.style ? { alt: curr.style.alt } : undefined),
          },
        }),
        {},
      ),
    [],
  );

  // Filters data based on filter component properties
  const filteredData = useMemo(
    () =>
      data.filter((item: Company) =>
        Object.entries(tableFilters).every(([key, value]) => {
          if (value !== null) {
            const compareDataResult = compareData(
              item[key],
              value,
              filterComparisonObj[key].comparison,
            );
            if (!compareDataResult) {
              return false;
            }
          }
          return true;
        }),
      ),
    [filter, tableFilters],
  );

  const sortedData = useMemo(
    () =>
      filteredData.sort((a: Company, b: Company) => {
        try {
          let first = a[sortDescriptor.column as string];
          let second = b[sortDescriptor.column as string];

          if (typeof first === "number" && typeof second === "number") {
            return sortDescriptor.direction === "descending"
              ? second - first
              : first - second;
          }
          let cmp = first.localeCompare(second);
          return sortDescriptor.direction === "descending" ? cmp * -1 : cmp;
        } catch (e) {
          console.error("Error sorting column: ", e);
        }
      }),
    [sortDescriptor, searchTerm, filter],
  );

  // Memoizes page count
  const pageCount = useMemo(
    () => Math.ceil(sortedData.length / paginationValue),
    [filter],
  );



  // Paginates page data based on currPageNumber
  const paginatedPageData = useMemo(() => {
    if (currentPageNumber === pageCount) {
      return sortedData.slice((currentPageNumber - 1) * paginationValue);
    }
    return sortedData.slice(
      (currentPageNumber - 1) * paginationValue,
      currentPageNumber * paginationValue,
    );
  }, [pageCount, sortedData, sortDescriptor, tableFilters, currentPageNumber]);

  // Handles mouse enter link
  const handleMouseEnter = (key: any) =>
    setHoverStates((prev) => ({ ...prev, [key]: true }));

  // Handles mouse leave link
  const handleMouseLeave = (key: any) =>
    setHoverStates((prev) => ({ ...prev, [key]: false }));

  const handleSortChange = (newSortObj: SortDescriptor) =>
    setSortDescriptor((prevSortObj: SortDescriptor) => ({
      column: newSortObj.column,
      direction:
        prevSortObj.direction === "ascending" ? "descending" : "ascending",
    }));

  const handleFilterChange = (key: string, value: any) => {
    setTableFilters((prev) => {
      const newFilters: { [key: string]: any } = {
        ...prev,
        [key]: prev[key] === value ? null : value,
      };
      return newFilters;
    });
    handlePageChange(1);
  };

  // Handles page change, sets current page number and resets the hover state object
  const handlePageChange = (page: number) => {
    setCurrentPageNumberNumber(page);
    setHoverStates({});
  };

  const validateActiveFilters = (filters: any) => {
    let hasActiveFilters = false;

    const validFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]: [_: any, value: any]) => {
          if (value) {
            hasActiveFilters = true;
            return true;
          }
          return false;
        }),
    );

    if (hasActiveFilters) {
      let messageStringArr: string[] = [];
      Object.entries(validFilters).forEach(
          ([key, value]: [key: any, value: any]) => {
            if (
                filterComparisonObj.hasOwnProperty(key) &&
                filterComparisonObj[key].hasOwnProperty("alt")
            ) {
              const filterObj = filterComparisonObj[key];
              const { title, alt } = filterObj;
              messageStringArr.push(
                  `${title} ${alt.prefix} ${value} ${alt.postfix}`
                      .trim()
                      .replace(/\s{2,}/g, " "),
              );
            }
          },
      );
      announce(
          `Filtering table records by ${messageStringArr.join(", ")}`,
          "assertive",
          500,
      );
    } else {
      announce("No filters applied to table records", "assertive", 500);
    }
  };

  // Announces when page is loading data and when the loading has finished
  const loadingHandler = (state: boolean) => {
    if(state){
      announce("Loading data", "assertive", 500);
    } else {
      announce("Finished loading data", "assertive", 500);
    }
    setIsLoading(state);
  };

  useEffect(() => {
    function announceHandler() {
      if (isMobileWidth) {
        announce(
          "Main content contains a heading and a list of links",
          "assertive",
          500,
        );
      } else {
        announce(
          "Main content contains a heading and a data table",
          "assertive",
          500,
        );
      }
    }

    function handleResize() {
      const isWindowMobileWidth = getIsMobileWidth();
      if (isWindowMobileWidth != isMobileWidth) {
        setIsMobileWidth(isWindowMobileWidth);
        announceHandler();
      }
    }

    // To make the layout announcement on first load
    announceHandler();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    loadingHandler(true);
    const timeout = setTimeout(() => {
      setFilters(tableFilters, () => {
        validateActiveFilters(tableFilters);
        loadingHandler(false);
      });
    }, 500);
    return () => clearTimeout(timeout);
  }, [tableFilters]);

  return (
    <>
      <h1 className={"md:text-4xl text-xl my-4"}>{title}</h1>
      {props.disclaimer && <h2 className={"md:text-lg text-base my-2"}>{props.disclaimer}</h2>}
      <div
          className={cn(
              "relative border-2 border-solid border-slate-500 rounded-lg min-h-[25em]",
          className,
        )}
      >
        <div className="flex flex-col-reverse sm:flex-row flex-nowrap items-center gap-3 justify-end m-1">
          <div
            className={
              "visible md:hidden flex flex-row items-start sm:flex-row justify-center sm:items-center text-center"
            }
          >
            <Select
              label={"Sort Column"}
              data={columns}
              className={`text-base md:text-xl`}
              onSelectionChange={(val: string) =>
                setSortDescriptor(
                  (prev) => ({ ...prev, column: val }) as SortDescriptor,
                )
              }
              selectedKey={sortDescriptor.column}
              defaultSelectedKey={sortDescriptor.column}
              arialabel={"column name dropdown"}
            />
            <Select
              label={"Sort Direction"}
              data={sortOptions}
              className={`text-base md:text-xl`}
              onSelectionChange={(val: string) =>
                setSortDescriptor(
                  (prev: SortDescriptor) =>
                    ({ ...prev, direction: val }) as SortDescriptor,
                )
              }
              selectedKey={sortDescriptor.direction}
              defaultSelectedKey={sortDescriptor.direction}
              arialabel={"sort direction dropdown"}
            />
          </div>
          <div
            className={`flex flex-col sm:flex-row space-x-2 justify-center items-center`}
          >
            <label htmlFor="searchBox" className={`invisible md:hidden`}>
              Search
            </label>{" "}
            <div className={`flex flex-row`}>
              <Input
                id={"searchBox"}
                value={searchTerm}
                placeholder="Company Name"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && tableFilters?.name.length > 0) {
                    handleFilterChange("name", searchTerm);
                  }
                }}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  handleFilterChange("name", e.target.value);
                }}
              />
              {/* Filter Component */}
              <Filter
                heading={"Filter By"}
                filter={structuredClone(tableFilters)}
                filterProps={structuredClone(filter_props)}
                className={`hidden md:visible`}
                onSelectCallbackFn={(
                  key: string,
                  value: string | number | null,
                ) => handleFilterChange(key, value)}
              />
              <Loading
                className={`${isLoading ? "visible" : "invisible"} !min-h-1`}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col relative border-y-1 border-x-0.5 border-solid border-slate-500 rounded flex-shrink-2">
          {/* Full-screen data view */}
          <Table
            aria-label={title}
            sortDescriptor={sortDescriptor}
            onSortChange={handleSortChange}
            className="hidden md:table w-full"
          >
            <TableHeader>
              {columns.map((column, i: number) => (
                <Column
                  id={column.key}
                  textValue={column.title}
                  key={i}
                  isRowHeader={i === 0}
                  sortDescriptor={sortDescriptor}
                  className={`border-black ${i < columns.length - 1 ? "border-r-1" : ""}`}
                  allowsSorting
                >
                  <p>{column.title}</p>
                </Column>
              ))}
            </TableHeader>
            <TableBody>
              {paginatedPageData.map((item: Company, i: number) => (
                <Row key={i}>
                  {columns.map(
                    (column: { key: string; title: string }, j: number) => (
                      <Cell
                        key={j}
                        className={`${j < columns.length - 1 ? "border-black border-r-1" : ""}`}
                        value={item[column.key]}
                      >
                        {j == 0 ? (
                          <Link
                            id={`${item.slug}`}
                            href={`/reviews/${item.slug}`}
                            aria-label={`Link to ${item[column.key]}`}
                            className={`flex mx-3 font-medium items-center justify-center`}
                            onMouseEnter={() => handleMouseEnter(item.slug)}
                            onMouseLeave={() => handleMouseLeave(item.slug)}
                          >
                            <p className="px-2">{`${item[column.key]}`}</p>
                            <Icon
                              type="fas-link"
                              className={`${hoverStates[item.slug] ? "visible" : "invisible"} mx-1 h-4 w-4`}
                            />
                          </Link>
                        ) : (
                          <>
                            {altObj[column.key] !== undefined && (
                              <label className={"sr-only"}>
                                {getAltString(
                                  altObj,
                                  column.key,
                                  item[column.key],
                                )}
                              </label>
                            )}
                            <p
                              aria-hidden={altObj[column.key] !== undefined}
                            >{`${item[column.key]}${column.key.includes("rating") ? "/5" : ""}`}</p>
                          </>
                        )}
                      </Cell>
                    ),
                  )}
                </Row>
              ))}
            </TableBody>
          </Table>

          {/* Mobile/Compact data view */}
          <ol
            className={
              "visible md:hidden justify-center items-center px-10 space-y-2 py-5 bg-slate-200 border border-slate-500 rounded"
            }
          >
            {paginatedPageData.map((item: Company, i: number) => (
              <li
                key={i}
                className={`flex flex-col text-start flex-1 bg-white border border-slate-500 rounded-lg p-5 my-1 shadow hover:shadow-xl hover:border-black`}
                onMouseEnter={() => handleMouseEnter(item.slug)}
                onMouseLeave={() => handleMouseLeave(item.slug)}
              >
                <Link
                  id={`${item.slug}`}
                  href={`/reviews/${item.slug}`}
                  aria-label={`Link to ${item.name} review page. Company Type ${item.company_type}. Average Rating ${item.average_rating} out of 5. Adjusted average rating ${item.adjusted_average_rating} out of 5. Review Count ${item.review_count}.`}
                  className={`text-start font-medium items-center justify-center hover:!no-underline`}
                >
                  <h2 className={"text-2xl underline"}>
                    <b>{item.name}</b>
                    <Icon
                      type="fas-link"
                      className={`${hoverStates[item.slug] ? "visible" : "invisible"} m-1 h-5 w-5`}
                    />
                  </h2>

                  <p>
                    <b>Company Type</b>: {item.company_type}
                  </p>
                  <p>
                    <b>Average Rating</b>: {item.average_rating}/5
                  </p>
                  <p>
                    <b>Adjusted Average Rating</b>:{" "}
                    {item.adjusted_average_rating}
                    /5
                  </p>
                  <p>
                    <b>Review Count</b>: {item.review_count}
                  </p>
                </Link>
              </li>
            ))}
          </ol>
        </div>
        <span className="flex flex-col justify-center text-center items-center py-2">
          <span className="flex flex-row justify-center text-center space-x-1">
            <Button
              variant={"ghost"}
              aria-label="last page"
              disabled={currentPageNumber === 1}
              aria-disabled={currentPageNumber === 1}
              onClick={() => handlePageChange(1)}
            >
              <Icon type={"fas-angles-left"} className={`h-4 w-4`}/>
            </Button>
            <Button
              variant={"ghost"}
              aria-label="previous page"
              disabled={currentPageNumber === 1}
              aria-disabled={currentPageNumber === 1}
              onClick={() => handlePageChange(currentPageNumber - 1)}
            >
               <Icon type={"fas-angle-left"} className={`h-2 w-2`}/>
            </Button>
            <Button
              variant={"ghost"}
              aria-label="next page"
              disabled={currentPageNumber === pageCount}
              aria-disabled={currentPageNumber === pageCount}
              onClick={() => handlePageChange(currentPageNumber + 1)}
            >
               <Icon type={"fas-angle-right"} className={`h-2 w-2`}/>
            </Button>
            <Button
              variant={"ghost"}
              aria-label="last page"
              disabled={currentPageNumber === pageCount}
              aria-disabled={currentPageNumber === pageCount}
              onClick={() => handlePageChange(pageCount)}
            >
               <Icon type={"fas-angles-right"} className={`h-4 w-4`}/>
            </Button>
          </span>
          <div aria-live="polite" aria-atomic="true">
            <p id="page-announcement">
              Page {currentPageNumber} of {pageCount}
            </p>
          </div>
        </span>
      </div>
    </>
  );
}
