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

export default function Accordion({ triggerText = "", children, className }: Readonly<{
    triggerText: string;
    className?: AccordionClass,
    children: React.ReactNode;
}>) {
    return (
        <AccordionComp type="single" collapsible className={`w-full ${className?.comp ?? ""}`}>
            <AccordionItem value={triggerText} className={`w-full ${className?.item ?? ""}`}>
                <AccordionTrigger className={`w-full ${className?.trigger ?? ""}`}>{triggerText}</AccordionTrigger>
                <AccordionContent className={`${className?.content ?? ""}`}>
                    {children}
                </AccordionContent>
            </AccordionItem>
        </AccordionComp>
    )
}