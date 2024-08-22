import React from 'react'
import Link from 'next/link';
import Accordion from '@/components/accordion/accordion'
import parse from 'html-react-parser';
import Text from '@/components/text/text';
import { getDocument } from '../db/db';
import type { Text as TextType } from '@/lib/configtype';
import type { FaqType } from './faq-type';
import type { Link as LinkType } from '@/lib/link';


export default async function FAQ() {
    const data: FaqType | undefined = await getDocument<FaqType>("config", "faq");

    return (
        <div className="container mx-auto py-10">
            {data?.questions.map((q, i: number) =>
                <Accordion key={i} defaultValue={q.expanded ? q.question : undefined}triggerText={q.question} className={{trigger: "font-semibold !text-xl !md:text-2xl no-underline text-start"}} >
                    <div className={`${q.links ? "grid grid-rows-2" : ""} border border-slate-500 rounded`}>
                        <Text className='m-3 text-lg' text={q.answer}/>
                        {
                            q.links && <div className='content-center text-center'>{q.links.map((link: LinkType, i:number) => 
                                <span key={i}><Link className='m-5 rounded m-2 p-2 text-lg border border-slate-500 shadow-md' href={link.url} target={link.target ?? "_blank"} >{link.name}</Link></span>
                            )}</div>
                        }
                    </div>
                    
                    
                </Accordion>
            )}
        </div>)
}