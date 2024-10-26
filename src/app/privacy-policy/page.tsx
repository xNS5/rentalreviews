"use client"

import {useContext} from "react";
import Text from "@/components/text/text";
import Article from "@/components/article/article";
import {Config, ConfigContext} from "@/lib/configProvider";

import "./privacy_policy.css";


export default async function PrivacyPolicy() {
  const { privacy_policy }: Config = useContext(ConfigContext)

  return (
    <Article className="container">
      <Text text={privacy_policy?.text ?? ""} />
    </Article>
  );
}

