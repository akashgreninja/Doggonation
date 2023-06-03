import React from 'react'

const Contact = () => {
  return (
    <div className='mb-[100px]' id='contact'>
        <div className='h-[450px] md:h-[250px] border-2 mt-10 mx-[80px] rounded-lg '>
            <h2 className='p-4 text-2xl font-semibold'>Get in touch with us !</h2>
            <hr className='text-black mx-4 mb-4'/>
            <div className='md:flex justify-center content-center gap-5'>
                <input type="text" placeholder='Name' className='h-[40px] p-4 w:[200px] md:w-[300px] md:ml-0 ml-5 md:mt-0 mt-5 border-2 rounded-lg'/>
                <input type="text" placeholder='Company' className='h-[40px] p-4 w:[200px] md:w-[300px] md:ml-0 ml-5 md:mt-0 mt-5 border-2 rounded-lg'/>
                <input type="text" placeholder='Email' className='h-[40px] p-4 w:[200px] md:w-[300px] md:ml-0 ml-5 md:mt-0 mt-5 border-2 rounded-lg'/>
            </div>
            <button className='py-2 px-4 mt-5 ml-10'>Submit</button>
        </div>
    </div>
  )
}

export default Contact