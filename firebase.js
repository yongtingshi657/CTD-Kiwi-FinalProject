import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA8QwH6zbgVWksFEsipcqeiKBLHuvPAsoE",
  authDomain: "mygoodbuy-3d398.firebaseapp.com",
  projectId: "mygoodbuy-3d398",
  storageBucket: "mygoodbuy-3d398.firebasestorage.app",
  messagingSenderId: "564372990453",
  appId: "1:564372990453:web:8927890c81a401fe9958bc"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);