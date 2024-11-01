"use client"

import { createContext } from "react";

export type Config = {
  [key: string]: {
    name: string;
    title?: string;
    description?: string;
    text?: Text[];
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
  if (altObj[key]) {
    const { prefix, postfix } = altObj[key];
    return `${prefix} ${value} ${postfix}`.trim();
  }
  return "undefined";
}


export const development: boolean = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export const ConfigContext = createContext({});

export function Config({ data, children }: Readonly<{
  data: Config;
  children: React.ReactNode;
}>) {
  return (
    <ConfigContext.Provider value={data}>
      {children}
    </ConfigContext.Provider>
  )
}