import React, { useState } from "react";

const Followbutton = () => {
  const [buttonText, setButtonText] = useState("Follow");
  const [buttonColor, setButtonColor] = useState("blue-500");
  const handleClick = () => {
    if (buttonText === "Follow") {
      setButtonText("Followed");
      setButtonColor("blue-700");
    } else {
      setButtonText("Follow");
      setButtonColor("blue-500");
    }
  };
  return (

      <button
        className={`bg-${buttonColor} hover:bg-${buttonColor} text-white font-bold py-2 px-4 rounded`}
        onClick={handleClick}
      >
        {buttonText}
      </button>
    // <button>dsds</button>

  );
};

export default Followbutton;
