import React from "react";
import "./LandingPage.css";



const DeskMenu = () => {
  return (
    <div className="flex justify-end">
      <ul className="hidden md:flex mt-5 justify-center gap-5 font-bold">
        <li className="hover-underline-animation cursor-pointer hover:scale-105 transition-transform" onClick={()=>document.getElementById("navbar").scrollIntoView({behavior:"smooth"})}>Home</li>
        <li className="hover-underline-animation cursor-pointer hover:scale-105" onClick={()=>document.getElementById("about").scrollIntoView({behavior:"smooth"})}>About</li>
        <li className="hover-underline-animation cursor-pointer hover:scale-105" onClick={()=>document.getElementById("contact").scrollIntoView({behavior:"smooth"})}>Contact</li>
      </ul>
    </div>
  );
};

export default DeskMenu;
