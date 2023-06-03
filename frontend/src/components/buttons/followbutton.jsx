import React, { useState, useEffect } from "react";
import { follow } from "../../api/follow";
import { unfollow } from "../../api/unfollow";
import { Getallfollowersforuser } from "../../api/getallfollowers";

const Followbutton = (props) => {
  let { user_id, id, refresh, current } = props;
  useEffect(() => {
    getfollowers(id);
  }, []);

  const [buttonText, setButtonText] = useState("");

  const [buttonColor, setButtonColor] = useState("blue-500");

  const getfollowers = async () => {
    const { data } = await Getallfollowersforuser(id);
    for (let index = 0; index < data.length; index++) {
      const element = data[index];

      console.log(user_id.toString());

      if (user_id.toString() === element[0].toString()) {
        setButtonText("Following");
        break;
      } else {
        setButtonText("Follow");
      }
    }
  };
  const handleClick = async () => {
    // const {data}=

    if (buttonText === "Follow") {
      const data = await follow(user_id, id);
      if (data.status === 200) {
        refresh(id);
      }
      setButtonText("Following");
      setButtonColor("blue-700");
    } else {
      const data = await unfollow(user_id, id);
      if (data.status === 200) {
        refresh(id);
      }
      setButtonText("Follow");
      setButtonColor("blue-500");
    }
  };
  const handleload = () => {
    if (current) {
      setButtonText("Following");
    } else {
      setButtonText("Follow");
    }
  };
  return (
    <button
      className={`bg-${buttonColor} hover:bg-${buttonColor} text-blue font-bold py-2 px-4 rounded`}
      onLoad={handleload}
      onClick={handleClick}
    >
      {buttonText}
    </button>
    // <button>dsds</button>
  );
};

export default Followbutton;
