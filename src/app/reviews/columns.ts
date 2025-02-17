import { DocumentData } from "firebase/firestore";

export interface Company extends DocumentData {
  name: string;
  address: string,
  slug: string;
  average_rating: number;
  review_count: number;
  adjusted_average_rating: number;
  adjusted_review_count: number;
  type: "company" | "property";
  distribution: {
    [key: number]: number
  };
  summary: {
    created_timestamp: number,
    disclaimer?: string;
    text: string;
  };
}

export type ColumnType = {
  key: string,
  title: string
}

const ColumnKeys = [
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

export const getColumnKeys = () => ColumnKeys;