import Icon from "@/components/icons/icon";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { DocumentData } from "firebase/firestore";

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

export type ColumnType = {
  key: string,
  title: string
}

export const ColumnKeys = [
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

  let props: {[key: string]: any} = {}

  switch(isSortedObj){
    case "asc":
      props = {
        aria_label: `${name} sorted ascending`,
        sortIcon: <Icon type="fas-arrow-up-short-wide" className="ml-2 h-4 w-4"/>
      }
      break;
    case "desc":
      props = {
        aria_label: `${name} sorted descending`,
        sortIcon: <Icon type="fas-arrow-down-wide-short" className="ml-2 h-4 w-4"/>
      }
      break;
    default:
      props= {
        aria_label:`${name} sorting disabled`,
        sortIcon: <Icon type="fas-arrow-down-up-across-line" className="ml-2 h-4 w-4"/>
      }
      break;
  }
  

  return (
    <Button
      variant="ghost"
      onClick={() => onClickFn(isSortedObj === "asc")}
/*       aria-label={props.aria_label} */
    >
      {name}
      {props.sortIcon}
    </Button>
  );
}


export const columns: ColumnDef<Company>[] = ColumnKeys.map((col)=> {
  return {
    accessorKey: col.key,
    header: ({ column }) => {
      return getSortButton(column.toggleSorting, column.getIsSorted(), col.title);
    }
  }
});


