import { notFound } from "next/navigation";
import getCompanyData from "@/lib/getCompanyData";
import { isValidSlug } from "@/lib/utils";
import Article from "@/components/article/article";
import { Config, getAltString } from "@/lib/configProvider";
import { getDocument } from "@/db/db";
import Link from "next/link";
import Icon from "@/components/icon/icon";
import Text from "@/components/text/text";
import type { Company } from "../columns";

import "./review.css";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: Readonly<{
  params: { [key: string]: string };
}>) {
  const { slug } = params;
  const company: Company = await getCompanyData(slug);

  if (slug == undefined || !isValidSlug(slug) || company === undefined) {
    notFound();
  }

  const { alt, disclaimer, review }: Config = await getDocument<Config>(
    "config",
    "config",
  );
  let altObj: { [key: string]: any } = global.altCache?.get(`review/${slug}/altObj`) ?? undefined;

  if (altObj === undefined) {
    altObj = review.displayed_column_ratings.reduce(
      (acc: any, curr: string) => ({
        ...acc,
        [curr]: getAltString(alt["review"], curr, company[curr]),
      }),
      {},
    );
    global.altCache?.set(`review/${slug}/altObj`, altObj, 86400000);
  }

  const date = new Date(company.created_timestamp * 1000);
  const hasAdjustedReviewValue: boolean = company.review_count != company.adjusted_review_count;

  return (
    <Article
      className="container mx-auto py-10 review-summary"
      announcement={""}
    >
      <>
        {date && (
          <div className={"flex flex-row justify-end"}>
            <p className="text-base md:text-lg">
              <b>Last Updated:</b> {date.toDateString()}
            </p>
          </div>
        )}
        <h1 className="text-3xl md:text-2xl text-center font-bold my-1">
          {company.name}
        </h1>
        <div
          id="review-data-list"
          className="container flex flex-col items-center justify-center border md:border-none max-w-xxs md:max-w-none border-slate-500 rounded py-2"
        >
          {hasAdjustedReviewValue && (
            <p className="text-sm lg:text-lg mb-2">{disclaimer["review"]}</p>
          )}
          <ol className="block md:flex md:flex-row text-xl md:text-lg  whitespace-nowrap space-y-3 md:space-y-0 text-left ">
            <li>
              <label className="sr-only">{altObj["review_count"]}</label>
              <p className="mx-1" aria-hidden={true}>
                <b>Review Count: </b>
                {company.review_count}
              </p>
            </li>
            <li>
              <label className="sr-only">{altObj["average_rating"]}</label>
              <p className="mx-1" aria-hidden={true}>
                <b>Average Rating: </b>
                {company.average_rating}/5
              </p>
            </li>
            {hasAdjustedReviewValue && (
              <>
                <li>
                  <label className="sr-only">
                    {altObj["adjusted_review_count"]}
                  </label>
                  <p className="mx-1" aria-hidden={true}>
                    <b>Adjusted Review Count: </b>
                    {company.adjusted_review_count}
                  </p>
                </li>
                <li>
                  <label className="sr-only">
                    {altObj["adjusted_average_rating"]}
                  </label>
                  <p className="mx-1" aria-hidden={true}>
                    <b>Adjusted Rating: </b>
                    {company.adjusted_average_rating}/5
                  </p>
                </li>
              </>
            )}
            <li className="grow">
              <Link
                href={`/api?id=${company.slug}`}
                className="hidden md:flex text-center items-center justify-center mx-3 bg-blue-600 text-white h-8 w-auto rounded"
              >
                <p className="py-2 pl-4 pr-1 !text-base">Raw Data</p>
                <Icon type="fas-link" className={`pr-4 h-4 w-4`} />
              </Link>
              <Link
                href={`/reviews/${company.slug}/data`}
                className="flex md:hidden text-center items-center justify-center mx-3 bg-blue-600 text-white h-8 w-auto rounded"
              >
                <p className="py-2 pl-4 pr-1 !text-base">Raw Data</p>
                <Icon type="fas-link" className={`pr-4 h-4 w-4`} />
              </Link>
            </li>
          </ol>
        </div>
        {/* Divider element */}
        <div className="hidden md:flex relativepb-5 pt-2 items-center">
          <div className="flex-grow border-t border-gray-400"></div>
        </div>

        {/* Conditionally display disclaimer */}
        {company.summary.disclaimer && (
          <section id="disclaimer">
            <h2 className="md:text-2xl font-bold underline">Disclaimer</h2>
            {company.summary.disclaimer}
          </section>
        )}
        <Text text={company.summary.text} />
      </>
    </Article>
  );
}
