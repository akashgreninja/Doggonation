import React from "react";
import NFTCard from "../cards/NFTCard";


const NFTTable = (props) => {
  return (
    <div
      className="bg-white w-full h-[100vh] "
    >
      <div className="flex flex-row mx-auto mt-10 w-10/12 ">
        <NFTCard/>
    

      </div>
    </div>
  );
};

export default NFTTable;
