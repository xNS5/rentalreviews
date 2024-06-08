"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { DocumentData } from "firebase/firestore"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

export interface Company extends DocumentData {
  name: string,
  average_rating: number,
  review_count: number,
  type: "company" | "property",
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
    header: ({column}) => getSortButton(column, "Type")
  },
  {
    accessorKey: "average_rating",
    header: ({column}) => getSortButton(column, "Rating")
  },
  {
    accessorKey: "adjusted_average_rating",
    header: ({column}) => getSortButton(column, "Adjusted Rating")
  },
  {
    accessorKey: "review_count",
    header: ({column}) => getSortButton(column, "Reviews")
  },
]
