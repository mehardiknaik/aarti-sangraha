// Import the functions you need from the SDKs you need
import { getApp, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCZF0HlQQw_xj6iScsA8bmES_IacPjolnw",
  authDomain: "aarti-sangraha-8d1f2.firebaseapp.com",
  projectId: "aarti-sangraha-8d1f2",
  storageBucket: "aarti-sangraha-8d1f2.firebasestorage.app",
  messagingSenderId: "550241165660",
  appId: "1:550241165660:web:a4629e666884fda74d2199",
  measurementId: "G-NESKGCNX59",
};

// Initialize Firebase
const app = getApp.length > 0 ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const authProvider = new GoogleAuthProvider();