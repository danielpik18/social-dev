import firebase from 'firebase';
import Rebase from 're-base';

var firebaseConfig = {
    apiKey: "AIzaSyAn2g-47RwcaayzXNJs1JPP9gNXH2-mtBE",
    authDomain: "social-dev-45280.firebaseapp.com",
    databaseURL: "https://social-dev-45280.firebaseio.com",
    projectId: "social-dev-45280",
    storageBucket: "social-dev-45280.appspot.com",
    messagingSenderId: "336314382815",
    appId: "1:336314382815:web:9e5d90e4cfe162b9"
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
const reBase = Rebase.createClass(fire.database());

export { fire, reBase };