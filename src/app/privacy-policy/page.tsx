import {getDocument} from "@/db/db"
import BasicPage from "@/components/basic-page/basicPage";
import { Config } from "@/lib/configProvider";

export default async function Page() {
    const { privacy_policy } = await getDocument<Config>("config", "config", 604800000);
    return (
        <BasicPage data={privacy_policy}/>
    );
}

