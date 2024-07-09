"use client"

import Link from "next/link";
import Icon from "@/components/icons/icon";
import Tooltip from "@/components/tooltip/tooltip";
import { Company } from "../columns";
import parse from 'html-react-parser';
import "./review.css"

export function Review(data: Company) {
    return (
        <article className="container mx-auto py-10 review-summary">
            <h1 className="text-3xl text-center font-bold">{data.name}</h1>
            <div className="flex items-center justify-center pt-4">
                <ol className="flex items-center space-x-4 text-l">
                    <li><span className="font-bold">Average Rating: </span>{data.average_rating}/5</li>
                    <li><span className="font-bold">Review Count: </span>{data.review_count}</li>
                    {data.review_count == data.adjusted_review_count &&
                        <>
                            <li><span className="font-bold">Adjusted Rating: </span> {data.adjusted_average_rating}/5</li>
                            <li><span className="font-bold">Adjusted Review Count: </span>{data.adjusted_review_count}</li>
                            <li>
                                <Tooltip tooltipText={"Hello, world!"}>
                                    <Icon type="fas-circle-info" />
                                </Tooltip>
                            </li>
                        </>
                    }
                    <li><Link href={`/reviews/${data.slug}/data`}><button className={`rounded mx-1 bg-blue-500 h-8 px-2 w-auto text-white`}>Raw Data</button></Link></li>
                </ol>
            </div>

            {/* Divider element */}
            <div className="relative flex pb-5 pt-2 items-center">
                <div className="flex-grow border-t border-gray-400"></div>
            </div>

            {/* Conditionally display disclaimer */}
            {data.article.disclaimer &&
                <section id="disclaimer" className="pt-4">
                    <h2>Disclaimer</h2>
                    {data.article.disclaimer}
                </section>
            }
            {parse(data.article.text)}
        </article >
    )
}