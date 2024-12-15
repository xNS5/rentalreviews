"use client"

import React, {useContext} from "react";
import Text from "@/components/text/text";
import Article from "@/components/article/article";
import {Config, ConfigContext} from "@/lib/configProvider";
import {notFound} from "next/navigation";

import "./accessibility.css";

export default function Page() {
    const { accessibility }: Config = useContext(ConfigContext);

    if(accessibility === undefined){
        console.error("Data is undefined. Check DB connection.");
        notFound();
    }

    return (
        <Article className="container" announcement={accessibility.aria_announcement ?? undefined}>
            <Text text={accessibility?.text ?? ""} />
        </Article>
    );
}

