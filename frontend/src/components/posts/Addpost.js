import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import "./Addposts.css";
import ReactLoading from "react-loading";
import React, { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { add_post } from "../../api/addpost";
import { Client, Storage,realtime } from "appwrite";


const Addpost = (props) => {
  const client = new Client();

const storage = new Storage(client);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 0.5,
  };
  let bucketID=""
  let fileID=""
  const user_id = localStorage.getItem('token')
  const [loading, setloading] = useState(false);
  const [laodingtext, setlaodingtext] = useState("Post");
  const [keyset, setkeyset] = useState(1);
  const [tags, settags] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const [warning, setwarning] = useState("");
  const handleClose = () => {
    setOpen(false);
    setloading(false);
    setlaodingtext("Post");
    setwarning("");
    settags([]);
  };

  const [image, setimage] = useState("");
  const [imageurl, setimageurl] = useState("");
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
  const uploadpic=async()=>{
    realtime.subscribe(`storage.files.create`, (payload) => {
      console.log('New file created:', payload);
      const fileId = payload.$id;

      // Get the download URL of the newly created file
      storage.getFilePreview(fileId)
          .then((downloadURL) => {
              console.log('Download URL:', downloadURL);
          })
          .catch((error) => {
              console.error('Error retrieving download URL:', error);
          });
  });

const promise = storage.createFile(bucketID,fileID , document.getElementById('uploader').files[0]);
promise.then(function (response) {
    console.log(response); // Success
}, function (error) {
    console.log(error); // Failure
});
const result = storage.getFileDownload(bucketID, fileID);
setimageurl(result)
  }

  const CreateUpload = async (e) => {
    e.preventDefault();
    if (image===""){
      let doc=document.getElementById('filewarn')
      doc.innerHTML="please select a file"
      doc.style.color="red"
      return
    }
    if (content.caption===""){
      let cap=document.getElementById('capwarn')
      cap.innerHTML="please fill this field"
      cap.style.color="red"
      return

    }
    if (content.location===""){
      let cap=document.getElementById('locwarn')
      cap.innerHTML="please fill this field"
      cap.style.color="red"
      return

    }
    

    try {
      setloading(true);
      const storage = getStorage();

      const storageRef = ref(storage, `posts/${image.name}`);

      uploadBytes(storageRef, image).then(() => {
        getDownloadURL(storageRef).then((url) => {
          setimageurl(url)
          console.log(url)
          console.log(imageurl);
          handleNewPost(url);
        });
      });
    } catch (e) {
      console.log(e);
      setloading(false);
      
      setlaodingtext("retry");
    }
  };

  const handleNewPost = async (url) => {
    let data = "";
    if (url !== "" && content.caption !== "") {
      data = await add_post(
        url,
        content.location,
        content.caption,
        user_id,
        tags
      );
    }

    if (data.status === 200) {
      setlaodingtext("upload successfull");
      handleClose();
    } else {
      //add alert
      setloading(false);
      setlaodingtext("Retry");
      
      setwarning(
        "upload unsuccessfull..sorry we didnt find any dogs in this picture retry to upload anyway"
      );
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
    <div className="h-32 bg-white  mb-2 mt-2 rounded-lg p-2 border-2 border-grey-500">
        <div className="flex w-full items-center h-12  bg-stone-100 border border-gray-800 rounded p-2">
          <input
            type="text"
            readOnly
            disabled
            placeholder="Have something to share...??"
            className="w-full px-2 py-1 text-gray-800 bg-stone-100"
          />
          <button
            onClick={handleOpen}
            className="h-8 w-32 pl-2 bg-ocean-100 hover:bg-ocean-200 text-white"
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
              <div className="flex ">
                <div className="mt-5">
                  <p className="form-title pl-2 pb-5 leading-5">
                    {" "}
                    Create new post
                  </p>
                  <i className="fa-solid fa-envelope fa-2x p-2" />
                  <TextField
                    onChange={change}
                    id="caption"
                    name="caption"
                    label="caption"
                    required
                    variant="outlined"
                    size="small"
                  />{" "}
                  <small id="capwarn"></small>
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
                    size="small"
                  />{" "}
                  <small id="locwarn"></small>
                  <br />
                  <br />
                  <i className="fa-solid fa-hashtag  fa-2x p-2"></i>{" "}
                  <TextField
                    className="mb-3"
                    id="tag"
                    label="tags"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    variant="outlined"
                    size="small"
                  />{" "}
                  <br /> 
                  <div  >
                  <Stack  spacing={1}>
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
                </div>
                <div className="m-5 w-1/2 ">
                  <label for="file-input" className="drop-container">
                    {/* <div className="flex flex-col w-full h-64 align-middle text-center justify-center"> */}
                    <span className="drop-title">Drop your images here</span>
                    <p>or</p>
                    <input
                      type="file"
                      accept="image/jpg"
                      onChange={handleFile}
                      id="file-input"
                    />
                    {/* </div> */}
                  </label>
                  <small id="filewarn"></small>
                </div>
               
              </div>
              <button
                onClick={CreateUpload}
                id="submit"
                className="float-right mx-10 p-3 h-10 bg-ocean-200 hover:bg-ocean-100 text-white rounded-sm"
              >
                {loading ? <ReactLoading /> : laodingtext}
              </button>
              <small>do not click outside box till upload is complete</small>
              <br />
              <small style={{ color: "red" }}>{warning}</small>
            </Box>
          </Modal>
        </div>
    </div>
  );
};

export default Addpost;
