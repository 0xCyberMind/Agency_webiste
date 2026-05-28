"use client"

import { motion } from 'framer-motion'
import { useState } from 'react'

const GOOGLE_FORM_ACTION_URL =
  process.env.NEXT_PUBLIC_GOOGLE_FORM_ACTION_URL ||
  'https://docs.google.com/forms/d/e/1FAIpQLSek6Za-OhwIYdRk8rWFSjGmm4BCVLFk9I9vtHLuJuQlW6Jymg/formResponse'

const GOOGLE_FORM_FIELDS = {
  name: 'entry.2097437066',
  email: 'entry.1682326951',
  message: 'entry.618555141',
} as const

type ContactField = keyof typeof GOOGLE_FORM_FIELDS

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const fieldName = e.target.dataset.field as ContactField
    const { value } = e.target

    if (!fieldName) return

    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const form = e.currentTarget as HTMLFormElement
      const formDataPayload = new FormData(form)
      const messageWithCompany = formData.company
        ? `${formData.message}\n\nCompany: ${formData.company}`
        : formData.message

      // Ensure the Google Forms entry IDs are sent, even though the UI keeps its custom labels.
      formDataPayload.set(GOOGLE_FORM_FIELDS.name, formData.name)
      formDataPayload.set(GOOGLE_FORM_FIELDS.email, formData.email)
      formDataPayload.set(GOOGLE_FORM_FIELDS.message, messageWithCompany)

      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formDataPayload,
      })

      setSubmitStatus('success')
      setFormData({ name: '', email: '', company: '', message: '' })
    } catch (err) {
      console.error('Send message error', err)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)

      // Reset status after 4 seconds
      setTimeout(() => setSubmitStatus('idle'), 4000)
    }
  }

  return (
    <section id="contact" className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-blue/5 to-cyber-purple/10"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title mb-4">Get In Touch</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Ready to transform your business? Let's talk about your AI automation needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Contact Methods */}
            {[
              {
                icon: '📧',
                title: 'Email',
                value: 'automindagency01@gmail.com',
                href: 'mailto:automindagency01@gmail.com',
              },
              {
                icon: '💬',
                title: 'Live Chat',
                value: 'Chat with our team',
                href: '#',
              },
              {
                icon: '📱',
                title: 'Phone',
                value: '+91 9913920394',
                href: 'tel:+919913920394',
              },
              {
                icon: '📍',
                title: 'Location',
                value: 'Ahemdabad, India',
                href: '#',
              },
            ].map((method, idx) => (
              <motion.a
                key={idx}
                href={method.href}
                className="card-glass p-6 block group"
                whileHover={{ x: 10 }}
              >
                <div className="text-3xl mb-3">{method.icon}</div>
                <h3 className="font-bold text-white mb-1 group-hover:text-cyber-blue smooth-transition">
                  {method.title}
                </h3>
                <p className="text-gray-400">{method.value}</p>
              </motion.a>
            ))}

            {/* Social Links */}
            <div className="pt-4">
              <p className="text-gray-400 mb-4">Follow us on social media</p>
              <div className="flex gap-4">
                {['Twitter', 'LinkedIn', 'Discord'].map((social, idx) => (
                  <motion.button
                    key={idx}
                    className="w-12 h-12 rounded-lg border border-cyber-blue/30 glass hover:bg-cyber-blue/20 smooth-transition font-bold text-cyber-blue"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social[0]}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            className="card-glass p-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {submitStatus === 'success' ? (
              <motion.div
                className="flex flex-col items-center justify-center h-full text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                <p className="text-gray-400">
                  We've received your message and will get back to you shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    name={GOOGLE_FORM_FIELDS.name}
                    data-field="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-cyber-dark/50 border border-cyber-blue/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyber-blue/60 focus:ring-1 focus:ring-cyber-blue/30 smooth-transition"
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    name={GOOGLE_FORM_FIELDS.email}
                    data-field="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-cyber-dark/50 border border-cyber-blue/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyber-blue/60 focus:ring-1 focus:ring-cyber-blue/30 smooth-transition"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
                  <input
                    type="text"
                    name="company"
                    data-field="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-cyber-dark/50 border border-cyber-blue/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyber-blue/60 focus:ring-1 focus:ring-cyber-blue/30 smooth-transition"
                    placeholder="Your company"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <textarea
                    name={GOOGLE_FORM_FIELDS.message}
                    data-field="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full bg-cyber-dark/50 border border-cyber-blue/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyber-blue/60 focus:ring-1 focus:ring-cyber-blue/30 smooth-transition resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto mt-20 px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="card-glass p-12 text-center">
          <h3 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-cyber-purple">
            Ready to scale your business with AI?
          </h3>
          <p className="text-gray-400 mb-8 text-lg">
            Start your free trial today and see the results in just 7 days.
          </p>
          <motion.button
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Free Trial
          </motion.button>
        </div>
      </motion.div>
    </section>
  )
}
