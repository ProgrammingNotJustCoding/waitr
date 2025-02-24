import { restaurants } from '@/utils/Restaurants'
import Link from 'next/link'
import React from 'react'
import { FaStar } from 'react-icons/fa6'

export default function Dashboard() {
    return (
        <main className='flex flex-col gap-2 w-full h-full'>
            <header className="h-16 md:px-6 w-full flex border-b dark:border-primary border-primary-dark justify-between items-center px-4 py-4">
                <h1 className='text-2xl font-semibold'>Pick Restaurant</h1>
            </header>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 h-full w-full'>
                {restaurants.map((restaurant, index) => (
                    <Link href={`/restaurant/${restaurant.id}`} key={index} className="rounded-xl overflow-hidden">
                        <div className="h-48 w-full rounded-xl bg-gray-200 relative">
                            <img src={restaurant.image} alt={restaurant.name} className="h-full rounded-xl w-full object-cover" />
                        </div>
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">{restaurant.name}</h3>
                            <div className="flex items-center mb-2">
                                <span className="text-yellow-400"><FaStar /></span>
                                <span className="ml-1 text-sm">{restaurant.rating}</span>
                                <span className="mx-2">•</span>
                                <span className="text-sm font-medium ">{restaurant.cuisine}</span>
                                <span className="mx-2">•</span>
                                <span className="text-md text-green-600 font-bold">{restaurant.priceRange}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    )
}
