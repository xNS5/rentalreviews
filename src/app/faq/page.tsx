import React from 'react'
import { getDocument } from '../db/db'
import Link from 'next/link';
import Accordion from '@/components/accordion/accordion'
import parse from 'html-react-parser';
import type { FaqType } from './faq-type'
import type { Link as LinkType } from '@/lib/link';


export default async function FAQ() {
    const data: FaqType | undefined = await getDocument<FaqType>("config", "faq");

    return (
        <div className="container mx-auto py-10">
            {data?.questions.map((q, i: number) =>
                <Accordion key={i} defaultValue={q.expanded ? q.question : undefined}triggerText={q.question} className={{trigger: "font-semibold !text-xl !md:text-2xl no-underline text-start "}} >
                    <div className='border border-slate-500 rounded'> 
                    <p className='p-3 m-3 text-lg'>{parse(q.answer)}</p>
                    {
                        q.links && <>{q.links.map((link: LinkType, i:number) => 
                            <span key={i}><Link className='rounded m-2 p-2' href={link.url} target={link.target ?? "_blank"} >{link.name}</Link></span>
                        )}</>
                    }
                    </div>
                    
                    
                </Accordion>
            )}
        </div>)
}