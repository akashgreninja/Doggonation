import React, { useEffect } from "react";
import Feedtable from "../components/Feedtable/Feedtable";

const HomePage = (props) => {
  useEffect(() => {
    props.shouldit(false);
  }, []);

  return (
    <div className='' style={{'margin-left':'350px','padding-top':'100px'}}>
      <Feedtable />
    </div>
  );
};

export default HomePage;
  