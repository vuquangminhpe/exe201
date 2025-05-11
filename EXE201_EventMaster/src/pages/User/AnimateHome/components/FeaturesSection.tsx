import React, { useRef, useEffect } from 'react'
import { Ticket, Users, Mail, Calendar, Star, Lock, ChevronRight } from 'lucide-react'

interface FeaturesSectionProps {
  isPageLoaded: boolean
}

interface FeatureData {
  icon: React.ReactNode
  title: string
  description: string
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ isPageLoaded }) => {
  const featureCardsRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })

  // Track mouse position for 3D effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Handle 3D effect for feature cards
  useEffect(() => {
    if (!featureCardsRef.current || !isPageLoaded) return

    const cards = featureCardsRef.current.querySelectorAll('.feature-card')

    cards.forEach((card: any) => {
      const rect = card.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Calculate tilt based on mouse position relative to card center
      const moveX = (mousePosition.x - centerX) / 15
      const moveY = (mousePosition.y - centerY) / 15

      // Apply transform
      card.style.transform = `perspective(1000px) rotateX(${-moveY}deg) rotateY(${moveX}deg) translateZ(10px)`

      // Effect for icon in card
      const icon = card.querySelector('.feature-icon')
      if (icon) {
        icon.style.transform = `translateZ(20px)`
      }
    })
  }, [mousePosition, isPageLoaded])

  // Feature data
  const features: FeatureData[] = [
    {
      icon: <Ticket className='h-8 w-8 text-blue-500' />,
      title: 'Quản lý vé sự kiện',
      description: 'Tạo, phân phối và theo dõi vé điện tử một cách dễ dàng với hệ thống quản lý tiên tiến.'
    },
    {
      icon: <Users className='h-8 w-8 text-purple-500' />,
      title: 'Phân cấp người dùng',
      description: 'Phân quyền chi tiết cho các cấp quản lý khác nhau, từ admin đến nhân viên event.'
    },
    {
      icon: <Mail className='h-8 w-8 text-green-500' />,
      title: 'Hệ thống mời tham dự',
      description: 'Gửi lời mời tự động và theo dõi phản hồi từ khách mời một cách hiệu quả.'
    },
    {
      icon: <Calendar className='h-8 w-8 text-red-500' />,
      title: 'Lịch trình sự kiện',
      description: 'Tạo và quản lý lịch trình chi tiết cho từng sự kiện với nhiều hoạt động.'
    },
    {
      icon: <Star className='h-8 w-8 text-yellow-500' />,
      title: 'Đánh giá trải nghiệm',
      description: 'Thu thập và phân tích phản hồi từ người tham dự để cải thiện sự kiện.'
    },
    {
      icon: <Lock className='h-8 w-8 text-indigo-500' />,
      title: 'Bảo mật thông tin',
      description: 'Bảo vệ dữ liệu người dùng và thông tin sự kiện với hệ thống bảo mật cao cấp.'
    }
  ]

  return (
    <section className='py-24 px-6 bg-gray-900 relative overflow-hidden'>
      {/* Background 3D grid animation */}
      <div className='absolute inset-0 perspective-1000 pointer-events-none'>
        <div className='absolute inset-0 grid grid-cols-6 grid-rows-6 gap-4'>
          {Array.from({ length: 36 }).map((_, i) => (
            <div
              key={i}
              className='w-full h-full border border-blue-500/5 rounded-md parallax-scroll'
              data-speed={0.02 + (i % 5) * 0.01}
              style={{
                transform: `translateZ(${(i % 5) * -20}px)`,
                opacity: 0.1 + (i % 3) * 0.05
              }}
            />
          ))}
        </div>
      </div>

      {/* Glowing orbs */}
      <div
        className='absolute top-1/4 left-1/4 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-pulse parallax-scroll'
        data-speed='0.05'
      ></div>
      <div
        className='absolute bottom-1/4 right-1/3 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl animate-pulse parallax-scroll'
        data-speed='0.03'
        style={{ animationDelay: '-2s' }}
      ></div>

      <div className='container mx-auto relative z-10'>
        <div className='text-center mb-16 animate-on-scroll' data-animation='fadeInUp'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4 relative inline-block'>
            Tính năng nổi bật
            <span className='absolute left-0 bottom-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500'></span>
          </h2>
          <p className='text-gray-300 max-w-2xl mx-auto mt-6'>
            Hệ thống của chúng tôi cung cấp đầy đủ các công cụ cần thiết để quản lý sự kiện của bạn một cách hiệu quả và
            chuyên nghiệp.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' ref={featureCardsRef}>
          {features.map((feature, index) => (
            <div
              key={index}
              className='feature-card bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 cursor-pointer group animate-on-scroll'
              data-animation={index % 2 === 0 ? 'fadeInLeft' : 'fadeInRight'}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Card background glow effect */}
              <div className='absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

              <div
                className='feature-icon bg-gradient-to-br from-gray-700/80 to-gray-800/80 w-16 h-16 rounded-xl flex items-center justify-center mb-6 relative'
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Icon glow */}
                <div className='absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md'></div>
                {feature.icon}
              </div>

              <h3 className='text-xl font-semibold mb-3 relative inline-block'>
                {feature.title}
                <span className='absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300'></span>
              </h3>

              <p className='text-gray-300'>{feature.description}</p>

              {/* Card hover detail */}
              <div className='mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center text-blue-400 font-medium'>
                <span>Tìm hiểu thêm</span>
                <ChevronRight className='h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
