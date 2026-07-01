// src/components/firebase/Firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  confirmPasswordReset,
  verifyPasswordResetCode,
  applyActionCode,
  sendEmailVerification
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyACbVcn5nQEZXcJ3g1qWWgm_3HvzWDN9cg",
  authDomain: "nitesea.com",
  projectId: "nitesea-85b9a",
  storageBucket: "nitesea-85b9a.firebasestorage.app",
  messagingSenderId: "226363392823",
  appId: "1:226363392823:web:e12846536b685aa19c50b2",
  measurementId: "G-XYQSE8DVC8"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

export {
  auth,
  db,
  analytics,
  googleProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  confirmPasswordReset,
  verifyPasswordResetCode,
  applyActionCode,
  sendEmailVerification,
  doc,
  setDoc,
  getDoc,
  updateDoc
};