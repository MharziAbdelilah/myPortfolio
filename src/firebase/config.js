import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB_aeqc0_TRG6UwvHtcqOJSgQHRVeTMXew",
  authDomain: "porfolio-205c5.firebaseapp.com",
  projectId: "porfolio-205c5",
  storageBucket: "porfolio-205c5.firebasestorage.app",
  messagingSenderId: "336098784908",
  appId: "1:336098784908:web:a79a3cfc651e6cd6992da9",
  measurementId: "G-PKVYJB84FQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db, analytics };
