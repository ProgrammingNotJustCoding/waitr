'use client'
import React, { useEffect, useState } from 'react'
import { restaurants } from '@/utils/Restaurants'
import { usePathname } from 'next/navigation'
import { menu } from '@/utils/Menu'
import { FaShoppingCart } from 'react-icons/fa'
import { FaMinus, FaPlus, FaX } from 'react-icons/fa6'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

export default function Page() {
  const pathname = usePathname()
  const restaurantId = pathname.split('/')[2]
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  const addToCart = (item: typeof menu[0]) => {
    const updatedCart = [...cart]
    const existingItem = updatedCart.find((cartItem) => cartItem.id === item.id)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      updatedCart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
      })
    }

    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const removeFromCart = (itemId: string) => {
    const updatedCart = cart.filter((item) => item.id !== itemId)
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    const updatedCart = cart.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    )
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <main className='flex flex-col gap-2 w-[calc(100vw-64px)] h-full'>
      <header className="h-16 md:px-6 w-full flex border-b dark:border-primary border-primary-dark justify-between items-center px-4 py-4">
        <div className='flex flex-col'>
          <h3 className='text-sm opacity-20 font-semibold'>{restaurants.find((a) => a.id === restaurantId)?.name}</h3>
          <h1 className='text-2xl font-semibold'>Menu</h1>
        </div>
        <div className='flex items-center w-full left-0 justify-center absolute bottom-12'>
          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className='flex items-center gap-2 px-4 py-2 bg-primary text-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors'
          >
            <FaShoppingCart />
            <span>{totalItems} items</span>
          </button>
        </div>

      </header>
      <div className='h-full w-full flex items-center justify-center'>
        <div className='flex flex-col w-full h-full gap-4 p-4 max-w-3xl'>
          {isCartOpen && (
            <div className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50'>
              <div className='dark:bg-[#262626] bg-[##EFEEE8] rounded-2xl px-6 py-4 max-w-md w-full max-h-[80vh] overflow-y-auto'>
                <div className='flex justify-between items-center mb-4'>
                  <h2 className='text-xl font-semibold'>Your Cart</h2>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className='text-gray-500 hover:text-gray-700'
                  >
                    ✕
                  </button>
                </div>
                {cart.length === 0 ? (
                  <p>Your cart is empty</p>
                ) : (
                  <div className='flex flex-col gap-4'>
                    {cart.map((item) => (
                      <div key={item.id} className='flex justify-between items-center'>
                        <div>
                          <h3 className='font-medium'>{item.name}</h3>
                          <p className='text-sm text-gray-600 dark:text-gray-300'>
                          ₹{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <div className='flex items-center gap-3'>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className='px-1 py-1 bg-primary-dark text-foreground dark:bg-primary rounded-full'
                          >
                            <FaMinus />
                          </button>
                          <span className='font-semibold'>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className='px-1 py-1 text-foreground bg-primary-dark dark:bg-primary rounded-full'
                          >
                            <FaPlus />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className='ml-2 text-red-500'
                          >
                            <FaX />
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className='border-t dark:border-gray-200/20 border-gray-800/20 pt-4 mt-4'>
                      <div className='flex justify-between font-semibold'>
                        <span>Total:</span>
                        <span>₹{totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Best Sellers Section */}
          <div className='overflow-x-auto w-full'>
            <h2 className='text-3xl font-semibold mb-4'>Best Sellers</h2>
            <div className='flex gap-4 pb-2'>
              {menu.slice(0, 2).map((item, index) => (
                <div key={index} className='flex-shrink-0 w-64 overflow-hidden'>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className='w-full h-40 object-cover rounded-2xl'
                  />
                  <div className='p-4'>
                    <h3 className='font-semibold mb-2'>{item.name}</h3>
                    <div className='flex justify-between items-center'>
                      <span className='text-gray-600 dark:text-gray-300'>${item.price}</span>
                      <button
                        className='px-6 py-2 bg-primary text-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors'
                        onClick={() => {
                          addToCart(item)
                          // Add to cart logic here
                          console.log(`Added ${item.name} to cart`)
                        }}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <h2 className='text-3xl font-semibold mb-4'>Starters</h2>

          <div className='flex flex-col gap-3'>
            {menu.slice(2).map((item, index) => (
              <div key={index} className='flex justify-between items-center p-4'>
                <div className='flex flex-col w-full'>
                  <h3 className='font-semibold'>{item.name}</h3>
                  <span className='text-sm text-gray-600 dark:text-gray-300'>₹{item.price}</span>
                </div>
                <button
                  className='px-6 py-2 bg-primary text-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors'
                  onClick={() => {
                    // Add to cart logic here
                    addToCart(item)

                    console.log(`Added ${item.name} to cart`)
                  }}
                >
                  Add
                </button>
              </div>
            ))}
          </div>
          {/* Regular Menu Items */}

        </div>
      </div>
    </main>
  )
}
