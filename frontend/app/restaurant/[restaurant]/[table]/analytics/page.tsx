'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { restaurants } from '@/utils/Restaurants'
import { Bar, Line, Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend)

const mockData = {
  orderCounts: {
    Pizza: 150,
    Cheeseburger: 120,
    Burger: 100
  },
  satisfaction: {
    Pizza: 4.5,
    Cheeseburger: 4.2,
    Burger: 5.0
  },
  profits: {
    Pizza: 3000,
    Cheeseburger: 2400,
    Burger: 1800
  },
  complaints: [
    { category: 'Service Speed', count: 5 },
    { category: 'Food Quality', count: 3 },
    { category: 'Temperature', count: 2 }
  ]
}

export default function Analytics() {
  const pathname = usePathname()
  const restaurantId = pathname.split('/')[2]
  const restaurant = restaurants.find((r) => r.id === restaurantId)

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#fcfbf5'
        }
      }
    },
    scales: {
      y: {
        ticks: {
          color: '#fcfbf5'
        },
        grid: {
          color: '#fcfbf5',
          opacity: 0.1
        }
      },
      x: {
        ticks: {
          color: '#fcfbf5'
        },
        grid: {
          color: '#fcfbf5',
          opacity: 0.1
        }
      }
    }
  }

  const orderData = {
    labels: Object.keys(mockData.orderCounts),
    datasets: [
      {
        label: 'Order Count',
        data: Object.values(mockData.orderCounts),
        backgroundColor: '#FF4747',
        borderColor: '#FF4747',
        borderWidth: 1
      }
    ]
  }

  const satisfactionData = {
    labels: Object.keys(mockData.satisfaction),
    datasets: [
      {
        label: 'Customer Satisfaction',
        data: Object.values(mockData.satisfaction),
        borderColor: '#FF4747',
        tension: 0.4,
        fill: false
      }
    ]
  }

  const profitData = {
    labels: Object.keys(mockData.profits),
    datasets: [
      {
        label: 'Profits (₹)',
        data: Object.values(mockData.profits),
        backgroundColor: '#FF4747',
        borderColor: '#FF4747',
        borderWidth: 1
      }
    ]
  }

  const complaintsData = {
    labels: mockData.complaints.map(c => c.category),
    datasets: [
      {
        data: mockData.complaints.map(c => c.count),
        backgroundColor: ['#FF4747', '#FF6B6B', '#FF8989']
      }
    ]
  }

  return (
    <main className='flex flex-col gap-2 w-[calc(100vw-64px)] h-full'>
      <header className="h-16 md:px-6 w-full flex border-b dark:border-primary border-primary-dark justify-between items-center px-4 py-4">
        <div className='flex flex-col'>
          <h3 className='text-sm opacity-20 font-semibold'>{restaurant?.name}</h3>
          <h1 className='text-2xl font-semibold'>Analytics</h1>
        </div>
      </header>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 p-6'>
        {/* Most Ordered Items */}
        <div className='dark:bg-[#262626] bg-foreground/10 p-6 rounded-2xl'>
          <h2 className='text-xl font-semibold mb-4'>Most Ordered Items</h2>
          <Bar options={chartOptions} data={orderData} />
        </div>

        {/* Customer Satisfaction */}
        <div className='dark:bg-[#262626] bg-foreground/10 p-6 rounded-2xl'>
          <h2 className='text-xl font-semibold mb-4'>Customer Satisfaction</h2>
          <Line options={chartOptions} data={satisfactionData} />
        </div>

        {/* Profits */}
        <div className='dark:bg-[#262626] bg-foreground/10 p-6 rounded-2xl'>
          <h2 className='text-xl font-semibold mb-4'>Profits</h2>
          <Bar options={chartOptions} data={profitData} />
        </div>

        {/* Complaints & Areas to Improve */}
        <div className='dark:bg-[#262626] bg-foreground/10 p-6 rounded-2xl'>
          <h2 className='text-xl font-semibold mb-4'>Complaints Distribution</h2>
          <div className='flex items-center justify-center'>
            <div className='w-64'>
              <Doughnut data={complaintsData} />
            </div>
          </div>
          <div className='mt-4'>
            <h3 className='font-semibold mb-2'>Points to Improve:</h3>
            <ul className='list-disc list-inside'>
              <li>Optimize service speed during peak hours</li>
              <li>Maintain consistent food quality standards</li>
              <li>Regular temperature checks for served items</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}