import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD_PGphaISpmV0Y2H6kXkFTXOKcTfxnV7U",
  authDomain: "voz-da-noite.firebaseapp.com",
  projectId: "voz-da-noite",
  storageBucket: "voz-da-noite.appspot.com", // ⚠️ Corrigido de .firebasestorage.app para .appspot.com
  messagingSenderId: "213588304378",
  appId: "1:213588304378:web:32057dd981a4501c7b4443"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };