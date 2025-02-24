'use client'
import { restaurants } from '@/utils/Restaurants'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function Greet() {
  const pathname = usePathname()
  const restaurantId = pathname.split('/')[2]
  const tableId = pathname.split('/')[3]

  return (
    <main className='flex flex-col gap-2 w-full h-full'>
      <header className="h-16 md:px-6 w-full flex border-b dark:border-primary border-primary-dark justify-between items-center px-4 py-4">
        <h1 className='text-2xl font-semibold'>{restaurants.find((a) => a.id === restaurantId)?.name}</h1>
      </header>
      <div className='h-full w-full flex flex-col items-center justify-center'>
        <div className='flex flex-col w-full items-center justify-center max-w-3xl pb-4 h-[calc(100vh-70px)]'>
          <AnimatePresence>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                x: -20
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0
              }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", duration: 0.3 }}
              className={`flex justify-start w-full`}
            >
              <motion.pre
                whileHover={{ scale: 1.02 }}
                className={`max-w-[80%] text-lg md:text-2xl py-3 px-6 font-sans font-medium 'dark:bg-primary/10 dark:bg-foreground-dark/10 text-foreground rounded-r-3xl rounded-t-3xl rounded-bl-md dark:text-foreground-dark ml-4 bg-foreground/10`}
              >
                Welcome to <span className='font-semibold'>{restaurants.find((a) => a.id === restaurantId)?.name}</span>
              </motion.pre>
            </motion.div>
            <div className='mt-8 font-medium flex w-full justify-end pr-12'>
              <motion.h1 className='text-base md:text-2xl text-right w-full'>Your table number is <span className='font-semibold'>{tableId}</span></motion.h1>
            </div>
          </AnimatePresence>
          <div className='flex gap-2 mt-16'>
          <Link href={`/restaurant/${restaurantId}/${tableId}/chat`} className="rounded-xl overflow-hidden">
            <motion.button
              whileHover={{ scale: 1.02 }}
              className={`rounded-full overflow-hidden px-8 py-3 bg-primary-dark dark:bg-primary dark:text-background-dark text-background font-semibold text-lg`}
            >
              Chat
            </motion.button>
          </Link>
          <Link href={`/restaurant/${restaurantId}/${tableId}/menu`} className="rounded-xl overflow-hidden">
            <motion.button
              whileHover={{ scale: 1.02 }}
              className={`rounded-full overflow-hidden px-8 py-3 text-foreground-dark font-semibold text-lg`}
            >
              Menu
            </motion.button>
          </Link>
        </div>
        </div>
      </div>
    </main>
  )
}
