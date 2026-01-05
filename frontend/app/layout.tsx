import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = {
  title: 'NirvaNest — Nepal\'s C2C Marketplace',
  description: 'A peer-to-peer marketplace prototype for Nepal. Buy and sell locally with secure payments.',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#1E3A8A" />
      </head>
      <body className="bg-neutral-50 text-neutral-900">
        <Navbar />
        <main role="main" className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}