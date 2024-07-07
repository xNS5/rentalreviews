"use client"

import type { Company } from "../../columns";
import { JsonView } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';


export function Data(data: Company) {
    return <><JsonView data={data ?? {}}/></>
}