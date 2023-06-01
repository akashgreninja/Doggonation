import React from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";



const DeskMenu = () => {

  const navigate = useNavigate();

  const handlehome=()=>{
    navigate('/')
  }


  return (
    <div className="flex justify-end">
      <ul className="hidden md:flex mt-5 justify-center gap-5 font-bold">
        <li className="hover-underline-animation cursor-pointer hover:scale-105 transition-transform" onClick={()=>handlehome()}>Home</li>
        <li className="hover-underline-animation cursor-pointer hover:scale-105" onClick={()=>document.getElementById("about").scrollIntoView({behavior:"smooth"})}>About</li>
        <li className="hover-underline-animation cursor-pointer hover:scale-105" onClick={()=>document.getElementById("contact").scrollIntoView({behavior:"smooth"})}>Contact</li>
      </ul>
    </div>
  );
};

export default DeskMenu;
