import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import { useParams } from "react-router-dom";
import { Getuser } from "../api/getuser";
import {
  GetNumberOfFollowersForUser,
  GetNumberOfFollowingForUser,
  Getallfollowersforuser,
} from "../api/getallfollowers";
import { useNavigate } from "react-router-dom";
import { getuserposts } from "../api/allpost";
import FollowButton from "../components/buttons/followbutton";
import { Box, Modal } from "@mui/material";
import PostModal from "../components/posts/PostModal";
import { follow } from "../api/follow";
const ProfilePage = (props) => {
  const { id } = useParams();
  const [body, setbody] = useState();
  const [followers, setfollowers] = useState();
  const [following, setfollowing] = useState();
  const [posts, setposts] = useState([]);
  const [openPost, setOpenPost] = React.useState(false);
  const user_id = localStorage.getItem("token");
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    boxShadow: 12,
    outlinewidth: 0,
  };

  useEffect(() => {
    props.Sidebarrender(true);

    getuser();

    getFolloowers();
    getFollowing();
    getAllPosts();
  }, []);

  //  const {id}=useParams()
  const nav = useNavigate();

  const handleOpenPost = () => setOpenPost(true);

  const handleClosePost = () => setOpenPost(false);

  const getFolloowers = async () => {
    const { data } = await GetNumberOfFollowersForUser(id);
    setfollowers(data);
    console.log(data);

    if (data[0] === null) {
      setfollowers(0);
    }
  };

  const getAllPosts = async () => {
    const { data } = await getuserposts(id);
    
    if (data.sucess === false) {
      setposts([]);
    }
    setposts(data);
 
     console.log(posts)
  };

  const getFollowing = async () => {
    const { data } = await GetNumberOfFollowingForUser(id);
    setfollowing(data);
    console.log(data);

    if (data[0] === null) {
      setfollowing(0);
    }
  };

  const getuser = async () => {
  

    const { data } = await Getuser(id);

    setbody(data);
   

    if (data === null) {
      nav("/404");
      props.Sidebarrender(false);
    }
  };

  return (
    <div class="col-md-5 mx-auto h-10">
      <div class="bg-white shadow rounded overflow-hidden -z-10 relative">
        <div class="px-4 pt-0 pb-4 cover">
          <div class="media align-items-end profile-head">
            <div class="profile mr-3 -z-10">
              <img
                src={body ? body[6] : null}
                alt="..."
                width="130"
                class="rounded mb-2 img-thumbnail -z-10 relative "
              />
              {body && body[0] === localStorage.getItem("token") ? (
                <a href="#" class="btn btn-outline-dark btn-sm btn-block">
                  Edit profile
                </a>
              ) : null}
            </div>
            <div class="media-body mb-5 text-white">
              {/* <h4 class="mt-0 mb-0">{body[1]}</h4> */}
              <p class="small mb-4">
                <i class="fas fa-map-marker-alt mr-2"></i>Bangalore
              </p>
            </div>
          </div>
        </div>
        <div class="bg-light p-4 d-flex justify-content-end text-center">
          <ul class="list-inline mb-0">
            <li class="list-inline-item">
              <h5 class="font-weight-bold mb-0 d-block">
                {posts.length>0 ? posts.length : 0}
              </h5>
              <small class="text-muted">
                <i class="fas fa-image mr-1"></i>Photos
              </small>
            </li>
            <li class="list-inline-item">
              <h5 class="font-weight-bold mb-0 d-block">{followers}</h5>
              <small class="text-muted">
                <i class="fas fa-user mr-1"></i>Following
              </small>
            </li>
            <li class="list-inline-item">
              <h5 class="font-weight-bold mb-0 d-block">{following}</h5>
              <small class="text-muted">
                <i class="fas fa-user mr-1"></i>Followers
              </small>
            </li>
            {id === user_id ? null : (
              <li class="list-inline-item">
                <div className="">
                  <FollowButton
                    user_id={user_id}
                    refresh={getFollowing}
                    id={id}
                  />
                </div>
              </li>
            )}
          </ul>
        </div>
        <div class="px-4 py-3">
          <h5 class="mb-0">About</h5>
          <div class="p-4 rounded shadow-sm bg-light">
            <p class="font-italic mb-0">
              cute doggo, loves long walks, belly rubs and eating chicken
            </p>
          </div>
        </div>
        <div class="py-4 px-4">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <h5 class="mb-0">Recent photos</h5>
            <a href="#" class="btn btn-link text-muted">
              Show all
            </a>
          </div>
          <div class="row">
            {posts.length > 0 ? (
              posts.map((postlist) => {
                return (
                  <div key={postlist[0]} class="col-lg-6 mb-2 pr-lg-1">
                    <img
                      src={postlist[0]}
                      alt="..."
                      class="img-fluid rounded shadow-sm h-64"
                      onClick={handleOpenPost}
                    
                    />
                    <PostModal
                      element={postlist}
                      openPost={openPost}
                      handleClosePost={handleClosePost}
                    />
                  </div>
                );
              })
            ) : (
              <h3>Posts are empty</h3>
            )}
          </div>  
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
