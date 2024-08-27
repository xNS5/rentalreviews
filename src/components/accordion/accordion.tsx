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
        <AccordionComp id="accordion-comp"type="single" defaultValue={defaultValue} collapsible className={`w-full ${className?.comp ?? ""}`}>
            <AccordionItem id="accordion-item" value={triggerText} className={`w-full ${className?.item ?? ""}`}>
                <AccordionTrigger id="accordion-trigger" className={`w-full ${className?.trigger ?? ""}`}>{triggerText}</AccordionTrigger>
                <AccordionContent id="accordion-content" className={`${className?.content ?? ""}`}>
                    {children}
                </AccordionContent>
            </AccordionItem>
        </AccordionComp>
    )
}