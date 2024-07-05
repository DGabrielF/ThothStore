import { getFirestore, doc, addDoc, getDoc, getDocs, setDoc, deleteDoc, collection, query, limit, startAfter, updateDoc, arrayUnion } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

import { app } from "./fireapp.js"
import { firebaseErrorMessage } from './errors.js';

const db = getFirestore(app)

export const Firestore = {
  create: async () => {},
  fetch: async () => {},
  limitedFetch: async () => {},
  update: async () => {},
  delete: async () => {}
}

Firestore.create = async (collectionName, data) => {
  try {
    const collectionRef = collection(db, collectionName);
    const documentRef = await addDoc(collectionRef, data);
    return documentRef;
  } catch (error) {
    return firebaseErrorMessage[error.message] || error.message;
  }
}

//  TODO fetch e limitedFetch

Firestore.update = async (collectionName, docId, newData) => {
  try {
    const collectionRef = collection(db, collectionName);
    const documentRef = await getDoc(collectionRef, docId);
    const data = documentRef.data();
    for (const key in newData) {
      if (newData.hasOwnProperty(key) && newData[key]) {
        data[key = newData[key]];
      }
    }
    await setDoc(documentRef, data)
    return documentRef;
  } catch (error) {
    return firebaseErrorMessage[error.message] || error.message;
  }
}

Firestore.delete = async (collectionName, docId) => {
  try {
    const collectionRef = collection(db, collectionName);
    const documentRef = await getDoc(collectionRef, docId);
    await deleteDoc(documentRef);
    return documentRef;
  } catch (error) {
    return firebaseErrorMessage[error.message] || error.message;
  }
}