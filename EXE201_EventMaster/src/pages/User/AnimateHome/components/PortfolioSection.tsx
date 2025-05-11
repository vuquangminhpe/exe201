import React, { useRef, useEffect } from 'react'
import { Calendar, Users, Music, Award, MapPin, Gift } from 'lucide-react'

interface PortfolioSectionProps {
  isPageLoaded: boolean
}

interface EventCardProps {
  title: string
  category: string
  date: string
  location: string
  attendees: string
  color: string
  icon: React.ReactNode
  delay: number
}

const PortfolioSection: React.FC<PortfolioSectionProps> = ({ isPageLoaded }) => {
  const sectionRef = useRef<HTMLElement>(null)
  const cardContainerRef = useRef<HTMLDivElement>(null)

  // Animate on scroll effects
  useEffect(() => {
    if (!isPageLoaded || !sectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const animateElements = entry.target.querySelectorAll('.animate-on-scroll')
            animateElements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('show')
              }, index * 100)
            })
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [isPageLoaded])

  // Handle 3D tilt effect on cards
  useEffect(() => {
    if (!isPageLoaded || !cardContainerRef.current) return

    const cards = cardContainerRef.current.querySelectorAll('.event-card')

    const handleMouseMove = (e: MouseEvent) => {
      cards.forEach((card: Element) => {
        const rect = card.getBoundingClientRect()

        // Only apply effect if mouse is near the card
        const distX = e.clientX - (rect.left + rect.width / 2)
        const distY = e.clientY - (rect.top + rect.height / 2)
        const distance = Math.sqrt(distX * distX + distY * distY)

        // Apply effect only when mouse is close to the card
        if (distance < rect.width) {
          const x = distX / 10
          const y = distY / 10

          // @ts-expect-error - we know this is an HTMLElement
          card.style.transform = `perspective(1000px) rotateX(${-y * 0.2}deg) rotateY(${x * 0.2}deg) scale3d(1.02, 1.02, 1.02)`

          // Apply effect to the card shine
          const shine = card.querySelector('.card-shine')
          if (shine) {
            // @ts-expect-error - we know this is an HTMLElement
            shine.style.backgroundPosition = `${50 + (distX / rect.width) * 10}% ${50 + (distY / rect.height) * 10}%`
          }
        } else {
          // Reset when mouse is far
          // @ts-expect-error - we know this is an HTMLElement
          card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
        }
      })
    }

    const handleMouseLeave = () => {
      cards.forEach((card: Element) => {
        // @ts-expect-error - we know this is an HTMLElement
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    cardContainerRef.current.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (cardContainerRef.current) {
        cardContainerRef.current.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [isPageLoaded])

  // Event card data
  const events: EventCardProps[] = [
    {
      title: 'Lễ hội Âm nhạc 2024',
      category: 'Giải trí',
      date: '15-18 Tháng 6, 2024',
      location: 'Công viên 23/9, TP.HCM',
      attendees: '10,000+',
      color: 'from-violet-500 to-purple-600',
      icon: <Music className='h-5 w-5' />,
      delay: 0
    },
    {
      title: 'Hội nghị Khởi nghiệp',
      category: 'Kinh doanh',
      date: '5-6 Tháng 8, 2024',
      location: 'Trung tâm Hội nghị Quốc tế, Hà Nội',
      attendees: '2,500+',
      color: 'from-blue-500 to-cyan-500',
      icon: <Users className='h-5 w-5' />,
      delay: 100
    },
    {
      title: 'Triển lãm Công nghệ 2025',
      category: 'Công nghệ',
      date: '20-25 Tháng 1, 2025',
      location: 'MegaCenter, Đà Nẵng',
      attendees: '15,000+',
      color: 'from-emerald-500 to-green-600',
      icon: <Gift className='h-5 w-5' />,
      delay: 200
    },
    {
      title: 'Lễ trao giải Doanh nghiệp',
      category: 'Kinh doanh',
      date: '10 Tháng 12, 2024',
      location: 'InterContinental, TP.HCM',
      attendees: '1,200+',
      color: 'from-amber-500 to-orange-600',
      icon: <Award className='h-5 w-5' />,
      delay: 300
    },
    {
      title: 'Hội chợ Du lịch Quốc tế',
      category: 'Du lịch',
      date: '8-12 Tháng 9, 2024',
      location: 'Phú Quốc, Kiên Giang',
      attendees: '8,500+',
      color: 'from-rose-500 to-pink-600',
      icon: <MapPin className='h-5 w-5' />,
      delay: 400
    },
    {
      title: 'Tuần lễ Văn hóa Việt Nam',
      category: 'Văn hóa',
      date: '1-7 Tháng 7, 2024',
      location: 'Hoàng thành Thăng Long, Hà Nội',
      attendees: '25,000+',
      color: 'from-red-500 to-red-600',
      icon: <Calendar className='h-5 w-5' />,
      delay: 500
    }
  ]

  const EventCard: React.FC<EventCardProps> = ({ title, category, date, location, attendees, color, icon, delay }) => {
    return (
      <div
        className='event-card relative group h-full perspective-1000 animate-on-scroll'
        data-animation='fadeInUp'
        style={{ animationDelay: `${delay}ms` }}
      >
        <div className='absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl transform group-hover:scale-[0.98] transition-transform duration-300'></div>
        <div className='card-content relative h-full rounded-2xl p-6 border border-white/10 backdrop-blur-sm bg-white/5 overflow-hidden group-hover:border-white/20 transition-all duration-500 z-10 flex flex-col'>
          {/* Shine effect overlay */}
          <div className='card-shine absolute inset-0 w-full h-full bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>

          {/* Category Tag */}
          <div className='mb-4 flex items-center justify-between'>
            <div
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${color} text-white`}
            >
              <span className='flex items-center'>
                {icon}
                <span className='ml-1.5'>{category}</span>
              </span>
            </div>
            <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
              <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${color} animate-pulse`}></div>
            </div>
          </div>

          {/* Title */}
          <h3 className='text-xl font-bold mb-3 text-white group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300'>
            {title}
          </h3>

          {/* Event Details */}
          <div className='space-y-3 mt-2 text-gray-300 flex-grow'>
            <div className='flex items-start'>
              <Calendar className='h-4 w-4 mt-0.5 mr-2 text-gray-400' />
              <span className='text-sm'>{date}</span>
            </div>
            <div className='flex items-start'>
              <MapPin className='h-4 w-4 mt-0.5 mr-2 text-gray-400' />
              <span className='text-sm'>{location}</span>
            </div>
            <div className='flex items-start'>
              <Users className='h-4 w-4 mt-0.5 mr-2 text-gray-400' />
              <span className='text-sm'>{attendees} người tham dự</span>
            </div>
          </div>

          {/* Button at the bottom */}
          <div className='mt-6 pt-4 border-t border-white/10'>
            <button
              className={`w-full py-2.5 rounded-lg bg-gradient-to-r ${color} text-white text-sm font-medium opacity-90 hover:opacity-100 transition-opacity transform group-hover:scale-105 duration-300 relative overflow-hidden`}
            >
              <span className='relative z-10'>Xem chi tiết</span>
              <div className='absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300'>
                <div className='absolute inset-0 bg-white/40 animate-pulse'></div>
              </div>
            </button>
          </div>

          {/* Corner accents */}
          <div className='absolute top-0 right-0 h-16 w-16 overflow-hidden'>
            <div
              className={`absolute top-0 right-0 h-2 w-2 rounded-full bg-gradient-to-r ${color} group-hover:animate-pulse transform group-hover:scale-150 transition-transform duration-500`}
            ></div>
          </div>
          <div className='absolute bottom-0 left-0 h-16 w-16 overflow-hidden'>
            <div
              className={`absolute bottom-0 left-0 h-2 w-2 rounded-full bg-gradient-to-r ${color} group-hover:animate-pulse transform group-hover:scale-150 transition-transform duration-500`}
            ></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section
      className='py-32 px-6 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden'
      ref={sectionRef}
    >
      {/* Background effects */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        {/* Blurred gradient orbs */}
        <div className='absolute -top-20 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse'></div>
        <div
          className='absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse'
          style={{ animationDelay: '-3s' }}
        ></div>

        {/* 3D grid effect */}
        <div
          className='absolute inset-0 opacity-20'
          style={{
            backgroundImage: `radial-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px), radial-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            backgroundPosition: '0 0, 25px 25px',
            transform: 'perspective(1000px) rotateX(60deg) translateY(100px) scale(2)',
            transformOrigin: 'center center'
          }}
        ></div>
      </div>

      <div className='container mx-auto relative z-10'>
        <div className='text-center mb-20 animate-on-scroll' data-animation='fadeInUp'>
          <div className='inline-block text-sm font-medium text-blue-400 px-3 py-1 rounded-full bg-blue-900/30 backdrop-blur-sm mb-4'>
            QUẢN LÝ SỰ KIỆN
          </div>
          <h2 className='text-3xl md:text-5xl font-bold mb-8 text-white'>
            Các sự kiện{' '}
            <span className='bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>nổi bật</span>
          </h2>
          <p className='text-gray-300 max-w-2xl mx-auto'>
            Hệ thống EventMaster đã giúp nhiều đơn vị tổ chức sự kiện thành công với hàng trăm ngàn người tham dự. Dưới
            đây là một số sự kiện tiêu biểu đã và sắp diễn ra.
          </p>
        </div>

        <div ref={cardContainerRef} className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {events.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>

        {/* CTA Button */}
        <div className='mt-16 text-center animate-on-scroll' data-animation='fadeInUp'>
          <button className='px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg font-medium text-white transition-all transform hover:scale-105 hover:shadow-xl hover:shadow-blue-900/20 relative overflow-hidden group'>
            <span className='relative z-10'>Khám phá thêm sự kiện</span>
            <div className='absolute top-0 right-0 bottom-0 left-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left'></div>
          </button>
        </div>
      </div>
    </section>
  )
}

export default PortfolioSection
