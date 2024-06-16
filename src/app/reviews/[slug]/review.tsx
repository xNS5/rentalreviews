"use client"

import { Fragment } from "react";
import { useRouter } from "next/navigation";
import { Company } from "../columns";
import parse from 'html-react-parser';
import "./review.css"
import { Button } from "@/app/components/button/button";

export function Review(data: Company) {
    const router = useRouter();
    
    const onClickHandler = (slug: string) => {
        router.push(`/reviews/${slug}/data`);
      }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl text-center font-bold">{data.name}</h1>
            <div className="flex items-center justify-center">

                <ol className="flex items-center space-x-4">
                    <li><span>Average Rating</span>{data.average_rating}</li>
                    <li><span>Review Count:</span>{data.review_count}</li>
                    <li><span>Adjusted Rating:</span> {data.adjusted_average_rating}</li>
                    <li><span>Adjusted Review Count:</span>{data.adjusted_review_count}</li>
                    <li><Button onClickFn={() => onClickHandler(data.slug)} className={""}>Raw Data</Button></li>
                </ol>

            </div>
            {parse(data.summary)}
        </div >
    )
}