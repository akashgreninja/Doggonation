import React, { useEffect, useState } from "react";
import logo from "../../../images/logo-no-background.png";
import { Link, json, useNavigate } from "react-router-dom";
import { startsearch } from "../../../api/search";
import { FaUserCircle } from "react-icons/fa";
import { FiCompass } from "react-icons/fi";
import { FaEnvelope } from "react-icons/fa";
import { useSelector } from "react-redux";
import StyleButton from "../../buttons/StyleButton";

const Sidebar = () => {
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

  useEffect(() => {
    search();
  }, []);

  const [searchdata, setsearchdata] = useState([]);
  const [emptyinput, setemptyinput] = useState(false);

  const handleValue = (e) => {
    if (e.target.value === "") {
      setemptyinput(true);
    } else {
      setemptyinput(false);
    }
  };

  const search = async () => {
    let searchbar = document.getElementById("searchbar").value;
    if (searchbar === "") {
      setemptyinput(true);
      return;
    }

    const { data } = await startsearch(searchbar);
    //   const response =await fetch('http://127.0.0.1:3003/search', {
    //     method: "POST",

    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({ keywords:searchbar}),
    //   });

    //     let json = await response.json();
    setsearchdata(data);
    console.log(data);

    // }
  };

  const handlehome = () => {
    navigate("/");
  };
  const handleabout = () => {
    navigate("/donation");
  };

  return (
    <div
      className="flex fixed  flex-row  h-10 "
      style={{ "pointer-events": "auto" }}
    >
      <div className="h-screen bg-white  w-sidebarw  border-r-1 border-gray-400">
        <div className="flex justify-center  m-5">
          <img src={logo} alt="" className="w-sidebarwimg h-sidebarhimg" />
        </div>
        <br />
        {/* <div className="float-left mx-10 ">
        <ul>
          <li>
            <button className="my-3 px-20 py-2"> <FaUserCircle />Profile</button>
          </li>
          <li>
            <button className="my-3 py-2" style={{"padding-left":"75px","padding-right":"75px"}}><FiCompass />explore</button>
          </li>
          <li>
            <button className=" px-16 py-2"><FaEnvelope />
              messaging
            </button>
          </li>
        </ul>
</div> */}
        <Link to="/">
          <div class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-gray-200 text-black">
            <i class="bi bi-house-door-fill"></i>
            <span class="text-[15px] ml-4 text-black font-bold">Home</span>
          </div>
        </Link>
        <Link to="/explore">
          <div class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-gray-200  text-black">
            <i class="bi bi-bookmark-fill"></i>
            <span class="text-[15px] ml-4 text-black font-bold">Discover</span>
          </div>
        </Link>
        <Link to="/dm">
          <div class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-gray-200 text-black">
            <i class="bi bi-chat-left-dots-fill"></i>
            <span class="text-[15px] ml-4 text-black font-bold"> Messages</span>
          </div>
        </Link>
        <Link to="/donation">
          <div class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-gray-200 text-black">
            <i class="bi bi-cash"></i>
            <span class="text-[15px] ml-4 text-black font-bold"> Donate</span>
          </div>
        </Link>
        <Link to="/About">
          <div class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-gray-200  text-black">
            <i class="bi bi-chat-left-dots-fill"></i>
            <span class="text-[15px] ml-4 text-black font-bold">
              {" "}
              <Link to="/About">About </Link>
            </span>
          </div>
        <div class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-gray-200  text-black">
        <i class="bi bi-currency-dollar"></i>
          <span class="text-[15px] ml-4 text-black font-bold">
            {" "}
            <Link to="/nft">My NFT's </Link>
          </span>
        </div>
        </Link>
        <div class="p-2.5 mt-3 flex items-center rounded-md px-profilepadding duration-300 cursor-pointer hover:bg-gray-200 text-black">
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
        <div
          class="p-2.5 mt-bottommargin flex items-center rounded-md px-3.5 duration-300 cursor-pointer hover:bg-gray-200 text-black"
          onClick={HandleLogout}
        >
          <i class="bi bi-box-arrow-in-right"></i>
          <span class="text-[15px] ml-4 text-black font-bold">Logout</span>
        </div>
      </div>
      <nav className="w-screen h-sidebarh bg-white flex flex-row border-b-1 justify-items-center">
        {/* <div class="flex items-center ml-10 mr-9">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>

          <span class="font-bold text-lg ml-4">Home</span>
        </div> */}

        <div class="flex flex-col">
          <div className="flex items-center w-searchbarw rounded-lg px-4 py-2">
            <input
              className="w-full px-4 py-2 rounded-lg text-gray-700 focus:outline-none border"
              type="text"
              placeholder="Search..."
              onKeyUp={search}
              id="searchbar"
              onChange={handleValue}
            />
            <StyleButton>Search</StyleButton>
          </div>

          {searchdata.length > 0
            ? searchdata.map((element) => {
                return (
                  <div>
                    <div class="mt-0">
                      {emptyinput === true ? null : (
                        <ul
                          class="bg-white rounded-md shadow divide-y divide-gray-200"
                          key={element[0]}
                        >
                          <li class="px-6 py-4 hover:bg-gray-50">
                            <div className="flex flex-row items-center   ">
                              <div class="flex items-center justify-center h-16 w-16 bg-gray-200 rounded-full mr-10">
                                <img
                                  class="h-12 w-12 rounded-full"
                                  src={element[6]}
                                  alt="your-image-alt-text-here"
                                />
                              </div>

                              <Link
                                to={`/profile/${element[0]}`}
                                class="block hover:text-blue-500"
                                onClick={(e) => {
                                  emptyinput = true;
                                }}
                              >
                                {element[3]}
                              </Link>
                            </div>
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
