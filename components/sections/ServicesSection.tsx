'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const services = [
    {
      icon: '⚡',
      title: 'Lead Automation',
      description: 'AI-powered lead generation and qualification system that works 24/7',
      features: ['Real-time scraping', 'AI filtering', 'Auto-enrichment'],
    },
    {
      icon: '🤖',
      title: 'Workflow Automation',
      description: 'Orchestrate complex business processes with intelligent automation',
      features: ['Custom workflows', 'Smart triggers', 'Error handling'],
    },
    {
      icon: '💬',
      title: 'AI Outreach',
      description: 'Generate personalized outreach at scale with AI-powered messaging',
      features: ['Personalization', 'Multi-channel', 'Analytics'],
    },
    {
      icon: '📊',
      title: 'Analytics Dashboard',
      description: 'Real-time insights and metrics for your automated systems',
      features: ['Live metrics', 'Custom reports', 'Predictive insights'],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="services" className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-blue/5 to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title mb-4">Core Services</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Comprehensive AI automation solutions designed to transform your business operations
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              className="relative group"
              variants={itemVariants}
              onHoverStart={() => setHoveredIndex(idx)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              {/* Card background */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue/20 to-cyber-purple/10 rounded-2xl blur opacity-0 group-hover:opacity-100 smooth-transition"></div>

              {/* Card */}
              <div className="card-glass relative h-full flex flex-col">
                {/* Icon */}
                <motion.div
                  className="text-5xl mb-4"
                  animate={hoveredIndex === idx ? { scale: 1.2, rotate: 10 } : { scale: 1, rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {service.icon}
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-2 text-white">{service.title}</h3>
                <p className="text-gray-400 text-sm mb-4 flex-grow">{service.description}</p>

                {/* Features */}
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, height: 0 }}
                  animate={hoveredIndex === idx ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {service.features.map((feature, fidx) => (
                    <div key={fidx} className="flex items-center gap-2 text-sm text-cyber-blue">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyber-blue"></div>
                      {feature}
                    </div>
                  ))}
                </motion.div>

                {/* Corner glow */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-cyber-blue/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 smooth-transition"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
