import Link from "next/link"
import { LuChefHat, LuMessageSquare, LuQrCode } from "react-icons/lu"
import ThemeButton from "./components/Theme"
import { SignedOut, SignInButton, SignUpButton, SignedIn, UserButton } from "@clerk/nextjs"

export default function Home() {
  return (
    <>
      <header className="flex absolute w-screen text-foreground md:text-background font-semibold justify-end items-center p-4 gap-2 h-16">
        <ThemeButton />
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>

      <div className="flex flex-col min-h-screen bg-background dark:bg-background-dark">
        {/* Hero Section */}
        <section className="lg:h-[80vh] flex flex-col max-lg:pt-32 gap-12 lg:flex-row justify-between items-center lg:pl-32">
          <div className="flex flex-col items-start justify-start gap-4 text-left max-lg:px-8">
            <h1 className="text-4xl lg:text-6xl text-left font-semibold leading-[1.25] dark:text-foreground-dark lg:leading-[1.3]">
              Order your food,<br />get served <span className="font-bold px-2 rounded-md dark:bg-primary bg-primary-dark dark:text-background-dark text-background italic">fast</span>
            </h1>
            <p className="opacity-50 dark:text-foreground-dark text-left font-medium text-lg lg:text-xl">
              Transform your dining experience with our intelligent virtual waiter
            </p>
            <div className="flex flex-row gap-2 flex-wrap">
            <Link href="/restaurant" className="dark:bg-primary bg-primary-dark px-6 py-4 rounded-full mt-6 font-semibold dark:text-background-dark text-background text-lg">
              Get Started
            </Link>
            <Link href="/qr" className="bg-primary/10 px-6 flex items-center justify-center py-4 rounded-full mt-6 font-semibold dark:text-background-dark text-background text-lg">
              <LuQrCode className="w-6 h-6 dark:text-primary text-primary" />
            </Link>
            </div>
          </div>
          <img src="/restaurant.png" alt="Hero" className="h-full w-full lg:w-[40vw] object-cover" />
        </section>

        {/* Features Section */}
        <section className="py-16 dark:bg-black/80 bg-foreground">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-lg transition-transform duration-200 hover:-translate-y-1">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <LuQrCode className="w-6 h-6 dark:text-primary text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Scan & Select</h3>
                <p className="text-background">Simply scan the QR code at your table and select what you like to order</p>
              </div>
              <div className="p-6 rounded-lg transition-transform duration-200 hover:-translate-y-1">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <LuMessageSquare className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Chat to Order</h3>
                <p className="text-background">Interact naturally with our AI chatbot to place your order</p>
              </div>
              <div className="p-6 rounded-lg transition-transform duration-200 hover:-translate-y-1">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <LuChefHat className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Enjoy Your Meal</h3>
                <p className="text-background">Receive personalized recommendations and quick service</p>
              </div>
            </div>
          </div>
        </section>

        <section className="dark:bg-background-dark bg-background py-12 px-8 md:px-32"></section>

        {/* CTA Section */}
        <section className="dark:bg-primary bg-primary-dark dark:text-background-dark text-white py-16">
          <div className="container mx-auto px-4 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to Transform Your Restaurant?</h2>
            <p className="text-lg md:text-xl mb-8">Join the future of dining with our AI-powered solution</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="text-primary px-6 py-3 rounded-full text-lg font-semibold transition-colors duration-200 dark:bg-background-dark bg-background">
                Restaurant Sign Up
              </button>
              <button className="dark:text-background-dark text-background px-6 py-3 rounded-full text-lg font-semibold transition-colors duration-200 border-2 border-background dark:border-background-dark">
                Learn More
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
