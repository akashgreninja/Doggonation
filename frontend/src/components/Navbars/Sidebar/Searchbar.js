import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { startsearch } from "../../../api/search";
import { useSelector } from "react-redux";

const Searchbar = () => {
  const profile = useSelector((state) => state.UserId.Userinfo);
  console.log(profile);

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

  return (
    <div className="w-full m-3 my-[-6px]  ml-8 pl-4">
      <input
        className="w-2/3 px-4 py-2 rounded-3xl text-gray-700 focus:outline-none border"
        type="text"
        placeholder="Search..."
        onKeyUp={search}
        id="searchbar"
        onChange={handleValue}
      />

      {searchdata.length > 0
        ? searchdata.map((element) => {
            return (
              <div>
                <div class="mt-0 absolute">
                  {emptyinput === true ? null : (
                    <ul
                      class="bg-white rounded-md shadow divide-y divide-gray-200"
                      key={element[0]}
                    >
                      <li class="px-6 py-4 hover:bg-gray-50">
                        <div className="flex flex-row items-center ">
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
  );
};

export default Searchbar;
