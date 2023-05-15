import React,{useState,useEffect} from 'react'
import io from 'socket.io-client';

const socket = io('http://localhost:3003');

const Dm = () => {
    const [messages, setMessages] = useState([1]);

    useEffect(() => {
      socket.on('connect', () => {
        socket.emit('message', {data: 'I\'m connected!'});
      })
    }, []);
    socket.on('messagerec', (message) => {
            
        setMessages([...messages, message['data']]);
        console.log(message)
      });
    const sendMessage=(message)=>{
        let msg=document.getElementById('textinput')
        socket.emit('message', {data:msg.value,user_id:3});
    }
    return (
      <div>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
        <input type="text" name="" id="textinput" />
        <button onClick={sendMessage}>
          Send Message
        </button>
      </div>
    );
}


export default Dm