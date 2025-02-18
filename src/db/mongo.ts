import { MongoClient, ObjectId } from "mongodb";

function getClient() {
  return new MongoClient(
    `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}`
  );
}

export const mongoGetCollection = async <T>(collection: string) => {
  const client = getClient();
  try {
    await client.connect();
    const db = client.db("rentalreviews");
    const collection_data = db.collection(collection);
    const data = await collection_data.find({}).toArray();
    return data as unknown as T;
  } catch (err) {
    console.error("Error getting data: ", err);
  } finally {
    await client.close();
  }
};

export const mongoGetDocument = async <T>(collection: string, document_id: string) => {
  const client = getClient();
  try {
    await client.connect();
    const db = client.db("rentalreviews");
    const collection_data = db.collection(collection);
    const data = await collection_data.findOne({_id: document_id as unknown as ObjectId });
    return data as unknown as T;
  } catch (err) {
    console.error("Error getting data: ", err);
  } finally {
    await client.close();
  }
};
