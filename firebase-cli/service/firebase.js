import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxAEtPrmmeYnf529OgXdgEQPweyHxsZXc",
  authDomain: "diario-de-estudo.firebaseapp.com",
  projectId: "diario-de-estudo",
  storageBucket: "diario-de-estudo.firebasestorage.app",
  messagingSenderId: "297886219841",
  appId: "1:297886219841:web:32ef89a5b9f8b139b890c0",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);