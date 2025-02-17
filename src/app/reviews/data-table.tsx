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
import { Input } from "@/components/input/input";
import { cn } from "@/lib/serverUtils";
import { Company, ColumnType } from "@/app/reviews/columns";
import { SortDescriptor } from "react-stately";
import Button from "@/components/button/button";
import Link from "next/link";
import { announce } from "@react-aria/live-announcer";
import { getAltString } from "@/lib/serverUtils";
import {Filter, processFilters} from "@/components/aria-table/filter";
import {SortGroup, processSort} from "@/components/aria-table/sort";
import { compareData } from "@/app/reviews/tableUtils";
import Loading from "@/app/loading";
import { getIsMobileWidth } from "@/lib/clientUtils";
import {useURLParams} from "@/lib/useURLParams";
import {ReviewPage, FilterProps, AltRecord, PrefixPostfix} from "@/lib/types";

const DEFAULT_PAGINATION_VALUE = 10;

export default function DataTable({
  columns,
  data,
  paginationValue = DEFAULT_PAGINATION_VALUE,
  className,
  reviews,
    alt,
    disclaimer
}: Readonly<{
  columns: ColumnType[];
  data: Company;
  className?: string;
  paginationValue?: number;
  reviews: ReviewPage;
  alt: AltRecord,
  disclaimer: string
}>) {

  const { filter_props, sort_props, title } = reviews;
  const altObj = alt["reviews"];

  const { params, setFilterParams, setSortParams } = useURLParams();


  const [tableFilters, setTableFilters] = useState<FilterProps>(processFilters(filter_props, params));
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>(processSort(sort_props, params));

  const [searchTerm, setSearchTerm] = useState<string>(params.name ?? "");
  const [hoverStates, setHoverStates] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMobileWidth, setIsMobileWidth] = useState(getIsMobileWidth());

  // Filters data based on filter component properties
  const filteredData = useMemo(
    () =>
      data.filter((item: Company) =>
        Object.keys(tableFilters).every((key) => {
          if(!tableFilters[key].value) return true;

          return compareData(
              item[key],
              tableFilters[key].value,
              tableFilters[key].comparison,
          )
        }),
      ),
    [params, searchTerm, tableFilters],
  );

  const sortedData = useMemo(
    () =>
      filteredData.sort((a: Company, b: Company) => {
        try {
          const first = a[sortDescriptor.column as string];
          const second = b[sortDescriptor.column as string];

          if (typeof first === "number" && typeof second === "number") {
            return sortDescriptor.direction === "descending"
              ? second - first
              : first - second;
          }
          const cmp = first.localeCompare(second);
          return sortDescriptor.direction === "descending" ? cmp * -1 : cmp;
        } catch (e) {
          console.error("Error sorting column: ", e);
        }
      }),
    [filteredData, sortDescriptor],
  );

  const pageCount = Math.ceil(sortedData.length / paginationValue);

  // Paginates page data based on currPageNumber
  const paginatedPageData = useMemo(() => {
    if (currentPageNumber === pageCount) {
      return sortedData.slice((currentPageNumber - 1) * paginationValue);
    }
    return sortedData.slice(
      (currentPageNumber - 1) * paginationValue,
      currentPageNumber * paginationValue,
    );
  }, [currentPageNumber, sortDescriptor, tableFilters]);

  // Handles mouse enter link
  const handleMouseEnter = (key: string) =>
    setHoverStates((prev) => ({ ...prev, [key]: true }));

  // Handles mouse leave link
  const handleMouseLeave = (key: string) =>
    setHoverStates((prev) => ({ ...prev, [key]: false }));

  const handleFilterChange = (key: string, value: string | number | undefined) => {
    setTableFilters((prev: FilterProps) => ({
      ...prev,
      [key]: {
        ...prev[key],
        value: prev[key]?.value === value ? undefined : value
      },
    }));
  };

  const handleTableSortChange = (newSortObj: SortDescriptor) => {
    setSortDescriptor((prevSortObj: SortDescriptor) => ({
      column: newSortObj.column,
      direction:
          prevSortObj.direction === "ascending" ? "descending" : "ascending",
    }));
  }

  const handleSortComponentChange = (key: string, value: string | number) => {
    setSortDescriptor((prev: SortDescriptor) => ({
      ...prev,
      [key]: value
    })
    )
  }

  // Handles page change, sets current page number and resets the hover state object
  const handlePageChange = (page: number) => {
    setCurrentPageNumber(page);
    setHoverStates({});
  };

  const filterAnnouncementHandler = (filters: FilterProps) => {
      const messageStringArr: string[] = [];
      Object.entries(filters).forEach(
          ([_, val]) => {
            if(val.value !== undefined){
              const { title, style: { alt }, value } = val;
              messageStringArr.push(
                  `${title} ${alt?.prefix ?? ""} ${value} ${alt?.postfix ?? ""}`
                      .trim()
                      .replace(/\s{2,}/g, " "),
              );
            }
          },
      );
      if(messageStringArr.length > 0){
        announce(
            `Filtering table records by ${messageStringArr.join(", ")}`,
            "assertive",
            500,
        );
    } else {
      announce("No filters applied to table records", "assertive", 500);
    }
  };

  const sortAnnouncementHandler = () => {
    const colName: string = (sortDescriptor.column as string).replace(/_/, " ");
    const colDirection: string = (sortDescriptor.direction as string);

    announce(
        `Table sorted on column ${colName} in ${colDirection} order`,
        "assertive",
        500
    );

  }

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
      setFilterParams(tableFilters, () => {
        filterAnnouncementHandler(tableFilters);
        loadingHandler(false);
      });
      setCurrentPageNumber(pageCount > 0 ? 1 : 0);
    }, 500);
    return () => clearTimeout(timeout);
  }, [tableFilters]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSortParams(sortDescriptor, () => {
        sortAnnouncementHandler();
      });
    }, 500);
    return () => clearTimeout(timeout);
  }, [sortDescriptor]);


  return (
    <>
      <h1 className={"text-4xl my-4"}>{title}</h1>
      {disclaimer && <h2 className={"md:text-lg text-base my-2"}>{disclaimer}</h2>}
      <div
          className={cn(
              "relative border-2 border-solid border-slate-500 rounded-lg min-h-[25em]",
          className,
        )}
      >
        <div className="flex flex-col-reverse sm:flex-row flex-nowrap items-center gap-3 justify-end m-1 py-2">
          <div
            className={
              "visible md:hidden flex flex-row items-start sm:flex-row justify-center sm:items-center text-center"
            }
          >
            <SortGroup onSortChangeFn={(key: string, value: string | number) => handleSortComponentChange(key, value)} sortDescriptor={sortDescriptor} sortProps={sort_props}/>
          </div>
          <div
            className={`flex flex-row sm:flex-row space-x-2 justify-center items-center`}
          >
            <label htmlFor="searchBox" className={`text-xl`}>
              Search
            </label>{" "}
            <div className={`flex flex-row`}>
              <Input
                id={"searchBox"}
                value={searchTerm}
                placeholder="Company Name"
                aria-label={`Search by company name`}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleFilterChange("name", searchTerm);
                  }
                }}
                onChange={(e) => {
                  handleFilterChange("name", e.target.value);
                  setSearchTerm(e.target.value);
                }}
              />
              {/* Filter Component */}
              <Filter
                heading={"Filter By"}
                filterState={structuredClone(tableFilters)}
                className={`hidden md:visible`}
                onSelectCallbackFn={(
                  key: string,
                  value: string | number | undefined,
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
            onSortChange={handleTableSortChange}
            className="hidden md:table w-full"
          >
            <TableHeader
              className={`border-t`}
            >
              {columns.map((column, i: number) => (
                <Column
                  id={column.key}
                  textValue={column.title}
                  key={i}
                  isRowHeader={i === 0}
                  sortDescriptor={sortDescriptor}
                  className={`border-black [&:not(:last-child)]:border-r ${i < columns.length - 1 ? "border-r-1" : ""}`}
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
                        textValue={item[column.key]}
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
              disabled={currentPageNumber === 1 || pageCount === 0}
              aria-disabled={currentPageNumber === 1 || pageCount === 0}
              onClick={() => handlePageChange(1)}
            >
              <Icon type={"fas-angles-left"} className={`h-4 w-4`}/>
            </Button>
            <Button
              aria-label="previous page"
              disabled={currentPageNumber === 1 || pageCount === 0}
              aria-disabled={currentPageNumber === 1 || pageCount === 0}
              onClick={() => handlePageChange(currentPageNumber - 1)}
            >
               <Icon type={"fas-angle-left"} className={`h-2 w-2`}/>
            </Button>
            <Button
              aria-label="next page"
              disabled={currentPageNumber === pageCount || pageCount === 0}
              aria-disabled={currentPageNumber === pageCount || pageCount === 0}
              onClick={() => handlePageChange(currentPageNumber + 1)}
            >
               <Icon type={"fas-angle-right"} className={`h-2 w-2`}/>
            </Button>
            <Button
              aria-label="last page"
              disabled={currentPageNumber === pageCount || pageCount === 0}
              aria-disabled={currentPageNumber === pageCount || pageCount === 0}
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
