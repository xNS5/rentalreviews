import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: any, res: any) {
    const client = new MongoClient(`mongodb://${process.env.NEXT_PUBLIC_MONGODB_USER}:${process.env.NEXT_PUBLIC_MONGODB_PASSWORD}@${process.env.NEXT_PUBLIC_MONGODB_URL}`);
    try{
        await client.connect();
        const db = client.db("rentalreviews");
        const collection = db.collection("companies");
        const data = await collection.find({}).toArray()
        return data;
    } catch(err){
        console.error(err);
        {message: "Something got fucky-wuckied"};
    }
}