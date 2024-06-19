"use client"

import Link from "next/link";
import { Company } from "../columns";
import parse from 'html-react-parser';
import "./review.css"

export function Review(data: Company) {

    return (
        <article className="container mx-auto py-10 review-summary">
            <h1 className="text-3xl text-center font-bold">{data.name}</h1>
            <div className="flex items-center justify-center">
                <ol className="flex items-center space-x-4">
                    <li><span className="font-bold">Average Rating: </span>{data.average_rating}/5</li>
                    <li><span className="font-bold">Review Count: </span>{data.review_count}</li>
                    <li><span className="font-bold">Adjusted Rating: </span> {data.adjusted_average_rating}/5</li>
                    <li><span className="font-bold">Adjusted Review Count: </span>{data.adjusted_review_count}</li>
                    <li><Link href={`/reviews/${data.slug}/data`}><button className={`rounded mx-1 bg-blue-500 h-8 w-auto text-white`}>Raw Data</button></Link></li>
                </ol>
            </div>
            {parse(data.summary.text)}
        </article >
    )
}