// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_jQNBmhk3pQXqsqPTeQIU5DEpmUEtjiI",
  authDomain: "wikitannica-b1071.firebaseapp.com",
  projectId: "wikitannica-b1071",
  storageBucket: "wikitannica-b1071.appspot.com",
  messagingSenderId: "201658660893",
  appId: "1:201658660893:web:89f176ef25a5b667d26ef4",
  measurementId: "G-JC4DYYLGSG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);