import { Register } from "../../api/register";
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
  signInWithPopup(auth, provider).then(async(result) => {
    console.log(result.user.photoURL);
    console.log(result.user.photoURL);
    console.log(result.user.photoURL);
   
    if (e.logger==='register') {
      try {
        const {data}=await Register(result.user.displayName,result.user.email,result.user.email,e.dob,e.gender,result.user.photoURL)
      console.log("donee")
      } catch (error) {
        console.log(error)
        
      }
      
    }

   
  });
};
export const Facebook = async (e) => {
  signInWithPopup(auth,  facebookprovider).then((result) => {
    console.log(result.user.email);
    console.log(e)
  });
};
