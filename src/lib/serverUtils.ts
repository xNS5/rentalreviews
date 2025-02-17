import {PrefixPostfix} from "@/lib/types";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isValidSlug(slug: string): boolean{
  // If slug has values that aren't lower case characters, numbers or a '-' -> return "false"
  // If the slug doesn't have invalid characters -> return true
  // Commenting this because logic is confusing and I'm dumb.
  const slug_regex_test = new RegExp('[^a-z0-9-]');
  return !slug_regex_test.test(slug);
}


export function getAltString(altObj: {[key: string]: PrefixPostfix}, key: string, value: string | number): string | undefined {
  // console.log(altObj, altObj[key]);
  if (altObj[key]) {
    const { prefix, postfix } = altObj[key];
    return `${prefix} ${value} ${postfix}`.trim();
  }
  return undefined;
}