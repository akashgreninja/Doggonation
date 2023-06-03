import React from 'react'
import img from "../../images/dogsimg/img2.jpg"
import { useEffect } from 'react'
import Wrapper from './Wrapper'
import Contact from './Contact'
import Razorpay from '../../components/Razorpay/Razorpay'
import Donation from './Donation'

const About = (props) => {
    // useEffect(() => {
    //     props.Sidebarrender(false)
    //   }, [props])
  return (
    <div id='about'>
        <Wrapper>
        <h1 className='text-5xl font-bold mt-10 text-center'>About Us</h1>
        <div className='mt-10'>
            <div className='md:flex justify-between gap-8'>
                <div>
                    <img src={img} alt="" className='rounded-lg aspect-[16/10] md:aspect-auto object-cover max-h-[700px]' />
                </div>
                <div className='max-w-[700px] flex justify-center content-center'>
            <p className=' text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus dolorem consectetur doloremque recusandae laborum expedita eligendi at, voluptatibus corporis porro fuga ducimus dolorum reiciendis sapiente consequatur ipsum consequuntur? Reiciendis, sequi.</p></div>
                
            </div>
        </div>
        <div className='mt-10'>
            <div className='md:flex justify-between gap-8'>
                <div className='max-w-[700px] md:flex justify-center content-center hidden'>
            <p className=' text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus dolorem consectetur doloremque recusandae laborum expedita eligendi at, voluptatibus corporis porro fuga ducimus dolorum reiciendis sapiente consequatur ipsum consequuntur? Reiciendis, sequi.</p></div>
                <div>
                    <img src={img} alt="" className='rounded-lg aspect-[16/10] md:aspect-auto object-cover max-h-[700px]' />
                </div>
                <div className='max-w-[700px] sm:flex justify-center content-center md:hidden'>
            <p className=' text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus dolorem consectetur doloremque recusandae laborum expedita eligendi at, voluptatibus corporis porro fuga ducimus dolorum reiciendis sapiente consequatur ipsum consequuntur? Reiciendis, sequi.</p></div>
            
                
            </div>
        </div>
        <div className='mt-10'>
            <div className='md:flex justify-between gap-8'>
                
                <div>
                    <img src={img} alt="" className='rounded-lg aspect-[16/10] md:aspect-auto object-cover max-h-[700px]' />
                </div>
                <div className='max-w-[700px] flex justify-center content-center'>
            <p className=' text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus dolorem consectetur doloremque recusandae laborum expedita eligendi at, voluptatibus corporis porro fuga ducimus dolorum reiciendis sapiente consequatur ipsum consequuntur? Reiciendis, sequi.</p></div>
            </div>
        </div>
            
        {/* Donation Area  */}
        <Donation/>

        </Wrapper>
    </div>
  )
}

export default About