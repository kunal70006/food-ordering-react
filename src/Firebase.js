import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyA0R6GBZwqbmNYBpqbI5MSXBS227s9--c8",
  authDomain: "intern-blog-faaa7.firebaseapp.com",
  databaseURL: "https://intern-blog-faaa7.firebaseio.com",
  projectId: "intern-blog-faaa7",
  storageBucket: "intern-blog-faaa7.appspot.com",
  messagingSenderId: "861519163882",
  appId: "1:861519163882:web:e5e703783a0eac7d794293",
  measurementId: "G-HYQNC9RHL0",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const storage = firebase.storage();
export { firebase as default };
export { storage };
