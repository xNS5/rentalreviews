import { Button } from "@/components/ui/button";
import { ColumnDef, ColumnSort } from "@tanstack/react-table";
import { DocumentData } from "firebase/firestore";
import { ArrowUpDown } from "lucide-react";

export interface Company extends DocumentData {
  name: string;
  average_rating: number;
  review_count: number;
  type: "company" | "property";
  summary: {
    disclaimer?: string;
    text: string;
  };
  cellProps?: {
    fn: () => any;
  };
  [key: string]: any | any[];
}

const columnKeys = [
  {
    key: "name",
    title: "Name",
  },
  {
    key: "company_type",
    title: "Company Type",
  },
  {
    key: "average_rating",
    title: "Average Rating",
  },
  {
    key: "adjusted_average_rating",
    title: "Adjusted Average Rating",
  },
  {
    key: "review_count",
    title: "Review Count",
  },
];

function getSortButton(
  onClickFn: (...args: any[]) => void,
  isSortedObj: string | boolean,
  name: string
) {
  return (
    <Button
      variant="ghost"
      onClick={() => onClickFn(isSortedObj === "asc")}
      aria-label={`${name} sorted ${
        isSortedObj === "asc" ? "ascending" : "descending"
      }`}
    >
      {name}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}


export const columns: ColumnDef<Company>[] = columnKeys.map((col)=> {
  return {
    accessorKey: col.key,
    header: ({ column }) => {
      return getSortButton(column.toggleSorting, column.getIsSorted(), col.title);
    },
  }
});
