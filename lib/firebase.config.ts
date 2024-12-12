import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAg7opyhm2X0iuE7Fcci17z3VU5JQRlbek",
  authDomain: "inventory-adventista.firebaseapp.com",
  databaseURL: "https://inventory-adventista-default-rtdb.firebaseio.com/",
  projectId: "inventory-adventista",
  storageBucket: "inventory-adventista.firebasestorage.app",
  messagingSenderId: "868365654730",
  appId: "868365654730:web:fc14771ae172ae5cdeb233",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
