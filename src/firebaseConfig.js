// Importa las funciones que necesitas de los SDKs de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Importa Firestore
import { getAnalytics } from "firebase/analytics";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBR6WvEopQNtGQTOBVSxzwvOgBpPWPfS3M",
    authDomain: "react-beretta.firebaseapp.com",
    projectId: "react-beretta",
    storageBucket: "react-beretta.firebasestorage.app",
    messagingSenderId: "85297550032",
    appId: "1:85297550032:web:e577cfa9601d31eeecc4d5",
    measurementId: "G-QLM6CEJMYT"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app); 
const analytics = getAnalytics(app);

export { db };
