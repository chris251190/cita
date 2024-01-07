import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cita',
  description: 'Welcome to Cita, the easiest way to create and share appointments!',
  manifest: "/clients/tvvest/manifest.json",
  keywords: ["Cita", "Appointments", "Easy", "QR Code", "Share", "Welcome to Cita, the easiest way to create and share appointments!"],
  openGraph: {
    url: `${process.env.NEXT_PUBLIC_VERCEL_URL}`,
    type: 'website',
    images: `${process.env.NEXT_PUBLIC_VERCEL_URL}/Cita.png`
  },
  other: {
    "google-site-verification": "MF0nmTcSbW1jaxYHcBLYd1ZxfIqZ7aEwxJK_FAXoeaU",
    "google-adsense-account": "ca-pub-3664964817217395"
  },
}

export const viewport = "width=device-width, initial-scale=1.0";

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
