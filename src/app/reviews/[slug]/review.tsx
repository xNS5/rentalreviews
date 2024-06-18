"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Company } from "../columns";
import parse from 'html-react-parser';
import { Button } from "@/components/button/button";
import "./review.css"

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
                    <li><span className="font-bold">Average Rating: </span>{data.average_rating}/5</li>
                    <li><span className="font-bold">Review Count: </span>{data.review_count}</li>
                    <li><span className="font-bold">Adjusted Rating: </span> {data.adjusted_average_rating}/5</li>
                    <li><span className="font-bold">Adjusted Review Count: </span>{data.adjusted_review_count}</li>
                    <li><Button onClickFn={() => onClickHandler(data.slug)} className={`rounded mx-1 bg-blue-500 h-8 w-auto text-white`}>Raw Data</Button></li>
                </ol>
            </div>
            {parse(data.summary)}
        </div >
    )
}