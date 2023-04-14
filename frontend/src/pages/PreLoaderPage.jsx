import React from "react";
import preimage from "../images/logo-no-background.png";
import { useNavigate } from "react-router-dom";

const PreLoaderPage = () => {
  const navigate = useNavigate();
  // useEffect(() => {
  //     Navigate

  //   }, [])

  return (
    <>
      <div className="w-100 h-100 m-auto flex flex-row bg-red-500">
        <img src={preimage} alt="preimage" srcset="" className="w-44 h-48 justify-center align-middle" />
      </div>
      <h1 className="font-extrabold bg-red-500">hello world </h1>
    </>
  );
};

export default PreLoaderPage;
