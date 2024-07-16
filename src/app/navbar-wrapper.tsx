"use server"

import { Navbar } from "@/components/navbar/navbar";
import { getDocument } from "./db/db"

export async function NavbarWrapper() {
    const navbarConfig = await getDocument("config", "navigation");
    return <Navbar {...navbarConfig}/>
}