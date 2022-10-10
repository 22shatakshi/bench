// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDP8Bu5kvBQnuR7FalxuTMahWJTyFs-QF4",
    authDomain: "draft-joy.firebaseapp.com",
    projectId: "draft-joy",
    storageBucket: "draft-joy.appspot.com",
    messagingSenderId: "521318788510",
    appId: "1:521318788510:web:1bd7a5834f5b29ff7ffa8f",
    measurementId: "G-5Q6923457T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
var database = app.firestore();

export { database };
