import { getConfig } from "./utilities/config-provider";

type Home = {
  name: string,
  title: string,
  description: string,
  text: [
    {
      title: string,
      format: string,
      text: string
    }
  ]
}

export default async function Home() {
  const data: Home = await getConfig("home");

  return (
    <div className="container mx-auto px-4">
      <div className="py-5">
      <h1 className="text-center text-3xl">{data.title}</h1>
      <h2 className="text-center text-l">{data.description}</h2>
      </div>

    </div>
  );
}
