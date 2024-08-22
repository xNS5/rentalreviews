import { firestoreGetCollection, firestoreGetDocument} from "./firebase";
import { mongoGetCollection, mongoGetDocument } from "./mongo";
import { development as isDevelopment} from "@/lib/config-provider";
import type { RequestType } from "./requesttype";

const CACHE_TTL: string = process.env.NEXT_PUBLIC_CACHE_TTL ?? "3600000"; // 1 hour if .env value isn't there. 

type TProps<T> = {
    [k: string]: string | number | T | T[keyof T]
}

export const getCollection = async<T extends TProps<T>>(collection: string): Promise<T[] | undefined> => {
    let collection_arr: T[] | undefined  = global.collectionCache.get(collection) ?? undefined;

    if(collection_arr === undefined){
        if(isDevelopment){
            collection_arr = await mongoGetCollection<T[]>(collection) ?? undefined;
        } else {
            collection_arr = await firestoreGetCollection<T[]>({collection_name: collection} as RequestType) ?? undefined;
        }
        global.collectionCache.set(collection, collection_arr, CACHE_TTL);
    }
    return collection_arr as T[];
}

export const getDocument = async<T extends TProps<T>>(collection: string, document_id: string): Promise<T | undefined> => {
    let document: T | undefined = global.documentCache.get(`${collection}/${document_id}`) ?? undefined;
    
    if(document === undefined){
        const collection_arr: T[] | undefined = global.collectionCache.get(collection) ?? undefined;
        if(collection_arr !== undefined){
            if(isDevelopment){
                document = collection_arr.find((doc: T) => doc._id == document_id); 
            } else {
                document = collection_arr.find((doc: T) => doc.id == document_id); 
            }
        } else {
            if(isDevelopment){
                document = await mongoGetDocument<T>(collection, document_id) ?? undefined;
            } else {
                document = await firestoreGetDocument<T>({collection_name: collection, query_props: {id: document_id} } as RequestType) ?? undefined ;
            }
        }
        global.documentCache.set(`${collection}/${document_id}`, document, `${CACHE_TTL}`);
    }
    return document as T;

}