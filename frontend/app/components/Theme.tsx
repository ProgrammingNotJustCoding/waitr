'use client'
import React, { useEffect, useState } from 'react'
import { LuMoon, LuSun } from 'react-icons/lu'

export default function ThemeButton() {
  const [dark, setDark] = useState(false)
  useEffect(() => {
    const theme = localStorage.getItem('theme')
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      setDark(true)
    } else {
      document.documentElement.classList.remove('dark')
      setDark(false)

    }
  }, [])

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains('dark')
    if (isDark) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
      setDark(false)

    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      setDark(true)
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full z-50 active:rotate-45 transition-all duration-150 text-foreground bg-background dark:bg-background-dark dark:text-foreground-dark"
    >
      {dark ? <LuSun className="w-4 h-4" /> : <LuMoon className="w-4 h-4" />}
    </button>
  )
}
