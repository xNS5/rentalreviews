"use client"

import type { Company } from "../../columns";
import { JsonViewer } from 'view-json-react';

import "./data.css";

const jsonViewerStyle: React.CSSProperties = {
    fontSize: "18",
    backgroundColor: 'white', 
    color: 'black',
    padding: "1em",
    border: "1px solid black",
    borderRadius: 4,

}


export function Data({data} : Readonly<{
    data: Company
}>) {
    return (
        <JsonViewer
            style={jsonViewerStyle}
            data={data}
            expandLevel={1}
        />
    );
}