import React, { useState, useEffect, useRef } from 'react'
import { ChevronRight, Ticket, Calendar, Users, CreditCard } from 'lucide-react'

interface HeroSectionProps {
  isPageLoaded: boolean
}

const HeroSection: React.FC<HeroSectionProps> = ({ isPageLoaded }) => {
  const heroSectionRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    // Register event listener
    window.addEventListener('scroll', handleScroll)

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

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
              <span className='absolute -left-3 top-0 bottom-0 w-1 bg-blue-500/30 rounded-full'></span>
            </p>

            <div className='flex flex-col sm:flex-row gap-4'>
              <button className='px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-purple-600 rounded-lg font-medium transition-all flex items-center justify-center hover-scale relative overflow-hidden group'>
                <span className='relative z-10'>Dùng thử miễn phí</span>
                <ChevronRight className='ml-2 h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform' />
                <span className='absolute top-0 left-0 w-full h-full bg-white opacity-0 mix-blend-overlay group-hover:opacity-20 transition-opacity'></span>
              </button>

              <button className='px-6 py-3 bg-gray-800/80 hover:bg-gray-700 backdrop-blur-sm rounded-lg font-medium transition-all flex items-center justify-center hover-scale relative overflow-hidden group border border-gray-700'>
                <span className='relative text-black z-10'>Xem demo</span>
                <span className='absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity'></span>
              </button>
            </div>

            {/* Floating particles */}
            <div className='absolute -left-10 top-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-float'></div>
            <div
              className='absolute -right-5 bottom-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-float'
              style={{ animationDelay: '-2s' }}
            ></div>
          </div>

          {/* 3D Dashboard - Replacing Robot */}
          <div className='lg:w-1/2 relative z-10 animate-on-scroll' data-animation='fadeInRight' ref={heroSectionRef}>
            {/* 3D Dashboard Container */}
            <div className='relative w-full h-full min-h-[500px] md:min-h-[580px] flex items-center justify-center'>
              {/* Background effects */}
              <div className='absolute inset-0 bg-gradient-to-r from-blue-600/20 via-indigo-600/10 to-purple-600/20 rounded-3xl blur-3xl -m-2'></div>

              {/* 3D Dashboard Card */}
              <div
                className='relative w-full max-w-4xl bg-gradient-to-b from-gray-900/95 to-gray-800/95 rounded-2xl p-8 shadow-2xl border border-gray-700/50 backdrop-blur-sm overflow-hidden'
                style={{
                  transform: 'perspective(1000px) rotateX(20deg)',
                  transformOrigin: 'center top',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
                }}
              >
                {/* Dashboard Header */}
                <div className='mb-6'>
                  <h2 className='text-2xl md:text-3xl font-bold text-blue-400'>Event Dashboard</h2>
                  <p className='text-gray-400 text-sm'>Quản lý tất cả sự kiện của bạn từ một giao diện trực quan</p>
                </div>

                {/* Dashboard Top Stats Cards */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
                  {/* Event Stats Cards - Vé đã bán */}
                  <div className='hover-card-container'>
                    <div className='card-base bg-blue-900/50 rounded-xl p-5 border border-blue-800/40 shadow-lg'>
                      <div className='flex justify-between items-start mb-1'>
                        <div className='flex items-center'>
                          <Ticket className='w-5 h-5 text-blue-400 mr-2' />
                          <span className='text-blue-200 text-sm'>Vé đã bán</span>
                        </div>
                        <div className='text-xs text-blue-200 font-semibold bg-blue-500/30 px-2 py-0.5 rounded-full'>
                          +12%
                        </div>
                      </div>

                      <p className='text-3xl font-bold text-white mt-3 mb-2'>2,543</p>

                      <div className='w-full h-1 bg-blue-900/80 rounded-full mt-4 overflow-hidden'>
                        <div className='h-full w-[75%] bg-blue-400 rounded-full'></div>
                      </div>
                    </div>
                  </div>

                  {/* Event Stats Cards - Doanh thu */}
                  <div className='hover-card-container'>
                    <div className='card-base bg-purple-900/50 rounded-xl p-5 border border-purple-800/40 shadow-lg'>
                      <div className='flex justify-between items-start mb-1'>
                        <div className='flex items-center'>
                          <CreditCard className='w-5 h-5 text-purple-400 mr-2' />
                          <span className='text-purple-200 text-sm'>Doanh thu</span>
                        </div>
                        <div className='text-xs text-purple-200 font-semibold bg-purple-500/30 px-2 py-0.5 rounded-full'>
                          +8%
                        </div>
                      </div>

                      <p className='text-3xl font-bold text-white mt-3 mb-2'>156.4M</p>

                      <div className='w-full h-1 bg-purple-900/80 rounded-full mt-4 overflow-hidden'>
                        <div className='h-full w-[65%] bg-purple-400 rounded-full'></div>
                      </div>
                    </div>
                  </div>

                  {/* Event Stats Cards - Người tham dự */}
                  <div className='hover-card-container'>
                    <div className='card-base bg-indigo-900/50 rounded-xl p-5 border border-indigo-800/40 shadow-lg'>
                      <div className='flex justify-between items-start mb-1'>
                        <div className='flex items-center'>
                          <Users className='w-5 h-5 text-indigo-400 mr-2' />
                          <span className='text-indigo-200 text-sm'>Người tham dự</span>
                        </div>
                        <div className='text-xs text-indigo-200 font-semibold bg-indigo-500/30 px-2 py-0.5 rounded-full'>
                          +5%
                        </div>
                      </div>

                      <p className='text-3xl font-bold text-white mt-3 mb-2'>1,823</p>

                      <div className='w-full h-1 bg-indigo-900/80 rounded-full mt-4 overflow-hidden'>
                        <div className='h-full w-[82%] bg-indigo-400 rounded-full'></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Upcoming Events Section */}
                <div className='relative'>
                  {/* Section header */}
                  <div className='flex justify-between items-center mb-4'>
                    <div className='flex items-center'>
                      <Calendar className='w-5 h-5 text-blue-400 mr-2' />
                      <h3 className='text-lg font-bold text-white'>Sắp diễn ra</h3>
                    </div>
                    <button className='text-xs text-blue-300 font-medium bg-blue-500/10 hover:bg-blue-500/20 px-3 py-1 rounded-full transition-colors'>
                      Xem tất cả
                    </button>
                  </div>

                  {/* Events grid */}
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    {/* Event Card 1 */}
                    <div className='hover-card-container'>
                      <div className='card-base bg-blue-900/20 rounded-lg p-4 border border-blue-900/40 shadow-lg'>
                        <div className='flex justify-between items-start mb-2'>
                          <h4 className='font-semibold text-white'>Tech Conference 2025</h4>
                          <span className='text-xs text-white px-2 py-0.5 rounded-full bg-blue-500/30 border border-blue-500/30'>
                            Tech
                          </span>
                        </div>

                        <div className='flex items-center text-xs text-gray-400 mb-3'>
                          <Calendar className='w-3 h-3 mr-1' />
                          25-28 Th05, 2025
                        </div>

                        <div className='flex justify-between items-center'>
                          <div className='flex -space-x-1'>
                            {[...Array(3)].map((_, i) => (
                              <div
                                key={i}
                                className='w-5 h-5 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600'
                              ></div>
                            ))}
                            <div className='w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-[10px] text-blue-300'>
                              +18
                            </div>
                          </div>
                          <span className='text-xs text-blue-300'>250 vé đã bán</span>
                        </div>
                      </div>
                    </div>

                    {/* Event Card 2 */}
                    <div className='hover-card-container'>
                      <div className='card-base bg-purple-900/20 rounded-lg p-4 border border-purple-900/40 shadow-lg'>
                        <div className='flex justify-between items-start mb-2'>
                          <h4 className='font-semibold text-white'>Music Festival</h4>
                          <span className='text-xs text-white px-2 py-0.5 rounded-full bg-purple-500/30 border border-purple-500/30'>
                            Music
                          </span>
                        </div>

                        <div className='flex items-center text-xs text-gray-400 mb-3'>
                          <Calendar className='w-3 h-3 mr-1' />
                          12-15 Th06, 2025
                        </div>

                        <div className='flex justify-between items-center'>
                          <div className='flex -space-x-1'>
                            {[...Array(3)].map((_, i) => (
                              <div
                                key={i}
                                className='w-5 h-5 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600'
                              ></div>
                            ))}
                            <div className='w-5 h-5 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-[10px] text-purple-300'>
                              +32
                            </div>
                          </div>
                          <span className='text-xs text-purple-300'>512 vé đã bán</span>
                        </div>
                      </div>
                    </div>

                    {/* Event Card 3 */}
                    <div className='hover-card-container'>
                      <div className='card-base bg-green-900/20 rounded-lg p-4 border border-green-900/40 shadow-lg'>
                        <div className='flex justify-between items-start mb-2'>
                          <h4 className='font-semibold text-white'>Business Summit</h4>
                          <span className='text-xs text-white px-2 py-0.5 rounded-full bg-green-500/30 border border-green-500/30'>
                            Business
                          </span>
                        </div>

                        <div className='flex items-center text-xs text-gray-400 mb-3'>
                          <Calendar className='w-3 h-3 mr-1' />
                          02-03 Th07, 2025
                        </div>

                        <div className='flex justify-between items-center'>
                          <div className='flex -space-x-1'>
                            {[...Array(3)].map((_, i) => (
                              <div
                                key={i}
                                className='w-5 h-5 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600'
                              ></div>
                            ))}
                            <div className='w-5 h-5 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center text-[10px] text-green-300'>
                              +24
                            </div>
                          </div>
                          <span className='text-xs text-green-300'>320 vé đã bán</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dashboard Glow Effects */}
                <div className='absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-xl'></div>
                <div className='absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-xl'></div>
              </div>

              {/* Floating UI elements */}
              <div
                className='absolute top-1/4 -right-12 bg-white/90 p-3 rounded-lg shadow-lg backdrop-blur-sm animate-float'
                style={{ transform: 'translateZ(40px)', animationDuration: '5s', zIndex: 40 }}
              >
                <div className='flex items-center gap-2'>
                  <Ticket className='h-5 w-5 text-blue-500' />
                  <span className='text-gray-800 font-medium'>250 vé đã bán hôm nay</span>
                </div>
              </div>

              <div
                className='absolute -left-10 bottom-1/4 bg-white/90 p-3 rounded-lg shadow-lg backdrop-blur-sm animate-float'
                style={{ transform: 'translateZ(30px)', animationDuration: '6s', animationDelay: '-2s', zIndex: 40 }}
              >
                <div className='flex items-center gap-2'>
                  <Users className='h-5 w-5 text-purple-500' />
                  <span className='text-gray-800 font-medium'>+15% người tham dự</span>
                </div>
              </div>

              {/* Enhanced decorative lighting effects */}
              <div
                className='absolute -right-20 -top-10 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl animate-pulse'
                style={{ animationDuration: '10s' }}
              ></div>
              <div
                className='absolute -left-20 top-36 w-60 h-60 bg-purple-500/20 rounded-full blur-2xl animate-pulse'
                style={{ animationDuration: '13s', animationDelay: '-2s' }}
              ></div>
              <div
                className='absolute bottom-20 right-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl animate-pulse'
                style={{ animationDuration: '8s', animationDelay: '-4s' }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hover-card-container {
          perspective: 1000px;
          transform-style: preserve-3d;
          position: relative;
          z-index: 10;
          transition: z-index 0.1s step-end;
        }

        .hover-card-container:hover {
          z-index: 30;
        }

        .card-base {
          transform-origin: center bottom;
          transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1.5), box-shadow 0.5s ease, border-color 0.3s ease;
          position: relative;
          will-change: transform;
        }

        .hover-card-container:hover .card-base {
          transform: rotateX(-20deg) translateY(-40px);
          box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.5), 0 5px 15px rgba(0, 0, 0, 0.2);
          border-color: rgba(99, 102, 241, 0.4);
        }
      `}</style>
    </section>
  )
}

export default HeroSection
