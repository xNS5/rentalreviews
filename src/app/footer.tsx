"use server"

import { FooterComp } from "@/components/footer/footer";
import { getDocument } from "./db/db"
import { Config } from "@/lib/configtype";

export async function Footer(){
    const footerData = await getDocument<Config>("config", "footer");
    return <FooterComp {...footerData}/>
}