"use client"

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Company } from "@/app/reviews/columns";
import { ListBox, ListBoxItem } from "../ui/grid-list";

const DEFAULT_PAGINATION_VALUE = 10;

export default function DataList({ data, paginationValue = DEFAULT_PAGINATION_VALUE}: Readonly<{ data: Company, paginationValue: number }>) {
    const [currentPageNumber, setCurrentPageNumberNumber] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [hoverStates, setHoverStates] = useState<{ [key: string]: boolean }>({});

    const filteredData = useMemo(() => {
        return data.filter((item: Company) => item["name"].includes(searchTerm));
    }, [searchTerm, data]);

    const pageCount = useMemo(() => {
        return Math.ceil(filteredData.length / filteredData);
    }, [filteredData, paginationValue]);

    // Paginates page data based on currPageNumber
    const paginatedPageData = useMemo(() => {
        if (currentPageNumber === pageCount) {
            return filteredData.slice((currentPageNumber - 1) * paginationValue);
        }
        return filteredData.slice((currentPageNumber - 1) * paginationValue, currentPageNumber * paginationValue);
    }, [currentPageNumber, filteredData, pageCount, paginationValue]);

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

    return (<ListBox>
        {
            data.map((t: Company) => <ListBoxItem aria-label={t.name}>
                {t.name}
            </ListBoxItem>)
        }
    </ListBox>)
}