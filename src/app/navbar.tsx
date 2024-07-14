"use server"

import { NavbarComp } from "@/components/navbar/navbar";
import { getDocument } from "./db/db"

export async function Navbar() {
    const navbarConfig = await getDocument("config", "navigation");
    return <NavbarComp {...navbarConfig}/>
}