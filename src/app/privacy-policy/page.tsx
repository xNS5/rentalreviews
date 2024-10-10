import { getDocument } from "../../db/db";
import Text from "@/components/text/text";
import Article from "@/components/article/article";
import type { Config, Text as TextType } from "@/lib/config-provider";

import "./privacy_policy.css";

// TODO fix this so it gets the config page instead of the individual document
export default async function PrivacyPolicy() {
  const { privacy_policy }: Config | undefined = await getDocument<Config>("config", "config");

  return (
    <Article className="flex flex-col px-4">
      <Text text={privacy_policy?.text ?? ""} />
    </Article>
  );
}

