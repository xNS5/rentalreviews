import Text from "@/components/text/text";
import Article from "@/components/article/article";
import {Config} from "@/lib/configProvider";

import "./basicPage.css";

export default function BasicPage({data}: Readonly<{
    data: Config
}>) {
    return (
        <Article id={`basic-page-${data.name}`} className="container" announcement={data.aria_announcement ?? undefined}>
            <Text text={data?.text ?? ""} />
        </Article>
    );
}

