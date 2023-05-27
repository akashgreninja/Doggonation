import React, { useState, useEffect } from "react";
import { getallposts } from "../../api/allpost";
import Post from "./Post";
import { json } from "react-router-dom";

const PostCard = (props) => {
  let {posts,setposts,load}=props
  useEffect(() => {
    load();
  }, []);
  

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
