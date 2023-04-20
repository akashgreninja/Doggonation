import React, { useEffect } from "react";
import preimage from "../images/logo-no-background.png";
import { useNavigate } from "react-router-dom";

const PreLoaderPage = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    const timeour = setTimeout(() => {
      // props.shouldit(true)
      navigate("/home");
      props.shouldit(false);
    }, 3000);
    return () => {};
  }, []);
  // uncomment this at last

  return (
    <>
      <div className=" h-screen w-screen    ">
        <div className=" h-screen w-screen flex justify-center align-center items-center   ">
          <img
            src={preimage}
            alt="preimage"
            srcset=""
            className="justify-center animate-bounce hover:animate-none h-lastsectionh w-lastsectionw "
          />
        </div>
      </div>
    </>
  );
};

export default PreLoaderPage;
