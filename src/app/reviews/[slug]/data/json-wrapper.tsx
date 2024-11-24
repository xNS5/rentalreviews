"use client"
import { JsonViewer } from 'view-json-react';

export function JsonWrapper({data}: Readonly<{
    data: { [key: string]: string }
}>){
    return <JsonViewer data={data} expandLevel={1}/>
}