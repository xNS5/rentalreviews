"use server"

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  where,
  getDocs,
  QuerySnapshot,
  getDoc,
  DocumentData,
  QueryDocumentSnapshot,
  query,
  startAt as fbStartAt,
  endAt as fbEndAt,
  orderBy,
  limit,
} from "firebase/firestore";
import { converter } from "./firebase-converter";
import { unstable_cache as cache } from "next/cache";

let app: any;
let db: any;

const firebaseConfig = () => {

  const configObj = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  return configObj; 
}

function getDB() {
  if (db == undefined) {
    app = initializeApp(firebaseConfig());
    db = getFirestore(app);
  }
  return db;
}

const getCollectionImpl = async <T extends DocumentData>(collection_name: string, startAt?: number, endAt?: number) => {
  try {
    const collectionRef = collection(getDB(), collection_name).withConverter(converter<T>());
    let startAtVal = startAt ?? 0;
    let endAtVal = endAt ?? 1000;
    const queryHandler = query(collectionRef, orderBy("name"), fbStartAt(startAtVal), limit(endAtVal - startAtVal))
    const querySnapshot: QuerySnapshot = await getDocs(queryHandler)
    if (querySnapshot.empty) {
      return [] as unknown as T;
    }
    return querySnapshot.docs.map((doc) => doc.data()) as unknown as T; 
  } catch (error) {
    console.error("Error geting data:", error);
  }
}

  const getDocumentImpl = async <T extends DocumentData>( collection_name: string, query_props: {query_key: string, query_value: string | number})=> {
  try {
    const collectionRef = collection(getDB(), collection_name).withConverter(converter<T>());
    const queryHandler = query(collectionRef, where(query_props.query_key, "==", query_props.query_value))
    const querySnapshot = await getDocs(queryHandler);
    
    if(querySnapshot.empty){
      throw new Error("Query returned no data");
    }

    const doc = querySnapshot.docs[0];
    return doc.data() as unknown as T;
  } catch (error) {
    console.error("Error geting data:", error);
    return undefined;
  }
}

export const getCollection = cache(
  /* fetch function */ getCollectionImpl,
  /* unique key     */ ["getCollectionImpl"],
  /* options        */ {
    tags: ["getCollectionImpl"],
    revalidate: 60 * 60 * 24 /* same as fetch.revalidate */
  }
)

export const getDocument = cache(
  /* fetch function */ getDocumentImpl,
  /* unique key     */ ["getDocumentImpl"],
  /* options        */ {
    tags: ["getDocumentImpl"],
    revalidate: 60 * 60 * 24 /* same as fetch.revalidate */
  }
)