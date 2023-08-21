// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey:`${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: "test-f49a3.firebaseapp.com",
  projectId: "test-f49a3",
  storageBucket: "test-f49a3.appspot.com",
  messagingSenderId: "419378477350",
  appId: "1:419378477350:web:61bf5e5314b1a6ce03a9e7"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
