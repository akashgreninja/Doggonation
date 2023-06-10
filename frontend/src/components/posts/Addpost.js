import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import "./Addposts.css";
import { create } from "ipfs-http-client";
import { Buffer } from "buffer";

import ReactLoading from "react-loading";
import React, { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { add_post } from "../../api/addpost";
import { Client, Account, ID, Avatars } from "appwrite";

import Web3 from "web3";
import { ethers } from "ethers";
import NFTContractABI from "./NFTContractABI.json";
import StyleButton from "../buttons/StyleButton";
const Addpost = (props) => {
  let { posts, setposts, load } = props;
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
  //   client = (
  //     Client()
  //     .set_endpoint("https://cloud.appwrite.io/v1")
  //     .set_project(f"{projectID}")
  //     .set_key(f"{apikey}")
  // )
  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
    .setProject("646ef8a4551ba4368766"); // Your project ID

  const ContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const MinimumTransactionAmount = "10000000000000000"; //
  const avatars = new Avatars(client);
  const user_id = localStorage.getItem("token");
  const [loading, setloading] = useState(false);
  const [transactionId, setTransactionId] = useState("");
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
  const [imageBase64, setImageBase64] = useState("");

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
    if (image === "") {
      let doc = document.getElementById("filewarn");
      doc.innerHTML = "please select a file";
      doc.style.color = "red";
      return;
    }
    if (content.caption === "") {
      let cap = document.getElementById("capwarn");
      cap.innerHTML = "please fill this field";
      cap.style.color = "red";
      return;
    }
    if (content.location === "") {
      let cap = document.getElementById("locwarn");
      cap.innerHTML = "please fill this field";
      cap.style.color = "red";
      return;
    }

    try {
      setloading(true);
      const storage = getStorage();

      const storageRef = ref(storage, `posts/${image.name}`);

      uploadBytes(storageRef, image).then(() => {
        getDownloadURL(storageRef).then((url) => {
          setimageurl(url);
          console.log(url);
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
      setlaodingtext("upload successfull NFT sucessful ");
      // const reader = new FileReader();
      handleTransaction();

      handleClose();
    } else {
      //add alert
      setloading(false);
      setlaodingtext("Retry");
      // window.location.reload();
      load();
      setwarning(
        "upload unsuccessfull..sorry we didnt find any dogs in this picture retry to upload anyway"
      );
    }
  };
  const handleTransaction = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        // Request access to MetaMask accounts
        await window.ethereum.enable();

        // Create a new Web3 instance using the MetaMask provider
        const web3 = new Web3(window.ethereum);

        // Get the selected account from MetaMask
        const accounts = await web3.eth.getAccounts();
        const sender = accounts[0];

        // Create a transaction object
        const transactionObject = {
          from: sender,
          to: ContractAddress, // Replace with your contract address
          value: MinimumTransactionAmount, // Amount in wei
        };

        // Send the transaction
        const transactionReceipt = await web3.eth.sendTransaction(
          transactionObject
        );

        // Retrieve the transaction ID
        const txId = transactionReceipt.transactionHash;
        setTransactionId(txId);
        console.log(`Transaction ID: ${txId}`);
        const result = avatars.getQR(`${txId}`);
        console.log(result);
        const downloadLink = document.createElement("a");
        downloadLink.href = result.href;
        downloadLink.download = "qrcode.png"; // Set the desired file name
        downloadLink.click();
        console.log("QR code downloaded successfully!");

        // Read the image file

        // const file = image;
        // const reader = new FileReader();

        // reader.onloadend = async () => {
        //   const base64Data = reader.result;
        //   setImageBase64(base64Data);

        //   // Create NFT using the contract
        //   await createNFT(web3, sender, base64Data, txId);
        // };

        // reader.readAsDataURL(file);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("MetaMask is not installed.");
    }
  };
  const ipfs = create({
    host: "localhost", // IPFS node host
    port: 5001, // IPFS node API port
    protocol: "http", // IPFS node API protocol
  });

  const createNFT = async (web3, sender, imageBase64, txId) => {
    try {
      // Connect to the deployed contract
      const contract = new web3.eth.Contract(NFTContractABI, ContractAddress);

      // Upload the image to IPFS
      const ipfs = create(); // Create an instance of IPFS client
      const imageBuffer = Buffer.from(
        imageBase64.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );
      const ipfsResult = await ipfs.add(imageBuffer);
      const ipfsHash = ipfsResult.path;

      // Call the contract's createNFT function with IPFS hash
      const result = await contract.methods
        .createNFT(ipfsHash, txId)
        .send({ from: sender });

      // Retrieve the NFT token ID
      const tokenId = result.events.Transfer.returnValues.tokenId;
      console.log(`NFT created with Token ID: ${tokenId}`);
    } catch (error) {
      console.error(error);
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
    <div className="h-32 bg-white  mb-2 mt-2 rounded-3xl p-2 border-2 border-grey-500">
      <div className="flex w-full items-center h-12  bg-stone-100 border border-gray-800 rounded-3xl p-2 pr-1">
        <input
          type="text"
          readOnly
          disabled
          placeholder="Have something to share...??"
          className="w-full px-2 py-1 text-gray-800 bg-stone-100"
        />
        <div className="z-10">
          <StyleButton onClick={handleOpen}>Create Post</StyleButton>
          {/* <button onClick={handleOpen} className=" ">
            Create Post
          </button> */}
        </div>

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
                <div>
                  <Stack spacing={1}>
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
