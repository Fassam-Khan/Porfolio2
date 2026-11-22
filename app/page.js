import About from '@/components/About'
import Contact from '@/components/Contact'
import Experince from '@/components/Experince'
import Hero from '@/components/Hero'
import Tools from '@/components/Tools'
import Work from '@/components/Work'
import React from 'react'

const page = () => {
  return (
    <div>
      <Hero/>
      <About/>
      <Experince/>
      <Work/>
      <Tools/>
      <Contact/>
      
    </div>
  )
}

export default page

