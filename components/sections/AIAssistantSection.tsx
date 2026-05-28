'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import TypingEffect from '@/components/effects/TypingEffect'

export default function AIAssistantSection() {
  const [activeTab, setActiveTab] = useState(0)
  const [isResponding, setIsResponding] = useState(false)

  const tabs = [
    {
      label: 'Lead Analysis',
      prompt: 'Analyze lead quality from recent campaign...',
      response: 'Analyzing lead data... Found 547 high-quality leads with 89% conversion potential. Top performing industry: SaaS (12.3% conversion rate). Recommendation: Focus outreach on B2B tech companies in US market.',
    },
    {
      label: 'Workflow Generation',
      prompt: 'Generate outreach workflow for enterprise clients...',
      response: 'Creating automated workflow... Setup: 1) Lead enrichment, 2) Email sequence (5 emails), 3) LinkedIn outreach, 4) Sales call scheduling. Estimated reach: 2,400 prospects. Expected response rate: 8-12%.',
    },
    {
      label: 'ROI Calculator',
      prompt: 'Calculate automation ROI for our team...',
      response: 'Computing ROI metrics... Current: 5 team members, 8 hours/day manual tasks. Automation value: $156,000/year saved. Time saved: 9,360 hours annually. Payback period: 2.3 months.',
    },
  ]

  useEffect(() => {
    const timer = setTimeout(() => setIsResponding(true), 1500)
    return () => clearTimeout(timer)
  }, [activeTab])

  const handleTabChange = (idx: number) => {
    setActiveTab(idx)
    setIsResponding(false)
  }

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-blue/5 via-transparent to-cyber-purple/5"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title mb-4">AI Assistant Demo</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Experience our intelligent AI assistant in action
          </p>
        </motion.div>

        {/* Demo Container */}
        <motion.div
          className="card-glass"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6 border-b border-cyber-blue/20 pb-4">
            {tabs.map((tab, idx) => (
              <motion.button
                key={idx}
                className={`px-4 py-2 rounded-lg font-medium text-sm smooth-transition ${
                  activeTab === idx
                    ? 'bg-cyber-blue/30 text-cyber-blue'
                    : 'text-gray-400 hover:text-cyber-blue'
                }`}
                onClick={() => handleTabChange(idx)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Chat Demo */}
          <div className="space-y-4 min-h-80">
            {/* User Message */}
            <motion.div
              key={`user-${activeTab}`}
              className="flex justify-end"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="max-w-xs bg-cyber-blue/20 rounded-2xl p-4 rounded-tr-none">
                <p className="text-white text-sm">{tabs[activeTab].prompt}</p>
              </div>
            </motion.div>

            {/* AI Response */}
            {isResponding && (
              <motion.div
                key={`ai-${activeTab}`}
                className="flex justify-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="max-w-md glass rounded-2xl p-4 rounded-tl-none">
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-cyber-purple flex items-center justify-center flex-shrink-0 text-xs font-bold">
                      AI
                    </div>
                    <TypingEffect text={tabs[activeTab].response} speed={30} />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Typing indicator */}
            {!isResponding && (
              <motion.div
                className="flex justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex gap-2 p-4">
                  {[0, 1, 2].map((idx) => (
                    <motion.div
                      key={idx}
                      className="w-2 h-2 rounded-full bg-cyber-blue"
                      animate={{ y: [0, -10, 0] }}
                      transition={{
                        duration: 0.6,
                        delay: idx * 0.1,
                        repeat: Infinity,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Input Area */}
          <div className="mt-8 pt-6 border-t border-cyber-blue/20">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask AI anything..."
                className="flex-grow bg-cyber-dark/50 border border-cyber-blue/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyber-blue/60 smooth-transition"
              />
              <motion.button
                className="btn-primary py-3 px-6"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
