import firebase from "firebase";
import 'firebase/database';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD6t5d9vRdVYKT1q6AyMZVLeqkJHdbzvRs",
    authDomain: "meuapp-992a1.firebaseapp.com",
    databaseURL: "https://meuapp-992a1-default-rtdb.firebaseio.com",
    projectId: "meuapp-992a1",
    storageBucket: "meuapp-992a1.appspot.com",
    messagingSenderId: "346038815493",
    appId: "1:346038815493:web:b10c0424e5fbef9bee856c",
    measurementId: "G-4X3K4WFS9V"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;