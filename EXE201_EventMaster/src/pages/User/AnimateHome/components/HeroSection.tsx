import React, { useState, useEffect, useRef } from 'react'
import { ChevronRight, Ticket, Calendar, Users } from 'lucide-react'

interface HeroSectionProps {
  isPageLoaded: boolean
}

const HeroSection: React.FC<HeroSectionProps> = ({ isPageLoaded }) => {
  const heroSectionRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)

  // Track mouse position and scroll
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      // Update cursor position based on mouse
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`
        cursorRef.current.style.top = `${e.clientY}px`
      }
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    // Register event listeners
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Handle 3D effect based on mouse for hero section
  useEffect(() => {
    if (!heroSectionRef.current || !isPageLoaded) return

    const heroElement = heroSectionRef.current
    const heroRect = heroElement.getBoundingClientRect()
    const centerX = heroRect.left + heroRect.width / 2
    const centerY = heroRect.top + heroRect.height / 2

    // Calculate tilt based on mouse position
    const moveX = (mousePosition.x - centerX) / 25
    const moveY = (mousePosition.y - centerY) / 25

    // Apply transform
    heroElement.style.transform = `perspective(1000px) rotateX(${-moveY}deg) rotateY(${moveX}deg) scale3d(1.02, 1.02, 1.02)`

    // Apply parallax effect to child elements
    const parallaxElements = heroElement.querySelectorAll('.parallax-element')
    parallaxElements.forEach((el) => {
      const htmlEl = el as HTMLElement
      const depth = parseFloat(htmlEl.getAttribute('data-depth') || '0.1')
      htmlEl.style.transform = `translate3d(${moveX * depth * 50}px, ${moveY * depth * 50}px, 0)`
    })
  }, [mousePosition, isPageLoaded])

  // Handle parallax effect when scrolling
  useEffect(() => {
    if (!isPageLoaded) return

    const parallaxElements = document.querySelectorAll('.parallax-scroll')
    parallaxElements.forEach((el) => {
      const htmlEl = el as HTMLElement
      const speed = parseFloat(htmlEl.getAttribute('data-speed') || '0.2')
      const yPos = -(scrollY * speed)
      htmlEl.style.transform = `translate3d(0, ${yPos}px, 0)`
    })

    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll')
    animateElements.forEach((el: Element) => {
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight - 100) {
        el.classList.add('show')
      }
    })
  }, [scrollY, isPageLoaded])

  return (
    <section className='pt-40 pb-32 px-6 relative overflow-hidden'>
      {/* Background animation */}
      <div className='absolute inset-0 bg-blue-500 opacity-5 z-0 parallax-scroll' data-speed='0.1'>
        <div
          className='absolute inset-0'
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.2"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
          }}
        />
      </div>

      {/* 3D Grid Background */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div
          className='absolute w-full h-full'
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0) 50%)`,
            backgroundSize: '100px 100px',
            transform: 'perspective(1000px) rotateX(60deg) scale(3)',
            transformOrigin: 'center center'
          }}
        />
      </div>

      {/* Main content */}
      <div className='container mx-auto relative z-10'>
        <div className='flex flex-col lg:flex-row items-center gap-16'>
          <div className='lg:w-1/2 animate-on-scroll' data-animation='fadeInLeft'>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight'>
              <span className='block'>Quản lý</span>
              <span className='block'>
                <span className='inline-block relative'>
                  <span className='relative z-10 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>
                    sự kiện
                  </span>
                  <span className='absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 filter blur-xl opacity-30 animate-pulse'></span>
                </span>
              </span>
              <span className='block'>chuyên nghiệp</span>
            </h1>

            <p className='text-gray-300 text-lg mb-8 relative'>
              Nền tảng quản lý sự kiện toàn diện giúp bạn kiểm soát mọi khía cạnh của sự kiện từ vé, người tham dự, lịch
              trình đến phân cấp quyền quản lý.
              <span
                className='absolute -left-3 top-0 bottom-0 w-1 bg-blue-500/30 rounded-full parallax-element'
                data-depth='0.1'
              ></span>
            </p>

            <div className='flex flex-col sm:flex-row gap-4'>
              <button className='px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-purple-600 rounded-lg font-medium transition-all flex items-center justify-center hover-scale relative overflow-hidden group'>
                <span className='relative z-10'>Dùng thử miễn phí</span>
                <ChevronRight className='ml-2 h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform' />
                <span className='absolute top-0 left-0 w-full h-full bg-white opacity-0 mix-blend-overlay group-hover:opacity-20 transition-opacity'></span>
              </button>

              <button className='px-6 py-3 bg-gray-800/80 hover:bg-gray-700 backdrop-blur-sm rounded-lg font-medium transition-all flex items-center justify-center hover-scale relative overflow-hidden group border border-gray-700'>
                <span className='relative z-10 text-black'>Xem demo</span>
                <span className='absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity'></span>
              </button>
            </div>

            {/* Floating particles */}
            <div
              className='absolute -left-10 top-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-float parallax-element'
              data-depth='0.2'
            ></div>
            <div
              className='absolute -right-5 bottom-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-float parallax-element'
              data-depth='0.15'
              style={{ animationDelay: '-2s' }}
            ></div>
          </div>
          <div
            className='lg:w-1/2 relative z-10 perspective-1000 animate-on-scroll'
            data-animation='fadeInRight'
            ref={heroSectionRef}
          >
            {/* 3D Robot Management System - Enhanced - Adjusted positioning */}
            <div className='relative w-full h-full min-h-[500px] md:min-h-[580px] flex items-center justify-center transform-style-3d mt-5'>
              {/* Background effects */}
              <div
                className='absolute inset-0 bg-gradient-to-r from-blue-600/20 via-indigo-600/10 to-purple-600/20 rounded-3xl blur-3xl -m-2 animate-pulse'
                style={{ animationDuration: '8s' }}
              ></div>

              {/* Holographic ring effect */}
              <div
                className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border-4 border-blue-500/10 animate-pulse opacity-30'
                style={{ transform: 'rotateX(75deg)', animationDuration: '10s' }}
              ></div>
              <div
                className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border-4 border-purple-500/10 animate-pulse opacity-30'
                style={{ transform: 'rotateX(75deg)', animationDuration: '12s', animationDelay: '-2s' }}
              ></div>

              {/* Grid surface effect */}
              <div
                className='absolute inset-0 opacity-10'
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                  transform: 'perspective(1000px) rotateX(60deg) translateY(100px) scale(1.5)'
                }}
              ></div>

              {/* Enhanced Robot - Slightly smaller for better fit */}
              <div
                className='relative transform-style-3d group scale-95'
                style={{ transform: 'rotateX(5deg) rotateY(15deg)' }}
              >
                {/* Holographic floating elements */}
                <div className='absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-16 flex justify-center overflow-hidden opacity-60'>
                  <div className='relative w-full h-full animate-scan'>
                    <div className='absolute top-0 left-0 w-full text-center font-mono text-sm text-blue-400 opacity-70'>
                      EVENT MANAGEMENT SYSTEM v3.7
                    </div>
                    <div className='absolute top-5 left-0 w-full text-center font-mono text-xs text-blue-400 opacity-70'>
                      <span className='animate-blink'>// INITIALIZING PROTOCOLS //</span>
                    </div>
                    <div className='absolute bottom-0 left-0 w-full text-center font-mono text-xs text-blue-400 opacity-70'>
                      &lt;/&gt; SYSTEM READY
                    </div>
                  </div>
                </div>

                {/* Robot head - Modernized */}
                <div className='relative w-44 h-44 mx-auto transform-style-3d overflow-visible'>
                  {/* Head back panel with metallic effect */}
                  <div
                    className='absolute inset-0 bg-gradient-to-b from-gray-800 via-gray-700 to-gray-800 rounded-2xl shadow-lg border border-gray-700 overflow-hidden'
                    style={{
                      boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.5)'
                    }}
                  >
                    {/* Tech patterns */}
                    <div className='absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_rgba(59,_130,_246,_0.2)_0%,_transparent_70%)]'></div>

                    {/* Circuit lines */}
                    <div className='absolute inset-0 opacity-30'>
                      <div className='absolute top-5 left-5 right-5 h-px bg-blue-400'></div>
                      <div className='absolute bottom-5 left-5 right-5 h-px bg-blue-400'></div>
                      <div className='absolute left-5 top-5 bottom-5 w-px bg-blue-400'></div>
                      <div className='absolute right-5 top-5 bottom-5 w-px bg-blue-400'></div>
                    </div>
                  </div>

                  {/* Head front panel - futuristic visor */}
                  <div className='absolute inset-x-0 top-6 h-16 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 rounded-lg mx-4 overflow-hidden shadow-lg border border-blue-700/50 transform-style-3d'>
                    {/* Advanced visor effect */}
                    <div className='absolute inset-0 bg-gradient-to-b from-blue-500/20 to-blue-500/5'></div>

                    {/* Robot eyes - more expressive */}
                    <div className='absolute inset-0 flex items-center justify-center'>
                      <div className='flex space-x-12'>
                        <div className='w-8 h-3 bg-gradient-to-r from-blue-400 to-blue-300 rounded-md animate-pulse shadow-lg shadow-blue-500/50'></div>
                        <div
                          className='w-8 h-3 bg-gradient-to-r from-blue-400 to-blue-300 rounded-md animate-pulse shadow-lg shadow-blue-500/50'
                          style={{ animationDelay: '0.5s' }}
                        ></div>
                      </div>
                    </div>

                    {/* Scanning effect */}
                    <div className='absolute inset-0 animate-scan opacity-30'></div>
                  </div>

                  {/* Head details */}
                  <div
                    className='absolute top-0 right-3 w-4 h-4 rounded-full bg-gradient-to-br from-red-500 to-red-400 animate-pulse shadow-lg shadow-red-500/30'
                    style={{ animationDuration: '1.5s' }}
                  ></div>
                  <div
                    className='absolute top-0 left-3 w-4 h-4 rounded-full bg-gradient-to-br from-green-500 to-green-400 animate-pulse shadow-lg shadow-green-500/30'
                    style={{ animationDuration: '2.5s', animationDelay: '-0.5s' }}
                  ></div>

                  {/* Antenna */}
                  <div className='absolute -top-8 left-1/2 -translate-x-1/2 w-1 h-8 bg-gray-700'>
                    <div className='absolute -top-1 -left-1 w-3 h-3 rounded-full bg-blue-500 animate-pulse shadow shadow-blue-500/50'></div>
                  </div>

                  {/* Side vents with light */}
                  <div className='absolute top-24 left-0 w-3 h-12 bg-gray-900 rounded-l-md overflow-hidden flex flex-col justify-evenly p-0.5'>
                    <div className='w-full h-1 bg-blue-500/50 animate-pulse'></div>
                    <div className='w-full h-1 bg-blue-500/50 animate-pulse' style={{ animationDelay: '-0.3s' }}></div>
                    <div className='w-full h-1 bg-blue-500/50 animate-pulse' style={{ animationDelay: '-0.6s' }}></div>
                  </div>
                  <div className='absolute top-24 right-0 w-3 h-12 bg-gray-900 rounded-r-md overflow-hidden flex flex-col justify-evenly p-0.5'>
                    <div className='w-full h-1 bg-blue-500/50 animate-pulse' style={{ animationDelay: '-0.2s' }}></div>
                    <div className='w-full h-1 bg-blue-500/50 animate-pulse' style={{ animationDelay: '-0.5s' }}></div>
                    <div className='w-full h-1 bg-blue-500/50 animate-pulse' style={{ animationDelay: '-0.8s' }}></div>
                  </div>
                </div>

                {/* Robot neck - articulated */}
                <div className='w-10 h-5 mx-auto bg-gray-700 border-t border-gray-600'></div>
                <div className='w-16 h-3 mx-auto bg-gray-800 rounded-t-lg border-t border-x border-gray-700'></div>

                {/* Robot body - sleek and futuristic */}
                <div className='w-64 h-72 bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl mx-auto relative transform-style-3d shadow-xl overflow-hidden'>
                  {/* Body metallic sheen */}
                  <div className='absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent'></div>

                  {/* Body panels and details */}
                  <div className='absolute top-0 inset-x-0 h-16 border-b border-gray-700'></div>
                  <div className='absolute top-16 inset-x-0 h-12 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 border-y border-gray-700'></div>

                  {/* Advanced holographic display */}
                  <div className='absolute top-6 left-0 right-0 mx-auto w-40 h-20 bg-gray-900 rounded-lg flex flex-col items-center justify-center border border-gray-700 overflow-hidden shadow-inner'>
                    {/* Display content */}
                    <div className='absolute inset-0 animate-scan opacity-20'></div>
                    <div className='text-sm text-blue-400 font-mono mb-1'>EVENT MASTER</div>
                    <div className='text-xs text-blue-500 font-mono animate-blink'>SYSTEM ACTIVE</div>

                    {/* Data visualization */}
                    <div className='mt-2 w-32 h-4 bg-gray-800 rounded-full overflow-hidden'>
                      <div
                        className='h-full w-3/4 bg-gradient-to-r from-blue-600 to-blue-400 animate-pulse rounded-full'
                        style={{ animationDuration: '3s' }}
                      ></div>
                    </div>
                  </div>

                  {/* Enhanced glowing core */}
                  <div
                    className='absolute top-36 left-0 right-0 mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-blue-600/90 via-blue-500/90 to-blue-600/90 flex items-center justify-center shadow-lg shadow-blue-500/50 animate-pulse group-hover:shadow-xl group-hover:shadow-blue-500/60 transition-all duration-500'
                    style={{ animationDuration: '3s', boxShadow: '0 0 30px rgba(37, 99, 235, 0.4)' }}
                  >
                    {/* Inner core layers */}
                    <div className='w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-300 flex items-center justify-center shadow-inner'>
                      <div className='w-8 h-8 rounded-full bg-blue-300 flex items-center justify-center shadow-inner'>
                        <div className='w-4 h-4 rounded-full bg-white shadow-xl'></div>
                      </div>
                    </div>

                    {/* Energy beams */}
                    <div className='absolute -top-8 left-1/2 -translate-x-1/2 w-px h-8 bg-blue-400/50'></div>
                    <div className='absolute -bottom-8 left-1/2 -translate-x-1/2 w-px h-8 bg-blue-400/50'></div>
                    <div className='absolute -left-8 top-1/2 -translate-y-1/2 h-px w-8 bg-blue-400/50'></div>
                    <div className='absolute -right-8 top-1/2 -translate-y-1/2 h-px w-8 bg-blue-400/50'></div>
                  </div>

                  {/* Status indicators and tech details */}
                  <div className='absolute bottom-12 left-0 right-0 mx-auto flex justify-center space-x-8'>
                    <div className='w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-sm shadow-green-500/50'></div>
                    <div
                      className='w-3 h-3 rounded-full bg-blue-500 animate-pulse shadow-sm shadow-blue-500/50'
                      style={{ animationDelay: '-0.3s' }}
                    ></div>
                    <div
                      className='w-3 h-3 rounded-full bg-purple-500 animate-pulse shadow-sm shadow-purple-500/50'
                      style={{ animationDelay: '-0.6s' }}
                    ></div>
                  </div>

                  {/* Bottom panel with vents */}
                  <div className='absolute bottom-4 left-0 right-0 mx-auto w-40 h-4 bg-gray-800 rounded-lg border border-gray-700 overflow-hidden flex'>
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className='flex-1 border-r border-gray-700 last:border-0 bg-gradient-to-b from-gray-800 to-gray-900'
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Robot left arm - Ticket Management - Enhanced */}
                <div
                  className='absolute top-48 -left-32 w-40 h-12 animate-float transform-style-3d'
                  data-depth='0.15'
                  style={{
                    transformOrigin: 'right center',
                    animationDuration: '7s'
                  }}
                >
                  {/* Upper arm */}
                  <div className='absolute right-0 top-1/2 -translate-y-1/2 w-16 h-6 bg-gradient-to-l from-gray-700 to-gray-800 rounded-l-lg transform-style-3d shadow-md'>
                    {/* Arm joint */}
                    <div className='absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-tr from-gray-800 to-gray-700 border border-gray-600 z-10 shadow-inner'>
                      <div className='absolute inset-1 rounded-full bg-gradient-to-tr from-gray-700 to-gray-800 shadow-inner'></div>
                    </div>
                  </div>

                  {/* Forearm - more articulated */}
                  <div
                    className='absolute left-0 top-1/2 -translate-y-1/2 w-28 h-12 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg transform-style-3d shadow-md border border-gray-700 rotate-6'
                    style={{
                      boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    {/* Arm details */}
                    <div className='absolute inset-0 overflow-hidden'>
                      <div className='absolute top-2 left-0 right-0 mx-auto w-16 h-1 bg-gray-600 rounded-full'></div>
                      <div className='absolute bottom-2 left-0 right-0 mx-auto w-16 h-1 bg-gray-600 rounded-full'></div>
                    </div>

                    {/* Ticket management interface - holographic effect */}
                    <div className='absolute top-0 left-1 right-1 bottom-0 bg-gradient-to-br from-blue-600/90 to-blue-500/90 rounded-lg flex items-center justify-center overflow-hidden shadow-lg'>
                      {/* Holographic effect */}
                      <div className='absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/10 to-transparent animate-scan'></div>
                      <div className='absolute inset-0 flex flex-col items-center justify-center'>
                        <Ticket className='h-5 w-5 text-white drop-shadow-md' />
                        <div className='relative mt-1'>
                          <span className='text-xs text-white font-bold drop-shadow-md'>BÁN VÉ</span>
                          <div className='absolute -bottom-1 left-0 right-0 h-px bg-white/50'></div>
                        </div>
                      </div>
                    </div>

                    {/* Wrist joint */}
                    <div className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-4 h-4 rounded-full bg-gradient-to-tr from-gray-800 to-gray-700 border border-gray-600 z-10 shadow'></div>
                  </div>
                </div>

                {/* Robot right arm - Event Management - Enhanced */}
                <div
                  className='absolute top-48 -right-32 w-40 h-12 animate-float transform-style-3d'
                  data-depth='0.2'
                  style={{
                    transformOrigin: 'left center',
                    animationDuration: '8s',
                    animationDelay: '-2s'
                  }}
                >
                  {/* Upper arm */}
                  <div className='absolute left-0 top-1/2 -translate-y-1/2 w-16 h-6 bg-gradient-to-r from-gray-800 to-gray-700 rounded-r-lg transform-style-3d shadow-md'>
                    {/* Arm joint */}
                    <div className='absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-tr from-gray-800 to-gray-700 border border-gray-600 z-10 shadow-inner'>
                      <div className='absolute inset-1 rounded-full bg-gradient-to-tr from-gray-700 to-gray-800 shadow-inner'></div>
                    </div>
                  </div>

                  {/* Forearm - more articulated */}
                  <div
                    className='absolute right-0 top-1/2 -translate-y-1/2 w-28 h-12 bg-gradient-to-l from-gray-800 to-gray-700 rounded-lg transform-style-3d shadow-md border border-gray-700 -rotate-6'
                    style={{
                      boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    {/* Arm details */}
                    <div className='absolute inset-0 overflow-hidden'>
                      <div className='absolute top-2 left-0 right-0 mx-auto w-16 h-1 bg-gray-600 rounded-full'></div>
                      <div className='absolute bottom-2 left-0 right-0 mx-auto w-16 h-1 bg-gray-600 rounded-full'></div>
                    </div>

                    {/* Event management interface - holographic effect */}
                    <div className='absolute top-0 left-1 right-1 bottom-0 bg-gradient-to-br from-purple-600/90 to-purple-500/90 rounded-lg flex items-center justify-center overflow-hidden shadow-lg'>
                      {/* Holographic effect */}
                      <div className='absolute inset-0 bg-gradient-to-b from-transparent via-purple-400/10 to-transparent animate-scan'></div>
                      <div className='absolute inset-0 flex flex-col items-center justify-center'>
                        <Calendar className='h-5 w-5 text-white drop-shadow-md' />
                        <div className='relative mt-1'>
                          <span className='text-xs text-white font-bold drop-shadow-md'>QUẢN LÝ</span>
                          <div className='absolute -bottom-1 left-0 right-0 h-px bg-white/50'></div>
                        </div>
                      </div>
                    </div>

                    {/* Wrist joint */}
                    <div className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-4 h-4 rounded-full bg-gradient-to-tr from-gray-800 to-gray-700 border border-gray-600 z-10 shadow'></div>
                  </div>
                </div>

                {/* Floating UI elements - Adjusted positioning */}
                <div
                  className='absolute -right-16 -top-32 bg-white/90 p-3 rounded-lg shadow-lg parallax-element animate-float backdrop-blur-sm'
                  data-depth='0.3'
                  style={{ transform: 'translateZ(40px)', animationDuration: '5s' }}
                >
                  <div className='flex items-center gap-2'>
                    <Ticket className='h-5 w-5 text-blue-500' />
                    <span className='text-gray-800 font-medium'>250 vé đã bán</span>
                  </div>
                </div>

                <div
                  className='absolute -left-20 -bottom-6 bg-white/90 p-3 rounded-lg shadow-lg parallax-element animate-float backdrop-blur-sm'
                  data-depth='0.25'
                  style={{ transform: 'translateZ(30px)', animationDuration: '6s', animationDelay: '-1.5s' }}
                >
                  <div className='flex items-center gap-2'>
                    <Users className='h-5 w-5 text-purple-500' />
                    <span className='text-gray-800 font-medium'>150 người tham dự</span>
                  </div>
                </div>

                <div
                  className='absolute right-16 bottom-10 bg-white/90 p-3 rounded-lg shadow-lg parallax-element animate-float backdrop-blur-sm'
                  data-depth='0.35'
                  style={{ transform: 'translateZ(35px)', animationDuration: '7s', animationDelay: '-3s' }}
                >
                  <div className='flex items-center gap-2'>
                    <Calendar className='h-5 w-5 text-green-500' />
                    <span className='text-gray-800 font-medium'>Sắp diễn ra: 3 sự kiện</span>
                  </div>
                </div>
              </div>

              {/* Enhanced decorative lighting effects */}
              <div
                className='absolute -right-20 -top-10 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl parallax-element animate-pulse'
                data-depth='0.1'
                style={{ animationDuration: '10s' }}
              ></div>
              <div
                className='absolute -left-20 top-36 w-60 h-60 bg-purple-500/20 rounded-full blur-2xl parallax-element animate-pulse'
                data-depth='0.15'
                style={{ animationDuration: '13s', animationDelay: '-2s' }}
              ></div>
              <div
                className='absolute bottom-20 right-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl parallax-element animate-pulse'
                data-depth='0.12'
                style={{ animationDuration: '8s', animationDelay: '-4s' }}
              ></div>

              {/* Lens flare effect */}
              <div
                className='absolute top-10 right-20 w-4 h-4 bg-white/80 rounded-full blur-sm animate-pulse'
                style={{ animationDuration: '2s' }}
              ></div>
              <div
                className='absolute top-12 right-22 w-2 h-2 bg-white/60 rounded-full blur-sm animate-pulse'
                style={{ animationDuration: '2s' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
