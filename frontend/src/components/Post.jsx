import React, { useState, useEffect } from "react";
import BinaryImage from "./BinaryImage";
import Showpost from "./Showpost";
const post = () => {
  let dataUrl = "";

  useEffect(() => {}, []);

  const [file, setFile] = useState(null);

  const [Mime, setMime] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    fetch("http://127.0.0.1:3003/addpost", {
      method: "POST",
      mode: "no-cors",
      body: formData,
    });
  };

  return (
    <div>
      {" "}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      <Showpost/>
   
      {/* <img src={dataUrl} alt="ima" /> */}
    </div>
  );
};

export default post;
