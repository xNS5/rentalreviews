import { getConfig } from "./utilities/config-provider";
import type { Config, Text } from "./configtype";

export default async function Home() {
  const data: Config = await getConfig("home");

  return (
    <div className="container mx-auto px-4">
      <section className="py-5">
        <h1 className="text-center text-3xl">{data.title}</h1>
        <h2 className="text-center text-l">{data.description}</h2>
      </section>
    </div>
  );
}
