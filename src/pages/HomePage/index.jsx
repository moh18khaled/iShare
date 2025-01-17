import React from 'react'
import Navbar from '../../components/Navbar'
import HeroSection from './HeroSection'
import StatsSection from './StatsSection'
import TabsSection from './TabsSection'
import TabContent from './DigitalExperience'
import ServicesSection from './ServicesSection'

const HomePage = () => {
  return (
    <div className='bg-[#F9F9F9]'>
      <Navbar />
      <HeroSection />
      <StatsSection />
      <TabsSection />
      <TabContent />
      <ServicesSection />
    </div>
  )
}

export default HomePage
