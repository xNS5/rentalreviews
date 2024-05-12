"use client"

import { getConfigForPage } from "./utilities/config-provider";
import { useEffect, useState } from "react";

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

export default function Home() {
  const [data, setData] = useState<Home>()

  useEffect(() => {
    getConfigForPage("home").then(data => setData(data));
  }, [])

  return (
    <div className="container mx-auto px-4">
      {data && (<div>
        <h1 className="text-2xl text-center py-4">{data?.title}</h1>
        <div className="w-full h-screen bg-green-300"></div>

      </div>)}
    </div>
  );
}
