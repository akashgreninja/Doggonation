import React, { useEffect,useState } from 'react'
import { getExplorePosts } from '../api/explore'
import { useDispatch } from 'react-redux';
import { Getuser } from '../api/getuser';
import { UserInfo } from '../redux/actions/Media-actions';
import Post from '../components/posts/Post';
import { getallposts } from '../api/allpost';

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

    const [exploredata, setexploredata] = useState([])

    // useEffect(() => {
    //   renderexplore()

    // }, [])

    // const renderexplore = async() => {
    //     const {data}=await getExplorePosts()
    //     setexploredata(data)
    // splitIntoRacks();
    //     console.log(exploredata)
    // }


  
    //placehlder for getposts
    let user_id=29
    useEffect(() => {
      load();
    }, []);
    const load = async () => {
      let data = await getallposts(user_id);
      data = await data.data;
      console.log("data:", data)
      setexploredata(data);
    };
    
  return (
    <div className='flex flex-row bg-[#f5f1eb]' style={{'margin-left':'17rem','padding-top':'62px'}}>
      <div>
        {exploredata !== [] ?
       exploredata?.map((element,index) => {
        
        if (index % 3 == 0) {
          return (
            <div key={element}>
              <Post element={element} />
              <br />
            </div>
          );
        }
        })
      : null}
      </div>
      <div>
        {exploredata !== [] ?
       exploredata?.map((element,index) => {
        
        if (index % 3 == 1) {
          return (
            <div key={element}>
              <Post element={element} />
              <br />
            </div>
          );
        }
        })
      : null}
      </div>
      <div>
        {exploredata !== [] ?
       exploredata?.map((element,index) => {
        
        if (index % 3 == 2) {
          return (
            <div key={element}>
              <Post element={element} />
              <br />
            </div>
          );
        }
        })
      : null}
      </div>
    
  </div>
  )
}

export default Explore