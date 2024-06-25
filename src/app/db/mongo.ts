import { MongoClient, ObjectId } from 'mongodb';
import { unstable_cache as cache } from "next/cache";

function getClient(){
    return new MongoClient(`mongodb://${process.env.NEXT_PUBLIC_MONGODB_USER}:${process.env.NEXT_PUBLIC_MONGODB_PASSWORD}@${process.env.NEXT_PUBLIC_MONGODB_URL}`);
}

const getCollectionImpl = async <T>(collection: string) => {
    const client = getClient();
    try{
        await client.connect();
        const db = client.db("rentalreviews");
        const collection_data = db.collection(collection);
        const data = await collection_data.find({}).toArray()
        return data as unknown as T;
    } catch(err){
        console.error("Error getting data: ", err);
    }
}

const getDocumentImpl = async <T>(collection: string, document_id: string) => {
    const client = getClient();
    try{
        await client.connect();
        const db = client.db("rentalreviews");
        const collection_data = db.collection(collection);
        const data = await collection_data.findOne({ _id: document_id})
        return data as unknown as T;
    } catch(err){
        console.error("Error getting data: ", err);
    }
}


export const getCollection = cache(
/* fetch function */ getCollectionImpl,
  /* unique key     */ ["mongoCollection"],
  /* options        */ {
    tags: ["mongoCollection"],
    revalidate: 86400 /* 1 week in seconds*/
  }
)

export const getDocument = cache(
    /* fetch function */ getDocumentImpl,
    /* unique key     */ ["mongoDocuments"],
    /* options        */ {
      tags: ["mongoDocuments"],
      revalidate: 86400 /* 1 week in seconds */
    }
  )