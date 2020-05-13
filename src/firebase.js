import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDLY15DklSz221I7TPHr7GY7YGOYuRGIIc",
    authDomain: "rafa-pokemon.firebaseapp.com",
    databaseURL: "https://rafa-pokemon.firebaseio.com",
    projectId: "rafa-pokemon",
    storageBucket: "rafa-pokemon.appspot.com",
    messagingSenderId: "952745811923",
    appId: "1:952745811923:web:71700af73cb25083051926"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

export {firebase ,auth, db}