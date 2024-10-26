"use client"

import { Company } from "@/app/reviews/columns";
import { ListBox, ListBoxItem } from "../ui/grid-list";

const temp = ["hello", "world", "foo", "bar"];

export default function DataList({ data }: Readonly<{ data?: Company }>) {
    return (<ListBox>
        {
            temp.map(t => <ListBoxItem>
                {t}
            </ListBoxItem>)
        }
    </ListBox>)
}