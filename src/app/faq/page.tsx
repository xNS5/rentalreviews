import React, { Suspense } from "react";
import Link from "next/link";
import Text from "@/components/text/text";
import Article from "@/components/article/article";
import { getDocument } from "../../db/db";
import type { FaqType } from "./faq-type";
import type { Link as LinkType } from "@/lib/linktype";
import Loading from "../loading";

export default async function FAQ() {
  const data: FaqType | undefined = await getDocument<FaqType>("config", "faq");

  return (
    <Article className="container mx-auto py-10">
      <h1 className="text-center mb-5"><b>{data.description}</b></h1>
     <Suspense key={Math.random()} fallback={<Loading/>}>
     <ol>
        {data?.questions.map((questionObj, i: number) => (
          <li key={i}>
            <section className="m-2">
              <h2 className="font-semibold !text-xl !md:text-2xl no-underline text-start">
                {questionObj.question}
              </h2>
              <Text className={"py-2"} text={questionObj.answer} />
              {questionObj.links && (
                <div className="content-center text-center m-5">
                  {questionObj.links.map((link: LinkType, j: number) => (
                    <span key={j}>
                      <Link
                        className="p-2 rounded text-xl border border-slate-500 shadow-md"
                        href={link.url}
                        target={link.target ?? "_blank"}
                      >
                        <button className="w-40">
                        {link.name}
                        </button>
                      </Link>
                    </span>
                  ))}
                </div>
              )}
            </section>
          </li>
        ))}
      </ol></Suspense>
    </Article>
  );
}
