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
    apiKey: "AIzaSyCfVZ4toZku6MTyq8RpCx-fbSGfUyqa4Bg",
    authDomain: "jabsjornal.firebaseapp.com",
    projectId: "jabsjornal",
    storageBucket: "jabsjornal.firebasestorage.app",
    messagingSenderId: "331634668287",
    appId: "1:331634668287:web:8f965327d0862dbbe4d2ca",
    measurementId: "G-3PZ7JE1SN2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const firestore = getFirestore(app)

export { app, analytics, auth, firestore }