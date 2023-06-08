import React from "react";

const StyleButton = (props) => {
  return (
    <button onClick={props.onClick} className={`rounded-3xl m-2 w-max p-2 pr-5 bg-amber-400 text-white ${props.className}`}>
      <p>{props.children}</p>
    </button>
  );
};

export default StyleButton;
