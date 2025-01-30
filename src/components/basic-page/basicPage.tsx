import Text from "@/components/text/text";
import Article from "@/components/article/article";
import { Page } from "@/lib/types"

import "./basicPage.css";

export default function BasicPage({data}: Readonly<{
    data: Page
}>) {

    return (
        <Article id={`basic-page-${data.name}`} className="container">
            <Text text={data?.text ?? ""} />
        </Article>
    );
}

