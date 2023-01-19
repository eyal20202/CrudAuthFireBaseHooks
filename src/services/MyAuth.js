import firebase from "firebase/app";
import { getAuth } from "firebase/auth";
export const MyAuth = getAuth().currentUser;
