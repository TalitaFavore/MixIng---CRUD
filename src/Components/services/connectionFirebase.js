import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDG5JPHhMvsfgwvuV0f0bbaZWklrX8JudI",
  authDomain: "mixingbd-4b711.firebaseapp.com",
  databaseURL: "https://mixingbd-4b711-default-rtdb.firebaseio.com",
  projectId: "mixingbd-4b711",
  storageBucket: "mixingbd-4b711.appspot.com",
  messagingSenderId: "449403707380",
  appId: "1:449403707380:web:64250d24b78c2d0439a3a1"
};

// Initialize Firebase if not already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Instances for Auth, Firestore, and Realtime Database
const auth = firebase.auth();
const firestore = firebase.firestore();
const database = firebase.database();

// Export the instances for use in other files
export { auth, firestore, database };
export default firebase;
