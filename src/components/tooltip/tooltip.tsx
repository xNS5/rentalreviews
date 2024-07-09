import { ReactNode } from "react";
import { Button } from "../shadcn/button"
import {
    Tooltip as TooltipComp,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../shadcn/tooltip"

export default function Tooltip(props: any) {
    const {tooltipText, children} = props;

    return (
        <TooltipProvider>
            <TooltipComp>
                <TooltipTrigger asChild>
                    <Button variant="outline">{children}</Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{tooltipText}</p>
                </TooltipContent>
            </TooltipComp>
        </TooltipProvider>
    )
}
