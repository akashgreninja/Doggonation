import React from "react";
import NFTCard from "../cards/NFTCard";


const NFTTable = (props) => {
  return (
    <div
      className="bg-[#f5f1eb] w-full h-[100vh]"
      style={{ "padding-left": "17rem", "padding-top": "62px" }}
    >
      <div className="flex flex-row mx-auto mt-10 w-10/12 ">
        <NFTCard/>
    

      </div>
    </div>
  );
};

export default NFTTable;
