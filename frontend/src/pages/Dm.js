import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import io from "socket.io-client";
import { GET_FOLLOWING } from "../api/routes";
import { Getallfollowersforuser } from "../api/getallfollowers";

const socket = io("http://localhost:3003");

const Dm = () => {
  const user = useSelector((state) => state.allposts.Userinfo);
  console.log(user);
  const [allusers,Setallusers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
   
    const dali=localStorage.getItem("token");
    socket.emit("connectuser", {
      user_id: 12, // Replace with sender's ID
      recipient: 12, // Replace with recipient's ID
      text: messageInput,
    });
    console.log("connected");
    socket.on('message', (data) => {
        setMessages((prevMessages) => [...prevMessages, data]);
        console.log(data);
      });
  
      // Clean up the socket connection when the component unmounts
      return () => {
        socket.disconnect();
      };

  }, []);

  const GetAllfollowers=async()=>{
    const {data}=await   Getallfollowersforuser(user.user_id);
    console.log(data);
    Setallusers(data);

    
  }

 
  const sendMessage = () => {
    const message = {
      from: 29, // Replace with sender's ID
      recipient: 3, // Replace with recipient's ID
      text: 'Hello, world!', // Replace with your message
    };
    socket.emit('message', message);
    console.log("sent");
  };


  return (
<div>
      <button onClick={sendMessage}>Send Message</button>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dm;
