import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { msg } from "../api/msg";

import { useSelector } from "react-redux";

import { GET_FOLLOWING } from "../api/routes";
import {GetNumberOfFollowersForUser } from "../api/getallfollowers";
import ChatPage from "./ChatPage";

const socket = io("http://localhost:3003");

const Dm = (props) => {
  const [messages, setMessages] = useState([]);
  const user = localStorage.getItem("token");
  console.log(user);
  // const user = useSelector((state) => state.allposts.Userinfo);

  const [roomid, setroomid] = useState(null);
  const [allusers, Setallusers] = useState([]);
  const [recieverid, setrecieverid] = useState(0)

  useEffect(() => {
    props.Sidebarrender(true);

  }, []);

  // const loadmsgs = async () => {
  //   const {data} = await msg(roomid);
  //   setMessages(data);
  //   console.log(data);
  // };
  socket.on("messagerec", (message) => {
    // setMessages([
    //   ...messages,
    //   `[ ${message.sender_id}, ${message.data},'2023-05-18 00:27:45']`,
    // ]);
    // let  finalmsg=[message.sender_id, message.data,'2023-05-18 00:27:45']
    // setMessages(messages.concat(finalmsg))

    // console.log(message);
  });
  const GetAllfollowers = async () => {
    const { data } = await GetNumberOfFollowersForUser(user);
    console.log(data);
    Setallusers(data);
  };

  const sendMessage = () => {
    let msg = document.getElementById("textinput");
    console.log(roomid);
    socket.emit("message", {
      data: msg.value,
      room_id: roomid,
      sender_id: user,
      reciever_id: recieverid,
    });
    msg.value = "";
  };
  return (
    // <div>
    //   <ul>
    //     {messages.map((message) => (
    //         <li >{message}</li>
    //       ))}
    //   </ul>
    //   <input type="text" name="" id="textinput" />
    //   <button onClick={sendMessage}>Send Message</button>
    // </div>
    <div className="ml-chatmargin pt-chatpaddingtop max-h-10 ">
      <ChatPage sendMessage={sendMessage} RoomId={setroomid} livemessages={messages} reciever_id={setrecieverid} />
    </div>
  );
};

export default Dm;
