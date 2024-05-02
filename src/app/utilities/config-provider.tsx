import { promises as fs } from 'fs';
import nav from "@/app/static/config/nav.json";

const configPath = "../static/config";


export async function getConfigForPage(filePath: string) {
    const res = await fetch(`${configPath}/${filePath}.json`);
    const data = JSON.parse(await res.json());
    return data;
}

export function getNavbarConfig() {
    const navJson = JSON.parse(JSON.stringify(nav));
    console.log(navJson);
    return navJson;
}

export async function getMetadata(){
    const ret = await getConfigForPage("metadata");
    return ret;
}
