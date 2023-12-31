import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/navigation/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CMP Dashboard',
  description: 'Clinical Movement Planner Dasboard',
}

export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className='h-screen'>
          <main className='h-full w-full'>
            {children}
          </main>
      </body>
    </html>
  )
}
