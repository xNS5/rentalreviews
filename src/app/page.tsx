import React, { Suspense } from "react";
import Text from "@/components/text/text";
import { notFound } from "next/navigation";
import {Config} from "@/lib/configProvider";
import Loading from "./loading";
import Article from "@/components/article/article";
import {getDocument} from "@/db/db";
import type { Text as TextType } from "@/lib/configProvider";

export async function generateMetadata() {
  const {metadata, home}: Config | undefined = await getDocument<Config>("config", "config", 604800000);
  return {
    title: `${metadata.title} | ${home.title}`,
    description: metadata.description
  }
}

export default async function Home() {
  const { home }: Config = await getDocument<Config>("config", "config");

  if (home == undefined) {
    console.error("Data is undefined. Check DB connection.");
    notFound();
  }

  return (
    <div className="container mx-auto px-4">
      <Suspense key={Math.random()} fallback={<Loading />}>
        <Article announcement={home?.aria_announcement ?? undefined}>
          <section className="my-20">
            {home?.content?.map((elem: TextType, i: number) => (
              <div key={i} role="article">
                <h1 className="text-center md:text-4xl py-5">{elem.title}</h1>
                <div className="md:px-15 py-10 border border-slate-400 rounded shadow-lg">
                  <Text
                    text={elem.text}
                    className="text-lg px-5 xs:text-base xl:text-xl indent-10"
                  />
                </div>
              </div>
            ))}
          </section>
        </Article>
      </Suspense>
    </div>
  );
}
