import Link from "next/link";
import Article from "@/components/article/article";
import { Company } from "../columns";
import Text from "@/components/text/text";
import Accordion from "@/components/accordion/accordion";
import { AltRecord, getAltObj, getAltString, getAltStringAsync } from "@/lib/altprovider";
import "./review.css";

const adjustedReviewDisclaimerString = "Note: The Adjusted Review Count and Rating reflect only reviews with both text and a rating.";



export async function Review(data: Company) {
  // Note to self: this is to display the adjusted data, the disclaimer object is different. E.g. Son-Rise -> PURE
  const hasAdjustedReviewValue: boolean = data.review_count != data.adjusted_review_count;
  const altObj: AltRecord = await getAltObj("review");

  return (
    <Article className="container mx-auto py-10 review-summary">
      <h1 className="text-2xl md:text-3xl text-center font-bold my-1">{data.name}</h1>
      <div id="review-data-list" className="hidden md:flex flex-col items-center justify-center">
        <ol className="flex flex-row lg:text-lg sm:text-sm ">
          <li>
            <label className="sr-only">{getAltString(altObj, "review_count", data.review_count)}</label>
            <p className="m-1" aria-hidden={true}>
              <b>Review Count: </b>
              {data.review_count}
            </p>
          </li>
          <li>
            <label className="sr-only">{getAltString(altObj, "average_rating", data.average_rating)}</label>
            <p className="m-1" aria-hidden={true}>
              <b>Average Rating: </b>
              {data.average_rating}/5
            </p>
          </li>
          {hasAdjustedReviewValue && (
            <>
              <li>
                <label className="sr-only">{getAltString(altObj, "adjusted_review_count", data.adjusted_review_count)}</label>
                <p className="m-1" aria-hidden={true}>
                  <b>Adjusted Review Count: </b>
                  {data.adjusted_review_count}
                </p>
              </li>
              <li>
                <label className="sr-only">{getAltString(altObj, "adjusted_average_rating", data.adjusted_average_rating)}</label>
                <p className="m-1" aria-hidden={true}>
                  <b>Adjusted Rating: </b>
                  {data.adjusted_average_rating}/5
                </p>
              </li>
            </>
          )}
          <li>
            <Link href={`/api?id=${data.slug}`} className="rounded flex text-center justify-center mx-3 bg-blue-500 h-8 px-2 w-auto text-white">
              Raw Data
            </Link>
          </li>
        </ol>
        {hasAdjustedReviewValue && <p className="text-sm lg:text-lg" aria-hidden="true">{adjustedReviewDisclaimerString}</p>}
      </div>
      {/* Divider element */}
      <div className="hidden md:flex relativepb-5 pt-2 items-center">
        <div className="flex-grow border-t border-gray-400"></div>
      </div>

      {/* Mobile component */}
      <div id="data-accordion" className="flex md:hidden w-full flex-col items-center">
        <Accordion
          triggerText={"Data"}
          defaultValue={"Data"}
          className={{
            trigger: "font-semibold inline-flex justify-center",
            comp: "border border-gray-400 border-1 rounded w-full p-2 shadow-md",
            content: "p-5 grid-cols-1",
          }}
        >
          <ol className="space-y-2 text-gray-500 list-none list-inside dark:text-gray-400 text-lg !text-black">
          <li>
            <label className="sr-only">{getAltString(altObj, "review_count", data.review_count)}</label>
            <p className="m-1" aria-hidden={true}>
              <b>Review Count: </b>
              {data.review_count}
            </p>
          </li>
          <li>
            <label className="sr-only">{getAltString(altObj, "average_rating", data.average_rating)}</label>
            <p className="m-1" aria-hidden={true}>
              <b>Average Rating: </b>
              {data.average_rating}/5
            </p>
          </li>
          {hasAdjustedReviewValue && (
            <>
              <li>
                <label className="sr-only">{getAltString(altObj, "adjusted_review_count", data.adjusted_review_count)}</label>
                <p className="m-1" aria-hidden={true}>
                  <b>Adjusted Review Count: </b>
                  {data.adjusted_review_count}
                </p>
              </li>
              <li>
                <label className="sr-only">{getAltString(altObj, "adjusted_average_rating", data.adjusted_average_rating)}</label>
                <p className="m-1" aria-hidden={true}>
                  <b>Adjusted Rating: </b>
                  {data.adjusted_average_rating}/5
                </p>
              </li>
            </>
          )}
          </ol>
          <Link
            href={`/reviews/${data.slug}/data`}
            className="flex text-lg h-8 my-2 w-auto items-center justify-center rounded mx-1 bg-blue-500 px-2 text-white"
          >
            Raw Data
          </Link>
          {hasAdjustedReviewValue && <span className="flex justify-center text-md">{adjustedReviewDisclaimerString}</span>}
        </Accordion>
      </div>

      {/* Conditionally display disclaimer */}
      {data.summary.disclaimer && (
        <section id="disclaimer">
          <h2 className="md:text-2xl font-bold underline">Disclaimer</h2>
          {data.summary.disclaimer}
        </section>
      )}
      <Text text={data.summary.text} />
    </Article>
  );
}

