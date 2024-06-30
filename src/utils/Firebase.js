import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAPerEFVa-agJRiC81i7uoiLcJbvSs5AAs",
  authDomain: "ambulance-4583d.firebaseapp.com",
  projectId: "ambulance-4583d",
  storageBucket: "ambulance-4583d.appspot.com",
  messagingSenderId: "152851851559",
  appId: "1:152851851559:web:150954a8f6cb911c5e2102"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const fireStore = getFirestore(app)