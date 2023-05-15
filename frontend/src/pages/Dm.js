import React,{useState,useEffect} from 'react'
import io from 'socket.io-client';
import { msg } from '../api/msg';

const socket = io('http://localhost:3003');

const Dm = () => {
    const [messages, setMessages] = useState({});
    
    const[roomid,setroomid]=useState(null)

    const sender=29
    useEffect(() => {
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


export default Dm