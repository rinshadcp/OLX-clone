import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAXfzsUwoQ9VWndt7gtGan3wd_gqk6CTIA",
  authDomain: "olxx-cb939.firebaseapp.com",
  projectId: "olxx-cb939",
  storageBucket: "olxx-cb939.appspot.com",
  messagingSenderId: "771731647144",
  appId: "1:771731647144:web:7825522eb80a852f70309d",
  measurementId: "G-K0VZ6Y8496",
};

export default firebase.initializeApp(firebaseConfig);
