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

function App() {
  const [preLoader, setpreLoader] = useState(true);

  return (
    <>
      <Router>
        {preLoader ? null : <Sidebar  />}

        <Suspense>
          <Routes>
            <Route
              path="/"
              element={<PreLoaderPage shouldit={setpreLoader} />}
            />
            <Route path="/home" element={<HomePage  shouldit={setpreLoader}/>} />
            {/* <Route path="/" element={<Razorpay/>} /> */}
            <Route path="/" element={<SignIn/>} />

          </Routes>

          {/* <Loader  loader={loader}/> */}
          {/* <Footer /> */}
        </Suspense>
      </Router>
    </>
  );
}

export default App;
