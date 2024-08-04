import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDSucKJUrESWadDznu1YWLTb4L6Phzemds",
  authDomain: "dht22-a035c.appspot.com",
  databaseURL:
    "https://dht22-a035c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dht22-a035c",
  storageBucket: "dht22-a035c.appspot.com",
  messagingSenderId: "sender-id",
  appId: "1:876701627840:android:bdd63980e6d09cc3e84425",
  measurementId: "G-measurement-id",
};

export const app = initializeApp(firebaseConfig);

export const database = getFirestore(app);
export const db = getDatabase(app);

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
