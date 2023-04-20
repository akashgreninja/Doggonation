import React, { useEffect } from "react";
import Feedtable from "../components/Feedtable/Feedtable";

const HomePage = (props) => {
  useEffect(() => {
    props.shouldit(false);
  }, []);

  return (
    <div className="float-right my-20 mx-10 ">
      <Feedtable />
    </div>
  );
};

export default HomePage;
  