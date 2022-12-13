// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7ruvqYPMZ1cOr1n-li8ybGtYX50N4utc",
  authDomain: "todos-b889e.firebaseapp.com",
  projectId: "todos-b889e",
  storageBucket: "todos-b889e.appspot.com",
  messagingSenderId: "587664072157",
  appId: "1:587664072157:web:5561bbb1ac018b4cc3aa34",
  databaseURL:
    "https://todos-b889e-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;
