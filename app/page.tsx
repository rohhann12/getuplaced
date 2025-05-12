"use client"
import React from 'react'
import { Navbar } from '../components/navbar/Navbar'
import  {Hero}  from '../components/hero/Hero'
import { Works } from '@/components/works/page'
import HowToUseGetYouPlaced from '@/components/landing/howitworks/works'
import { Footer } from '@/components/landing/footer/footer'
function page() {
  return (
    <div className='flex flex-col'>
      <Navbar/>
      <Hero/>
      <HowToUseGetYouPlaced/>
      <Footer/>
    </div>
  )
}

export default page