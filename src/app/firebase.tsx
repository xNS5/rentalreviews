import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import firebaseAuthKey from "./read-only_certificate.json";

const firebaseConfig = JSON.parse(JSON.stringify(firebaseAuthKey));

const app = initializeApp({})
const db = getFirestore(app)

export { app, db } 