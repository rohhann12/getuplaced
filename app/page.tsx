"use client"
import React from 'react'
import { Navbar } from '../components/navbar/Navbar'
import { Hero } from '../components/hero/Hero'
import { Stats } from '@/components/landing/stats/stats'
import { Features } from '@/components/landing/features/features'
import HowToUseGetYouPlaced from '@/components/landing/howitworks/works'
import { CTASection } from '@/components/landing/cta/cta-section'
import { Footer } from '@/components/landing/footer/footer'

function Page() {
  return (
    <div className='flex flex-col'>
      <Navbar/>
      <Hero/>
      <Stats/>
      <Features/>
      <HowToUseGetYouPlaced/>
      <CTASection/>
      <Footer/>
    </div>
  )
}

export default Page