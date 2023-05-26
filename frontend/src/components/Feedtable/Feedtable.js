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
    <div className="" style={{ "margin-bottom": "50px", "pointer-events":"auto" }}>
      <div className="w-1/2 mx-32" >

       <Addpost loader={props.loader} posts={posts} setposts={setposts} load={load}/>
        <div className="just">
          <PostCard posts={posts} setposts={setposts} load={load}/>
        </div>
      </div>
      
      {/* <div className=" flex flex-wrap right-10 w-1/4 top-20 p-5 fixed">
        <div className=" ">
          <div className=" block rounded-lg bg-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <div className="border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
              Featured
            </div>
            <div className="p-6">
              <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                Special title treatment
              </h5>
              <p className="">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
            </div>
          </div>
        </div>

        <div className="py-10  ">
          <div className=" block rounded-lg bg-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <div className="border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
              Featured
            </div>
            <div className="p-6">
              <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                Special title treatment
              </h5>
              <p className="">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Feedtable;
