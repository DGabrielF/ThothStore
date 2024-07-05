import { firebaseErrorMessage } from "./errors.js";
import { app } from "./fireapp.js";
import { getAuth, signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';

export const FireAuth = {
  auth: getAuth(app),
  signIn: async () => {},
  signOut: async () => {}
}

FireAuth.signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(FireAuth.auth, email, password);
    return userCredential.user;
  } catch (error) {
    return firebaseErrorMessage[error.message];
  }
}

FireAuth.signOut = async () => {
  try {
    await signOut(FireAuth.auth);
    return null;
  } catch (error) {
    return firebaseErrorMessage[error.message];
  }
}