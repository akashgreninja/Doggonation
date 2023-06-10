import React, { useEffect } from "react";
import NFTTable from "../components/Feedtable/NFTTable";


const NFTPage = (props) => {
    useEffect(() => {
        props.Sidebarrender(true);
      }, []);

  return (
    <div className='flex flex-col pl-contentTrayXOffset pt-contentTrayYOffset bg-white'  >
        <NFTTable/>
    </div>
  );
};

export default NFTPage;
  