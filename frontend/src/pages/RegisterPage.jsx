import React, { useState, useEffect } from "react";
import "./RegisterPage.css";
import { Register } from "../api/register";
import { Facebook, Google } from "../components/form/authservice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import FacebookIcon from "@mui/icons-material/Facebook";
import image from "../images/dogsimg/start.png";
import image2 from "../images/dogsimg/doggo2.png";
import image3 from "../images/dogsimg/aa9cd4b25d251ac5a328991ebe587dc3.gif";

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
    <div class="bg-doggo-background-register min-h-screen  flex justify-center items-center">
      <div className="pl-0 ml-0">
        <h2 className="doggoClass text-white text-8xl">Doggonation</h2>

        <div className="mt-0">
          <img src={image} alt="" srcset="" className="h-64" />
        </div>

        <div className=" flex flex-row justify-between -mt-4 ">
          <img src={image2} alt="" srcset="" className="h-72 " />
          <img src={image3} alt="" srcset="" className="h-64 ml-10" />
        </div>
      </div>

      {registered === true ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">
            You already have an account please head to our Signin page
          </Alert>
        </Stack>
      ) : null}
      <div class="flex border rounded-3xl shadow-2xl bg-white py-5 px-10 ml-dogmi">
        <form class="flex flex-col gap-[15px]">
          <div class="flex flex-col justify-between items-center gap-[15px]">
            <h1 className="font-bold">Sign up using: </h1>
            <div className="flex justify-between gap-[20px] items-center">
              <button type="button" onClick={Facebook}>
                <FacebookIcon className="transition-all ease-in-out duration-500 hover:text-[#3b5998]" />
              </button>
              <button type="button" onClick={HandleGoogle}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  className=""
                  preserveAspectRatio="xMidYMid"
                  viewBox="0 0 256 262"
                  id="google"
                >
                  <path
                    fill="#4285F4"
                    d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                  ></path>
                  <path
                    fill="#34A853"
                    d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                  ></path>
                  <path
                    fill="#FBBC05"
                    d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                  ></path>
                  <path
                    fill="#EB4335"
                    d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                  ></path>
                </svg>
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
                className="w-[158%] border border-gray-400 rounded-3xl shadow-md p-1 py-1.5 text-center"
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
                className="w-[158%] border border-gray-400 rounded-3xl shadow-md p-1 py-1.5 text-center "
              />
              <span></span>
            </label>
            <label className="flex flex-col gap-2">
              <legend className="font-semibold px-2">Password</legend>
              <input
                required=""
                pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$"
                type="password"
                name="password"
                placeholder="Input with password validation"
                onChange={HandleChange}
                className="w-[158%] border border-gray-400 rounded-3xl shadow-md p-1 py-1.5 text-center "
              />
            </label>
            <div className="flex flex-col gap-2">
              <legend className="font-semibold px-2">Gender</legend>
              <div class="relative inline-block w-64">
                <select
                  className="font-semibold flex appearance-none m-auto w-[130%] bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-3xl shadow-lg leading-tight focus:outline-none focus:shadow-outline"
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
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex gap-14 p-3 items-center">
                <legend className="font-semibold">Date of Birth: </legend>
                <input type="date" name="dob" onChange={HandleChange} />
              </div>
              {/* <div>
                <p>Selected date: {ridata.dob}</p>
              </div> */}
            </div>

            <button
              class="bg-banana-100 p-2 m-auto rounded-3xl w-full text-white font-semibold hover:bg-banana-50 text-center shadow-md"
              onClick={HandleClick}
            >
              <p className="m-auto">Sign Up</p>
            </button>
          </div>
          <div class="border-t-black border-t-2 flex p-2">
            <span className="m-auto">
              Already have an account?
              <a
                className="text-banana-100 hover:text-banana-50 hover:no-underline transition-all ease-in-out duration-500 font-semibold cursor-pointer antialiased tracking-wide"
                href="/Signin"
              >
                Login
              </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
