// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvjzKIXSnzBxzVoBDBTVWVuaCyCSWiiHY",
  authDomain: "friendify-ab070.firebaseapp.com",
  projectId: "friendify-ab070",
  storageBucket: "friendify-ab070.firebasestorage.app",
  messagingSenderId: "801781200004",
  appId: "1:801781200004:web:62b8bff4baf0d450b0fed1",
  measurementId: "G-0P7S8F4R6Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };