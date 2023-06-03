import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import img1 from "../../images/dogsimg/img1.jpg";
import img2 from "../../images/dogsimg/img2.jpg";
import img3 from "../../images/dogsimg/img3.jpg";
import img4 from "../../images/dogsimg/img4.jpg";
import {FiArrowLeft} from "react-icons/fi";
import {FiArrowRight} from "react-icons/fi";

const data = [
  {name : "img1" , url : img1 },
  {name : "img2" , url : img2 },
  {name : "img3" , url : img3 },
  {name : "img4" , url : img4 },
]

const HomeBanner = () => {
  return (
    <div className='w-full '>
      <Carousel showThumbs = {false} autoPlay = {true} infiniteLoop = {true} className='bg-cover'
      showIndicators ={false}
      showStatus = {false}
      renderArrowPrev={(clickHandler , hasPrev)=>(
        <div onClick={clickHandler} className='absolute left-0 h-6 flex items-center cursor-pointer justify-center w-6 ml-2 mt-8 bg-white md:w-8 rounded-full md:ml-2 md:h-8 top-[100px] md:top-[330px] z-10   hover:opacity-30'>
          <FiArrowLeft/>
        </div>
      )}  
      renderArrowNext={(clickHandler , hasNext)=>(
        <div onClick={clickHandler} className='absolute right-0 h-6 flex items-center cursor-pointer justify-center w-6 mr-2 mt-8 bg-white md:w-8 rounded-full md:mr-2 md:h-8 top-[100px] md:top-[330px] z-10   hover:opacity-30'>
          <FiArrowRight/>
        </div>
        
      )} 
      >
        {
          data.map((item)=>{
            return(<div className='bg-cover'>
              <img src={item.url} className='rounded-lg aspect-[16/10] md:aspect-auto object-cover max-h-[700px]' />
          </div>

            )
          })
        }
        </Carousel>
    </div>
  )
}

export default HomeBanner