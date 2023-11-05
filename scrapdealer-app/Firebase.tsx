// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: "AIzaSyDo0WwSGapHvnJuIPZBDqAYv1ojJS_gkNM",
    authDomain: "pheko-6180d.firebaseapp.com",
    projectId: "pheko-6180d",
    storageBucket: "pheko-6180d.appspot.com",
    messagingSenderId: "831511879558",
    appId: "1:831511879558:web:84a270db10c8fe61cdd607",
    measurementId: "G-FLL74PHPPH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);

export { db, app, auth };