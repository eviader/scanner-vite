
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDzNK8JRdkuXWy6JbW7dju_xatjBrHPtNE",
  authDomain: "price-app-e69d0.firebaseapp.com",
  projectId: "price-app-e69d0",
  storageBucket: "price-app-e69d0.appspot.com",
  messagingSenderId: "44521169671",
  appId: "1:44521169671:web:6c843b0343775a0e8d9ba2",
  measurementId: "G-8TN2VT0S19"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
