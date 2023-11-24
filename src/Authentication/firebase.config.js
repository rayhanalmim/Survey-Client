// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1c4JPz2PfVEru65REasjraTkSu6Cfdf8",
  authDomain: "survey-sphere.firebaseapp.com",
  projectId: "survey-sphere",
  storageBucket: "survey-sphere.appspot.com",
  messagingSenderId: "879176453275",
  appId: "1:879176453275:web:fcb1dee112dcd40f91ca3e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;