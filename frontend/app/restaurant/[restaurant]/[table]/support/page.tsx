'use client'
// import Search from '@/app/components/Search'
import React from 'react'

import { restaurants } from '@/utils/Restaurants'
import { usePathname } from 'next/navigation'

export default function Page() {
  const pathname = usePathname()
  const restaurantId = pathname.split('/')[2]
  return (
    <main className='flex flex-col gap-2 w-full h-full'>
      <header className="h-16 md:px-6 w-full flex border-b dark:border-primary border-primary-dark justify-between items-center px-4 py-4">
      <div className='flex flex-col'>
          <h3 className='text-sm opacity-20 font-semibold'>{restaurants.find((a) => a.id === restaurantId)?.name}</h3>
          <h1 className='text-2xl font-semibold'>Support</h1>
        </div>
        {/* <Search /> */}
      </header>
      <div className='w-full flex items-center justify-center h-[calc(100vh-70px)]'>
        <h1 className='text-2xl font-semibold'>Hello! How may i help you</h1>
      </div>
    </main>
  )
}
