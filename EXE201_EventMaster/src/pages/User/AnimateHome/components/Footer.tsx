import React from 'react'
import { Calendar } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className='py-12 px-6 bg-gray-900 border-t border-gray-800'>
      <div className='container mx-auto'>
        <div className='flex flex-col md:flex-row justify-between items-center'>
          <div className='flex items-center space-x-2 mb-6 md:mb-0'>
            <div className='w-10 h-10 rounded-lg bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center'>
              <Calendar className='h-6 w-6 text-white' />
            </div>
            <span className='text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>
              EventMaster
            </span>
          </div>

          <div className='text-gray-400 text-sm'>
            © {new Date().getFullYear()} EventMaster. Tất cả quyền được bảo lưu.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
