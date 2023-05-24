import React, { useState, useEffect, useRef } from "react";
import Modal from "@mui/material/Modal";
import Post from "./Post";
import PostModal from "./PostModal";

const ExploreCard = (props) => {
  const [openPost, setOpenPost] = useState(false);

  const element = props.element;
  const handleOpenPost = () => setOpenPost(true);

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
        aria-labelledby="modal-modal-Post"
        aria-describedby="modal-modal-post"
      >
        <box>
          <div className="h-5/6 w-fit mx-auto my-10">
            <PostModal element={element} />
          </div>
        </box>
      </Modal>
    </div>
  );
};

export default ExploreCard;
