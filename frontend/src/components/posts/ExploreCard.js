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
  const user_id = 55;
  const style = {
    position: "absolute",
    top: "30%",
    left: "83%",
    float: "right",
    transform: "translate(-50%, -50%)",
    width: 350,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 0.5,
  };
  const [msgsent, setmsgsent] = useState(false);
  const [roomid, setroomid] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = async () => {
    setOpen(true);
    let data = await Getallfollowersforuser(user_id);
    setfollowing(data.data);
  };
  const handleClose = () => {
    setOpen(false);
    setmsgsent(false);
  };

  let toggle = false;
  let likeRef = useRef(null);
  const [following, setfollowing] = useState([]);
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

  const handleshare = async (reciever_id, msg) => {
    socket.emit("connectuser", { sender_id: user_id, reciever_id: 2 });
    await socket.on("connection", (message) => {
      setroomid(message["data"]);
    });
    await socket.emit("message", {
      data: msg,
      room_id: roomid,
      sender_id: user_id,
      reciever_id: reciever_id,
    });
    setmsgsent(true);
  };
  return (
    <div className="mx-px py-px ">
      <img src={element[0]} alt="" srcset="" className="w-full cursor-pointer hover:shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)]" />
    </div>
  );
};

export default Post;
