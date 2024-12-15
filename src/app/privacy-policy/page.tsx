"use client"

import {useContext} from "react";
import Text from "@/components/text/text";
import Article from "@/components/article/article";
import {Config, ConfigContext} from "@/lib/configProvider";
import {notFound} from "next/navigation";

import "./privacy_policy.css";

export default function Page() {
  const { privacy_policy }: Config = useContext(ConfigContext);

  if(privacy_policy === undefined){
      console.error("Data is undefined. Check DB connection.");
      notFound();
  }


  return (
    <Article className="container" announcement={privacy_policy.aria_announcement ?? undefined}>
      <Text text={privacy_policy?.text ?? ""} />
    </Article>
  );
}

