import React,{useState,useEffect} from 'react'
import io from 'socket.io-client';

const socket = io('http://localhost:3003');

const Dm = () => {
  
    const [recipient, setRecipient] = useState(null);
    useEffect(() => {
        connectsocket()
    }, [])
    
    const connectsocket=()=>{
        socket.emit('connectuser', {
          
        
        });
    }
    const sendMessage = (message) => {
        socket.emit('message', {
            from: 29,
            recipient: 3,
            text: "message",
        });
    };
    return (
        <div>
            <h1>DM Section</h1>
            <ul>
                {/* Display messages to/from the selected recipient */}
            </ul>
            <select value={recipient} onChange={(e) => setRecipient(e.target.value)}>
                <option value={null}>Select a user</option>
                {/* {otherUsers.map((user) => (
                    <option key={user.id} value={user.id}>{user.username}</option>
                ))} */}
            </select>
            <form onSubmit={(e) => {
                e.preventDefault();
                sendMessage(e.target.message.value);
                e.target.message.value = '';
            }}>
                <input type="text" name="message" placeholder="Type a message..." />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}


export default Dm