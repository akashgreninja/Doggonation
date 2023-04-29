import React, { useEffect, useState } from "react";
import logo from "../../../images/logo-no-background.png";
import { Link, json } from "react-router-dom";
import SearchButton from "../../buttons/SearchButton";
import { startsearch } from "../../../api/search";
import { FaUserCircle } from 'react-icons/fa';
import { FiCompass } from 'react-icons/fi';
import { FaEnvelope } from 'react-icons/fa';

const Sidebar = () => {
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

  return (
    <div className="flex fixed  flex-row  z-50">
      <div className="h-screen bg-white  w-sidebarw  border-r-1 border-gray-400">
        <div className="flex justify-center  m-5">
          <img src={logo} alt="" className="w-sidebarwimg h-sidebarhimg" />

         
        </div><br />
        <div className="float-left mx-10 ">
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
</div>
        
      </div>
      <nav className="w-screen h-sidebarh bg-white flex flex-row border-b-1 border-gray-400">
        <div class="flex items-center ml-10 mr-9">
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
        </div>

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
            <SearchButton />
          </div>

          {searchdata.length > 0
            ? searchdata.map((element) => {
                return (
                  <div>
                    <div class="mt-0">
                      {emptyinput === true ? null : (
                        <ul class="bg-white rounded-md shadow divide-y divide-gray-200">
                          <li class="px-6 py-4 hover:bg-gray-50">
                            <a href="#" class="block hover:text-blue-500">
                              {element[3]}
                            </a>
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
