import React, { useState, useEffect, useRef } from "react";
import image from "../../images/logo-white.png";
import { BsThreeDots } from "react-icons/bs";
import Comment from "./Comment";
import { like_post } from "../../api/likepost";
import { remove_like_post } from "../../api/unlikepost";
import "./Post.css";

const Post = (props) => {
  let toggle = false;
  let likeRef = useRef(null);
  const [likerender, setlikerender] = useState(null);
  const [loadcomments, setloadcomments] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  let element = props.element;
  let commentRef = useRef(null);
  const handlecomment = () => {
    if (toggle == true) {
      commentRef.current.style.display = "none";
      setloadcomments(false);
      toggle = false;
    } else {
      commentRef.current.style.display = "block";
      setloadcomments(true);
      toggle = true;
    }
  };
  const handleLike = async () => {
    if (element[4] === 0) {
      let data = await like_post(element[2]);
      if (data.status === 200) {
        element[4] = 1;
        setlikerender(1);
      }
    } else {
      let data = await remove_like_post(element[2]);
      if (data.status === 200) {
        element[4] = 0;
        setlikerender(2);
      }
    }
  };
  return (
    <div className="w-full bg-white  mb-2 mt-2 rounded-lg border-2 border-grey-500">
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-content-between  pt-3 pl-3 pr-5">
          <div class="flex items-center">
            <img
              src={element[0]}
              alt="Profile Image"
              class="rounded-full w-10 h-10 mb-3"
            />
            <div class="ml-4">
              <h2 class="text-l font-bold">{element[1]}</h2>
              <p class="text-gray-500 text-xs "> {element[5]}</p>
            </div>
          </div>
          <div className="">
            <div
              className="cursor-pointer"
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

        <div className="text-sm pl-3 pb-2">{element[1]}</div>
        <div className="w-full pb-2">
          <img
            src={element[0]}
            alt=""
            srcset=""
            width={450}
            className="w-full"
          />
        </div>
        <div className=" pt-0.5 border-t-2 mx-3">
          <div className="  flex flex-row w-full">
            <button
              className="interaction-button"
              key={likerender}
              onClick={handleLike}
            >
              {element[4] === 0 ? (
                <i class="fa-regular fa-2x fa-heart"></i>
              ) : (
                <i class="fa-solid fa-2x fa-heart"></i>
              )}
              Like
            </button>
            <button className="interaction-button" onClick={handlecomment}>
              {!loadcomments ? (
                <i class="fa-regular fa-2x fa-comment"></i>
              ) : (
                <i class="fa-solid fa-2x fa-comment"></i>
              )}
              Comment
            </button>
            <button className="interaction-button">
              <i class="fa-regular fa-2x fa-paper-plane"></i>Share
            </button>
          </div>
          <div
            ref={commentRef}
            style={{ display: "none" }}
            className="container w-full"
          >
            {loadcomments ? <Comment post_id={element[2]} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
