import Link from "next/link";
import Article from "@/components/article/article";
import { Company } from "../columns";
import Text from "@/components/text/text";
import Accordion from "@/components/accordion/accordion";
import { getAltStringAsync } from "@/lib/altprovider";
import "./review.css";

const adjustedReviewDisclaimerString =
  "Note: The Adjusted Review Count and Rating reflect only reviews with both text and a rating.";

export async function Review(data: Company) {
  const hasAdjustedReviewValue: boolean =
    data.review_count != data.adjusted_review_count;

  return (
    <Article className="container mx-auto py-10 review-summary">
      <h1 className="text-3xl text-center font-bold">{data.name}</h1>
      <div
        id="review-data-list"
        className="hidden md:grid grid-cols-1 grid-rows-2 items-center justify-center pt-4"
      >
        <ol className="flex text-sm lg:text-lg justify-center items-center md:space-x-4 text-lg">
          <li
            aria-label={`${await getAltStringAsync(
              data.review_count,
              "review",
              "review_count"
            )}`}
            value={data.review_count}
          >
            <span className="m-1">
              <b>Review Count: </b>
              {data.review_count}
            </span>
          </li>
          <li
            aria-label={`${await getAltStringAsync(
              data.average_rating,
              "review",
              "average_rating"
            )}`}
          >
            <span className="m-1">
              <b>Average Rating: </b>
              {data.average_rating}
            </span>
          </li>
          {hasAdjustedReviewValue && (
            <>
              <li
                aria-label={`${await getAltStringAsync(
                  data.adjusted_review_count,
                  "review",
                  "adjusted_review_count"
                )}`}
              >
                <span className="m-1">
                  <b>Adjusted Review Count: </b>
                  {data.adjusted_review_count}
                </span>
              </li>
              <li
                aria-label={`${await getAltStringAsync(
                  data.adjusted_average_rating,
                  "review",
                  "adjusted_average_rating"
                )}`}
              >
                <span className="m-1">
                  <b>Adjusted Rating: </b>
                  {data.adjusted_average_rating}
                </span>
              </li>
            </>
          )}
          <li>
            <Link
              href={`/reviews/${data.slug}/data`}
              className="rounded block content-center mx-3 bg-blue-500 h-8 px-2 w-auto text-white"
            >
              Raw Data
            </Link>
          </li>
        </ol>
        {hasAdjustedReviewValue && (
          <span className="flex justify-center">
            {adjustedReviewDisclaimerString}
          </span>
        )}
      </div>
      {/* Divider element */}
      <div className="hidden md:flex relativepb-5 pt-2 items-center">
        <div className="flex-grow border-t border-gray-400"></div>
      </div>

      <div
        id="data-accordion"
        className="flex md:hidden w-full flex-col items-center"
      >
        <Accordion
          triggerText={"Data"}
          className={{
            trigger: "font-semibold inline-flex justify-center",
            comp: "border border-gray-400 border-1 rounded w-full p-2 shadow-md",
            content: "p-5 grid-cols-1",
          }}
        >
          <ol className="space-y-2 text-gray-500 list-none list-inside dark:text-gray-400 text-lg !text-black">
            <li
              aria-label={`${await getAltStringAsync(
                data.review_count,
                "review",
                "review_count"
              )}`}
            >
              <span className="m-1">
                <b>Review Count: </b>
                {data.review_count}
              </span>
            </li>
            <li
              aria-label={`${await getAltStringAsync(
                data.average_rating,
                "review",
                "average_rating"
              )}`}
            >
              <span className="m-1">
                <b>Average Rating: </b>
                {data.average_rating}
              </span>
            </li>
            {hasAdjustedReviewValue && (
              <>
                <li
                  aria-label={`${await getAltStringAsync(
                    data.adjusted_review_count,
                    "review",
                    "adjusted_review_count"
                  )}`}
                >
                  <span className="m-1">
                    <b>Adjusted Review Count: </b>
                    {data.adjusted_review_count}
                  </span>
                </li>
                <li
                  aria-label={`${await getAltStringAsync(
                    data.adjusted_average_rating,
                    "review",
                    "adjusted_average_rating"
                  )}`}
                >
                  <span className="m-1">
                    <b>Adjusted Rating: </b>
                    {data.adjusted_average_rating}
                  </span>
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
          {hasAdjustedReviewValue && (
            <span className="flex justify-center text-md">
              {adjustedReviewDisclaimerString}
            </span>
          )}
        </Accordion>
      </div>

      {/* Conditionally display disclaimer */}
      {data.article.disclaimer && (
        <section id="disclaimer">
          <h2>Disclaimer</h2>
          {data.article.disclaimer}
        </section>
      )}
      <Text text={data.article.text} />
    </Article>
  );
}
