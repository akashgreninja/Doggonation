import React from 'react'
import Wrapper from './Wrapper'
import Navbar from './Navbar'
import HomeBanner from './HomeBanner'
import About from './About'
import Contact from './Contact'
import { useEffect } from 'react'

const Landingpage = (props) => {
  useEffect(() => {
    props.Sidebarrender(false)
  }, [])
  return (
    <Wrapper>
      <Navbar/>
      <div>
        <HomeBanner/>
        <About/>
        <Contact/>
      </div>
    </Wrapper>
  )
}

export default Landingpage