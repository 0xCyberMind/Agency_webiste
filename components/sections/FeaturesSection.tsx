'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function FeaturesSection() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  const features = [
    {
      title: '3D AI Orb',
      description: 'Interactive AI visualization that responds to cursor and audio',
      icon: '🌐',
    },
    {
      title: 'Real-time Analytics',
      description: 'Live dashboard with animated metrics and performance tracking',
      icon: '📈',
    },
    {
      title: 'Particle Effects',
      description: 'Immersive background particles that react to interactions',
      icon: '✨',
    },
    {
      title: 'Glassmorphism UI',
      description: 'Modern design with frosted glass panels and glowing borders',
      icon: '🎨',
    },
    {
      title: 'AI Typing Effect',
      description: 'Realistic AI assistant typing simulation and responses',
      icon: '⌨️',
    },
    {
      title: 'Neural Network',
      description: 'Animated network visualization showing AI connections',
      icon: '🧠',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="features" className="relative py-20 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-purple/5 via-transparent to-cyber-blue/5"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title mb-4">Advanced Features</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Cutting-edge technology and immersive interactions that set us apart
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {features.map((feature, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <motion.div
                className="card-glass p-6 h-full"
                whileHover={{
                  y: -10,
                  boxShadow: '0 0 30px rgba(0, 212, 255, 0.4)',
                }}
              >
                {/* Icon */}
                <motion.div
                  className="text-4xl mb-4"
                  whileHover={{ scale: 1.3, rotate: 10 }}
                >
                  {feature.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>

                {/* Accent line */}
                <motion.div
                  className="h-1 bg-gradient-to-r from-cyber-blue to-cyber-purple mt-4"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
