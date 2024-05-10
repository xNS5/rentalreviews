import nav from "@/app/static/config/nav.json";
import metadata from "@/app/static/config/metadata.json";
import footer from "@/app/static/config/footer.json";

const configPath = "../static/config";


export async function getConfigForPage(filePath: string) {
    const res = await fetch(`${configPath}/${filePath}.json`);
    console.log("RES: ", res);
    const data = JSON.parse(await res.json());
    return data;
}

export function getFooter(){
    const footerJSON = JSON.parse(JSON.stringify(footer));
    return footerJSON;
}

export function getMetadata(){
    const metadataJson = JSON.parse(JSON.stringify(metadata));
    return metadataJson;
}

export function getNavbarConfig() {
    const navJson = JSON.parse(JSON.stringify(nav));
    return navJson;
}
