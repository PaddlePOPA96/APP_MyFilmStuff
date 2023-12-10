import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";

firebase.initializeApp({
  apiKey: "AIzaSyDZpGj78H65Azl1jzOSPn2u_rhO7wVTqlQ",
  authDomain: "cinemskuy-app.firebaseapp.com",
  databaseURL: "https://cinemskuy-app-default-rtdb.firebaseio.com",
  projectId: "cinemskuy-app",
  storageBucket: "cinemskuy-app.appspot.com",
  messagingSenderId: "519041006710",
  appId: "1:519041006710:web:ad8c546d10f3ff905db357",
});

const FIREBASE = firebase;

export default FIREBASE;
