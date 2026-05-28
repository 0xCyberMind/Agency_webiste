'use client'

import { useEffect, useRef } from 'react'

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let mouseX = 0
    let mouseY = 0
    let mouseIsMoving = false
    let mouseMovingTimer: NodeJS.Timeout

    const trail: Array<{
      x: number
      y: number
      age: number
      life: number
    }> = []

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      mouseIsMoving = true

      // Add trail particle
      if (Math.random() > 0.5) {
        trail.push({
          x: mouseX,
          y: mouseY,
          age: 0,
          life: 1,
        })
      }

      // Reset timer
      clearTimeout(mouseMovingTimer)
      mouseMovingTimer = setTimeout(() => {
        mouseIsMoving = false
      }, 100)
    })

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw trail
      for (let i = trail.length - 1; i >= 0; i--) {
        const particle = trail[i]
        particle.age += 0.05
        particle.life = Math.max(0, 1 - particle.age)

        // Draw particle
        ctx.globalAlpha = particle.life * 0.6
        ctx.fillStyle = `hsl(190, 100%, 50%)`
        ctx.shadowColor = `rgba(0, 212, 255, ${particle.life})`
        ctx.shadowBlur = 10
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, 4 * particle.life, 0, Math.PI * 2)
        ctx.fill()

        // Remove dead particles
        if (particle.life <= 0) {
          trail.splice(i, 1)
        }
      }

      ctx.globalAlpha = 1
      ctx.shadowColor = 'transparent'

      // Draw cursor orb
      if (mouseIsMoving) {
        ctx.fillStyle = 'rgba(0, 212, 255, 0.8)'
        ctx.shadowColor = 'rgba(0, 212, 255, 0.8)'
        ctx.shadowBlur = 15
        ctx.beginPath()
        ctx.arc(mouseX, mouseY, 6, 0, Math.PI * 2)
        ctx.fill()

        // Outer ring
        ctx.strokeStyle = 'rgba(0, 212, 255, 0.5)'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(mouseX, mouseY, 12, 0, Math.PI * 2)
        ctx.stroke()
      }

      ctx.shadowColor = 'transparent'
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
      className="fixed inset-0 pointer-events-none z-40"
      style={{ cursor: 'none' }}
    />
  )
}
