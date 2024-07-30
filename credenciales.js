// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAv_nkwsTISqqTIK13ATZR7k74ekEGj4SE",
  authDomain: "receta-8852b.firebaseapp.com",
  projectId: "receta-8852b",
  storageBucket: "receta-8852b.appspot.com",
  messagingSenderId: "893271238801",
  appId: "1:893271238801:web:9a08794cf58a1f100ff730"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase