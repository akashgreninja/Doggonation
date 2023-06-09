import React, { useState, useEffect, useRef } from "react";
import Modal from "@mui/material/Modal";
import Post from "./Post";
import PostModal from "./PostModal";
import { Box } from "@mui/material";

const ExploreCard = (props) => {
  const [openPost, setOpenPost] = React.useState(false);

  const element = props.element;
  const handleOpenPost = () => setOpenPost(true);

  const handleClosePost = () => setOpenPost(false);

  return (
    <div className="mx-4 py-4 ">
      <img
        src={element[0]}
        alt=""
        srcset=""
        className="w-full rounded-3xl cursor-pointer hover:shadow"
        onClick={handleOpenPost}
      />
      <PostModal element={element[0]} openPost={openPost} handleClosePost={handleClosePost}/>
    </div>
  );
};

export default ExploreCard;
