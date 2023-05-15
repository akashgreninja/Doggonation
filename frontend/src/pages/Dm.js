import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import io from "socket.io-client";
import { GET_FOLLOWING } from "../api/routes";
import { Getallfollowersforuser } from "../api/getallfollowers";

const socket = io("http://localhost:3003");

const Dm = () => {
  const user = useSelector((state) => state.allposts.Userinfo);
  console.log(user);
  const [messages, setMessages] = useState([1]);

  useEffect(() => {
    GetAllfollowers();
    socket.on('connect', () => {
      socket.emit('message', { data: 'I\'m connected!' });
    });
    socket.on('messagerec', (message) => {
      setMessages([...messages, message['data']]);
      console.log(message);
    });
  }, []);

  const sendMessage = () => {
    let msg = document.getElementById('textinput');
    socket.emit('message', { data: msg.value, user_id: 3 });
  };

  const GetAllfollowers = async () => {
    const { data } = await Getallfollowersforuser(user.user_id);
    console.log(data);
    Setallusers(data);
  };

  return (
    <div>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <input type="text" name="" id="textinput" />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default Dm;
