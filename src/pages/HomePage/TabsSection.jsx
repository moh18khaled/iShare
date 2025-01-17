import React from 'react'
import { DiNetbeans } from "react-icons/di";

const TabsSection = () => {
  return (
    <div className='mt-14'>
      <div className='w-[90%] mx-auto'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10'>
        <div className='bg-[#E65967] p-8 text-xl'>
            <p>optimize the Business marketing through their clients</p>
        </div>
        <div className='p-8 text-xl border-2 border-gray-300 flex space-x-2 items-center'>
        <DiNetbeans className=' h-12 text-9xl'/>
            <p>optimize the Business marketing through their clients</p>
        </div>
        <div className='p-8 text-xl border-2 border-gray-300'>
            <p>optimize the Business marketing through their clients</p>
        </div>
        <div className='p-8 text-xl border-2 border-gray-300'>
            <p>optimize the Business marketing through their clients</p>
        </div>
        </div>
      </div>
    </div>
  )
}

export default TabsSection
