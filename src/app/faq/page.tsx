import React from 'react'
import { getDocument } from '../db/db'
import Accordion from '@/components/accordion/accordion'
import parse from 'html-react-parser';
import type { FaqType } from './faq-type'


export default async function FAQ() {
    const data: FaqType | undefined = await getDocument<FaqType>("config", "faq");

    return (
        <div className="container mx-auto py-10">
            {data?.questions.map((q, i: number) =>
                <Accordion key={i} triggerText={q.question} className={{trigger: "font-semibold !text-lg !md:text-2xl no-underline text-start "}} >
                    <p className='p-3 m-3 text-lg border border-slate-500 rounded'>{parse(q.answer)}</p>
                </Accordion>
            )}
        </div>)
}