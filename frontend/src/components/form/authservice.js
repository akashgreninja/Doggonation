import { auth } from "../../firebaseconfig";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  GithubAuthProvider,
  RecaptchaVerifier,
} from "firebase/auth";

const provider = new GoogleAuthProvider();
const facebookprovider= new FacebookAuthProvider();
export const Google = async (e) => {
  signInWithPopup(auth, provider).then((result) => {
    console.log(result.user.email);
  });
};
export const Facebook = async (e) => {
  signInWithPopup(auth,  facebookprovider).then((result) => {
    console.log(result.user.email);
  });
};
