import React from 'react'

const CtaSection: React.FC = () => {
  return (
    <section className='py-32 px-6 bg-gray-900 relative overflow-hidden'>
      {/* Animated background */}
      <div className='absolute inset-0 bg-gradient-to-b from-indigo-900/30 to-purple-900/30 z-0'></div>

      {/* Animated particles */}
      <div className='absolute inset-0 opacity-20'>
        <div
          className='absolute top-0 left-1/4 w-1 h-20 bg-blue-500/30 animate-float'
          style={{ animationDuration: '15s' }}
        ></div>
        <div
          className='absolute top-1/3 left-1/3 w-2 h-2 rounded-full bg-purple-500/50 animate-float'
          style={{ animationDuration: '13s', animationDelay: '-2s' }}
        ></div>
        <div
          className='absolute top-2/3 left-1/2 w-3 h-3 rounded-full bg-blue-500/50 animate-float'
          style={{ animationDuration: '17s', animationDelay: '-5s' }}
        ></div>
        <div
          className='absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-cyan-500/50 animate-float'
          style={{ animationDuration: '14s', animationDelay: '-7s' }}
        ></div>
        <div
          className='absolute bottom-1/3 right-1/3 w-1 h-16 bg-purple-500/30 animate-float'
          style={{ animationDuration: '16s', animationDelay: '-3s' }}
        ></div>
      </div>

      {/* Glowing orbs */}
      <div className='absolute -left-32 -bottom-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl'></div>
      <div className='absolute -right-32 -top-32 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl'></div>

      {/* 3D grid floor effect */}
      <div
        className='absolute bottom-0 left-0 right-0 h-32 opacity-20'
        style={{
          backgroundImage:
            'linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          transform: 'perspective(500px) rotateX(60deg) translateY(50px) scale(2)',
          transformOrigin: 'bottom center'
        }}
      ></div>

      <div className='container mx-auto relative z-10'>
        <div
          className='max-w-5xl mx-auto backdrop-blur-lg p-10 rounded-3xl relative transform-style-3d group perspective-1000 animate-on-scroll'
          data-animation='fadeInUp'
        >
          {/* Glass card effect */}
          <div className='absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl border border-white/20 shadow-2xl transform-style-3d group-hover:border-blue-500/30 transition-all duration-500'></div>

          {/* Holographic overlay */}
          <div className='absolute inset-0 rounded-3xl overflow-hidden'>
            <div className='absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent animate-scan'></div>
            <div className='absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent'></div>
            <div className='absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent'></div>
          </div>

          {/* Accent lighting */}
          <div className='absolute -top-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-blue-500/30 blur-md'></div>
          <div className='absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-purple-500/30 blur-md'></div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            {/* Left content with 3D effect */}
            <div className='text-center lg:text-left relative' style={{ transform: 'translateZ(20px)' }}>
              <h2 className='text-4xl md:text-5xl font-bold mb-5 bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent drop-shadow-md'>
                Sẵn sàng nâng tầm sự kiện của bạn?
              </h2>
              <p className='text-gray-300 mb-8 text-lg'>
                Đăng ký ngay hôm nay để trải nghiệm nền tảng quản lý sự kiện hiện đại nhất hiện nay với nhiều tính năng
                đặc biệt.
              </p>

              <div className='flex flex-col sm:flex-row gap-4 mb-8'>
                {/* Primary button with advanced effects */}
                <button className='px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-600 rounded-xl font-medium transition-all flex items-center justify-center transform-style-3d relative overflow-hidden group shadow-lg shadow-blue-900/20 hover:shadow-xl hover:shadow-blue-800/30'>
                  {/* Button glow and pulse effects */}
                  <div className='absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                  <div className='absolute inset-0 opacity-0 group-hover:opacity-30 overflow-hidden'>
                    <div className='absolute inset-x-0 h-px top-0 bg-white/50'></div>
                    <div className='absolute inset-y-0 w-px right-0 bg-white/50'></div>
                    <div className='absolute inset-x-0 h-px bottom-0 bg-white/50'></div>
                    <div className='absolute inset-y-0 w-px left-0 bg-white/50'></div>
                  </div>

                  <span className='relative z-10 font-semibold text-white mr-2'>Bắt đầu miễn phí</span>
                  <span className='relative z-10 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white transform group-hover:translate-x-1 transition-transform'>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-4 h-4'>
                      <path
                        fillRule='evenodd'
                        d='M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </span>
                </button>

                {/* Secondary button with glass effect */}
                <button className='px-8 py-4 backdrop-blur-sm rounded-xl font-medium transition-all flex items-center justify-center transform-style-3d relative overflow-hidden group border border-white/10 hover:border-white/30 shadow-lg shadow-gray-900/10'>
                  <div className='absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors'></div>
                  <div className='absolute top-0 right-0 w-20 h-10 -mt-5 -mr-10 bg-white/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity'></div>

                  <span className='relative z-10 font-semibold text-black'>Lịch demo</span>
                </button>
              </div>

              <div className='text-sm text-gray-400 mb-2'>
                Hoặc gọi cho chúng tôi: <span className='text-blue-400'>1900 1234</span>
              </div>
            </div>

            {/* Right side - Contact form */}
            <div
              className='relative rounded-xl overflow-hidden transform-style-3d'
              style={{ transform: 'translateZ(30px)' }}
            >
              <div className='absolute inset-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl'></div>

              <div className='p-6 relative'>
                <h3 className='text-xl font-semibold mb-4 text-white'>Liên hệ với chúng tôi</h3>

                <div className='space-y-4'>
                  <div className='relative'>
                    <input
                      type='text'
                      placeholder='Họ và tên'
                      className='w-full px-4 py-3 bg-white/10 border border-white/10 focus:border-blue-500/50 rounded-lg outline-none text-white placeholder-gray-400 transition-all'
                    />
                  </div>

                  <div className='relative'>
                    <input
                      type='email'
                      placeholder='Email'
                      className='w-full px-4 py-3 bg-white/10 border border-white/10 focus:border-blue-500/50 rounded-lg outline-none text-white placeholder-gray-400 transition-all'
                    />
                  </div>

                  <div className='relative'>
                    <input
                      type='text'
                      placeholder='Số điện thoại'
                      className='w-full px-4 py-3 bg-white/10 border border-white/10 focus:border-blue-500/50 rounded-lg outline-none text-white placeholder-gray-400 transition-all'
                    />
                  </div>

                  <button className='w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg font-medium text-white transition-all shadow-lg shadow-blue-900/20 hover:shadow-xl hover:shadow-blue-800/30 relative overflow-hidden group'>
                    <div className='absolute inset-0 opacity-0 group-hover:opacity-20'>
                      <div className='absolute inset-0 bg-white/20 animate-pulse'></div>
                    </div>
                    <span className='relative'>Đăng ký tư vấn</span>
                  </button>
                </div>

                <div className='mt-4 text-xs text-gray-400 text-center'>Chúng tôi sẽ liên hệ lại trong vòng 24 giờ</div>
              </div>
            </div>
          </div>

          {/* Floating accent elements */}
          <div className='absolute -right-5 -top-5 w-12 h-12 bg-blue-500/20 rounded-full blur-xl animate-pulse'></div>
          <div
            className='absolute -left-8 -bottom-8 w-16 h-16 bg-purple-500/20 rounded-full blur-xl animate-pulse'
            style={{ animationDelay: '-3s' }}
          ></div>
        </div>
      </div>
    </section>
  )
}

export default CtaSection
