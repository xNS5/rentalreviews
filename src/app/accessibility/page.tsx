import BasicPage from "@/components/basic-page/basicPage";
import { getDocument } from "@/db/db";
import { Config } from "@/lib/configProvider";

export default async function Page() {
  const { accessibility } = await getDocument<Config>("config", "config");
  return <BasicPage data={accessibility} />;
}
