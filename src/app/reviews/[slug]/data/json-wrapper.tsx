"use client"
import { JsonViewer } from 'view-json-react';
import ReactJsonView from '@microlink/react-json-view';

export function JsonWrapper({data}: Readonly<{
    data: { [key: string]: string }
}>){
    return <ReactJsonView src={data}/>
}