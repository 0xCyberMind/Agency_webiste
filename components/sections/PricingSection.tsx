'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false)

  const plans = [
    {
      name: 'Starter',
      monthlyPrice: 299,
      yearlyPrice: 2990,
      description: 'Perfect for small teams',
      features: [
        'Up to 1,000 leads/month',
        '5 active workflows',
        'Basic analytics',
        'Email support',
        'API access',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Professional',
      monthlyPrice: 999,
      yearlyPrice: 9990,
      description: 'For growing businesses',
      features: [
        'Up to 10,000 leads/month',
        '50 active workflows',
        'Advanced analytics',
        'Priority support',
        'Custom integrations',
        'Dedicated account manager',
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      monthlyPrice: 2499,
      yearlyPrice: 24990,
      description: 'For enterprises',
      features: [
        'Unlimited leads',
        'Unlimited workflows',
        'Real-time analytics',
        '24/7 phone support',
        'Custom development',
        'White-label options',
        'SLA guarantee',
      ],
      cta: 'Contact Sales',
      popular: false,
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="pricing" className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-blue/5 to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title mb-4">Simple Transparent Pricing</h2>
          <p className="text-gray-400 mb-8">Choose the perfect plan for your business</p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm font-medium ${!isAnnual ? 'text-cyber-blue' : 'text-gray-400'}`}>
              Monthly
            </span>
            <motion.button
              className="relative w-14 h-7 rounded-full bg-cyber-blue/30 border border-cyber-blue/50"
              onClick={() => setIsAnnual(!isAnnual)}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-cyber-blue"
                animate={{ x: isAnnual ? 28 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
            <span className={`text-sm font-medium ${isAnnual ? 'text-cyber-blue' : 'text-gray-400'}`}>
              Annual <span className="text-xs text-cyber-blue">Save 17%</span>
            </span>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              className="relative group"
              variants={itemVariants}
            >
              {/* Glow background */}
              {plan.popular && (
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-2xl blur opacity-30 group-hover:opacity-50 smooth-transition"></div>
              )}

              {/* Card */}
              <div className={`relative card-glass p-8 h-full flex flex-col ${plan.popular ? 'ring-2 ring-cyber-blue' : ''}`}>
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-cyber-blue to-cyber-purple px-4 py-1 rounded-full text-sm font-bold">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Plan name */}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-8">
                  <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-cyber-purple">
                    ${isAnnual ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-gray-400 text-sm">{isAnnual ? '/year' : '/month'}</span>
                </div>

                {/* CTA */}
                <motion.button
                  className={`w-full py-3 rounded-lg font-bold uppercase tracking-wide mb-8 smooth-transition ${
                    plan.popular
                      ? 'bg-gradient-to-r from-cyber-blue to-cyber-purple hover:shadow-glow'
                      : 'border-2 border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {plan.cta}
                </motion.button>

                {/* Features */}
                <div className="space-y-4 flex-grow">
                  {plan.features.map((feature, fidx) => (
                    <motion.div
                      key={fidx}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: fidx * 0.05 }}
                    >
                      <svg className="w-5 h-5 text-cyber-blue flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
