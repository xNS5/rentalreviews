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
                <Accordion key={i} triggerText={q.question} className={{trigger: "font-semibold text-xl no-underline"}} >
                    <p className='pt-2 pb-2 text-lg'>{parse(q.answer)}</p>
                </Accordion>
            )}
        </div>)
}