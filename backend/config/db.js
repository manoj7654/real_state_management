const firebase = require("firebase");
require("firebase/firestore"); 

require("dotenv").config

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain:process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId:process.env.messagingSenderId,
  appId:process.env.appId,
  measurementId:process.env.measurementId
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

module.exports = db;
