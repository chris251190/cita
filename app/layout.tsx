import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Head } from 'next/document'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cita',
  description: 'Welcome to Cita the easiest way to create appointments!',
  keywords: ["Cita", "Appointments", "Easy", "QR Code"],
  openGraph: {
    url: `${process.env.NEXT_PUBLIC_VERCEL_URL}`,
    type: 'website',
    images: `${process.env.NEXT_PUBLIC_VERCEL_URL}/Cita.png`,
    title: 'Cita',
    description: 'Welcome to Cita the easiest way to create appointments!',
    siteName: 'Cita',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <meta name="google-site-verification" content="MF0nmTcSbW1jaxYHcBLYd1ZxfIqZ7aEwxJK_FAXoeaU" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_VERCEL_URL}`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_VERCEL_URL}/Cita.png`} />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
