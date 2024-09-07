import Text from "@/components/text/text";
import { notFound } from "next/navigation";
import { getDocument } from "./db/db";
import type { Config, Text as TextType } from "@/lib/config-provider";

export default async function Home() {
  
  const data: Config | undefined = await getDocument<Config>("config", "home")

  if(data == undefined){
    notFound();
  }

  return (
    <div className="container mx-auto px-4">
      <section className="my-20">
        {data?.content?.map((elem: TextType, i: number) => (
          <div key={i} role="article">
            <h1 className="text-center text-2xl md:text-4xl py-5">{elem.title}</h1>
            <div className="md:px-15 py-10 border border-slate-400 rounded shadow-lg">
              <Text text={elem.text} className="text-lg px-5 xs:text-base xl:text-xl indent-10" />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
