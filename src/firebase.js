// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use //done
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfeWfPGj09IQZiXiraHZ8GwazxsW72EcU",
  authDomain: "podcast-streaming-app.firebaseapp.com",
  projectId: "podcast-streaming-app",
  storageBucket: "podcast-streaming-app.appspot.com",
  messagingSenderId: "1031837091143",
  appId: "1:1031837091143:web:ed5c3a111d2c2f70beb862",
  measurementId: "G-BRZ2ZR4ELX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
export { auth, db, storage };
