import React, { useState, useEffect, useRef } from 'react'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import StatsSection from './components/StatsSection'
import CtaSection from './components/CtaSection'
import PortfolioSection from './components/PortfolioSection'
import FaqSection from './components/FaqSection'
import Footer from './components/Footer'
import { CustomStyles } from './components/CustomStyles'

// Main component for Home page
const EventManagementHome: React.FC = () => {
  const [isPageLoaded, setIsPageLoaded] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)

  // Mark page as loaded and track mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Update cursor position based on mouse
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`
        cursorRef.current.style.top = `${e.clientY}px`
      }
    }

    // Register event listeners
    window.addEventListener('mousemove', handleMouseMove)

    // Create particles when page loads
    createParticles()

    // Mark page as loaded
    setIsPageLoaded(true)

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Create particles animation
  const createParticles = () => {
    if (!particlesRef.current) return

    const container = particlesRef.current
    const particlesCount = 20

    // Remove old particles (if any)
    while (container.firstChild) {
      container.removeChild(container.firstChild)
    }

    // Create new particles
    for (let i = 0; i < particlesCount; i++) {
      const size = Math.random() * 15 + 5
      const particle = document.createElement('div')

      particle.className = 'particle'
      particle.style.position = 'absolute'
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
      particle.style.backgroundColor = 'rgba(59, 130, 246, 0.2)'
      particle.style.borderRadius = '50%'
      particle.style.top = `${Math.random() * 100}%`
      particle.style.left = `${Math.random() * 100}%`
      particle.style.animation = `float ${5 + Math.random() * 10}s ease-in-out infinite alternate`
      particle.style.opacity = String(Math.random() * 0.5)

      container.appendChild(particle)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden'>
      {/* CSS tùy chỉnh */}
      <CustomStyles />

      {/* Custom cursor */}
      <div className='custom-cursor' ref={cursorRef}></div>

      {/* Background particles */}
      <div className='fixed inset-0 overflow-hidden pointer-events-none' ref={particlesRef}></div>

      {/* Header */}
      <Header isPageLoaded={isPageLoaded} />

      {/* Hero Section */}
      <HeroSection isPageLoaded={isPageLoaded} />

      {/* Features */}
      <FeaturesSection isPageLoaded={isPageLoaded} />

      {/* Statistics */}
      <StatsSection isPageLoaded={isPageLoaded} />

      {/* CTA Section */}
      <CtaSection />

      {/* Portfolio/Gallery Section */}
      <PortfolioSection isPageLoaded={isPageLoaded} />

      {/* FAQ Section */}
      <FaqSection isPageLoaded={isPageLoaded} />

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default EventManagementHome
