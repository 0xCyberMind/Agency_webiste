'use client'

import { motion } from 'framer-motion'

export default function LoadingScreen() {
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 0,
      transition: {
        delay: 2,
        duration: 0.5,
      },
    },
  }

  const orbVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
    pulse: {
      boxShadow: [
        '0 0 20px rgba(0, 212, 255, 0.5)',
        '0 0 60px rgba(0, 212, 255, 0.8)',
        '0 0 20px rgba(0, 212, 255, 0.5)',
      ],
    },
  }

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5,
        duration: 0.6,
      },
    },
  }

  const bootSequence = [
    'Initializing AI Systems...',
    'Loading Neural Networks...',
    'Calibrating Orb...',
    'Establishing Connection...',
    'Ready.',
  ]

  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-cyber-black via-cyber-dark to-cyber-black z-50 flex flex-col items-center justify-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Orb */}
      <motion.div
        className="mb-12"
        variants={orbVariants}
        initial="hidden"
        animate={['visible', 'pulse']}
        transition={{
          pulse: {
            repeat: Infinity,
            duration: 2,
            delay: 0.6,
          },
        }}
      >
        <div className="w-40 h-40 rounded-full bg-gradient-to-br from-cyber-blue to-cyber-purple shadow-glow"></div>
      </motion.div>

      {/* Boot Sequence */}
      <div className="space-y-2 h-24">
        {bootSequence.map((text, idx) => (
          <motion.div
            key={idx}
            className="text-cyber-blue font-mono text-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: idx * 0.3 + 0.3,
              duration: 0.4,
            }}
          >
            <span className="text-gray-400">&gt; </span>
            {text}
          </motion.div>
        ))}
      </div>

      {/* Loading bar */}
      <motion.div
        className="mt-12 w-48 h-1 bg-cyber-blue/20 rounded-full overflow-hidden"
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="h-full bg-gradient-to-r from-cyber-blue to-cyber-purple"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{
            duration: 1.5,
            delay: 1,
          }}
        />
      </motion.div>
    </motion.div>
  )
}
