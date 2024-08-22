import { ReactNode } from "react";
import { Button } from "../ui/button"
import {
    Tooltip as TooltipComp,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip"

export default function Tooltip(props: any) {
    const {tooltipText, children, className} = props;

    return (
        <TooltipProvider>
            <TooltipComp>
                <TooltipTrigger asChild>
                    <Button variant="ghost" className={`rounded ${className}`}>{children}</Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{tooltipText}</p>
                </TooltipContent>
            </TooltipComp>
        </TooltipProvider>
    )
}
