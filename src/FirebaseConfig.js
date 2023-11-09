// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjiCx7nS1CPnHGEhTX5Tdul4VvqvgnvSU",
  authDomain: "sco310.firebaseapp.com",
  projectId: "sco310",
  storageBucket: "sco310.appspot.com",
  messagingSenderId: "82586783323",
  appId: "1:82586783323:web:18019c49bf3b5a08f6f97e",
  measurementId: "G-9DT9KYG4JB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, db };
