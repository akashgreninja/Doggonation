import React, { useState, useEffect } from "react";
import { getallposts } from "../../api/allpost";
import Post from "./Post";
import { json } from "react-router-dom";

const PostCard = () => {
  let user_id=localStorage.getItem('token')
  const [posts, setposts] = useState([]);
  useEffect(() => {
    load();
  }, []);
  const load = async () => {
    let data = await getallposts(user_id);
    data = await data.data;
    setposts(data);
  };

  return (
    <div>
      {posts !== []
        ? posts.map((element) => {
            return (
              <div key={element}>
                <Post element={element} />
                <br />
              </div>
            );
          })
        : null}
    </div>
  );
};

export default PostCard;
