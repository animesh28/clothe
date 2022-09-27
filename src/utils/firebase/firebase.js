import { initializeApp } from "firebase/app";
import {
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxIaypfpwhXtahAbuSidW_KIjQbz-j3HU",
  authDomain: "clothe-db.firebaseapp.com",
  projectId: "clothe-db",
  storageBucket: "clothe-db.appspot.com",
  messagingSenderId: "967071373175",
  appId: "1:967071373175:web:b06532c1bb7cd383be7372",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

const db = getFirestore();

export const createUserDocFromAuth = async (userAuth, additionalInfo = {}) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.log("Error creating user in db", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailPassword = async (email, password) => {
  if (!email && !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailPassword = async (email, password) => {
  if (!email && !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedHandler = (callback) => {
  onAuthStateChanged(auth, callback);
};
