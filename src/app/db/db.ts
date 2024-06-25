import { getCollection as firestoreGetCollection, getDocument  as firestoreGetDocument} from "./firebase";
import { getCollection as mongoGetCollection, getDocument as mongoGetDocument } from "./mongo";


const isLocal = process.env.NEXT_PUBLIC_DB_ENV == "local";

export const getCollection = async<T>(collection: string): Promise<T[] | undefined> => {
    if(isLocal){
        const collection_arr: T[] | undefined = await mongoGetCollection<T[]>(collection);
        return collection_arr;
    } else {
        const collection_arr: T[] | undefined = await firestoreGetCollection<T[]>(collection)
        return collection_arr;
    }
}

export const getDocument = async<T>(collection: string, document_id: string): Promise<T | []> => {
    if(isLocal){
        const document: T | undefined = await mongoGetDocument<T>(collection, document_id);
        if(document === undefined){
            return [];
        }
        return document;
    } else {
        const document: T | undefined = await firestoreGetDocument<T>(collection, {query_key: "id", query_value: document_id});
        if(document === undefined){
            return [];
        }
        return document;
    }
}