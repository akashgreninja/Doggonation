import React from "react";
import "./NFTCard.css";
import image1 from "../../images/dogsimg/347184158_1287090095543715_8168143865663724788_n.jpg";
import image2 from "../../images/dogsimg/imma.jpg";
import image3 from "../../images/dogsimg/wolf-dog-breeds-siberian-husky-1570411330.jpg";
const NFTCard = () => {
  return (
    <>
      <div class="nftcard flex mr-10 ">
        <div className="flex flex-col ">
          <img src={image1} alt="" srcset="" className="z-10 h-64" />
          <div className="z-10 pt-10 text-center">
            <p className="text-white"> DoggoName: Aard Mathacha</p>
            <p className="text-white"> UploadDate: 09-06-23</p>
            <p className="text-white"> TransID: 0x499acce.....</p>
           <a href="https://opensea.io/assets/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/63281979494229544123467746873783103813610368747147527633129247368696274354177">   <button className= "ml-buttonmar mt-5 bg-green-500 py-3 px-5 text-center justify-center align-middle">Valid</button></a>
         
          </div>
        </div>
      </div>
      <div class="nftcard flex mr-10 ">
        <div className="flex flex-col ">
          <img src={image2} alt="" srcset="" className="z-10 h-64" />
          <div className="z-10 pt-10 justify-center align-middle text-center">
            <p className="text-white"> DoggoName: Bunty </p>
            <p className="text-white"> UploadDate: 03-06-23</p>
            <p className="text-white"> TransID: 0x3e65ef4....</p>
           
            <button className= "ml-buttonmar mt-5 bg-red-500 py-3 px-5 text-center justify-center align-middle">Invalid</button>
          </div>
        </div>
      </div>
      <div class="nftcard flex mr-10 ">
        <div className="flex flex-col ">
          <img src={image3} alt="" srcset="" className="z-10 h-64 " />
          <div className="z-10 pt-10 text-center">
            <p className="text-white"> DoggoName: hell</p>
            <p className="text-white"> UploadDate: 03-06-23</p>
            <p className="text-white"> TransID: 0x43292a...</p>
           
            <button className= "ml-buttonmar mt-5 bg-red-500 py-3 px-5 text-center justify-center align-middle">Invalid</button>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default NFTCard;
