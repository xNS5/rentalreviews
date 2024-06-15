"use client"

import { Fragment } from "react";
import { Company } from "../columns";
import parse from 'html-react-parser';
import styles from  "./review.module.css";

export function Review(data: Company) {
    return(
    <div
    className={styles.article}>
     {parse(data.summary)}   
    </div>
)
}