import Image from "next/image";
import { getDocument } from "../db/db";
import parse from 'html-react-parser';
import Link from "next/link";
import Icon from "@/components/icons/icon";
import type { About, AboutContent, Link as AboutLink} from "./about-type";

import "./about.css";


export default async function About() {
  const aboutData: About | undefined = await getDocument<About>("config", "about");
  return (
    <div className="container mx-auto p-4 justify-center">
      {aboutData &&
        <>
          {aboutData.content.map((data: AboutContent, key: number) => {
            return (
              <article key={key} className="flex align-center">
                <section>
                  <div className="block">
                    <Image
                      src={`${data.avatar.url}`}
                      alt=""
                      height={100}
                      width={100}
                      loading="lazy"
                      className="rounded-full m-auto w-1/4 h-auto shadow-md"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {data.links &&
                      <div className="m-auto py-2 w-1/4 text-center">
                        <h2>{data.links.heading}</h2>
                      {data.links.children.map((item: AboutLink, itemIndex: number) => 
                        <Link key={itemIndex} href={item.url ?? ""} target="_blank">
                            {item.icon && item.icon.length > 0 ? (
                                <Icon type={item.icon} className="!w-10 !h-10 px-3" aria-hidden={true}/>
                            ) : (
                                <span className="hover:text-blue-900 rounded">
                                    {item.name}
                                </span>
                            )}
                        </Link>
                      )}
                      </div>}
                  </div>

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
