import {getDocument} from "@/db/db"
import BasicPage from "@/components/basic-page/basicPage";
import { Config } from "@/lib/configProvider";

export async function generateMetadata() {
    const {metadata, privacy_policy}: Config | undefined = await getDocument<Config>("config", "config", 604800000);
    return {
        title: `${metadata.title} | ${privacy_policy.title}`,
        description: metadata.description
    }
}

export default async function Page() {
    const { privacy_policy } = await getDocument<Config>("config", "config", 604800000);
    return (
        <BasicPage data={privacy_policy}/>
    );
}

