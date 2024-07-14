"use server"

import { FooterComp } from "@/components/footer/footer";
import { getDocument } from "./db/db"

export async function Footer(){
    const footerData = await getDocument("config", "footer");
    return <FooterComp {...footerData}/>
}