'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'Services', href: '#services' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass' : 'bg-transparent'
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2 text-2xl font-bold text-glow"
            whileHover={{ scale: 1.05 }}
          >
            <img src="/logo.svg" alt="AI Agency logo" className="w-10 h-10 object-contain" />
            <span>AI Agency</span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, idx) => (
              <motion.a
                key={idx}
                href={item.href}
                className="text-sm font-medium uppercase tracking-wide hover:text-cyber-blue smooth-transition"
                whileHover={{ color: '#00d4ff', textShadow: '0 0 10px rgba(0, 212, 255, 0.5)' }}
              >
                {item.label}
              </motion.a>
            ))}
            <motion.button
              className="btn-primary text-sm py-2 px-6"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Free Trial
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden flex flex-col gap-1 z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <div className={`w-6 h-0.5 bg-cyber-blue smooth-transition ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-cyber-blue smooth-transition ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-cyber-blue smooth-transition ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden pb-4 border-t border-cyber-blue/20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {navItems.map((item, idx) => (
              <motion.a
                key={idx}
                href={item.href}
                className="block py-2 text-sm font-medium uppercase tracking-wide hover:text-cyber-blue smooth-transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </motion.a>
            ))}
            <motion.button
              className="btn-primary w-full mt-4 text-sm py-2"
              whileTap={{ scale: 0.95 }}
            >
              Start Free Trial
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
