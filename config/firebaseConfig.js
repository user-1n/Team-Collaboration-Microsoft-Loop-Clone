// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "team-collaboration-26256.firebaseapp.com",
  projectId: "team-collaboration-26256",
  storageBucket: "team-collaboration-26256.appspot.com",
  messagingSenderId: "1055673510035",
  appId: "1:1055673510035:web:dfed10075f14b414e34566"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)