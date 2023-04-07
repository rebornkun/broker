// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyhAzeWNvNmocKNH7t2BhmydlkFLYi70k",
  authDomain: "broker-e8944.firebaseapp.com",
  projectId: "broker-e8944",
  storageBucket: "broker-e8944.appspot.com",
  messagingSenderId: "811504664910",
  appId: "1:811504664910:web:f8f48165b9fd2d7418de1f",
  measurementId: "G-P4NS40XDTC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app)
