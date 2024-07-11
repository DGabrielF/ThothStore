import { getFirestore, doc, addDoc, getDoc, getDocs, setDoc, deleteDoc, collection, query, where} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

import { app } from "./fireapp.js"
import { firebaseErrorMessage } from './errors.js';

const db = getFirestore(app)

export const Firestore = {
  create: async () => {},
  createIfNotExists: async () => {},
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

Firestore.checkIfExists = async (collectionName, data, criteria) => {
  try {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, where(criteria, "==", data[criteria]));
    const snapshot = await getDocs(q);
    return (snapshot.empty) ? null : snapshot
  } catch (error) {
    return firebaseErrorMessage[error.message] || error.message;
  }
}

Firestore.fetch = async (collectionName) => {
  try {
    const collectionRef = collection(db, collectionName);
    const snapshot = await getDocs(collectionRef);
    const data = snapshot.docs.map( (doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    return data;
  } catch (error) {
    return firebaseErrorMessage[error.message];
  }
}

//  TODO e limitedFetch

Firestore.update = async (collectionName, docId, newData) => {
  try {
    const collectionRef = collection(db, collectionName);
    const documentRef = doc(collectionRef, docId);
    const snapshot = await getDoc(documentRef);

    if (snapshot.exists()) {
      const data = snapshot.data();
      for (const key in newData) {
        if (newData.hasOwnProperty(key) && newData[key]) {
          data[key] = newData[key];
        }
      }
      await setDoc(documentRef, data);
      return documentRef;
    } else {
      return "Document does not exist";
    }
  } catch (error) {
    return firebaseErrorMessage[error.message] || error.message;
  }
}

Firestore.delete = async (collectionName, docId) => {
  try {
    const documentRef = doc(db, collectionName, docId);
    const snapshot = await getDoc(documentRef);
    if (snapshot.exists()) {
      await deleteDoc(documentRef);
      return documentRef;
    } else {
      return "Document does not exist";
    }
  } catch (error) {
    return firebaseErrorMessage[error.message] || error.message;
  }
}