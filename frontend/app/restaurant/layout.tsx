import { SignedOut, SignInButton, SignUpButton, SignedIn, UserButton } from '@clerk/nextjs'
import React from 'react'
import ThemeButton from '../components/Theme'
import NavItems from '../components/NavItems'

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <main className='flex flex-row min-h-screen bg-background dark:bg-background-dark'>
            <nav className="flex flex-col justify-between bg-black/5 sticky top-0 min-h-screen dark:bg-white/5 h-full">
                <NavItems />
                <div className='flex flex-col items-center gap-4 pb-6'>
                    <ThemeButton />
                    <SignedOut>
                        <SignInButton />
                        <SignUpButton />
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </nav>
            {children}
        </main>
    )
}
