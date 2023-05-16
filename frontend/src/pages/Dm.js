import React,{useState,useEffect} from 'react'
import io from 'socket.io-client';
import { msg } from '../api/msg';

import { useSelector } from 'react-redux';

import { GET_FOLLOWING } from "../api/routes";
import { Getallfollowersforuser } from "../api/getallfollowers";

const socket = io("http://localhost:3003");

const Dm = () => {
    const [messages, setMessages] = useState({});
    const user = useSelector((state) => state.allposts.Userinfo);
  console.log(user);
  

  
    const[roomid,setroomid]=useState(null)
   const [allusers, Setallusers] = useState([])
    const sender=29
    useEffect(() => {
      GetAllfollowers();
     socket.emit('connectuser', {sender_id:sender,reciever_id:2})
     loadmsgs()
    }, []);
    socket.on('connection',(message)=>{
      setroomid(message['data'])
      
    })

    const loadmsgs=async()=>{
      
      let data=await msg(roomid)
      setMessages(data.data)
      console.log(data.data)
    }
    socket.on('messagerec', (message) => {
        
        setMessages([...messages, message]);
        console.log(messages)
        
      });
      const GetAllfollowers = async () => {
        const { data } = await Getallfollowersforuser(user.user_id);
        console.log(data);
        Setallusers(data);
      };

    const sendMessage=()=>{
        let msg=document.getElementById('textinput')
        socket.emit('message', {data:msg.value,room_id:roomid,sender_id:sender,reciever_id:2})
        msg.value=""
    }
    return (
      <div>
        <ul>
          {/* {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))} */}
        </ul>
        <input type="text" name="" id="textinput" />
        <button onClick={sendMessage}>
          Send Message
        </button>
      </div>
    );
}

 

 

  


export default Dm;
