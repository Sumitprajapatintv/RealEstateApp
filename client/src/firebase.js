// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestateapp-9385f.firebaseapp.com",
  projectId: "realestateapp-9385f",
  storageBucket: "realestateapp-9385f.appspot.com",
  messagingSenderId: "934250615007",
  appId: "1:934250615007:web:c46436359ad26f7989996a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);