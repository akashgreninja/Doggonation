import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import "./Addposts.css";
import ReactLoading from "react-loading";
import React, {  useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { add_post } from "../../api/addpost";



const Addpost = (props) => {
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
  const user_id = 3;
  const [loading, setloading] = useState(false)
  const [laodingtext, setlaodingtext] = useState("submit")
  const [keyset, setkeyset] = useState(1);
  const [tags, settags] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {setOpen(true);

  }
  const [warning, setwarning] = useState("")
  const handleClose = () =>{ setOpen(false);
    setloading(false)
    setlaodingtext("submit")
    setwarning("")
    settags([])
  }

  const [image, setimage] = useState("");
  const [imageurl, setimageurl] = useState("")
  const [content, setcontent] = useState({ caption: "", location: "" });

  // const setLoader=(data)=>{
  //   setloader(data)

  // }
  const change = (e) => {
    setcontent({ ...content, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    if (e.target.files && e.target.files.length === 1) {
      setimage(e.target.files[0]);
    }
  };
  //uploading post
  const CreateUpload = async (e) => {
    e.preventDefault();
    setloading(true)
    try {
      const storage = getStorage();

      const storageRef = ref(storage, `posts/${image.name}`);
     
      uploadBytes(storageRef, image).then(() => {
        getDownloadURL(storageRef).then((url) => {
          setimageurl(url);
          console.log(imageurl)
          handleNewPost();
        });
      });
    } catch (e) {
      console.log(e);
      setloading(false)
      setlaodingtext("retry")
    }
    
  };

  const handleNewPost = async () => {
    let data = "";
    if (content.caption !== "" && content.location !== "" && imageurl !== "") {
      data = await add_post(
        imageurl,
        content.location,
        content.caption,
        user_id,
        tags
      );
    }

    if (data.status === 200) {
      setlaodingtext("upload successfull")
      handleClose();

    } 
    
    else {
      //add alert
      setloading(false)
      setlaodingtext("Retry")
      setwarning("upload unsuccessfull..sorry we didnt find any dogs in this picture")
    }
   
  };
  //tags handling
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
      <div className="flex w-11/12 mb-2 ml-2 items-center h-12 border border-gray-300 rounded-lg p-2">
        <input
          type="text"
          placeholder="Have something to share...??"
          className="w-full px-2 py-1 text-gray-700 "
        />
        <button
          onClick={handleOpen} 
          className="w-3/12 z-0 pl-3 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
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
                  onChange={change}
                  id="caption"
                  name="caption"
                  label="caption"
                  required
                  variant="outlined"
                />{" "}
                <br />
                <br />
                <i className="p-2 fa-solid fa-thumbtack fa-2x"></i>{" "}
                <TextField
                  name="location"
                  required
                  onChange={change}
                  id="location"
                  label="location"
                  variant="outlined"
                />{" "}
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
                      <div key={element}>
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
                    onChange={handleFile}
                    id="file-input"
                  />
                </label>
              </div>
            </div>
            <button
              onClick={CreateUpload}
              id="submit"
              className="float-right mx-10 p-3 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
            >
               
               {loading ? <ReactLoading  />: laodingtext }
             
            </button>
            <small>do not click outside modal till upload is complete</small><br />
            <small style={{"color":"red"}}>{warning}</small>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Addpost;
