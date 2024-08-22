import Link from "next/link";
import Icon from "@/components/icons/icon";
import Tooltip from "@/components/tooltip/tooltip";
import { Company } from "../columns";
import Text from "@/components/text/text";
import Accordion from "@/components/accordion/accordion";
import "./review.css"

export function Review(data: Company) {
    return (
        <article className="container mx-auto py-10 review-summary">
            <h1 className="text-3xl text-center font-bold">{data.name}</h1>
            <div id="review-data-list" className="flex items-center justify-center pt-4">
                <ol className="hidden text-sm lg:text-lg md:flex items-center md:space-x-4 text-lg">
                    <li className="sm:text-base"><span className="font-bold">Review Count:</span><span className="m-1">{data.review_count}</span></li>
                    <li><span className="font-bold">Average Rating: </span><span className="m-1">{data.average_rating}/5</span></li>
                    {data.review_count != data.adjusted_review_count &&
                        <>
                            <li><span className="font-bold">Adjusted Review Count:</span><span className="m-1">{data.adjusted_review_count}</span>
                                <Tooltip
                                    className="h-4 w-4"
                                    tooltipText={"The number of reviews where the user submitted both a rating with text"}
                                >
                                    <Icon type="fas-circle-info" />
                                </Tooltip>
                            </li>
                            <li><span className="font-bold">Adjusted Rating:</span><span className="m-1">{data.adjusted_average_rating}/5</span>
                                <Tooltip
                                    className="h-4 w-4"
                                    tooltipText={"The average rating of reviews with text"}
                                >
                                    <Icon type="fas-circle-info" />
                                </Tooltip>
                            </li>

                        </>
                    }
                    <li><Link href={`/reviews/${data.slug}/data`} className="rounded block content-center mx-3 bg-blue-500 h-8 px-2 w-auto text-white">Raw Data</Link></li>
                </ol>
            </div>
            {/* Divider element */}
            <div className="hidden md:flex relativepb-5 pt-2 items-center">
                <div className="flex-grow border-t border-gray-400"></div>
            </div>

            <div id="data-accordion" className="flex md:hidden w-full flex-col items-center">
                <Accordion triggerText={"Data"} className={{trigger: "font-semibold inline-flex justify-center", comp: "border border-gray-400 border-1 rounded p-5 w-full"}}>
                    <ol className="max-w-md space-y-1 text-gray-500 list-none list-inside dark:text-gray-400 sm:text-lg !text-black">
                        <li><span className="font-bold">Review Count:</span><span className="m-1">{data.review_count}</span></li>
                        <li><span className="font-bold">Average Rating: </span><span className="m-1">{data.average_rating}/5</span></li>
                        {data.review_count != data.adjusted_review_count &&
                            <>
                                <li><span className="font-bold">Adjusted Review Count:</span><span className="m-1">{data.adjusted_review_count}</span>
                                    <Tooltip
                                        className="h-3 w-3"
                                        tooltipText={"The number of reviews where the user submitted both a rating with text"}
                                    >
                                        <Icon type="fas-circle-info" />
                                    </Tooltip>
                                </li>
                                <li><span className="font-bold">Adjusted Rating:</span><span className="m-1">{data.adjusted_average_rating}/5</span>
                                    <Tooltip
                                        className="h-3 w-3"
                                        tooltipText={"The average rating of reviews with text"}
                                    >
                                        <Icon type="fas-circle-info" />
                                    </Tooltip>
                                </li>

                            </>
                        }
                        <li><Link href={`/reviews/${data.slug}/data`} className="block h-8 w-auto text-center rounded mx-1 bg-blue-500 px-2 text-white">Raw Data</Link></li>
                    </ol>
                </Accordion>
            </div>

            {/* Conditionally display disclaimer */}
            {data.article.disclaimer &&
                <section id="disclaimer" className="pt-4">
                    <h2>Disclaimer</h2>
                    {data.article.disclaimer}
                </section>
            }
            <Text text={data.article.text}/>
        </article >
    )
}