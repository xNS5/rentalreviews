import { firestoreGetCollection, firestoreGetDocument } from "./firebase";
import { mongoGetCollection, mongoGetDocument } from "./mongo";
import { development as isDevelopment } from "@/lib/config-provider";
import type { RequestType } from "./requesttype";

const CACHE_TTL: number = process.env.NEXT_PUBLIC_CACHE_TTL ? parseInt(process.env.NEXT_PUBLIC_CACHE_TTL) || 3600000 : 3600000; // 1 month if .env value isn't there.

type TProps<T> = {
  [k: string]: string | number | T | T[keyof T];
};

export async function getCollection<T extends TProps<T>>(collection: string, TTL: number = CACHE_TTL): Promise<T[]> {
  let collection_arr: T[] | undefined = global.collectionCache?.get(collection) ?? undefined;

  if (collection_arr === undefined) {
    if (isDevelopment) {
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
  
  if (document === undefined) {
      if (isDevelopment) {
        document = await mongoGetDocument<T>(collection, document_id);
      } else {
        document = await firestoreGetDocument<T>({ collection_name: collection, query_props: { id: document_id } } as RequestType)
      }
      global.documentCache?.set(`${collection}/${document_id}`, document, TTL);
    }
    return document as T;
  }

