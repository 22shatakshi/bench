// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7KPuHywMl6jY8RPkEOpIN5BxfwZq0U1U",
  authDomain: "bench-788ba.firebaseapp.com",
  projectId: "bench-788ba",
  storageBucket: "bench-788ba.appspot.com",
  messagingSenderId: "311118344518",
  appId: "1:311118344518:web:aae8b929ac7243e4983547",
  measurementId: "G-DMZ8SW8D3B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
//const analytics = getAnalytics(app);
const auth = getAuth()
export {auth, database}
