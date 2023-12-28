import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cita',
  description: 'Welcome to Cita the easiest way to create appointments!',
  keywords: ["Cita", "Appointments", "Easy", "QR Code"],
  openGraph: {
    images: `${process.env.NEXT_PUBLIC_VERCEL_URL}/Cita.png`,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
