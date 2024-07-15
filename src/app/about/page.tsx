import Image from "next/image";
import { getDocument } from "../db/db";
import parse from 'html-react-parser';
import type { About, AboutContent } from "./about-type";


export default async function About() {
  const aboutData: About | undefined = await getDocument<About>("config", "about");
  return (
    <div className="container mx-auto px-4">
      {aboutData &&
        <>
          <h1>{aboutData.description}</h1>
          {aboutData.content.map((data: AboutContent, key: number) => {
            return (<section key={key}>
              <Image
                src={`${data.avatar.url}`}
                alt=""
                height={100}
                width={100}
                loading="lazy"
              />
              {parse(data.text)}
            </section>)
          })}
        </>
      }
    </div>
  );
}
