import React, { Suspense, useState } from "react";
import Twitter from "./components/buttons/twitter";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Navbars/Sidebar/Sidebar";
// import HomePage from "./components/pages/HomePage";
import PreLoaderPage from "./pages/PreLoaderPage";
import HomePage from "./pages/HomePage";
import Razorpay from "./components/Razorpay/Razorpay";
import LoginForm from "./components/form/LoginForm";
import SignIn from "./pages/SignIn";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import DonationPage from "./pages/DonationPage";
import Explore from "./pages/Explore";
import Dm from "./pages/Dm";
import NotFound from "./pages/NotFound";
import Landingpage from "./pages/LandingPage/Landingpage";
import About from "./pages/LandingPage/About";
import NFTPage from "./pages/NFTPage";

function App() {
  // const [Sidebar, setsidebar] = useState(true);
  const [sidebar, setsidebar] = useState(false);

  return (
    <>
      <Router>
        {/* {sidebar === true ? <Sidebar /> : null} */}
        <Sidebar render={sidebar}/>

        <Suspense>
          <Routes>
            {/* uncomment once done completely  */}
            {/* <Route
              path="/"
              element={<PreLoaderPage shouldit={setsidebar} />}
            /> */}

            <Route path="/donation" element={<Landingpage Sidebarrender={setsidebar} />} />
            <Route path="/" element={<HomePage  Sidebarrender={setsidebar}/>} />

            <Route
              path="/SignUp"
              element={<RegisterPage Sidebarrender={setsidebar} />}
            />
            <Route
              path="/About"
              element={<DonationPage Sidebarrender={setsidebar} />}
            />
            {/* <Route path="/donation" element={<About />} /> */}
            <Route
              path="/Signin"
              element={<SignIn Sidebarrender={setsidebar} />}
            />
            <Route
              path="/profile/:id"
              element={<ProfilePage Sidebarrender={setsidebar} />}
            />
            <Route
              path="/explore"
              element={<Explore Sidebarrender={setsidebar} />}
            />
            <Route 
              path="/nft" 
              element={<NFTPage Sidebarrender={setsidebar}/> }
            />
            <Route path="/dm" element={<Dm Sidebarrender={setsidebar} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* <Loader  loader={loader}/> */}
          {/* <Footer /> */}
        </Suspense>
      </Router>
    </>
  );
}

export default App;
