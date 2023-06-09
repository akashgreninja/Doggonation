import React from "react";
import { Link } from "react-router-dom";

const SideBarOption = (props) => {
  return (
    <div onClick={props.onClick}>
      <Link to={props.to}>
        <div class="p-2.5 w-[20vw] pl-[3vw] m-3 ml-6 flex items-center rounded-md duration-300 cursor-pointer hover:bg-gray-200  text-black">
          <i class={`${props.icon}`}></i>
          <span class="text-lg ml-4 text-black font-bold">{props.label}</span>
        </div>
      </Link>
    </div>
  );
};

export default SideBarOption;
