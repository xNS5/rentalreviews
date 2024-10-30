"use client"

import {useState} from "react";
import Icon from "../icons/icon"
import {Button, Label, ListBox, ListBoxItem, Popover, Select as SelectComp, SelectValue} from 'react-aria-components';


export const Select = ({label, labelProps, data, ...rest}: Readonly<{
    labelProps: {[key: string]: any},
    label: string,
    data: any,
    [key: string] : any;
}>) => {
    const [isSelectExpanded, setIsSelectExpanded] = useState(false);

    return (<SelectComp className={`flex flex-col m-2`} isOpen={isSelectExpanded} onOpenChange={setIsSelectExpanded} {...rest}>
        {/*<Label {...labelProps}>{label}</Label>*/}
        <Button className={"flex flex-row justify-center content-center"}>
            <SelectValue className={`pt-1 px-1`}/>
            <Icon type={"fas-caret-down"} className={`h-3 w-3 transition-transform px-1 ${isSelectExpanded ? "rotate-180 transform" : ""}`}/>
        </Button>
        <Popover className={`bg-white border border-solid border-slate-200 shadow`}>
            <ListBox items={data} selectionMode="single" className={`p-5`}>
                {data.map((elem: any, i: number) =>
                    <ListBoxItem id={elem.key} key={i} className={`hover:bg-blue-500 hover:text-white p-2 rounded`}>{elem.title}</ListBoxItem>)
                }
            </ListBox>
        </Popover>

    </SelectComp>)
}