import React, { useState, useEffect } from "react";
import "./RegisterPage.css";
import { Register } from "../api/register";
import { Facebook, Google } from "../components/form/authservice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import FacebookIcon from '@mui/icons-material/Facebook';



const RegisterPage = (props) => {
  useEffect(() => {
    props.Sidebarrender(false);
  }, []);

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

        nav("/");
        window.location.reload();
        console.log(data);
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
    <div class="bg-main min-h-screen pl-11 flex justify-center items-center">
      {registered === true ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">
            You already have an account please head to our Signin page
          </Alert>
        </Stack>
      ) : null}
      <div class="flex border rounded-lg shadow-2xl bg-white p-5">
        <form class="flex flex-col gap-[15px]">
          <div class="flex flex-col justify-between items-center gap-[15px]">
            <h1 className="font-bold">Sign up using: </h1>
            <div className="flex justify-between gap-[20px] items-center">
              <button type="button" onClick={Facebook}>
                <FacebookIcon
                  className="transition-all ease-in-out duration-500 hover:text-[#3b5998]" />
              </button>
              <button type="button" onClick={HandleGoogle}>
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" className="" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262" id="google"><path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path><path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path><path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path><path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path></svg>
              </button>
            </div>
          </div>
          <div class="flex flex-col gap-5 justify-center items-start">
            <label className="flex flex-col gap-2">
              <legend className="font-semibold">Name</legend>
              <input
                required=""
                type="text"
                name="name"
                placeholder="Input your Username"
                onChange={HandleChange}
                className="w-[150%] border border-gray-400 rounded-sm shadow-md pl-1 text-center pr-1"
              />

            </label>
            <label className="flex flex-col gap-2">
              <legend className="font-semibold">Email</legend>
              <input
                pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                required=""
                type="email"
                name="email"
                placeholder="Input with email validation"
                onChange={HandleChange}
                className="w-[150%] border border-gray-400 rounded-sm shadow-md pl-1 text-center pr-1"
              />
              <span></span>
            </label>
            <label className="flex flex-col gap-2">
              <legend className="font-semibold">Password</legend>
              <input
                required=""
                pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$"
                type="password"
                name="password"
                placeholder="Input with password validation"
                onChange={HandleChange}
                className="w-[150%] border border-gray-400 rounded-sm shadow-md pl-1 text-center pr-1"
              />

            </label>
            <div class="relative inline-block w-64">
              <select
                className="font-semibold flex appearance-none w-[120%] bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-sm shadow-lg leading-tight focus:outline-none focus:shadow-outline"
                onChange={HandleChange}
                name="gender"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Not specified</option>
                <option>Banana</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 -right-12 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M14.71 6.71a1 1 0 0 0-1.42 0L10 9.59l-3.29-3.3a1 1 0 0 0-1.42 1.42l4 4a1 1 0 0 0 1.42 0l4-4a1 1 0 0 0 0-1.42z" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-14 items-center">
                <legend className="font-semibold">Date of Birth: </legend>
                <input type="date" name="dob" onChange={HandleChange} />
              </div>
              <div>
                <p>Selected date: {ridata.dob}</p>
              </div>
            </div>

            <div className="w-full flex justify-center items-center">

              <button class="bg-[#2196f3] p-2 text-white hover:bg-blue-400 font-semibold text-center shadow-md" onClick={HandleClick}>
                Sign Up
              </button>

            </div>
          </div>
          <div class="border-t-black border-t-2 flex p-2">
            <span>
              Already have an account ? SignIn <a
                className="text-blue-500 hover:text-blue-400 hover:no-underline transition-all ease-in-out duration-500 font-semibold drop-shadow-lg"
                href="/Signin">here</a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
