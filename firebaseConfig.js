// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";


// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQz4a-ho4_-2DuDY_8AcA5P2d1VZCORlU",
  authDomain: "build-and-blog.firebaseapp.com",
  projectId: "build-and-blog",
  storageBucket: "build-and-blog.firebasestorage.app",
  messagingSenderId: "446503708031",
  appId: "1:446503708031:web:d3254f09f075d87e40664a",
  measurementId: "G-B01ELLKXC0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);