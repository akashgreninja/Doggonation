import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Icon from "@mui/material/Icon";
import "./Addposts.css";

const Addpost = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const [keyset, setkeyset] = useState(1);
  const [tags, settags] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = (element) => {
    let arr = tags.filter(function (item) {
      return item !== element;
    });
    settags(arr);
    setInputValue("");
  };

  const [inputValue, setInputValue] = useState("");

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      tags.push(inputValue);
      setInputValue("");
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <div className="flex w-7/12 mb-2 items-center h-10 border border-gray-300 rounded-lg p-2">
        <input
          type="text"
          placeholder="Have something to share...??"
          className="w-full px-2 py-1 text-gray-700 "
        />
        <button
          onClick={handleOpen}
          className="w-3/12 z-50 pl-3 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
        >
          Create Post
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
          <p className="form-title"> Create new post</p>
            <div className="flex ">
             
              <div className="mt-5">
                <i className="fa-solid fa-envelope fa-2x p-2"></i>
                <TextField
                  id="caption"
                  label="caption"
                  variant="outlined"
                />{" "}
                <br />
                <br />
                <i className="p-2 fa-solid fa-thumbtack fa-2x"></i>{" "}
                <TextField id="location" label="location" variant="outlined" />{" "}
                <br />
                <br />
                <i className="fa-solid fa-hashtag  fa-2x p-2"></i>{" "}
                <TextField
                  className="mb-3"
                  id="tag"
                  label="tag"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  variant="outlined"
                />{" "}
                <br />
                <Stack direction="row" spacing={1}>
                  {tags.map((element) => {
                    return (
                      <div>
                        <Chip
                          label={element}
                          variant="outlined"
                          onDelete={() => handleDelete(element)}
                        />
                      </div>
                    );
                  })}
                </Stack>
              </div>
              <div className="m-5 float-right w-1/2">
               
                  <span className="drop-title">Upload your file</span>
                  <p className="form-paragraph">File should be an image</p>
                  <label for="file-input" className="drop-container">
                    <span className="drop-title">Drop files here</span>
                    or
                    <input
                      type="file"
                      accept="image/*"
                      required=""
                      id="file-input"
                    />
                  </label>
               
              </div>
            </div>
            <button className="float-right mx-10 p-3 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
              Submit
            </button>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Addpost;
