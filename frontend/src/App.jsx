import React, { Suspense } from "react";
import Twitter from "./components/buttons/twitter";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbars/Navbar/Navbar";
import Sidebar from "./components/Navbars/Sidebar/Sidebar";
// import HomePage from "./components/pages/HomePage";
import PreLoaderPage from "./pages/PreLoaderPage";

function App() {


  return (
    <Router>
      {/* <Navbar/>
      <Sidebar/> */}
      <Suspense>
       

        <Routes>
          <Route path="/" element={<PreLoaderPage/>} />

        </Routes>

        {/* <Loader  loader={loader}/> */}
        {/* <Footer /> */}
      </Suspense>
    </Router>
  );
}

export default App;
