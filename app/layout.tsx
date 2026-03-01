import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Padel to Business',
  description: 'Sveriges roligaste padelnätverk',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sv">
      <body>{children}</body>
    </html>
  )
}
