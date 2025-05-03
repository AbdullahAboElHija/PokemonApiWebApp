// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByUx1Z5xOTgEejUaPyUquXMIxDR8P9WSc",
  authDomain: "pokemonapi-5d2a7.firebaseapp.com",
  projectId: "pokemonapi-5d2a7",
  storageBucket: "pokemonapi-5d2a7.firebasestorage.app",
  messagingSenderId: "84100890613",
  appId: "1:84100890613:web:82108ca97a65131f1b6abc",
  measurementId: "G-XFZDWJ5WWM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
