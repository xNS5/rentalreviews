"use client"

import Icon from "@/components/icon/icon";
import {useState} from "react";
import Button from "@/components/button/button"
import {Disclosure, DisclosurePanel, Heading} from 'react-aria-components';

export function NewAccordion(props: Readonly<{
    [key: string]: any
}>){
    const [isExpanded, setIsExpanded] = useState(false)
    const {triggerText, children, className, defaultValue} = props;
    return (
        <Disclosure
            isExpanded={isExpanded}
        >
            <Heading>
                <Button onClick={() => setIsExpanded((prev) => !prev)} slot="trigger">
                    {triggerText}
                    <Icon
                        type="fas-chevron-down"
                        className={`h-4 w-4 ml-1 text-inherit transition-transform ${isExpanded ? "rotate-180 transform" : ''}`}
                    />
                </Button>
            </Heading>
            <DisclosurePanel>
                <p>Details about system requirements here.</p>
            </DisclosurePanel>
        </Disclosure>
    )
}