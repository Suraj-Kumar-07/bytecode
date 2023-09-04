// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyAupa-Yr3uhXf58kXQ0xVk_cab_SPGe9xs",
  authDomain: "leetcode-2e9fd.firebaseapp.com",
  projectId: "leetcode-2e9fd",
  storageBucket: "leetcode-2e9fd.appspot.com",
  messagingSenderId: "365731286096",
  appId: "1:365731286096:web:ab05b467e26535ff925555"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export let auth = getAuth(app);
export const provider=new GoogleAuthProvider();

