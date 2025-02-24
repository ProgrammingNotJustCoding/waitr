import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <main className='bg-foreground w-screen h-screen flex items-center justify-center'>
        <SignIn />
    </main>
  )
}