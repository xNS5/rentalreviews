"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DocumentData } from "firebase/firestore"

export interface Company extends DocumentData {
  name: string,
  avg_rating: number,
  review_count: number,
  type: "company" | "property",
  [key: string]: any | any[]
}

export const columns: ColumnDef<Company>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "company_type",
    header: "Type",
  },
  {
    accessorKey: "adjusted_avg_rating",
    header: "Rating",
  },
  {
    accessorKey: "adjusted_review_count",
    header: "Review Count",
  },
]
