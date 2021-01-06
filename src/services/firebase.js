import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAez0dWEAoavVXfBjRlmTD8JS-cUUo1EeE',
  authDomain: 'kcena-market.firebaseapp.com',
  databaseURL: 'https://kcena-market.firebaseio.com',
  projectId: 'kcena-market',
  storageBucket: 'kcena-market.appspot.com',
  messagingSenderId: '4102085429',
  appId: '1:4102085429:web:73e3d5bb3cdbcc52c60a7c',
};

firebase.initializeApp(firebaseConfig);

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const googleAuthLogin = () => firebase.auth().signInWithPopup(googleAuthProvider);

export default firebase;
