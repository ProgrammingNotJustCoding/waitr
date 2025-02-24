'use client'
import Link from 'next/link'
import React from 'react'
import { GiCook } from 'react-icons/gi'
import { HiChatBubbleOvalLeft } from 'react-icons/hi2'
import { IoRestaurant } from 'react-icons/io5'
import { usePathname } from 'next/navigation'
import { IoMdHelpCircle } from 'react-icons/io'
import { FaStreetView } from 'react-icons/fa6'

export default function NavItems() {
    const pathname = usePathname()
    const restaurantId = pathname.split('/')[2]
    const tableId = pathname.split('/')[3]

    return (
        <div className='flex flex-col h-full'>
            <Link href='/' className='flex border-b dark:border-primary border-primary-dark items-center justify-center text-3xl h-16 aspect-square text-primary-dark dark:text-primary'>
                <GiCook />
            </Link>
            <Link 
                href={restaurantId ? `/restaurant/${restaurantId}/${tableId}/greet` : '#'} 
                className={`text-xl flex items-center justify-center p-4 aspect-square ${pathname.includes('/greet') ? 'bg-primary-dark dark:bg-primary text-foreground-dark dark:text-foreground' : 'dark:text-foreground-dark text-foreground hover:bg-black/10 dark:hover:bg-white/10'} border-r-2 border-transparent hover:border-primary dark:hover:border-primary-dark ${!restaurantId && 'opacity-50 pointer-events-none'}`}
            >
                <FaStreetView />
            </Link>
            <Link 
                href={restaurantId ? `/restaurant/${restaurantId}/${tableId}/menu` : '#'} 
                className={`text-xl flex items-center justify-center p-4 aspect-square ${pathname.includes('/menu') ? 'bg-primary-dark dark:bg-primary text-foreground-dark dark:text-foreground' : 'dark:text-foreground-dark text-foreground hover:bg-black/10 dark:hover:bg-white/10'} border-r-2 border-transparent hover:border-primary dark:hover:border-primary-dark ${!restaurantId && 'opacity-50 pointer-events-none'}`}
            >
                <IoRestaurant />
            </Link>
            <Link 
                href={restaurantId ? `/restaurant/${restaurantId}/${tableId}/chat` : '#'} 
                className={`text-xl flex items-center justify-center p-4 aspect-square ${pathname.includes('/chat') ? 'bg-primary-dark dark:bg-primary text-foreground-dark dark:text-foreground' : 'dark:text-foreground-dark text-foreground hover:bg-black/10 dark:hover:bg-white/10'} border-r-2 border-transparent hover:border-primary dark:hover:border-primary-dark ${!restaurantId && 'opacity-50 pointer-events-none'}`}
            >
                <HiChatBubbleOvalLeft />
            </Link>
            <Link 
                href={`/restaurant/${restaurantId}/${tableId}/support`}
                className={`text-xl flex items-center justify-center p-4 aspect-square ${pathname.includes('/support') ? 'bg-primary-dark dark:bg-primary text-foreground-dark dark:text-foreground' : 'dark:text-foreground-dark text-foreground hover:bg-black/10 dark:hover:bg-white/10'} border-r-2 border-transparent hover:border-primary dark:hover:border-primary-dark`}
            >
                <IoMdHelpCircle />
            </Link>
        </div>
    )
}
