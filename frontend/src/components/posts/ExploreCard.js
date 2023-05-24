import React, { useState, useEffect, useRef } from "react";
import Modal from "@mui/material/Modal";
import Post from "./Post";
import PostModal from "./PostModal";
import { Box } from "@mui/material";

const ExploreCard = (props) => {
  const [openPost, setOpenPost] = React.useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    boxShadow: 12,
    outlinewidth: 0,
  };

  const element = props.element;
  const handleOpenPost = () => setOpenPost(true);

  const handleClosePost = () => setOpenPost(false);

  return (
    <div className="mx-px py-px ">
      <img
        src={element[0]}
        alt=""
        srcset=""
        className="w-full cursor-pointer hover:shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)]"
        onClick={handleOpenPost}
      />
      <Modal
        open={openPost}
        onClose={handleClosePost}
        aria-labelledby="modal-modal-Post"
        aria-describedby="modal-modal-post"
      >
        <Box sx={style}> 
            <PostModal element={element} />
        </Box>
      </Modal>
    </div>
  );
};

export default ExploreCard;
