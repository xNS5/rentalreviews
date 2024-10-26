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