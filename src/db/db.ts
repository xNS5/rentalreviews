import { firestoreGetCollection, firestoreGetDocument } from "./firebase";
import { mongoGetCollection, mongoGetDocument } from "./mongo";
import type { RequestType } from "@/lib/types";

const CACHE_TTL: number = process.env.NEXT_PUBLIC_CACHE_TTL ? parseInt(process.env.NEXT_PUBLIC_CACHE_TTL) || 3600000 : 3600000; // 1 month if .env value isn't there.
export const DB_ENV = process.env.NEXT_PUBLIC_DB_ENV ?? "local";

export enum DB_ENVS {
  LOCAL = "local",
  TEST = "test",
  PRODUCTION = "production"
}

type TProps<T> = {
  [k: string]: string | number | T | T[keyof T];
};

export async function getCollection<T extends TProps<T>>(collection: string, TTL: number = CACHE_TTL): Promise<T[]> {
  let collection_arr: T[] | undefined = global.collectionCache?.get(collection) ?? undefined;

  collection = collection.trim();

  if (collection_arr === undefined) {
    if (process.env.NEXT_PUBLIC_DB_ENV === "local") {
      collection_arr = (await mongoGetCollection<T[]>(collection)) ?? undefined;
    } else {
      collection_arr = (await firestoreGetCollection<T[]>({ collection_name: collection } as RequestType)) ?? undefined;
    }
    global.collectionCache?.set(collection, collection_arr, TTL);
  }
  return collection_arr as T[];
}

export async function getDocument<T extends TProps<T>>(collection: string, document_id: string, TTL: number = CACHE_TTL): Promise<T> {
  let document: T | undefined = global.documentCache?.get(`${collection}/${document_id}`) ?? undefined;
  collection = collection.trim();
  document_id = document_id.trim();

  if (document === undefined) {
      if (process.env.NEXT_PUBLIC_DB_ENV === "local") {
        document = await mongoGetDocument<T>(collection, document_id);
      } else {
        document = await firestoreGetDocument<T>({ collection_name: collection, query_props: { id: document_id } } as RequestType)
      }
      global.documentCache?.set(`${collection}/${document_id}`, document, TTL);
    }
    return document as T;
  }

