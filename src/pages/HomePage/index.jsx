import React from 'react'
import Navbar from '../../components/Navbar'
import HeroSection from './HeroSection'
import StatsSection from './StatsSection'
import TabsSection from './TabsSection'
import TabContent from './DigitalExperience'
import ServicesSection from './ServicesSection'
import Pricing from './Pricing'
import TeamSection from './TeamSection'
import ContactSection from './ContactSection'
import Footer from '../../components/Footer'
import Testimonials from './TestominalsSection'

const HomePage = () => {
  return (
    <div className='bg-[#F9F9F9]'>
      <Navbar />
      <HeroSection />
      <StatsSection />
      <TabsSection />
      <TabContent />
      <ServicesSection />
      <Testimonials />
      <Pricing />
      <TeamSection />
      <ContactSection />
      <Footer />
    </div>
  )
}

export default HomePage
