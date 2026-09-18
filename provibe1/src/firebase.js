import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyB_DeFUgZCGO3oCcKvwvwkgre8h7svLqnk",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "provibe-975dc.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "provibe-975dc",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "provibe-975dc.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "889119525615",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:889119525615:web:ed69c7ef950d3d188e291a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
export { app, firebaseConfig };
