"use client"
import React from 'react'
import { Navbar } from '../components/navbar/Navbar'
import  {Hero}  from '../components/hero/Hero'
import { Works } from '@/components/works/page'
import Image from 'next/image'
import img from '@/public/main.png'
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