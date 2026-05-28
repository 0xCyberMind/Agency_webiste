import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Automation Agency - Next-Gen AI Systems',
  description: 'Advanced AI automation platform with real-time intelligence and futuristic design',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-cyber-black text-white overflow-x-hidden`}>
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue/5 via-cyber-dark to-cyber-purple/5"></div>
        </div>
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  )
}
