import React, { useState, useEffect } from "react";
import { GetAllNonFollowers } from "../../api/getallfollowers";
import { follow } from "../../api/follow";
import { unfollow } from "../../api/unfollow";

const HomepageRight = () => {
  useEffect(() => {
    getAllnonfollows();
  }, []);
  
  const [buttonText, setButtonText] = useState("Follow");
  const [color, setcolor] = useState('blue-500')


  const [user, setuser] = useState([]);
  const user_id = localStorage.getItem("token");

  const getAllnonfollows = async () => {
    const { data } = await GetAllNonFollowers(user_id);
    console.log(data);
    setuser(data);
  };
  const HandleColor=async (e)=>{
    if (buttonText==="Follow") {
      const data=await follow(user_id,e)
      if (data.status===200){
        setButtonText("Following");
        setcolor("blue-700");
        console.log(data)
        setuser(user.filter((user)=>user[0]!==e))
        console.log(user)
      }
  
    } else {
      const data=await unfollow(user_id,e)
      if (data.status===200){
        setButtonText("Follow");
        setcolor("blue-500");
        console.log(data)
      }

  }
}


  return (
    <div className="user-list fixed top-0 right-0 w-72 p-4 bg-white mr-10 mt-4/5">
      <p className="text-sm font-bold mb-4 text-gray-500">Suggested users</p>
      {user
        ? user.map((users) => (
            <div key={users[0]} className="flex items-center space-x-4 mb-2">
              <div className="w-12 h-12">
                <img
                  src={users[6]}
                  alt={users[1]}
                  className="rounded-full w-full h-full object-cover"
                />
              </div>
              <span className="text-gray-800">{users[3]}</span>
              <button className={`px-3 py-1 text-sm bg-blue-500 text-white rounded`} onClick={(e)=>{HandleColor(users[0])}}>
                {buttonText}
              </button>
            </div>
          ))
        : <h1>No recommendations at the moment </h1>}
    </div>
  );
};

export default HomepageRight;
