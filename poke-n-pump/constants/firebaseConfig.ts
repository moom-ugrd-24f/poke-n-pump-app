// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUGJHEH2PN6Bj7vCALryMsU2yNHZHk-w0",
  authDomain: "poke-n-pump.firebaseapp.com",
  projectId: "poke-n-pump",
  storageBucket: "poke-n-pump.firebasestorage.app",
  messagingSenderId: "504995580982",
  appId: "1:504995580982:web:e794d7ea393ad2ef3adc97"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;