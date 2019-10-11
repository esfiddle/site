// /src/firestore.js
import firebase from 'firebase';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyBm6OKKodlXt5lv2mW2NEEECzk3hXPArdE',
  authDomain: 'esfiddle.firebaseapp.com',
  databaseURL: 'https://esfiddle.firebaseio.com',
  projectId: 'esfiddle',
  storageBucket: 'esfiddle.appspot.com',
  messagingSenderId: '659502768703',
  appId: '1:659502768703:web:d3f6d60a4275e3d8ae8e8a',
  measurementId: 'G-KK4ZCNNECD',
};

const firestore = firebase.initializeApp(config); //eslint-disable-line
const db = firebase.firestore();

export default db;
