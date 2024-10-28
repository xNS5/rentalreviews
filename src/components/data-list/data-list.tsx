"use client"

import {Fragment, useMemo, useState} from "react";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import {cn} from "../../lib/utils";
import {Company} from "@/app/reviews/columns";
import {Button} from "@/components/button/button";

const DEFAULT_PAGINATION_VALUE = 10;

export default function DataList({data, className, paginationValue = DEFAULT_PAGINATION_VALUE}: Readonly<{
    data: Company,
    paginationValue?: number,
    className: string
}>) {
    const [currentPageNumber, setCurrentPageNumberNumber] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [hoverStates, setHoverStates] = useState<{ [key: string]: boolean }>({});

    const filteredData = useMemo(() => {
        return data.filter((item: Company) => item["name"].includes(searchTerm));
    }, [searchTerm, data]);

    const pageCount = useMemo(() => {
        return Math.ceil(filteredData.length / paginationValue);
    }, [filteredData]);

    // Paginates page data based on currPageNumber
    const paginatedPageData = useMemo(() => {
        if (currentPageNumber === pageCount) {
            return filteredData.slice((currentPageNumber - 1) * paginationValue);
        }
        return filteredData.slice((currentPageNumber - 1) * paginationValue, currentPageNumber * paginationValue);
    }, [currentPageNumber, filteredData, pageCount, paginationValue]);

    // Handles mouse enter link
    const handleMouseEnter = (key: any) => {
        setHoverStates((prev) => ({...prev, [key]: true}));
    };

    // Handles mouse leave link
    const handleMouseLeave = (key: any) => {
        setHoverStates((prev) => ({...prev, [key]: false}));
    };

    // Handles page change, sets current page number and resets the hover state object
    const handlePageChange = (page: number) => {
        setCurrentPageNumberNumber(page);
        setHoverStates({});
    };

    return (
        <div className={cn(`flex flex-col border-2 border-solid border-slate-500 rounded-lg bg-slate-200 px-10 mx-32`, className)}>
        <div className="flex flex-row flex-nowrap items-center gap-3 justify-end m-2">
            <label htmlFor="searchBox">Search</label>
            <Input id={"searchBox"} value={searchTerm}
                   // placeholder="Company Name"
                   onChange={(e) => setSearchTerm(e.target.value)}/>
        </div>
        <div>
            <ol className={"justify-center items-center first:pt-2 last:pb-2 px-10"}>
                {
                    paginatedPageData.map((item: Company, i: number) =>
                        <li key={i} className={`flex flex-row flex-1 bg-white border border-black rounded-lg p-5 my-1 shadow-lg`}>
                            <span className={`text-start`}>
                                                            <Link
                                                                id={`${item.slug}`}
                                                                href={`/reviews/${item.slug}`}
                                                                aria-label={`Link to ${item.name} data page`}
                                                                tabIndex={-1}
                                                                className={`flex font-medium items-center justify-center`}>
                                <h2 className={'text-2xl'}>{item.name}</h2>
                            </Link>
                                <p><b>Company Type</b>: {item.company_type}</p>
                                <p><b>Average Rating</b>: {item.average_rating}/5</p>
                                <p><b>Adjusted Average Rating</b>: {item.adjusted_average_rating}/5</p>
                                <p><b>Review Count</b>: {item.review_count}</p>
                            </span>

                        </li>)
                }
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

    </div>)
}