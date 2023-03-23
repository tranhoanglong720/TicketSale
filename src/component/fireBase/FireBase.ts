import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
const firebaseConfig = {
  apiKey: "AIzaSyD8snVvm6Y2C4D3broCzyEjreQ9WwQXslQ",
  authDomain: "ticketsale-671b3.firebaseapp.com",
  databaseURL: "https://ticketsale-671b3-default-rtdb.firebaseio.com",
  projectId: "ticketsale-671b3",
  storageBucket: "ticketsale-671b3.appspot.com",
  messagingSenderId: "504328094553",
  appId: "1:504328094553:web:06796e521797f72fd2c248",
  measurementId: "G-3DY3JVEHTM",
};
firebase.initializeApp(firebaseConfig);
export const dataref = firebase.database();
export default firebase;

// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
// const analytics = getAnalytics(app);
