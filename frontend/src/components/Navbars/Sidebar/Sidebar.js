import React, { useEffect, useState } from "react";
import logo from "../../../images/logo-no-background.png";
import { Link, json, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SideBarOption from "./SideBarOption";
import Searchbar from "./Searchbar";

const Sidebar = (props) => {
  const profile = useSelector((state) => state.UserId.Userinfo);
  console.log(profile);

  const navigate = useNavigate();

  const HandleLogout = () => {
    localStorage.removeItem("token");
    navigate("/SignIn");
  };
  const dropdown = () => {
    console.log("targetted");
    const check = document.querySelector("#submenu").classList.toggle("hidden");
    console.log(check);
    document.querySelector("#arrow").classList.toggle("rotate-0");
  };

  const handlehome = () => {
    navigate("/");
  };
  const handleabout = () => {
    navigate("/donation");
  };

  return (
    <div>
      {props.render && (
        <div
          className="flex fixed  flex-row  h-10 "
          style={{ "pointer-events": "auto" }}
        >
          <div className="bg-white h-screen w-sidebarw border-gray-400 shadow">
            <img
              src={logo}
              alt=""
              width={300}
              className="w-10/12 p-5 pl-[2vw] pt-9 m-auto "
            />
            <br />
            <SideBarOption to="/" icon="bi bi-house-door-fill" label="Home" />
            <Searchbar />
            <SideBarOption
              to="/explore"
              icon="bi bi-bookmark-fill"
              label="Discover"
            />
            <SideBarOption
              to="/dm"
              icon="bi bi-chat-left-dots-fill"
              label="Messages"
            />
            <SideBarOption to="/donation" icon="bi bi-cash" label="Donate" />
            <SideBarOption
              to="/About"
              icon="bi bi-chat-left-dots-fill"
              label="About"
            />
            {/* <SideBarOption
              to="/nft"
              icon="bi bi-currency-dollar"
              label="My NFT's"
            /> */}  
            <SideBarOption
              onClick={HandleLogout}
              icon="bi bi-box-arrow-in-right"
              label="Logout"
            />
          </div>
          <div className="bg-white">
            <nav className="w-navbarw h-navbarh bg-white flex flex-row content-center justify-between shadow-sm">
              <p className="ml-[3vw] my-7 font-bold text-xl">Home</p>

              <div class="p-2.5 m-3 flex items-center rounded-md px-profilepadding duration-300 cursor-pointer hover:bg-gray-200 text-black">
                <div class="h-8 w-8 rounded-full overflow-hidden pl-0 ml-0">
                  <img
                    src={
                      profile
                        ? profile[6]
                        : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                    }
                    alt="Avatar"
                    class="object-cover h-full w-full"
                  />
                </div>
                <span class="text-[15px] ml-4 text-black font-bold">
                  {profile != null ? (
                    <Link to={`/profile/${profile[0]}`}>Profile</Link>
                  ) : null}
                </span>
              </div>
            </nav>
            <div className="w-[1vw] h-[1vw] bg-white " />
            <div className="w-[1vw] h-[1vw] rounded-tl-xl shadow-[inset_1px_1px_1px_rgba(0,0,0,0.06)] translate-y-[-1vw] " />
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
