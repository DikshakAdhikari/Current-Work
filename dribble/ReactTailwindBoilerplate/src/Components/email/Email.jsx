import React from 'react'
import Nav from './Nav'
import Footer from './Footer'
import BodyEmail from './BodyEmail'


const Email = () => {
  return (
    <div className="flex flex-col justify-between cursor-default min-h-screen bg-gradient-to-br ">
      <div>
    <div className='sticky'>
      <Nav />
    </div>
    <div>
    <BodyEmail />
    </div>
    </div>
    <Footer />
  </div>
  )
}

export default Email