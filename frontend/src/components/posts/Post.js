import React, { useState, useEffect, useRef } from "react";
import image from "../../images/logo-white.png";
import { BsThreeDots } from "react-icons/bs";
import Comment from "./Comment";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { like_post } from "../../api/likepost";
import io from "socket.io-client";
import { remove_like_post } from "../../api/unlikepost";
import "./Post.css";
import { Getallfollowersforuser } from "../../api/getallfollowers";
import Report from "./Report";

const Post = (props) => {
  const socket = io("http://localhost:3003");
  const user_id=localStorage.getItem('token')
  const style = {
    position: "absolute",
    top: "30%",
    left: "83%",
    float:"right",
    transform: "translate(-50%, -50%)",
    width: 350,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 0.5,
  };
  const [msgsent, setmsgsent] = useState(false)
  const [roomid, setroomid] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = async() => {
    setOpen(true);
    let data=await Getallfollowersforuser(user_id)
    setfollowing(data.data)
  };
  const handleClose = () => {
    setOpen(false);
    setmsgsent(false)
  }


  let toggle = false;
  let likeRef = useRef(null);
  const [following, setfollowing] = useState([])
  const [likerender, setlikerender] = useState(null);
  const [loadcomments, setloadcomments] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  let element = props.element[0];
  let commentRef = useRef(null);
  const handlecomment = () => {
    if (toggle === true) {
      commentRef.current.style.display = "none";
      setloadcomments(false);
      toggle = false;
    } else {
      commentRef.current.style.display = "block";
      setloadcomments(true);
      toggle = true;
    }
  };
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

  const handleshare=async(reciever_id,msg)=>{
    socket.emit("connectuser", { sender_id: user_id, reciever_id: 2 });
    await socket.on("connection", (message) => {
      setroomid(message["data"])

  })
  await socket.emit("message", {
    data:msg ,
    room_id: roomid,
    sender_id: user_id,
    reciever_id: reciever_id,
  });
  setmsgsent(true)
   
}
  return (
    <div className="w-full bg-white  mb-2 mt-2 rounded-lg border-2 border-grey-500">
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-content-between  pt-3 pl-3 pr-5">
          <div class="flex items-center">
            <img
              src={element[11]}
              alt="Profile Image"
              class="rounded-full w-10 h-10 mb-3"
            />
            <div class="ml-4">
              <h2 class="text-l font-bold">{element[10]}</h2>
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
              <div className="absolute mt-2 w-48 bg-white rounded-lg shadow-xl">
                <Report post_id={element[2]}/>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-banana-100 hover:text-white"
                >
                  Option 2
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-banana-100 hover:text-white"
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
              {
                element[8]
              }
               Likes
            </button>
            <button className="interaction-button" onClick={handlecomment}>
              {!loadcomments ? (
                <i class="fa-regular fa-2x fa-comment"></i>
              ) : (
                <i class="fa-solid fa-2x fa-comment"></i>
              )}
              Comment
            </button>
            <button onClick={handleOpen} className="interaction-button">
              <i class="fa-regular fa-2x fa-paper-plane"></i>Share
            </button>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
               friends
               {
                following.map((ele)=>{
                  return <div className="flex flex-row" key={ele}>
                   <img
              src={ele[6]}
              alt="Profile Image"
              className="rounded-full w-10 h-10 mb-3 mx-2"
            />
             <h3 className="mx-3">
              {ele[3]}
             </h3>
             <div className="mx-2 w-2/12 "><button onClick={()=>handleshare(ele[0],element[0])} className="interaction-button border">
             
             {
              msgsent?"sent":<i class="fa-regular fa-2x fa-paper-plane"></i>
             }
             </button></div>

                  </div>
                })
               }
            </Box>
          </Modal>
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
