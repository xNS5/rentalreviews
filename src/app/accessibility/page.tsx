import BasicPage from "@/components/basic-page/basicPage";
import { getDocument } from "@/db/db";
import type { Config } from "@/lib/types";

export async function generateMetadata() {
  const {metadata, accessibility} = await getDocument<Config>("config", "config", 604800000);
  return {
    title: `${metadata.title} | ${accessibility.title}`,
    description: metadata.description
  }
}

export default async function Page() {
  const { accessibility } = await getDocument<Config>("config", "config");
  return <BasicPage data={accessibility} />;
}
