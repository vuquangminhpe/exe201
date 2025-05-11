import React, { useEffect } from 'react'

interface StatsSectionProps {
  isPageLoaded: boolean
}

interface StatData {
  number: string
  label: string
  color: string
}

const StatsSection: React.FC<StatsSectionProps> = ({ isPageLoaded }) => {
  // Animation for counter effect
  const animateCounterValue = (element: HTMLElement, targetValue: number) => {
    if (!element) return

    const duration = 2000
    const startTime = performance.now()
    const isDecimal = targetValue % 1 !== 0
    const hasPlusSign = element.textContent?.includes('+') || false
    const hasPercentageSign = element.textContent?.includes('%') || false

    const updateCount = (currentTime: number) => {
      const elapsedTime = currentTime - startTime
      const progress = Math.min(elapsedTime / duration, 1)
      // Use easeOutExpo for smoother effect
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)

      let currentValue = Math.floor(easedProgress * targetValue)
      if (isDecimal && progress === 1) {
        currentValue = targetValue
      }

      let displayValue = currentValue.toLocaleString()
      if (hasPlusSign) displayValue += '+'
      if (hasPercentageSign) displayValue += '%'

      element.textContent = displayValue

      if (progress < 1) {
        requestAnimationFrame(updateCount)
      }
    }

    requestAnimationFrame(updateCount)
  }

  // Initialize all counter animations
  const initCounters = () => {
    const counterElements = document.querySelectorAll('.counter-value')

    counterElements.forEach((element) => {
      if (element instanceof HTMLElement) {
        // Get target value from data attribute
        const targetText = element.getAttribute('data-value') || '0'
        const targetValue = parseFloat(targetText.replace(/[+,%]/g, ''))

        // Start animation
        animateCounterValue(element, targetValue)
      }
    })
  }

  // Effect to initialize counters when scrolled into view
  useEffect(() => {
    if (!isPageLoaded) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            initCounters()
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )

    const statsSection = document.querySelector('.stats-section')
    if (statsSection) {
      observer.observe(statsSection)
    }

    return () => observer.disconnect()
  }, [isPageLoaded])

  const stats: StatData[] = [
    { number: '500+', label: 'Sự kiện đã tổ chức', color: 'from-blue-400 to-blue-600' },
    { number: '10,000+', label: 'Người tham dự', color: 'from-purple-400 to-purple-600' },
    { number: '98%', label: 'Khách hàng hài lòng', color: 'from-green-400 to-green-600' },
    { number: '24/7', label: 'Hỗ trợ khách hàng', color: 'from-red-400 to-red-600' }
  ]

  return (
    <section className='py-28 px-6 bg-gray-800 relative overflow-hidden stats-section'>
      {/* 3D grid lines */}
      <div className='absolute inset-0 perspective-1000 opacity-30 pointer-events-none'>
        <div
          className='absolute top-0 left-0 right-0 bottom-0 border-t border-b border-blue-500/10'
          style={{ transform: 'rotateX(75deg) translateZ(-100px)', transformOrigin: 'center' }}
        ></div>
        <div
          className='absolute top-0 left-0 right-0 bottom-0 border-t border-b border-blue-500/5'
          style={{ transform: 'rotateX(75deg) translateZ(0px)', transformOrigin: 'center' }}
        ></div>
        <div
          className='absolute top-0 left-0 right-0 bottom-0 border-t border-b border-blue-500/5'
          style={{ transform: 'rotateX(75deg) translateZ(100px)', transformOrigin: 'center' }}
        ></div>

        {/* Vertical lines */}
        <div
          className='absolute top-0 left-1/4 bottom-0 w-px bg-blue-500/10'
          style={{ transform: 'rotateX(75deg)', transformOrigin: 'center' }}
        ></div>
        <div
          className='absolute top-0 left-2/4 bottom-0 w-px bg-blue-500/10'
          style={{ transform: 'rotateX(75deg)', transformOrigin: 'center' }}
        ></div>
        <div
          className='absolute top-0 left-3/4 bottom-0 w-px bg-blue-500/10'
          style={{ transform: 'rotateX(75deg)', transformOrigin: 'center' }}
        ></div>
      </div>

      {/* Gradients and lighting effects */}
      <div className='absolute inset-0'>
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(76, 29, 149, 0.4) 0%, rgba(30, 64, 175, 0.1) 70%)'
          }}
        />
      </div>

      <div
        className='absolute top-1/3 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse parallax-scroll'
        data-speed='0.04'
      ></div>
      <div
        className='absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse parallax-scroll'
        data-speed='0.05'
        style={{ animationDelay: '-3s' }}
      ></div>

      <div className='container mx-auto relative z-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {stats.map((stat, index) => (
            <div
              key={index}
              className='text-center p-6 bg-gray-900/50 backdrop-blur-sm rounded-xl relative overflow-hidden group perspective-1000 animate-on-scroll'
              data-animation='zoomIn'
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Card border glow */}
              <div className='absolute inset-0 border border-white/10 rounded-xl group-hover:border-blue-500/30 transition-colors duration-500'></div>

              {/* Background glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-xl`}
              ></div>

              {/* 3D Number counter with animation */}
              <div className='text-4xl font-bold mb-2 relative'>
                <span
                  className={`counter-value bg-gradient-to-r ${stat.color} bg-clip-text text-transparent relative`}
                  data-value={stat.number}
                >
                  0
                </span>
                <div className='absolute -inset-4 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 blur-md transition-opacity -rotate-12'></div>
              </div>

              <p className='text-gray-300 relative z-10'>{stat.label}</p>

              {/* Floating particles */}
              <div className='absolute -right-2 -top-2 w-8 h-8 bg-blue-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity'></div>
              <div className='absolute -left-1 -bottom-1 w-6 h-6 bg-purple-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity'></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection
