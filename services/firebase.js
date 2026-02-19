// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-sJz0G9JXDbAC9uMbBqVBcAE-x7mNfJ8",
  authDomain: "davantech-shop.firebaseapp.com",
  projectId: "davantech-shop",
  storageBucket: "davantech-shop.firebasestorage.app",
  messagingSenderId: "143798828723",
  appId: "1:143798828723:web:0172336111728db039fac6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)
export { app }
