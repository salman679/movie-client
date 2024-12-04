// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgtHeoRR4_JqNp2SLYG8Dj_sddzbhjHx8",
  authDomain: "movie-portal-ad9bf.firebaseapp.com",
  projectId: "movie-portal-ad9bf",
  storageBucket: "movie-portal-ad9bf.firebasestorage.app",
  messagingSenderId: "791112435381",
  appId: "1:791112435381:web:be21a05b34514eee2760fc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const Auth = getAuth(app);
