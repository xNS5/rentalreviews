"use client"

import React, {useContext} from "react";
import {Config, ConfigContext} from "@/lib/configProvider";
import Popover from "@/components/table-filter-popover/popover";
import {Icon} from "@/components/icon/icon";

type FilterProps = {
    title: string,
    key: string,
    type: string,
    value: any
}

export default async function TestPage(){
    const {reviews}: Config = useContext(ConfigContext);
    const {filter_props} = reviews;

    return (
        <Popover toggle={<>Filter <Icon className={"h-4 w-4 px-1"} type={'fas-filter'}/></> }>
            {filter_props.map((prop: FilterProps) => <p key={Math.random()}>{prop.title}</p>)}
        </Popover>
    )

}