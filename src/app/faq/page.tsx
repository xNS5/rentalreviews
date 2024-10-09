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
    <Article className="flex flex-col container mx-auto py-10">
      <h1 className="md:text-4xl self-center mb-5">{data.description}</h1>
     <Suspense key={Math.random()} fallback={<Loading/>}>
     <ol>
        {data?.questions.map((questionObj, i: number) => (
          <li key={i}>
            <section className="m-2 flex flex-col">
              <h2 className="font-semibold !text-xl !md:text-2xl no-underline text-start">
                {questionObj.question}
              </h2>
              <Text className={"py-2"} text={questionObj.answer} />
              {questionObj.links && (
                <div className="content-center text-center m-5">
                  {questionObj.links.map((link: LinkType, j: number) => (
                    <span key={j}>
                      <Link
                        className="px-5 py-3 rounded text-xl border border-slate-500 shadow-md"
                        href={link.url}
                        target={link.target ?? "_blank"}
                        tabIndex={0}
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
      </ol></Suspense>
    </Article>
  );
}
