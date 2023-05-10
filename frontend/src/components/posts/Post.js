import React, { useState, useEffect,useRef } from "react";
import image from "../../images/logo-white.png";
import { BsThreeDots } from "react-icons/bs";
import Comment from "./Comment";
import { like_post } from "../../api/likepost";
import { remove_like_post } from "../../api/unlikepost";



const Post = (props) => {
  let toggle=false
  let likeRef=useRef(null)
  const [likerender, setlikerender] = useState(null)
const [loadcomments, setloadcomments] = useState(false)
  const [showOptions, setShowOptions] = useState(false);
  let element=props.element
  let commentRef=useRef(null)
  
  const handlecomment=()=>{
      if (toggle==true){commentRef.current.style.display="none"
      setloadcomments(false)
      toggle=false}
      else{
        commentRef.current.style.display="block"
        setloadcomments(true)
      toggle=true
      }

  }
  const handleLike =async()=>{
    if(element[4]===0){
    let data=await like_post(element[2])
    if (data.status===200){element[4]=1
      element[8]+=1
    setlikerender(1)    }
  }else{
    let data =await remove_like_post(element[2])
    if (data.status===200){
    element[4]=0
    element[8]-=1
    setlikerender(2)}
  }}
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
        <div  className=" flex flex-row justify-around">
          <button className=" w-buttonli" key={likerender} onClick={handleLike} >{element[4]===0?<i class="fa-regular fa-2x fa-heart"></i>:<i class="fa-solid fa-2x fa-heart"></i>} {element[8]} </button>
          <button className=" w-buttonli" onClick={handlecomment}>comment </button>
          <button className=" w-buttonli h-10">share</button>
        </div>
        <div ref={commentRef} style={{"display":"none"}} className="container">
            {loadcomments?<Comment post_id={element[2]} numofcomments={element[9]}/>:null}
        </div>
      </div>
    </div>
  );
};

export default Post;
