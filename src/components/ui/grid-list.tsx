import * as React from "react";
import { cn } from "@/lib/utils";
import { ListBox as ListBoxComp, ListBoxItem as ListBoxItemComp } from 'react-aria-components';

const ListBox = ({ children, className, ...rest }: Readonly<{ children: React.ReactNode; className?: string, [key: string]: any; }>) => {
    return (<ListBoxComp className={className} {...rest}>
        {children}
    </ListBoxComp>)

}

const ListBoxItem = ({ children, className, ...rest }: Readonly<{ children: React.ReactNode; className?: string, [key: string]: any; }>) => {
    return (
        <ListBoxItemComp className={className} {...rest}>
            {children}
        </ListBoxItemComp>
    )
}

export {ListBox, ListBoxItem};