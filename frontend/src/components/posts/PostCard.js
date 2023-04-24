import React, { useState } from "react";
import image from "../../images/logo-white.png";
import { BsThreeDots } from "react-icons/bs";
const PostCard = () => {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <div className="w-postwidth h-postheight bg-slate-600 rounded-md">
      <div>
        <div class="flex items-center pt-3 pl-3 ">
          <img
            src={image}
            alt="Profile Image"
            class="rounded-full w-10 h-10 mb-3"
          />
          <div class="ml-4">
            <h2 class="text-l font-bold">John Doe</h2>
            <p class="text-gray-500 text-xs  ">April 24, 2023</p>
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
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus adipisci ducimus delectus magni sit voluptatibus non culpa expedita magnam tempora facilis nihil dicta odio itaque incidunt vitae, 

        </div>
        <div className=" h-postimage">
          <img
            src="https://hips.hearstapps.com/hmg-prod/images/cute-baby-animals-1558535060.jpg?crop=1.00xw:0.669xh;0,0.158xh&resize=1200:*"
            alt=""
            srcset=""
          />
        </div>
        <div className=" flex flex-row justify-around">
          <button className=" w-buttonli">Like</button>
          <button className=" w-buttonli">comment</button>
          <button className=" w-buttonli h-10">share</button>
         

        </div>
        
      </div>
  
    </div>
  );
};

export default PostCard;
