'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import AnimatedCounter from '@/components/effects/AnimatedCounter'

export default function DashboardSection() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  const metrics = [
    { label: 'Leads Processed', value: 47250, icon: '👥', color: 'from-cyber-blue' },
    { label: 'Workflows Active', value: 1248, icon: '⚙️', color: 'from-cyber-purple' },
    { label: 'Automations Run', value: 892150, icon: '🤖', color: 'from-cyber-pink' },
    { label: 'Hours Saved', value: 12480, icon: '⏱️', color: 'from-neon-cyan' },
  ]

  const chartData = [
    { week: 'Week 1', value: 4200 },
    { week: 'Week 2', value: 5800 },
    { week: 'Week 3', value: 4900 },
    { week: 'Week 4', value: 7200 },
  ]

  return (
    <section id="dashboard" className="relative py-20 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-purple/5 via-transparent to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title mb-4">Live Analytics Dashboard</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Real-time metrics and performance tracking
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
        >
          {metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              className="card-glass relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} to-transparent opacity-10`}></div>

              <div className="relative z-10">
                {/* Icon */}
                <div className="text-4xl mb-4">{metric.icon}</div>

                {/* Counter */}
                <div className="mb-2">
                  {inView && (
                    <motion.div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-cyber-purple">
                      <AnimatedCounter value={metric.value} />
                    </motion.div>
                  )}
                </div>

                {/* Label */}
                <div className="text-sm text-gray-400">{metric.label}</div>

                {/* Trend (subtle pulse instead of aggressive blink) */}
                <div className="mt-3 text-xs text-cyber-blue flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyber-blue/80 animate-pulse" aria-hidden="true"></span>
                  <span>↗ +12.5% this week</span>
                </div>
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyber-blue/10 blur-2xl rounded-full"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Chart Section */}
        <motion.div
          className="card-glass p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-bold mb-8 text-white">Lead Generation Trend</h3>
          {/* Analysis header: sparkline + summary metrics */}
          <div className="flex items-center justify-between gap-6 mb-6">
            <div className="flex-1">
              <Sparkline data={chartData.map(d => d.value)} />
            </div>
            <div className="w-56 flex flex-col gap-2">
              <Metric label="Average" value={Math.round(chartData.reduce((s, d) => s + d.value, 0) / chartData.length)} />
              <Metric label="Max" value={Math.max(...chartData.map(d => d.value))} />
              <Metric label="Change" value={Math.round(((chartData[chartData.length - 1].value - chartData[0].value) / chartData[0].value) * 100)} suffix="%" />
            </div>
          </div>

          {/* Bar Chart */}
          <div className="flex items-end justify-around h-64 gap-4">
            {chartData.map((data, idx) => {
              const maxValue = Math.max(...chartData.map(d => d.value))
              const height = (data.value / maxValue) * 100

              return (
                <motion.div
                  key={idx}
                  className="flex-1 flex flex-col items-center"
                  initial={{ height: 0 }}
                  animate={inView ? { height: '100%' } : { height: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1, duration: 0.8 }}
                >
                  {/* Bar */}
                  <motion.div
                    className="w-full bg-gradient-to-t from-cyber-blue to-cyber-purple rounded-t-lg relative"
                    style={{ height: `${height}%` }}
                    whileHover={{ scaleY: 1.05 }}
                  >
                    {/* Glow */}
                    <div className="absolute inset-0 bg-cyber-blue/20 blur-lg rounded-t-lg pointer-events-none"></div>
                  </motion.div>

                  {/* Label */}
                  <div className="mt-4 text-sm text-gray-400">{data.week}</div>
                  <div className="text-sm font-bold text-cyber-blue">{data.value.toLocaleString()}</div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Sparkline({ data }: { data: number[] }) {
  const width = 300
  const height = 60
  const padding = 6
  const max = Math.max(...data)
  const min = Math.min(...data)
  const points = data.map((v, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2)
    const y = padding + (1 - (v - min) / (max - min || 1)) * (height - padding * 2)
    return [x, y]
  })

  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ')
  const areaPath = `${path} L ${width - padding} ${height - padding} L ${padding} ${height - padding} Z`

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} className="rounded-lg">
      <defs>
        <linearGradient id="spark-grad" x1="0" x2="1">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#8a2be2" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#spark-grad)" opacity="0.12" />
      <path d={path} fill="none" stroke="url(#spark-grad)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r={i === points.length - 1 ? 3.5 : 2} fill={i === points.length - 1 ? '#00d4ff' : '#fff'} opacity={i === points.length - 1 ? 1 : 0.9} />
      ))}
    </svg>
  )
}

function Metric({ label, value, suffix }: { label: string; value: number; suffix?: string }) {
  return (
    <div className="flex items-center justify-between bg-cyber-dark/40 p-3 rounded-lg">
      <div className="text-xs text-gray-400">{label}</div>
      <div className="text-sm font-bold text-white">{value.toLocaleString()}{suffix ? suffix : ''}</div>
    </div>
  )
}
