import React from "react";

const StyleButton = (props) => {
  return (
    <button onClick={props.onClick} className={`${props.className} rounded-3xl my-auto w-max p-2 bg-amber-400 text-white `}>
      <p className="m-auto">{props.children}</p>
    </button>
  );
};

export default StyleButton;
