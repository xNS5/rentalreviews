import Image from "next/image";
import { getDocument } from "../db/db";
import parse from 'html-react-parser';
import type { About, AboutContent } from "./about-type";

import "./about.css";


export default async function About() {
  const aboutData: About | undefined = await getDocument<About>("config", "about");
  return (
    <div className="container mx-auto p-4 justify-center">
      {aboutData &&
        <>
          <h1 className="text-center text-6xl my-2">{aboutData.description}</h1>
          {aboutData.content.map((data: AboutContent, key: number) => {
            return (
              <article key={key} className="flex align-center">
                <section>
                  <Image
                    src={`${data.avatar.url}`}
                    alt=""
                    height={100}
                    width={100}
                    loading="lazy"
                    className="block rounded-full m-auto w-1/4 h-auto shadow-md"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  <div className="rounded border border-slate-300 px-5 mt-4 shadow-md">
                    <p>{parse(data.text)}</p>
                  </div>
                </section>
              </article>)
          })}
        </>
      }
    </div>
  );
}
