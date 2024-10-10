import { getDocument } from "../../db/db";
import Text from "@/components/text/text";
import Article from "@/components/article/article";
import type { Text as TextType } from "@/lib/config-provider";

// TODO fix this so it gets the config page instead of the individual document
export default async function PrivacyPolicy() {
  const data: TextType | undefined = await getDocument<TextType>(
    "config",
    "privacy-policy"
  );
  
  return (
      <Article className="container mx-auto px-4">
<Text text={data?.text ?? ""} />
      </Article>
  );
}
