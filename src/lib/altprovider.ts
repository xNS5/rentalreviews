import { getDocument } from "@/db/db";

export type Alt = {
  [key: string]: AltRecord;
};

export type AltRecord = {
  [key: string]: PrefixPostfix;
};

export type PrefixPostfix = {
  prefix: string;
  postfix: string;
};

async function getAlt() {
  const alt: Alt = await getDocument<Alt>("config", "alt");
  return alt;
}

export async function getAltObj(page: string) {
  const alt: Alt = await getAlt();
  return alt[page];
}

export async function getAltStringAsync(
  value: string | number,
  page: string,
  key: string
) {
  const alt: AltRecord = await getAltObj(page);
  if (alt[key]) {
    const { prefix, postfix } = alt[key];
    return `${prefix} ${value} ${postfix}`;
  }
  return "undefined"
}
