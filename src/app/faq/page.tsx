import Link from "next/link";
import Text from "@/components/text/text";
import Article from "@/components/article/article";
import { Config, Faq, Link as LinkType } from "@/lib/types";
import { getDocument } from "@/db/db";

export async function generateMetadata() {
  const {metadata, faq}: Config | undefined = await getDocument<Config>("config", "config", 604800000);
  return {
    title: `${metadata.title} | ${faq.title}`,
    description: metadata.description
  }
}

export default async function Page() {
  const { faq, metadata } = await getDocument<Config>("config", "config", 604800000);

  return (
    <Article
      className="container"
      announcement={metadata.aria_announcement?.faq ?? undefined}
    >
      <div className="flex flex-col text-center py-2">
        <h1 className="md:text-4xl">{faq.title}</h1>
        <h2 className="md:text-2xl no-underline font-normal">
          {faq.description}
        </h2>
      </div>
      <ol>
        {faq?.questions.map((questionObj, i: number) => (
          <section key={i}>
            <li key={i}>
              <section className="m-2 flex flex-col">
                <h2 className="font-semibold md:text-2xl text-start underline">
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
                          tabIndex={-1}
                        >
                          {link.name}
                        </Link>
                      </span>
                    ))}
                  </div>
                )}
              </section>
            </li>
          </section>
        ))}
      </ol>
    </Article>
  );
}
