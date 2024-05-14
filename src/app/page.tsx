import { getRemoteConfig } from "./utilities/config-provider";
import Text from "./components/text/text";
import type { Config, Text as TextType } from "./configtype";

export default async function Home() {
  const data: Config = await getRemoteConfig("home");

  return (
    <div className="container mx-auto px-4">
      <section className="py-5">
        {data.content?.map((elem: TextType, i: number) =>
          <div key={i}>
            <h1 className="text-center text-3xl py-5">{elem.title}</h1>
            <Text {...elem} />
          </div>
        )}
      </section>
    </div>
  );
}
