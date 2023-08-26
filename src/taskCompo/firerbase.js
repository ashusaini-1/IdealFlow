// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBtT9z5621Qqb3G5mYnaaLJDpqHxZz8s8s",
  authDomain: "idealflow-de45c.firebaseapp.com",
  projectId: "idealflow-de45c",
  storageBucket: "idealflow-de45c.appspot.com",
  messagingSenderId: "88172334092",
  appId: "1:88172334092:web:e5d23fea994d63a5c97229",
  measurementId: "G-8917NS56BD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth };
