import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider, TwitterAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCNN8JptHIpnlnEhokfgeXJlFZlT5KciFo",
    authDomain: "aurapulse-628a1.firebaseapp.com",
    projectId: "aurapulse-628a1",
    storageBucket: "aurapulse-628a1.firebasestorage.app",
    messagingSenderId: "624790176549",
    appId: "1:624790176549:web:8a122a9dc9266f603150cc",
    measurementId: "G-V84N7Y1R78"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase Auth and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();
const twitterProvider = new TwitterAuthProvider();

export { app, auth, db, googleProvider, facebookProvider, githubProvider, twitterProvider };