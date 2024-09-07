import {
    Accordion as AccordionComp,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function Accordion(props: Readonly<{
    [key: string]: any
  }>){
    const {triggerText, children, className, defaultValue} = props; 
    return (
        <AccordionComp id="accordion-comp" type="single" defaultValue={defaultValue} collapsible className={`w-full ${className?.comp ?? ""}`}>
            <AccordionItem id="accordion-item" value={triggerText} className={`w-full ${className?.item ?? ""}`}>
                <AccordionTrigger id="accordion-trigger" className={`w-full ${className?.trigger ?? ""}`}>{triggerText}</AccordionTrigger>
                <AccordionContent id="accordion-content" className={`${className?.content ?? ""}`}>
                    {children}
                </AccordionContent>
            </AccordionItem>
        </AccordionComp>
    )
}