import {
    Accordion as AccordionComp,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

type AccordionClass = {
    comp?: string,
    item?: string,
    trigger?: string,
    content?: string
}

export default function Accordion({ triggerText = "", children, className, defaultValue = ""}: Readonly<{
    triggerText: string;
    className?: AccordionClass,
    children: React.ReactNode,
    defaultValue?: string,
}>) {
    return (
        <AccordionComp type="single" defaultValue={defaultValue} collapsible className={`w-full ${className?.comp ?? ""}`}>
            <AccordionItem value={triggerText} className={`w-full ${className?.item ?? ""}`}>
                <AccordionTrigger className={`w-full ${className?.trigger ?? ""}`}>{triggerText}</AccordionTrigger>
                <AccordionContent className={`${className?.content ?? ""} shadow`}>
                    {children}
                </AccordionContent>
            </AccordionItem>
        </AccordionComp>
    )
}