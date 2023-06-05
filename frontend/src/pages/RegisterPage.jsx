import React, { useState,useEffect } from "react";
import "./RegisterPage.css";
import { Register } from "../api/register";
import { Facebook, Google } from "../components/form/authservice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { Client, Locale } from "appwrite";


const RegisterPage = (props) => {
  const client = new Client();

const locale = new Locale(client);
client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('646ef8a4551ba4368766') // Your project ID
;
const [countries, setcountries] = useState([])
const promise = locale.listCountries();

promise.then(function (response) {
    console.log(response); // Success
    setcountries(response['countries'])
}, function (error) {
    console.log(error); // Failure
});
  useEffect(() => {
   props.Sidebarrender(false)
  }, [])
  
  const nav = useNavigate();
  // const isregistered=useSelector((state)=> state)
  const [registered, setregistered] = useState(false);
  const [ridata, risetdata] = useState({
    email: "",
    password: "",
    name: "",
    dob: "",
    gender: "",
  });

  const HandleChange = (e) => {
    risetdata({ ...ridata, [e.target.name]: e.target.value });
    console.log(ridata);
  };

  const HandleGoogle = async (e) => {
    const logger = "register";
    const response = {
      logger: "register",
      dob: "2023-05-02",
      gender: "male",
    };
    try {
      const data = await Google(response);
      console.log(data);
      if (data === true) {
        setregistered(true);
        console.log(registered);
      }
      // this line will induce a bug for sure
      else {
        localStorage.setItem("token", data);
      
        nav("/home");
        window.location.reload();
        console.log(data)
      }
    } catch (error) {
      console.log(error);
    }
  };
  const HandleClick = async (e) => {
    e.preventDefault();

    const { data } = await Register(
      ridata.name,
      ridata.email,
      ridata.password,
      ridata.dob,
      ridata.gender
    );
    try {
      if (data.error) {
        console.log("user register error");
        
      } else {
        console.log("in the else");
        console.log(data.result);
        localStorage.setItem("token", data.result);
        // nav("/home");
        // window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div class="bg-cover bg-no-repeat main-cont bg-opacity-20 bg-right bg-doggo-background-register s  pl-11">
      {registered === true ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">
            You already have an account please head to our Signin page
          </Alert>
        </Stack>
      ) : null}
      <div class="form-container opacity-100 ">
        <form class="need-padding">
          <div class="form-container__sign-buttons">
            <button type="button" onClick={Facebook}>
              <svg viewBox="0 0 24 24" width="16" height="40">
                <path
                  fill="currentColor"
                  d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205
            11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422
            18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084
            1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93
            0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267
            1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12
            3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0
            1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24
            12.297c0-6.627-5.373-12-12-12"
                ></path>
              </svg>
              <div>Sign Up with GitHub</div>
            </button>
            <button type="button" onClick={HandleGoogle}>
              <svg width="16" height="16">
                <g fill="none">
                  <path
                    d="M2.629 10.659A5.893 5.893 0 0 1 2 8c0-.956.226-1.858.629-2.659l2.065 1.544a3.487 3.487 0 0 0 0 2.23L2.629 10.66z"
                    fill="#FBBC05"
                  ></path>
                  <path
                    d="M2.629 5.341C3.627 3.357 5.713 2 8.139 2c1.563 0 2.959.573 4.047 1.5L10.4 5.245a3.6 3.6 0 0 0-2.26-.79c-1.61 0-2.97 1.015-3.446 2.43L2.629 5.34z"
                    fill="#EA4335"
                  ></path>
                  <path
                    d="M2.628 10.657L4.692 9.11c.475 1.417 1.835 2.435 3.448 2.435 1.702 0 2.986-.845 3.293-2.318H8.14V6.91h5.72c.084.355.14.736.14 1.091 0 3.818-2.79 6-5.86 6-2.427 0-4.514-1.358-5.512-3.343z"
                    fill="#34A853"
                  ></path>
                  <path
                    d="M12.141 12.506l-1.96-1.483a2.704 2.704 0 0 0 1.252-1.796H8.14V6.91h5.72c.084.355.14.736.14 1.091 0 1.956-.732 3.482-1.859 4.506z"
                    fill="#4285F4"
                  ></path>
                </g>
              </svg>
              <div>Sign in with Google</div>
            </button>
          </div>
          <div class="form-container__sign-inputs">
            <label>
              <legend>Name</legend>
              <input
                required=""
                type="text"
                name="name"
                placeholder="Input your Username"
                onChange={HandleChange}
              />
              <span></span>
            </label>
            <label>
              <legend>Email</legend>
              <input
                pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                required=""
                type="email"
                name="email"
                placeholder="Input with email validation"
                onChange={HandleChange}
              />
              <span></span>
            </label>
            <label>
              <legend>Password</legend>
              <input
                required=""
                pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$"
                type="password"
                name="password"
                placeholder="Input with password validation"
                onChange={HandleChange}
              />
              <span></span>
            </label>
            <div class="relative inline-block w-64 mb-7">
              <select
                class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                onChange={HandleChange}
                name="gender"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Not specified</option>
                <option>Banana</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M14.71 6.71a1 1 0 0 0-1.42 0L10 9.59l-3.29-3.3a1 1 0 0 0-1.42 1.42l4 4a1 1 0 0 0 1.42 0l4-4a1 1 0 0 0 0-1.42z" />
                </svg>
              </div>
            </div>
            <div>
              <input type="date" name="dob" onChange={HandleChange} />
              <p>Selected date: {ridata.dob}</p>
            </div>
            <div>
              
              <select name="" id=""> select your country
                {
                  countries && countries.map((ele)=>{
                    return <option value="">{ele['name']}</option>
                  })
                }
              </select>
            </div>

            <button class="submit-button" onClick={HandleClick}>
              Login
            </button>
          </div>
          <div class="form-container__auth-block">
            <span>
              Already have an account ? SignIn <a href="/Signin">here</a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
