import Link from "next/link";
import Article from "@/components/article/article";
import Text from "@/components/text/text";
import Icon from "@/components/icons/icon";
import { Company } from "../columns";
import { AltRecord, getAltString } from "@/lib/altprovider";
import "./review.css";

const adjustedReviewDisclaimerString = "Note: The Adjusted Review Count and Rating reflect only reviews with both text and a rating.";

export function Review({data, altObj}: Readonly<{data: Company, altObj: AltRecord}>) {
  // Note to self: this is to display the adjusted data, the disclaimer object is different. E.g. Son-Rise -> PURE
  const hasAdjustedReviewValue: boolean = data.review_count != data.adjusted_review_count;

  return (
    <Article className="container mx-auto py-10 review-summary">
      <h1 className="text-3xl md:text-2xl text-center font-bold my-1">{data.name}</h1>
      <div id="review-data-list" className="container flex flex-col items-center justify-center border md:border-none max-w-md md:max-w-none border-slate-500 rounded">
         <ol className="block md:flex md:flex-row  text-xl md:text-lg  whitespace-nowrap space-y-3 md:space-y-0 text-left last:ml-auto my-3">
          <li>
            <label className="sr-only">{getAltString(altObj, "review_count", data.review_count)}</label>
            <p className="mx-1" aria-hidden={true}>
              <b>Review Count: </b>
              {data.review_count}
            </p>
          </li>
          <li>
            <label className="sr-only">{getAltString(altObj, "average_rating", data.average_rating)}</label>
            <p className="mx-1" aria-hidden={true}>
              <b>Average Rating: </b>
              {data.average_rating}/5
            </p>
          </li>
          {hasAdjustedReviewValue && (
            <>
              <li>
                <label className="sr-only">{getAltString(altObj, "adjusted_review_count", data.adjusted_review_count)}</label>
                <p className="mx-1" aria-hidden={true}>
                  <b>Adjusted Review Count: </b>
                  {data.adjusted_review_count}
                </p>
              </li>
              <li>
                <label className="sr-only">{getAltString(altObj, "adjusted_average_rating", data.adjusted_average_rating)}</label>
                <p className="mx-1" aria-hidden={true}>
                  <b>Adjusted Rating: </b>
                  {data.adjusted_average_rating}/5
                </p>
              </li>
            </>
          )}
          <li className="grow">
            <Link href={`/api?id=${data.slug}`} className="rounded flex text-center items-center justify-center mx-3 bg-blue-600 text-white h-8 w-auto">
            <p className="py-2 pl-4 pr-1 !text-base">Raw Data</p>
              <Icon type="fas-link" ariahidden={true} className={`pr-4 h-4 w-4`} />
            </Link>
          </li>
        </ol>
        {hasAdjustedReviewValue && <p className="text-sm lg:text-lg mb-2" aria-hidden="true">{adjustedReviewDisclaimerString}</p>}
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
    </Article>
  );
}

