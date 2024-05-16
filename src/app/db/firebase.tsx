"use server"

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  QuerySnapshot,
  getDoc,
  DocumentData,
  QueryDocumentSnapshot,
  query,
} from "firebase/firestore";
import { converter } from "./firebase-converter";

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

export async function getCollection<T extends DocumentData>(collection_name: string, startAt?: number, endAt?: number){
  try {
    const collectionRef = collection(getDB(), collection_name).withConverter(converter<T>());
    let startAtVal = startAt ?? 0;
    let endAtVal = endAt ?? 1000;
    const querySnapshot: QuerySnapshot = await getDocs(collectionRef);
    if (querySnapshot.empty) {
      return [] as unknown as T;
    }
    return querySnapshot.docs.map((doc) => doc.data()) as unknown as T; 
  } catch (error) {
    console.error("Error geting data:", error);
  }
}

export async function getDocument(
  collection_name: string,
  document_name: string
) {
  try {
    const collectionRef = collection(getDB(), collection_name);
    const querySnapshot: QuerySnapshot = await getDocs(collectionRef);
    if (querySnapshot.empty) {
      return {};
    }
    querySnapshot.forEach((doc) => {
      if (doc.id === document_name) {
        return doc.data();
      }
    });
    return null;
  } catch (error) {
    console.error("Error geting data:", error);
  }
}