// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnIqt113Si0Tur2qqVUpefbAFRZNBJlx0",
  authDomain: "car-rental-338fd.firebaseapp.com",
  projectId: "car-rental-338fd",
  storageBucket: "car-rental-338fd.firebasestorage.app",
  messagingSenderId: "663409193108",
  appId: "1:663409193108:web:7840d8164ed507f0094481"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);