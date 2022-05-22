// Import the functions you need from the SDKs you need
import { initializeApp,  } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpoH7qs8WpolOnsoy6i3D-KwryWqypQF0",
  authDomain: "shopify-frontend-challen-1f29d.firebaseapp.com",
  projectId: "shopify-frontend-challen-1f29d",
  storageBucket: "shopify-frontend-challen-1f29d.appspot.com",
  messagingSenderId: "83085750564",
  appId: "1:83085750564:web:4af9a389d8b439cae443b1",
  measurementId: "G-WG5W7WH69C",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
