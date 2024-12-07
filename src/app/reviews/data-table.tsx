"use client";

import {
  Table,
  TableHeader,
  TableBody,
  Row,
  Cell,
  Column,
} from "@/components/aria-table/aria-table";

import React, { useEffect, useMemo, useState, useContext } from "react";
import { Icon } from "@/components/icon/icon";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Company, ColumnType } from "@/app/reviews/columns";
import { SortDescriptor } from "react-stately";
import { Button } from "@/components/button/button";
import Link from "next/link";
import { Select } from "@/components/select/select";
import { announce } from "@react-aria/live-announcer";
import { Config, ConfigContext, getAltString } from "@/lib/configProvider";
import { Filter } from "@/components/filter/filter";
import { useRouter, useSearchParams } from "next/navigation";

const DEFAULT_PAGINATION_VALUE = 10;

function getIsMobileWidth() {
  if (typeof window !== "undefined") {
    return window.innerWidth <= 940;
  }
  return false;
}

function isNumeric(val: any) {
  return !isNaN(val) && !isNaN(parseFloat(val));
}

function compareData(a: any, b: any, type: string) {
  switch (type) {
    case ">":
      return parseFloat(a) > parseFloat(b);
    case ">=":
      return parseFloat(a) >= parseFloat(b);
    case "<":
      return parseFloat(a) < parseFloat(b);
    case "<=":
      return parseFloat(a) <= parseFloat(b);
    case "==":
      return a == b;
    case "===":
      return a === b;
    case "!=":
      return a != b;
    case "!==":
      return a !== b;
    default:
      return false;
  }
}

