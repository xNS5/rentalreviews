import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  query,
} from "firebase/firestore";
import type { Firestore } from "firebase/firestore";
import type { FirebaseApp } from "firebase/app";
import type { RequestType } from "./requesttype";

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

const app: FirebaseApp = initializeApp(firebaseConfig());
const db: Firestore = getFirestore(app);

export const firestoreGetCollection = async <T>(props: RequestType): Promise<T | undefined>=> {
  try {
    const {collection_name} = props;
    const collectionRef = collection(db, collection_name);
    const queryRef = query(collectionRef);
    const docSnapshot = await getDocs(queryRef);
    if(docSnapshot.empty){

    }
    return docSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()})) as T;
  } catch (error) {
    console.error("Error geting data:", error);
  }
}

export const firestoreGetDocument = async <T>(props: RequestType) => {
  try {
    const {collection_name} = props;
    const {id} = props.query_props;
    const docRef = doc(db, collection_name, `${id}`);
    const docSnapshot = await getDoc(docRef);
    if(!docSnapshot.exists()){
      return {} as T;
    }
    return docSnapshot.data() as T;
  } catch (error) {
    console.error("Error geting data:", error); 

    return undefined;
  }
}