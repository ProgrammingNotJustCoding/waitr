import type { Metadata } from 'next'
import {
  ClerkProvider,
} from '@clerk/nextjs'

import './globals.css'

export const metadata: Metadata = {
  title: 'Waitr',
  description: "Get a AI waiter",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,601,700,701&display=swap" rel="stylesheet" />
        </head>
        <body className={`antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}