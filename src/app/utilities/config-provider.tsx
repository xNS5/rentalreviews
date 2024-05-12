"use server"

import { promises as fs } from "fs";

export async function getConfig(filePath: string) {
  const file = await fs.readFile(
    process.cwd() + `/src/static/config/${filePath}.json`,
    "utf-8"
  );
  const data = JSON.parse(file);
  return data;
}