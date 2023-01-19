import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyA8e_LARA3kOAxDzkrXjGnpS0cBWh0Cq5o",
  authDomain: "crud-17e91.firebaseapp.com",
  projectId: "crud-17e91",
  storageBucket: "crud-17e91.appspot.com",
  messagingSenderId: "36640169752",
  appId: "1:36640169752:web:0fb681543b1cf42680c86d"
};
const app = firebase.initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = (setToekn) => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("res");
      const { email, displayName } = result.user;
      console.log("result = ", email, displayName);
      setToekn(email);
      console.log("setToekn", email);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error", errorMessage, errorCode);
    });
};
export const signOutWithGoogle = () =>
  auth
    .signOut()
    .then(() => {
      console.log("logut good");
    })
    .catch((error) => {
      console.log("logut error");
    });
export default firebase;
