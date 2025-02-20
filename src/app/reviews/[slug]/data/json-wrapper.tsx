"use client"
import JsonView from 'react18-json-view'

export function JsonWrapper({data}: Readonly<{
    data: { [key: string]: string }
}>){

    return <JsonView src={data}/>

}