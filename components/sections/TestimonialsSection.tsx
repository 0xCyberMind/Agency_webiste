'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  const testimonials = [
    {
      name: 'Sarah Johnson',
      title: 'CEO at TechStart',
      image: '👩‍💼',
      content: 'AI Agency transformed our lead generation process. We went from 50 leads/month to 2000+ in just 3 months. The ROI is incredible.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      title: 'Founder at SaaS Pro',
      image: '👨‍💼',
      content: 'The automation workflows saved our team 400 hours per month. We can now focus on strategy instead of repetitive tasks.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      title: 'Marketing Director at Growth Inc',
      image: '👩‍🔬',
      content: 'The AI assistant is like having a 10x team member. It handles analysis, outreach generation, and reporting automatically.',
      rating: 5,
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

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-purple/5 via-transparent to-cyber-blue/5"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title mb-4">Client Success Stories</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Join thousands of companies transforming their business with AI automation
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          className="card-glass p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Main testimonial */}
          <motion.div
            key={activeIndex}
            className="mb-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Content */}
            <p className="text-lg text-gray-300 mb-8 leading-relaxed italic">
              "{testimonials[activeIndex].content}"
            </p>

            {/* Rating */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: testimonials[activeIndex].rating }).map((_, i) => (
                <span key={i} className="text-2xl">⭐</span>
              ))}
            </div>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="text-5xl">{testimonials[activeIndex].image}</div>
              <div>
                <h4 className="font-bold text-white">{testimonials[activeIndex].name}</h4>
                <p className="text-sm text-cyber-blue">{testimonials[activeIndex].title}</p>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 pt-8 border-t border-cyber-blue/20">
            <motion.button
              onClick={() => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="p-2 rounded-lg border border-cyber-blue/30 hover:bg-cyber-blue/10 smooth-transition"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              ←
            </motion.button>

            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <motion.button
                  key={idx}
                  className={`w-3 h-3 rounded-full smooth-transition ${
                    idx === activeIndex ? 'bg-cyber-blue' : 'bg-cyber-blue/30'
                  }`}
                  onClick={() => setActiveIndex(idx)}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>

            <motion.button
              onClick={() => setActiveIndex((prev) => (prev + 1) % testimonials.length)}
              className="p-2 rounded-lg border border-cyber-blue/30 hover:bg-cyber-blue/10 smooth-transition"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              →
            </motion.button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-3 gap-4 mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { number: '500+', label: 'Companies' },
            { number: '10M+', label: 'Leads' },
            { number: '500K+', label: 'Hours Saved' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="glass rounded-lg p-4 text-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="text-3xl font-bold text-cyber-blue">{stat.number}</div>
              <div className="text-sm text-gray-400 mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
