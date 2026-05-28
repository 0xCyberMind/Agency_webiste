'use client'

import { useEffect, useRef } from 'react'

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Particle system
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      color: string
      life: number
    }> = []

    const particleCount = 50

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        color: `hsl(${200 + Math.random() * 60}, 100%, 50%)`,
        life: 1,
      })
    }

    let mouseX = canvas.width / 2
    let mouseY = canvas.height / 2

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    })

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, 'rgba(10, 14, 39, 0)')
      gradient.addColorStop(0.5, 'rgba(0, 212, 255, 0.02)')
      gradient.addColorStop(1, 'rgba(167, 139, 250, 0.02)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle, idx) => {
        // Mouse repulsion
        const dx = particle.x - mouseX
        const dy = particle.y - mouseY
        const distance = Math.sqrt(dx * dx + dy * dy)
        const minDistance = 150

        if (distance < minDistance) {
          const angle = Math.atan2(dy, dx)
          particle.vx += Math.cos(angle) * 0.3
          particle.vy += Math.sin(angle) * 0.3
        }

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Damping
        particle.vx *= 0.99
        particle.vy *= 0.99

        // Bounce off walls
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Keep in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        particle.y = Math.max(0, Math.min(canvas.height, particle.y))

        // Decay life
        particle.life *= 0.9995

        // Draw particle
        ctx.globalAlpha = particle.life * 0.6
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        // Reset if dead
        if (particle.life < 0.1) {
          particles[idx] = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            color: `hsl(${200 + Math.random() * 60}, 100%, 50%)`,
            life: 1,
          }
        }
      })

      ctx.globalAlpha = 1

      // Draw connections
      particles.forEach((particle, idx) => {
        for (let i = idx + 1; i < particles.length; i++) {
          const other = particles[i]
          const dx = particle.x - other.x
          const dy = particle.y - other.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.2 * (1 - distance / 150)})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)
            ctx.stroke()
          }
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  )
}
