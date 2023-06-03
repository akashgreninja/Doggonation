import React, { useEffect } from "react";
import Feedtable from "../components/Feedtable/Feedtable";
import { Getuser } from "../api/getuser";
import { useDispatch, useSelector } from 'react-redux'
import { UserInfo } from "../redux/actions/Media-actions";
import HomepageRight from "../components/cards/HomepageRight";

const HomePage = (props) => {
  const dispatch = useDispatch()
  useEffect(() => {
    props.Sidebarrender(true);
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const getId=localStorage.getItem('token');
    if (getId){
      const {data}=await Getuser(getId);
      console.log(data)
      dispatch(UserInfo(data))


    }else{
      console.log('no token found')
    }
  }

  return (
    <div className='bg-[#f5f1eb] flex flex-col' style={{'margin-left':'17rem','padding-top':'62px'}} >
      <Feedtable loader={props.shouldit} />
      <HomepageRight/>
    </div>
  );
};

export default HomePage;
  