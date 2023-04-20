import React from 'react'
import Posts from './Posts'
import Ads from './Ads'
import Friends from './Friends'

const Feedtable = () => {
  return (
    <div>
        <table width='900px'>
            <tr ><td className='w-3/4'><div className='  container border-black border-1 rounded '><Posts/></div></td>
            <td><table>
              <tr>
                <td >
                 <div className='top-0 container border-black border-1 rounded '> <Ads/>
                  </div>
                </td>
              
              </tr>
              <tr>
              <td>
                <div className='top-0 container border-black border-1 rounded '><Friends/></div>
                </td>
              </tr>
              </table></td></tr>

        </table>
    </div>
  )
}

export default Feedtable