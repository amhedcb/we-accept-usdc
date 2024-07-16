// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
import { Inter } from 'next/font/google'
import { Rubik } from 'next/font/google'
import { Libre_Franklin } from 'next/font/google'
import { cn } from '@/lib/utils'
import './globals.css'

const fontHeading = Rubik({
  subsets: ['latin'],
  display: 'swap',
})

const fontBody = Libre_Franklin({
  subsets: ['latin'],
  display: 'swap',
})

export default function Layout({ children }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <html lang="en">
      <body 
        className={cn(
          'antialiased',
          (fontHeading as any).variable,
          (fontBody as any).variable
        )}
      >
        {children}
      </body>
    </html>
  )
}