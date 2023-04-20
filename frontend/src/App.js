import React, { Suspense, useState } from "react";
import Twitter from "./components/buttons/twitter";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbars/Navbar/Navbar";
import Sidebar from "./components/Navbars/Sidebar/Sidebar";
// import HomePage from "./components/pages/HomePage";
import PreLoaderPage from "./pages/PreLoaderPage";
import HomePage from "./pages/HomePage";

function App() {
  const [preLoader, setpreLoader] = useState(true);

  return (
    <>
      <Router>
        {preLoader ? null : <Sidebar />}

        <Suspense>
          <Routes>
            <Route
              path="/"
              element={<PreLoaderPage shouldit={setpreLoader} />}
            />
            <Route path="/home" element={<HomePage  shouldit={setpreLoader}/>} />
          </Routes>

          {/* <Loader  loader={loader}/> */}
          {/* <Footer /> */}
        </Suspense>
      </Router>
    </>
  );
}

export default App;
