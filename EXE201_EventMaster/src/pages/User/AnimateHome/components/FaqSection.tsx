import React, { useState, useRef, useEffect } from 'react'

interface FaqItem {
  question: string
  answer: string
}

interface FaqSectionProps {
  isPageLoaded: boolean
}

const FaqSection: React.FC<FaqSectionProps> = ({ isPageLoaded }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState(0)
  const faqSectionRef = useRef<HTMLDivElement>(null)

  // Toggle FAQ item with smooth transition
  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? -1 : index)
  }

  // Animate elements on scroll
  useEffect(() => {
    if (!isPageLoaded || !faqSectionRef.current) return

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

    observer.observe(faqSectionRef.current)

    return () => observer.disconnect()
  }, [isPageLoaded])

  // FAQ data
  const faqItems: FaqItem[] = [
    {
      question: 'Hệ thống EventMaster hoạt động như thế nào?',
      answer:
        'EventMaster là nền tảng quản lý sự kiện toàn diện giúp bạn kiểm soát mọi khía cạnh của sự kiện từ vé, người tham dự, lịch trình đến phân cấp quyền quản lý. Hệ thống hoạt động trên đám mây, giúp bạn dễ dàng truy cập từ mọi thiết bị và quản lý sự kiện mọi lúc, mọi nơi.'
    },
    {
      question: 'Tôi có thể sử dụng AI trong sự kiện không?',
      answer:
        'Có, EventMaster tích hợp công nghệ AI để hỗ trợ phân tích dữ liệu, dự đoán xu hướng người tham dự, và đề xuất cải thiện sự kiện. Bạn cũng có thể sử dụng chatbot AI để tương tác với người tham dự và trả lời các câu hỏi thường gặp.'
    },
    {
      question: 'Hệ thống hỗ trợ thanh toán nào?',
      answer:
        'EventMaster hỗ trợ đa dạng các phương thức thanh toán bao gồm thẻ tín dụng, chuyển khoản ngân hàng, ví điện tử (MoMo, ZaloPay, VNPay) và nhiều phương thức khác. Chúng tôi đảm bảo giao dịch an toàn với hệ thống bảo mật tiên tiến.'
    },
    {
      question: 'Tôi cần hỗ trợ thêm thì liên hệ như thế nào?',
      answer:
        'Bạn có thể liên hệ đội ngũ hỗ trợ của chúng tôi thông qua email support@eventmaster.vn, hotline 1900 1234 hoặc chat trực tiếp trên website. Đội ngũ hỗ trợ sẵn sàng phục vụ 24/7 để giải đáp mọi thắc mắc của bạn.'
    }
  ]

  return (
    <section
      className='py-24 px-6 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden'
      ref={faqSectionRef}
    >
      {/* Background elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div
          className='absolute top-0 left-0 w-full h-full opacity-20'
          style={{
            backgroundImage:
              'radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.4) 1%, transparent 1%), radial-gradient(circle at 75% 75%, rgba(124, 58, 237, 0.4) 1%, transparent 1%)',
            backgroundSize: '60px 60px'
          }}
        ></div>

        <div className='absolute top-1/4 -left-20 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl animate-pulse'></div>
        <div
          className='absolute bottom-1/4 -right-20 w-60 h-60 bg-purple-500/20 rounded-full blur-2xl animate-pulse'
          style={{ animationDelay: '-3s' }}
        ></div>
      </div>

      <div className='container mx-auto relative z-10'>
        <div className='text-center mb-16 animate-on-scroll' data-animation='fadeInUp'>
          <div className='inline-block text-sm font-medium text-blue-400 px-3 py-1 rounded-full bg-blue-900/30 backdrop-blur-sm mb-4'>
            FAQ
          </div>
          <h2 className='text-3xl md:text-4xl font-bold mb-6 text-white'>
            <span className='bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>
              EventMaster
            </span>{' '}
            giải đáp mọi thắc mắc của bạn
          </h2>
          <p className='text-gray-300 max-w-2xl mx-auto'>Chúng tôi luôn sẵn sàng giải đáp thắc mắc và hỗ trợ bạn.</p>
        </div>

        <div className='max-w-3xl mx-auto'>
          {/* Enhanced FAQ Accordion Items with Smooth Transitions */}
          <div className='space-y-5'>
            {faqItems.map((item, index) => (
              <div
                key={index}
                className='bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 transition-all duration-300 hover:border-blue-500/30 shadow-lg animate-on-scroll'
                data-animation={index % 2 === 0 ? 'fadeInLeft' : 'fadeInRight'}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <button
                  className='w-full px-6 py-4 flex items-center justify-between text-black font-medium text-left focus:outline-none'
                  onClick={() => toggleFaq(index)}
                >
                  <span>{item.question}</span>
                  <div
                    className={`w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center transition-transform duration-300 ${
                      openFaqIndex === index ? 'rotate-180' : ''
                    }`}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={2}
                      stroke='currentColor'
                      className='w-4 h-4 text-blue-400'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
                    </svg>
                  </div>
                </button>
                <div
                  className='overflow-hidden transition-all duration-300 ease-in-out'
                  style={{
                    maxHeight: openFaqIndex === index ? '500px' : '0px',
                    opacity: openFaqIndex === index ? 1 : 0
                  }}
                >
                  <div className='px-6 p-4 text-gray-300'>
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FaqSection
