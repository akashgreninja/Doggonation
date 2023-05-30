import React from 'react'
import Wrapper from './Wrapper'
import Navbar from './Navbar'
import HomeBanner from './HomeBanner'
import About from './About'
import { useEffect } from 'react'

const Landingpage = (props) => {
  useEffect(() => {
    props.Sidebarrender(false)
  }, [props])
  return (
    <Wrapper>
      <Navbar/>
      <div>
        <HomeBanner/>
        <About/>
      </div>
    </Wrapper>
  )
}

export default Landingpage