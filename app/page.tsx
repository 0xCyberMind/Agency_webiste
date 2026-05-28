'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Navigation from '@/components/Navigation'
import HeroSection from '@/components/sections/HeroSection'
import ServicesSection from '@/components/sections/ServicesSection'
import FeaturesSection from '@/components/sections/FeaturesSection'
import AIAssistantSection from '@/components/sections/AIAssistantSection'
import DashboardSection from '@/components/sections/DashboardSection'
import PricingSection from '@/components/sections/PricingSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import ContactSection from '@/components/sections/ContactSection'
import ParticleBackground from '@/components/effects/ParticleBackground'
import LoadingScreen from '@/components/effects/LoadingScreen'

const CursorTrail = dynamic(() => import('@/components/effects/CursorTrail'), {
  ssr: false,
})

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <ParticleBackground />
          <CursorTrail />
          <Navigation />
          <HeroSection />
          <ServicesSection />
          <FeaturesSection />
          <AIAssistantSection />
          <DashboardSection />
          <PricingSection />
          <TestimonialsSection />
          <ContactSection />
        </>
      )}
    </>
  )
}
