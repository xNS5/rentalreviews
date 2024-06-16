"use client"

import { Fragment } from "react";
import { Company } from "../columns";
import parse from 'html-react-parser';
import "./review.css"

export function Review(data: Company) {
    const summary_text = data.summary.replace('<article>', '<article className="summary-article">');

    return (
        <div className="container mx-auto py-10">
            {parse(summary_text)}
        </div>
    )
}