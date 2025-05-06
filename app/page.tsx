"use client"
import React from 'react'
import { Navbar } from '../components/navbar/Navbar'
import  {Hero}  from '../components/hero/Hero'
import { Works } from '@/components/works/page'
function page() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      {/* <Works/> */}
    </div>
  )
}

export default page