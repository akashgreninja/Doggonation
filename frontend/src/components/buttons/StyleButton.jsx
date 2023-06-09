import React from "react";

const StyleButton = (props) => {
  return (
    <button onClick={props.onClick} className={`rounded-3xl my-2 m-[-2px] w-max p-2 pr-5 bg-amber-400 text-white ${props.className}`}>
      <p>{props.children}</p>
    </button>
  );
};

export default StyleButton;
