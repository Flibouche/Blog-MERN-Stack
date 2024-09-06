// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "blog-mern-stack-e4b21.firebaseapp.com",
    projectId: "blog-mern-stack-e4b21",
    storageBucket: "blog-mern-stack-e4b21.appspot.com",
    messagingSenderId: "379663849968",
    appId: "1:379663849968:web:cb380b812fdc55047d2535"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);