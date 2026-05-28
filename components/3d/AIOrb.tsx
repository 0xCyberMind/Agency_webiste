'use client'

import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

export default function AIOrb() {
  const meshRef = useRef<THREE.Mesh>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [distortion, setDistortion] = useState(0)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = -(event.clientY / window.innerHeight) * 2 + 1
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Audio reactive distortion
  useEffect(() => {
    const AudioContextConstructor = window.AudioContext ?? (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext

    if (!AudioContextConstructor) {
      return
    }

    audioContextRef.current = new AudioContextConstructor()
    let animationId = 0

    const animate = () => {
      const audioContext = audioContextRef.current
      const time = audioContext?.currentTime ?? performance.now() / 1000

      setDistortion((Math.sin(time * 3.5) + 1) / 2)
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)

      const audioContext = audioContextRef.current
      audioContextRef.current = null

      if (audioContext && audioContext.state !== 'closed') {
        void audioContext.close().catch(() => {})
      }
    }
  }, [])

  useFrame(() => {
    if (meshRef.current) {
      // Rotate orb
      meshRef.current.rotation.x += 0.001
      meshRef.current.rotation.y += 0.002
      meshRef.current.rotation.z += 0.0005

      // React to mouse movement
      meshRef.current.position.x = mousePosition.x * 0.5
      meshRef.current.position.y = mousePosition.y * 0.5
    }
  })

  return (
    <group>
      {/* Main glowing orb */}
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.5}>
        <MeshDistortMaterial
          color="#00d4ff"
          distort={0.3 + distortion * 0.2}
          speed={4}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>

      {/* Outer shell */}
      <Sphere args={[1.55, 64, 64]} scale={1.5}>
        <meshStandardMaterial
          color="#a78bfa"
          transparent
          opacity={0.2}
          wireframe={true}
          emissive="#00d4ff"
          emissiveIntensity={0.3}
        />
      </Sphere>

      {/* Particle rings */}
      <group rotation={[Math.PI / 4, 0, 0]}>
        <Sphere args={[1.7, 32, 8]} scale={1.5}>
          <meshStandardMaterial
            color="#ec4899"
            transparent
            opacity={0.1}
            wireframe={true}
            emissive="#ec4899"
            emissiveIntensity={0.5}
          />
        </Sphere>
      </group>

      {/* Lighting */}
      <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
      <pointLight position={[-10, -10, 10]} intensity={0.5} color="#a78bfa" />
      <pointLight position={[0, 0, 5]} intensity={1} color="#ec4899" />
      <ambientLight intensity={0.3} />
    </group>
  )
}
