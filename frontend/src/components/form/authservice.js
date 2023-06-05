// imagine trying to undertsand this code lmao all the best thats why you had to do your college project beforehand

import { Login } from "../../api/login";
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
import { useDispatch, useSelector } from "react-redux";
const provider = new GoogleAuthProvider();
const facebookprovider = new FacebookAuthProvider();
export const Google = async (e) => {
  var logger = 0
  var checker = true;
  await signInWithPopup(auth, provider).then(async (result) => {
    // console.log(result.user.photoURL);
    // console.log(result.user.photoURL);
    // console.log(result.user.photoURL);

    if (e.logger === "register") {
      try {
        const { data } = await Register(
          result.user.displayName,
          result.user.email,
          result.user.email,
          e.dob,
          e.gender,
          result.user.photoURL
        );
        const promise = account.createEmailSession(`${result.user.email}`, 'password');
        if (data.error) {
          console.log("user esists");
          logger = false;
        } else {
          logger = data.result;
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      
      const { data } = await Login(result.user.email, result.user.email);
      console.log(data);
      if (data.sucess) {
        checker = true;
        console.log("go and register again");
        return promise;
      } else {
        console.log("user exists");
        checker = data;
      }
    }
  });
  try {
    if (logger===0){
      throw new Error("user exists");
    }
    if (logger === false) {
      return true;
    } else {
      console.log(logger);
      return logger;
    }
  } catch (error) {
    if (checker === true) {
      console.log("now we in gere")
      return true;
    } else {
      console.log("now we in gere")
      console.log(checker);
      return checker;
    }
  }
};
export const Facebook = async (e) => {
  signInWithPopup(auth, facebookprovider).then((result) => {
    console.log(result.user.email);
    console.log(e);
  });
};
