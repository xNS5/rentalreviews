"use client"

import {useState} from "react";
// import {Button} from "../button/button";
import Icon from "../icons/icon"
import {Button, Label, ListBox, ListBoxItem, Popover, Select as SelectComp, SelectValue} from 'react-aria-components';


export const Select = ({label, labelProps, data}: Readonly<{
    labelProps: {[key: string]: any},
    label: string,
    data: any
}>) => {
    const [isSelectExpanded, setIsSelectExpanded] = useState(false);

    return (<SelectComp className={`flex flex-col mx-2`}>
        <Label {...labelProps}>{label}</Label>
        <Button>
            <SelectValue/>
            <Icon type={"fas-caret-down"} className={`h-4 w-4  transition-transform ${isSelectExpanded ? "rotate-180 transform" : ""}`}/>
        </Button>
        <Popover className={`bg-white border border-solid border-slate-200 shadow`}>
            <ListBox selectionMode="single" className={`p-5`}>
                <ListBoxItem>Hello</ListBoxItem>
                <ListBoxItem>World</ListBoxItem>
            </ListBox>
        </Popover>

    </SelectComp>)
}