
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
        <TooltipProvider delayDuration={250}>
            <TooltipComp>
                <TooltipTrigger asChild>
                    <Button variant="ghost" className={`rounded ${className} text-inherit w-full h-auto`}>{children}</Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{tooltipText}</p>
                </TooltipContent>
            </TooltipComp>
        </TooltipProvider>
    )
} 

Tooltip.displayName = "tooltip";
