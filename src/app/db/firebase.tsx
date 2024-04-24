import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  QuerySnapshot,
  getDoc,
} from "firebase/firestore";
import firebaseAuthKey from "../read-only_certificate.json";
import { DocumentSnapshot } from "firebase-admin/firestore";

const firebaseConfig = JSON.parse(JSON.stringify(firebaseAuthKey));

let app: any;
let db: any;

function getDB() {
  if (db == undefined) {
    app = initializeApp({
      ...firebaseConfig,
      projectId: firebaseConfig.project_id,
    });
    db = getFirestore(app);
  }
  return db;
}

export async function getConfig() {
  try {
    const collectionRef = collection(getDB(), "config");
    const querySnapshot: QuerySnapshot = await getDocs(collectionRef);
    if (querySnapshot.empty) {
      return [];
    }
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("Error geting data:", error);
  }
}

export async function getCollection(collection_name: string) {
  try {
    const collectionRef = collection(getDB(), collection_name);
    const querySnapshot: QuerySnapshot = await getDocs(collectionRef);
    if (querySnapshot.empty) {
      return [];
    }
    return querySnapshot.docs.map((doc) => doc.data());
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
