import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Bodoni_Moda, DM_Sans, Mrs_Saint_Delafield } from 'next/font/google'
import { wedding } from '@/lib/wedding-config'
import './globals.css'

const bodoni = Bodoni_Moda({
  subsets: ['latin', 'latin-ext'],
  style: ['normal', 'italic'],
  variable: '--font-bodoni',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const delafield = Mrs_Saint_Delafield({
  subsets: ['latin', 'latin-ext'],
  weight: '400',
  variable: '--font-delafield',
  display: 'swap',
})

const names = `${wedding.couple.partnerOne} & ${wedding.couple.partnerTwo}`

export const metadata: Metadata = {
  title: `${names} — ${wedding.date.display}`,
  description: `${wedding.message.body} ${wedding.date.display}, ${wedding.city}.`,
  generator: 'v0.app',
  openGraph: {
    title: `${names} · ${wedding.date.display}`,
    description: wedding.message.headline,
    type: 'website',
    locale: 'ro_RO',
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#F7F4F1',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ro"
      className={`${bodoni.variable} ${dmSans.variable} ${delafield.variable} bg-background`}
    >
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
