// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  // apiKey: import.meta.env.VITE_OPENAPI_KEY,
  authDomain: "netflixgpt-a52ba.firebaseapp.com",
  projectId: "netflixgpt-a52ba",
  storageBucket: "netflixgpt-a52ba.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_SENDERID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initialize firestore
const db = getFirestore(app);

export const provider = new GoogleAuthProvider();
export const auth = getAuth();
export const storage = getStorage();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export default db;
