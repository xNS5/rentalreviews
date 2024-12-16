"use client"

import React, {useContext} from "react";
import Text from "@/components/text/text";
import Article from "@/components/article/article";
import {Config, ConfigContext} from "@/lib/configProvider";
import {notFound} from "next/navigation";

import "./basicPage.css";

export default function BasicPage({configName}: Readonly<{
    configName: string
}>) {
    const config: Config = useContext(ConfigContext);

    if(config === undefined || !config.hasOwnProperty(configName)){
        console.error("Data is undefined. Check DB connection.");
        notFound();
    }

    return (
        <Article id={`basic-page-${configName}`} className="container" announcement={config[configName].aria_announcement ?? undefined}>
            <Text text={config[configName]?.text ?? ""} />
        </Article>
    );
}

