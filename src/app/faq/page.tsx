import React, { Fragment } from "react";
import Link from "next/link";
import Accordion from "@/components/accordion/accordion";
import Text from "@/components/text/text";
import Article from "@/components/article/article";
import { getDocument } from "../db/db";
import type { FaqType } from "./faq-type";
import type { Link as LinkType } from "@/lib/linktype";

export default async function FAQ() {
  const data: FaqType | undefined = await getDocument<FaqType>("config", "faq");

  return (
    <Article className="container mx-auto py-10">
      <ol>
        {data?.questions.map((questionObj, i: number) => (
          <li key={i}>
            <section className="m-2">
              <h2 className="font-semibold !text-xl !md:text-2xl no-underline text-start">
                {questionObj.question}
              </h2>
              <Text className={"py-2"} text={questionObj.answer} />
              {questionObj.links && (
                <div className="content-center text-center">
                  {questionObj.links.map((link: LinkType, j: number) => (
                    <span key={j}>
                      <Link
                        className="m-5 rounded m-3 p-2 text-lg border border-slate-500 shadow-md"
                        href={link.url}
                        target={link.target ?? "_blank"}
                      >
                        {link.name}
                      </Link>
                    </span>
                  ))}
                </div>
              )}
            </section>
          </li>
        ))}
      </ol>
    </Article>
  );
}
