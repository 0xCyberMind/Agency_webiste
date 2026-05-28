'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useRef, useEffect, useState } from 'react'
import AIOrb from '@/components/3d/AIOrb'

const Canvas = dynamic(() => import('@react-three/fiber').then(mod => mod.Canvas), {
  ssr: false,
})

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" ref={containerRef}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-blue/10 via-transparent to-cyber-purple/10"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
          >
            {/* Badge */}
            <motion.div
              className="glass w-fit px-4 py-2 rounded-full"
              variants={itemVariants}
            >
              <span className="text-sm font-medium text-cyber-blue">🚀 Next-Generation AI</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              className="text-5xl md:text-7xl font-bold leading-tight"
              variants={itemVariants}
            >
              <span className="bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink bg-clip-text text-transparent">
                AI Automation
              </span>
              <br />
              <span className="text-white">At Scale</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-lg text-gray-300 leading-relaxed max-w-lg"
              variants={itemVariants}
            >
              Transform your business with advanced AI systems. Automate workflows, generate leads, and scale operations without hiring more people.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <motion.button
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
              <motion.button
                className="btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Watch Demo
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-4 pt-4"
              variants={itemVariants}
            >
              {[
                { number: '10K+', label: 'Leads Processed' },
                { number: '500+', label: 'Workflows' },
                { number: '98%', label: 'Accuracy' },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-2xl font-bold text-cyber-blue">{stat.number}</div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - 3D Orb */}
          <motion.div
            className="relative h-96 md:h-[600px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <div className="absolute inset-0">
              {typeof window !== 'undefined' && (
                <Canvas
                  camera={{ position: [0, 0, 3], fov: 50 }}
                  className="w-full h-full"
                >
                  <AIOrb />
                </Canvas>
              )}
            </div>

            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-radial from-cyber-blue/20 via-transparent to-transparent rounded-full blur-3xl"></div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="text-cyber-blue text-center">
            <div className="text-sm mb-2">Scroll to explore</div>
            <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
