import firebase from "firebase";
import 'firebase/database';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "yourapi",
    authDomain: "Replace",
    databaseURL: "hReplace",
    projectId: "Replace",
    storageBucket: "Replace",
    messagingSenderId: "Replace",
    appId: "Replace",
    measurementId: "Replace"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;
