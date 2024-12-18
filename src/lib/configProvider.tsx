export type Config = {
  [key: string]: {
    name: string;
    aria_announcement?:string;
    title?: string;
    description?: string;
    text?: Text[];
    robots?: {
      [key: string]: any
    }
  } | any
};

export type Text = {
  title: string,
  text: string
}

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

export function getAltString(altObj: AltRecord, key: string, value: any) {
  // console.log(altObj, altObj[key]);
  if (altObj[key]) {
    const { prefix, postfix } = altObj[key];
    return `${prefix} ${value} ${postfix}`.trim();
  }
  return undefined;
}