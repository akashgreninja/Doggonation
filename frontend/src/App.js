import React, { Suspense, useState } from "react";
import Twitter from "./components/buttons/twitter";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbars/Navbar/Navbar";
import Sidebar from "./components/Navbars/Sidebar/Sidebar";
// import HomePage from "./components/pages/HomePage";
import PreLoaderPage from "./pages/PreLoaderPage";
import HomePage from "./pages/HomePage";
import Razorpay from "./components/Razorpay/Razorpay";
import LoginForm from "./components/form/LoginForm";
import SignIn from "./pages/SignIn";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const [preLoader, setpreLoader] = useState(true);

  return (
    <>
      <Router>
        {/* {preLoader ? null : <Sidebar  />} */}
        <Sidebar/>

        <Suspense>
          <Routes>
            {/* <Route
              path="/"
              element={<PreLoaderPage shouldit={setpreLoader} />}
            /> */}
            <Route path="/home" element={<HomePage  shouldit={setpreLoader}/>} />
            {/* <Route path="/" element={<RegisterPage/>} /> */}
            <Route path="/" element={<Razorpay/>} />
            <Route path="/signin" element={<SignIn/>} />
            <Route path="/profile/:id" element={<ProfilePage/>} />

          </Routes>

          {/* <Loader  loader={loader}/> */}
          {/* <Footer /> */}
        </Suspense>
      </Router>
    </>
  );
}

export default App;
