import React, { useState, useEffect } from "react";
import image from "../../images/logo-white.png";
import { BsThreeDots } from "react-icons/bs";
import Comment from "./Comment";



const Post = (props) => {
  const [showOptions, setShowOptions] = useState(false);
  let element=props.element
  return (
    <div className="w-postwidth  h-postheight bg-slate-600 rounded-md">
      <div>
        <div class="flex items-center pt-3 pl-3 ">
          <img 
            src={element[0]}
            alt="Profile Image"
            class="rounded-full w-10 h-10 mb-3"
          />
          <div class="ml-4">
            <h2 class="text-l font-bold">
                {element[1]}
            </h2>
            <p class="text-gray-500 text-xs  "> {element[5]}</p>
          </div>
          <div className="relative ml-threething">
            <div
              className="ml-threething cursor-pointer"
              onClick={() => setShowOptions(!showOptions)}
            >
              <BsThreeDots />
            </div>
            {showOptions && (
              <div className="absolute top-0 right-0 mt-2 w-48 bg-white rounded-lg shadow-xl">
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
                >
                  Option 1
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
                >
                  Option 2
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
                >
                  Option 3
                </a>
              </div>
            )}
          </div>
        </div>
        <div className="text-sm">
          {element[1]}
        </div>
        <div className=" h-postimage">
          <img
            src={element[0]}
            alt=""
            srcset=""
            width={450} 
            className="px-10"
          />
        </div>
        <div className=" flex flex-row justify-around">
          <button className=" w-buttonli">Like</button>
          <button className=" w-buttonli">comment</button>
          <button className=" w-buttonli h-10">share</button>
        </div>
        <div className="container">
            <Comment post_id={element[2]}/>
        </div>
      </div>
    </div>
  );
};

export default Post;
