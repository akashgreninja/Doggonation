import React from 'react';
import Logo from "../../images/logo-no-background.png";
import DeskMenu from './DeskMenu';
import { FiAlignJustify} from "react-icons/fi";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const Navbar = () => {
  const [mobilemenu, setmobilemenu] = useState(false)

  const navigation = useNavigate();

  const handleclick = ()=>{
    navigation("/")
  }

  return (
    <div className=' h-[100px] w-full p-4 justify-between md:content-center flex md:justify-between ' id='navbar'>
        <img src={Logo} alt="Logo" className='h-[50px]'/>
        <div className='md:hidden flex ml-[200px] mt-[20px]'><FiAlignJustify/></div>
        <DeskMenu/>
        <button className='hidden md:flex h-[40px] mt-3 p-2 hover:bg-blue-600 hover:scale-105' onClick={()=>handleclick()}>Get Started</button>
    </div>
  )
}

export default Navbar