export default function DataTable({
  columns,
  data,
  paginationValue = DEFAULT_PAGINATION_VALUE,
  className,
}: Readonly<{
  columns: ColumnType[];
  data: Company;
  className?: string;
  paginationValue?: number;
}>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { reviews, alt }: Config = useContext(ConfigContext);
  const { filter_props } = reviews;
  const altObj = alt["reviews"];

  const [currentPageNumber, setCurrentPageNumberNumber] = useState(1);
  const [hoverStates, setHoverStates] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });
  const [isMobileWidth, setIsMobileWidth] = useState(getIsMobileWidth());
  const sortOptions = [
    { key: "ascending", title: "Ascending" },
    { key: "descending", title: "Descending" },
  ];

  const urlQueryProps: { [key: string]: any } = useMemo(
    () =>
      columns.reduce(
        (acc, curr) => ({
          ...acc,
          ...(searchParams.has(curr.key)
            ? {
                [curr.key]: isNumeric(searchParams.get(curr.key))
                  ? parseFloat(`${searchParams.get(curr.key)}`)
                  : searchParams.get(curr.key),
              }
            : undefined),
        }),
        {},
      ),
    [searchParams],
  );

  const [filter, setFilter] = useState<{
    [key: string]: string | number | null;
  }>(Object.keys(urlQueryProps).length > 0 ? urlQueryProps : {});
  const [searchTerm, setSearchTerm] = useState("");

  const hasFilters = () => Object.values(filter).some((f) => f);

  // Filters data based on filter component properties
  const filteredData = useMemo(() => {
    const filterComparisonObj = filter_props.reduce(
      (acc: any, curr: any) => ({ ...acc, [curr.key]: curr.comparison }),
      {},
    );

    // Filter based on filter state
    return data.filter((item: Company) =>
      Object.entries(filter).every(([key, value]) => {
        if (searchTerm.length > 0) {
          return item["name"].includes(searchTerm);
        }
        if (value !== null) {
          const compareDataResult = compareData(
            item[key],
            value,
            filterComparisonObj[key],
          );
          if (!compareDataResult) {
            return false;
          }
        }
        return true;
      }),
    );
  }, [filter]);

  // Sorts filteredData if searchTerm is > 0, else uses data
  const sortedData = useMemo(() => {
    const inputData = hasFilters()
      ? structuredClone(filteredData)
      : structuredClone(data);
    return inputData.sort((a: Company, b: Company) => {
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
    });
  }, [sortDescriptor, searchTerm, filter, data]);

  // Memoizes page count. Might not need to.
  const pageCount = useMemo(() => {
    return Math.ceil(sortedData.length / paginationValue);
  }, [sortedData, searchTerm, paginationValue]);

  // Paginates page data based on currPageNumber
  const paginatedPageData = useMemo(() => {
    if (currentPageNumber === pageCount) {
      return sortedData.slice((currentPageNumber - 1) * paginationValue);
    }
    return sortedData.slice(
      (currentPageNumber - 1) * paginationValue,
      currentPageNumber * paginationValue,
    );
  }, [
    currentPageNumber,
    sortDescriptor,
    pageCount,
    searchTerm,
    paginationValue,
    filter,
  ]);

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

  const handleSortChange = (newSortObj: SortDescriptor) => {
    setSortDescriptor((prevSortObj: SortDescriptor) => ({
      column: newSortObj.column,
      direction:
        prevSortObj.direction === "ascending" ? "descending" : "ascending",
    }));
  };

  // Callback that sets URL query params before executing the state changes
  const handleFilterChange = (key: string, value: string | number | null) => {
    setFilter((prev) => {
      const currQuery = new URLSearchParams(searchParams.toString());

      // Temporarily pausing work on adding search to the url params
      if (key !== "search") {
        if (prev[key] === value) {
          currQuery.delete(key);
        } else {
          currQuery.set(key, `${value}`);
        }
        router.replace(`?${currQuery.toString()}`);
      }

      return {
        ...prev,
        [key]: prev[key] === value ? null : value,
      };
    });
  };

  /*  const handleSearchUrl = (search: string) => {
    const currQuery = new URLSearchParams(searchParams.toString());
    if (currQuery.has("search")) {
      currQuery.delete("search");
    } else {
      currQuery.set("search", `${search}`);
    }
    router.replace(`?${currQuery.toString()}`);
  };*/

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
    const debounce = setTimeout(() => {
      handleFilterChange("search", searchTerm);
    }, 500);
    return () => clearTimeout(debounce);
  }, [searchTerm]);

  return (
    <>
      <h1 className={"md:text-4xl my-4"}>{reviews.description}</h1>
      <h2 className={"md:text-lg my-2"}>{reviews.disclaimer}</h2>
      <div
        className={cn(
          "relative overflow-auto border-2 border-solid border-slate-500 rounded-lg",
          className,
        )}
      >
        <div className="flex flex-col-reverse sm:flex-row flex-nowrap items-center gap-3 justify-end m-2">
          <div
            className={
              "visible md:hidden flex flex-col items-start sm:flex-row justify-center sm:items-center text-center"
            }
          >
            <Select
              label={"Sort Column"}
              data={columns}
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
            className={`flex flex-row space-x-2 justify-center items-center`}
            tabIndex={-1}
          >
            <label htmlFor="searchBox">Search</label>{" "}
            <Input
              id={"searchBox"}
              value={structuredClone(searchTerm)}
              placeholder="Company Name"
              onChange={(e) => {
                setSearchTerm(e.target.value)
              }}
            />
            {/* Filter Component */}
            <Filter
              filter={structuredClone(filter)}
              filterProps={structuredClone(filter_props)}
              onSelectCallbackFn={(
                key: string,
                value: string | number | null,
              ) => handleFilterChange(key, value)}
            />
          </div>
        </div>
        <div className="flex flex-col relative overflow-auto border-y-1 border-x-0.5 border-solid border-slate-500 rounded">
          {/* Full-screen data view */}
          <Table
            aria-label={reviews.description}
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
          <span className="py-2 flex flex-col justify-center text-center">
            <span className="flex flex-row justify-center text-center space-x-1">
              <Button
                variant={"ghost"}
                aria-label="last page"
                disabled={currentPageNumber === 1}
                aria-disabled={currentPageNumber === 1}
                onClick={() => handlePageChange(1)}
              >
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
    </>
  );
}
