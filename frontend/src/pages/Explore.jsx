import React, { useEffect,useState } from 'react'
import { getExplorePosts } from '../api/explore'
import { useDispatch } from 'react-redux';
import { Getuser } from '../api/getuser';
import { UserInfo } from '../redux/actions/Media-actions';
import Post from '../components/posts/Post';
import { getallposts } from '../api/allpost';
import ExploreTable from '../components/Feedtable/ExploreTable';

const Explore = (props) => {
  const dispatch = useDispatch();
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
    <div>
      <ExploreTable/>
  </div>
  )
}

export default Explore