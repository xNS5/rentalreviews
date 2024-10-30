"use client"


import { useContext } from "react";
import Link from "next/link";
import Text from "@/components/text/text";
import {Icon} from "@/components/icon/icon";
import { Company } from "../columns";
import { Config, ConfigContext, getAltString } from "@/lib/configProvider";

const adjustedReviewDisclaimerString = "Note: The Adjusted Review Count and Rating reflect only reviews with both text and a rating.";


export function Review({ data }: Readonly<{ data: Company; }>) {
  // Note to self: this is to display the adjusted data, the disclaimer object is different. E.g. Son-Rise -> PURE
  const hasAdjustedReviewValue: boolean = data.review_count != data.adjusted_review_count;
  const { alt }: Config = useContext(ConfigContext)
  const altObj: { [key: string]: string } = ["review_count", "average_rating", "adjusted_review_count", "adjusted_average_rating"].reduce((obj, curr) => ({ ...obj, [curr]: getAltString(alt, curr, data[curr]) }), {});

  return (
    <>
      <h1 className="text-3xl md:text-2xl text-center font-bold my-1">{data.name}</h1>
      <div
        id="review-data-list"
        className="container flex flex-col items-center justify-center border md:border-none max-w-xxs md:max-w-none border-slate-500 rounded py-2"
      >
        <ol className="block md:flex md:flex-row text-xl md:text-lg  whitespace-nowrap space-y-3 md:space-y-0 text-left ">
          <li>
            <label className="sr-only">{altObj["review_count"]}</label>
            <p className="mx-1" aria-hidden={true}>
              <b>Review Count: </b>
              {data.review_count}
            </p>
          </li>
          <li>
            <label className="sr-only">{altObj["average_rating"]}</label>
            <p className="mx-1" aria-hidden={true}>
              <b>Average Rating: </b>
              {data.average_rating}/5
            </p>
          </li>
          {hasAdjustedReviewValue && (
            <>
              <li>
                <label className="sr-only">{altObj["adjusted_review_count"]}</label>
                <p className="mx-1" aria-hidden={true}>
                  <b>Adjusted Review Count: </b>
                  {data.adjusted_review_count}
                </p>
              </li>
              <li>
                <label className="sr-only">{altObj["adjusted_average_rating"]}</label>
                <p className="mx-1" aria-hidden={true}>
                  <b>Adjusted Rating: </b>
                  {data.adjusted_average_rating}/5
                </p>
              </li>
            </>
          )}
          <li className="grow">
            <Link
              href={`/api?id=${data.slug}`}
              className="hidden md:flex text-center items-center justify-center mx-3 bg-blue-600 text-white h-8 w-auto rounded"
            >
              <p className="py-2 pl-4 pr-1 !text-base">Raw Data</p>
              <Icon type="fas-link" className={`pr-4 h-4 w-4`} />
            </Link>
            <Link
              href={`/reviews/${data.slug}/data`}
              className="flex md:hidden text-center items-center justify-center mx-3 bg-blue-600 text-white h-8 w-auto rounded"
            >
              <p className="py-2 pl-4 pr-1 !text-base">Raw Data</p>
              <Icon type="fas-link" className={`pr-4 h-4 w-4`} />
            </Link>
          </li>
        </ol>
        {hasAdjustedReviewValue && (
          <p className="text-sm lg:text-lg mb-2" aria-hidden="true">
            {adjustedReviewDisclaimerString}
          </p>
        )}
      </div>
      {/* Divider element */}
      <div className="hidden md:flex relativepb-5 pt-2 items-center">
        <div className="flex-grow border-t border-gray-400"></div>
      </div>

      {/* Conditionally display disclaimer */}
      {data.summary.disclaimer && (
        <section id="disclaimer">
          <h2 className="md:text-2xl font-bold underline">Disclaimer</h2>
          {data.summary.disclaimer}
        </section>
      )}
      <Text text={data.summary.text} />
    </>
  );
}

