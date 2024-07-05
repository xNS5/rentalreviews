import { getCollection as firestoreGetCollection, getDocument  as firestoreGetDocument} from "./firebase";
import { getCollection as mongoGetCollection, getDocument as mongoGetDocument } from "./mongo";
import { CACHE_TTL } from "@/lib/utils";
import type { RequestType } from "./requesttype";


const isLocal = process.env.NEXT_PUBLIC_DB_ENV == "local";

export const getCollection = async<T>(collection: string): Promise<T[] | undefined> => {
    let collection_arr: T[] | undefined  = global.collectionCache.get(collection) ?? undefined;

    if(!collection_arr){
        if(isLocal){
            collection_arr = await mongoGetCollection<T[]>(collection);
            return collection_arr;
        } else {
            collection_arr = await firestoreGetCollection<T[]>({collection_name: collection} as RequestType)
        }
        global.collectionCache.set(collection, collection_arr, `${CACHE_TTL}`);
    }

    return collection_arr;
}

export const getDocument = async<T>(collection: string, document_id: string): Promise<T | {}> => {
    
    let document: T | undefined = global.documentCache.get(`${collection}/${document_id}`) ?? undefined;

    if(!document){
        if(isLocal){
            document = await mongoGetDocument<T>(collection, document_id) ?? {} as T;
        } else {
            document = await firestoreGetDocument<T>({collection_name: collection, query_props: {id: document_id} } as RequestType) ?? {} as T;
        }
        
        global.documentCache.set(`${collection}/${document_id}`, document, `${CACHE_TTL}`);
    }
    return document;

}