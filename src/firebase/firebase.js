import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCgMIkwO-OMgg0XMBs4t2qSlM7LXKy7ixI",
    authDomain: "animalexp-d030e.firebaseapp.com",
    projectId: "animalexp-d030e",
    storageBucket: "animalexp-d030e.appspot.com",
    messagingSenderId: "1061019590271",
    appId: "1:1061019590271:web:7391ba7cbd36fd2875694a",
    measurementId: "G-086Y5101P6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, app };