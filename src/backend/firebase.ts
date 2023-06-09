import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, remove, onValue } from "firebase/database";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const firebaseapp = initializeApp({
  apiKey: "AIzaSyAWBNYQ7EcrOiHkFytkh4RgWL2wXKSQ5es",
  authDomain: "travlr-9c098.firebaseapp.com",
  databaseURL: "https://travlr-9c098-default-rtdb.firebaseio.com",
  projectId: "travlr-9c098",
  storageBucket: "travlr-9c098.appspot.com",
  messagingSenderId: "826919953748",
  appId: "1:826919953748:web:1e71c66e5e51bdfb7814c1",
  measurementId: "G-62K7L00YF4",
});

const db = getDatabase();
const auth = getAuth(firebaseapp);

export {
  db,
  auth,
  ref,
  set,
  remove,
  onValue,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
};
