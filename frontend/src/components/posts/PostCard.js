import React, { useState, useEffect } from "react";
import { getallposts } from "../../api/allpost";
import Post from "./Post";
import { json } from "react-router-dom";


const PostCard = () => {
  const [posts, setposts] = useState([]);
  useEffect(() => {
    load();
  }, []);
  const load = async () => {
    let data = await getallposts();
    data= await data.data
    setposts(data);
    console.log(posts)
  };
 console.log(posts)
  return (
    <div>

      {posts !== [] ? posts.map((element)=>{
        return <div key={element}>
          <Post element={element}/>
          <br />
        </div>
      }):null}
    </div>
  );
};

export default PostCard;
