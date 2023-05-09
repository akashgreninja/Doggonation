import React, { useEffect } from "react";
import Feedtable from "../components/Feedtable/Feedtable";

const HomePage = (props) => {
  useEffect(() => {
    props.Sidebarrender(true);
  }, []);

  return (
    <div className='' style={{'margin-left':'350px','padding-top':'100px'}}>
      <Feedtable loader={props.shouldit} />
    </div>
  );
};

export default HomePage;
  