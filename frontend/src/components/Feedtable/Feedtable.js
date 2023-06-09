import React,{useEffect,useState} from "react";
import PostCard from "../posts/PostCard";
import Addpost from "../posts/Addpost";
import { getallposts } from "../../api/allpost";
const Feedtable = (props) => {
  let user_id=localStorage.getItem('token')

  const [posts, setposts] = useState([]);
  const load = async () => {
    let data = await getallposts(user_id);
    data = await data.data;
    setposts(data);
  };
  return (
      <div className="w-[40vw] mx-10 my-2 mb-50 pointer-events-auto">

       <Addpost loader={props.loader} posts={posts} setposts={setposts} load={load}/>
        <div className="just">
          <PostCard posts={posts} setposts={setposts} load={load}/>
        </div>
      </div>
  );
};

export default Feedtable;
