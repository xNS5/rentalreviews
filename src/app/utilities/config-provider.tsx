"use server"

import { promises as fs } from "fs";

const config: {[key: string]: string} = {
  "config": "config.json",
  "about": "about.json",
  "contact": "contact.json",
  "home": "home.json",
  "privacy-policy": "privacy-policy.json",
  "resources": "resources.json"
}

const development: boolean =  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';


// Currently not in use, but it would be usefil to keep this function. 
export async function getConfig(filePath: string) {
  const file = await fs.readFile(
    process.cwd() + `/src/static/config/${filePath}.json`,
    "utf-8"
  );
  const data = JSON.parse(file);
  return data;
}


export async function getRemoteConfig(configName: string){
  const value = config[configName] ?? "config.json";
  const data = await fetch(`https://raw.githubusercontent.com/xNS5/rentalreviewsconfig/${development ? "development" : "master"}/src/config/${value}`, { cache: "no-store"});
  const json = await data.json();
  return json;
}

