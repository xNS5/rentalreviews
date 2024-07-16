"use server"

import { Footer } from "@/components/footer/footer";
import { getDocument } from "./db/db"
import { Config } from "@/lib/configtype";

export async function FooterWrapper(){
    const footerData = await getDocument<Config>("config", "footer");
    return <Footer {...footerData}/>
}