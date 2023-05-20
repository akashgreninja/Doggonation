import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { msg } from "../api/msg";

import { useSelector } from "react-redux";

import { GET_FOLLOWING } from "../api/routes";
import { Getallfollowersforuser } from "../api/getallfollowers";
import ChatPage from "./ChatPage";

const socket = io("http://localhost:3003");

const Dm = (props) => {
  const [messages, setMessages] = useState([]);
  const user = localStorage.getItem("token");
  console.log(user);
  // const user = useSelector((state) => state.allposts.Userinfo);

  const [roomid, setroomid] = useState(null);
  const [allusers, Setallusers] = useState([]);

  useEffect(() => {
    props.Sidebarrender(true);
    GetAllfollowers();
    socket.emit("connectuser", { sender_id: user, reciever_id: 56 });
    // loadmsgs();
  }, []);
  socket.on("connection", (message) => {
    setroomid(message["data"]);
  });

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
    const { data } = await Getallfollowersforuser(user);
    console.log(data);
    Setallusers(data);
  };

  const sendMessage = () => {
    let msg = document.getElementById("textinput");
    socket.emit("message", {
      data: msg.value,
      room_id: roomid,
      sender_id: user,
      reciever_id: 56,
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
      <ChatPage sendMessage={sendMessage} RoomId={roomid} livemessages={messages} />
    </div>
  );
};

export default Dm;
