import { getCollection as firestoreGetCollection, getDocument  as firestoreGetDocument} from "./firebase";
import { getCollection as mongoGetCollection, getDocument as mongoGetDocument } from "./mongo";


const isLocal = process.env.NEXT_PUBLIC_ENV == "local";

export const getCollection = async(collection: string) => {
    if(isLocal){
        return mongoGetCollection(collection);
    } else {
        return firestoreGetCollection(collection);
    }
}

export const getDocument = async(collection: string, document_id: string) => {
    if(isLocal){
        return mongoGetDocument(collection, document_id);
    } else {
        return mongoGetDocument(collection, document_id);
    }
}