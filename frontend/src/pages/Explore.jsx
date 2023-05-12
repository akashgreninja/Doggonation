import React, { useEffect,useState } from 'react'
import { getExplorePosts } from '../api/explore'

const Explore = () => {
    const [exploredata, setexploredata] = useState({})
    useEffect(() => {
      renderexplore()


        
    
    }, [])

    const renderexplore = async() => {
        const {data}=await getExplorePosts()
        setexploredata(data)
        console.log(exploredata)

    }
    
  return (
    <div>Explore</div>
  )
}

export default Explore