"use client"


import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { DocumentData } from "firebase/firestore"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import Icon from "@/components/icons/icon"

export interface Company extends DocumentData {
  name: string,
  average_rating: number,
  review_count: number,
  type: "company" | "property",
  summary: {
    disclaimer?: string,
    text: string
  }
  [key: string]: any | any[]
}

function getSortButton(column: any, name: string) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {name}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  )
}


export const columns: ColumnDef<Company>[] = [
  {
    accessorKey: "name",
    header: ({column}) => getSortButton(column, "Name")
  },
  {
    accessorKey: "company_type",
    header: ({column}) => getSortButton(column, "Type"),
    cell: (value) => {
      let cellValue: string = value.getValue() as string;
      return cellValue.charAt(0).toUpperCase() + cellValue.slice(1)
    }
  },
  {
    accessorKey: "average_rating",
    header: ({column}) => getSortButton(column, "Rating"),
    cell: ({row}) => {
      const average_rating: number = row.getValue("average_rating");
      return (<span aria-label={`Rating ${average_rating} out of 5`}>{average_rating}</span>)
    }
  },
  {
    accessorKey: "adjusted_average_rating",
    header: ({column}) => getSortButton(column, "Adjusted Rating"),
    cell: ({row}) => {
      const average_rating: number = row.getValue("adjusted_average_rating");
      return (<span aria-label={`Adjusted rating ${average_rating} out of 5`}>{average_rating}</span>)
    }
  },
  {
    accessorKey: "review_count",
    header: ({column}) => getSortButton(column, "Reviews"),
    cell: ({row}) => {
      const review_count: number = row.getValue("review_count");
      return (<span aria-label={`${review_count} reviews`}>{review_count}</span>)
    }
  },
]

