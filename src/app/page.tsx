import { getRemoteConfig } from "./utilities/config-provider";
import Text from "./components/text/text";
import type { Config, Text as TextType } from "./utilities/configtype";

export default async function Home() {
  const data: Config = await getRemoteConfig("home");

  return (
    <div className="container mx-auto px-4">
      <section className="my-20">
        {data.content?.map((elem: TextType, i: number) => (
          <div key={i}>
            <h1 className="text-center underline underline-offset-8 decoration-slate-300 text-3xl py-5">{elem.title}</h1>
            <div className="lg:px-20 xs:px-10 py-5">
              <Text {...elem} className="text-lg xs:text-base xl:text-xl indent-10" />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
