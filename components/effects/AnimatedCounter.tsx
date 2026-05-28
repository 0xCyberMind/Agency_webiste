'use client'

import { useState, useEffect } from 'react'

interface AnimatedCounterProps {
  value: number
  duration?: number
}

export default function AnimatedCounter({ value, duration = 2000 }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let startTime: number | null = null
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (startTime === null) {
        startTime = currentTime
      }

      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const currentValue = Math.floor(value * progress)

      setDisplayValue(currentValue)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [value, duration])

  return <>{displayValue.toLocaleString()}</>
}
