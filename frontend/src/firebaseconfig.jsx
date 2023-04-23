// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth,GoogleAuthProvider, signInWithPopup,FacebookAuthProvider,GithubAuthProvider,RecaptchaVerifier  } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDS0XNI5O0SZuIv1oFzB1oWj0S-tRaMhLU",
  authDomain: "doggonation-612e8.firebaseapp.com",
  projectId: "doggonation-612e8",
  storageBucket: "doggonation-612e8.appspot.com",
  messagingSenderId: "410597327247",
  appId: "1:410597327247:web:d952979f2d8ddd1d41cbfa",
  measurementId: "G-WZ9HLMRC74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const  auth = getAuth(app);
export{auth,storage}
