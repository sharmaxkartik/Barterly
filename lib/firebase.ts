import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDavXk1AXznKGLSvyQ51tZGA6a2kpnQzhI",
  authDomain: "barterly-7512b.firebaseapp.com",
  projectId: "barterly-7512b",
  storageBucket: "barterly-7512b.firebasestorage.app",
  messagingSenderId: "901309829279",
  appId: "1:901309829279:web:cca866d50aff00d6ee52aa",
  measurementId: "G-JLS6S0E4VC",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
