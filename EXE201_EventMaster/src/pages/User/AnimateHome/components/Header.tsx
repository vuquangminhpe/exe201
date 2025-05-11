import React, { useState, useRef, useEffect } from 'react'
import { Calendar } from 'lucide-react'

interface HeaderProps {
  isPageLoaded: boolean
}

const Header: React.FC<HeaderProps> = ({ isPageLoaded }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const headerRef = useRef<HTMLDivElement>(null)

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  // Track scroll position
  useEffect(() => {
    if (!isPageLoaded) return

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isPageLoaded])

  // Change header background on scroll
  useEffect(() => {
    if (headerRef.current) {
      const opacity = Math.min(scrollY / 300, 0.9)
      headerRef.current.style.backgroundColor = `rgba(17, 24, 39, ${opacity})`
      headerRef.current.style.backdropFilter = `blur(${Math.min(scrollY / 10, 20)}px)`
    }
  }, [scrollY])

  return (
    <header ref={headerRef} className='fixed top-0 left-0 right-0 z-40 transition-all duration-300'>
      {/* Header glass effect background */}
      <div className='absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80 backdrop-blur-xl border-b border-white/10 shadow-xl'></div>

      {/* Glowing orbs in header */}
      <div className='absolute -left-10 top-1/4 w-24 h-24 rounded-full bg-blue-500/20 blur-3xl animate-pulse'></div>
      <div
        className='absolute right-1/4 bottom-0 w-32 h-20 rounded-full bg-purple-500/20 blur-3xl animate-pulse'
        style={{ animationDelay: '-2s' }}
      ></div>

      {/* Animated grid background */}
      <div className='absolute inset-0 overflow-hidden opacity-10'>
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent)`,
            backgroundSize: '30px 30px'
          }}
        ></div>
      </div>

      <div className='container mx-auto px-6 py-4 relative z-10'>
        <div className='flex items-center justify-between'>
          {/* Logo */}
          <div className='flex items-center space-x-3 group'>
            <div className='relative'>
              <div className='absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 opacity-70 blur group-hover:opacity-100 transition duration-500'></div>
              <div className='relative w-10 h-10 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg transform group-hover:scale-110 transition duration-500'>
                <Calendar className='h-6 w-6 text-white drop-shadow-lg' />
              </div>
            </div>
            <div className='relative'>
              <span className='text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-md'>
                EventMaster
              </span>
              <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 group-hover:w-full transition-all duration-300'></span>
            </div>
          </div>

          {/* Navigation */}
          <nav className='hidden md:flex items-center'>
            <div className='bg-white/5 backdrop-blur-md rounded-full border border-white/10 flex items-center p-1'>
              {['Trang chủ', 'Tính năng', 'Báo giá', 'Liên hệ'].map((item, index) => (
                <a
                  key={index}
                  href='#'
                  className={`px-5 py-2 rounded-full transition-all duration-300 relative group ${
                    index === 0
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <span className='relative z-10'>{item}</span>
                  {index !== 0 && (
                    <>
                      <span className='absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 bg-white/5 transition-opacity'></span>
                      <span className='absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-blue-500 group-hover:w-1/2 transition-all duration-300'></span>
                    </>
                  )}
                </a>
              ))}
            </div>
          </nav>

          {/* Action Buttons */}
          <div className='hidden md:flex items-center space-x-4'>
            <button className='px-5 py-2 rounded-full text-black border border-white/10 backdrop-blur-md bg-white/5 hover:bg-white/10 transition-all hover-scale relative overflow-hidden group'>
              <span className='relative z-10'>Đăng nhập</span>
              <span className='absolute inset-0 bg-gradient-to-r from-gray-500/20 to-gray-400/20 opacity-0 group-hover:opacity-100 transition-opacity'></span>
            </button>
            <button className='px-5 py-2 rounded-full text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all hover-scale relative overflow-hidden shadow-lg shadow-blue-900/30'>
              <span className='relative z-10'>Đăng ký</span>
              <span className='absolute top-0 left-0 w-full h-full bg-white opacity-0 mix-blend-overlay hover:opacity-20 transition-opacity'></span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className='md:hidden bg-white/5 p-2 rounded-lg border border-white/10 transition-all hover:bg-white/10'
            onClick={toggleMobileMenu}
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16'></path>
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className='md:hidden absolute left-0 right-0 top-full mt-2 bg-gradient-to-b from-gray-900/95 to-gray-800/95 backdrop-blur-lg rounded-lg border border-white/10 shadow-2xl p-4 z-50 transition-all'>
            <nav className='flex flex-col space-y-3'>
              {['Trang chủ', 'Tính năng', 'Báo giá', 'Liên hệ'].map((item, index) => (
                <a
                  key={index}
                  href='#'
                  className={`px-4 py-2 rounded-lg transition-all ${
                    index === 0
                      ? 'bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item}
                </a>
              ))}
            </nav>

            <div className='mt-4 pt-4 border-t border-white/10 space-y-3'>
              <button className='w-full px-4 py-2 rounded-lg text-black bg-white/10 hover:bg-white/15 transition-all'>
                Đăng nhập
              </button>
              <button className='w-full px-4 py-2 rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all'>
                Đăng ký
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
