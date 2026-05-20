import { useRef, useEffect, useCallback } from 'react'

interface Particle {
  baseX: number
  baseY: number
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  opacity: number
}

const COLORS = [
  { r: 91, g: 125, b: 177 },  // #5b7db1 blue
  { r: 82, g: 183, b: 136 },   // #52b788 green
]

const PARTICLE_COUNT = 65
const CONNECT_DISTANCE = 120
const MOUSE_RADIUS = 150
const MOUSE_PULL = 8
const SPRING_STRENGTH = 0.02
const DAMPING = 0.95

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const animFrameRef = useRef<number>(0)
  const isMouseInRef = useRef(false)

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = []
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      particles.push({
        baseX: Math.random() * width,
        baseY: Math.random() * height,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        radius: Math.random() * 1.5 + 1,
        color: `rgba(${color.r},${color.g},${color.b},${(Math.random() * 0.15 + 0.15).toFixed(3)})`,
        opacity: Math.random() * 0.15 + 0.15,
      })
    }
    // Set initial positions
    particles.forEach(p => {
      p.x = p.baseX
      p.y = p.baseY
    })
    return particles
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (!rect) return
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      ctx.scale(dpr, dpr)
      particlesRef.current = initParticles(rect.width, rect.height)
    }

    resize()

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    const handleMouseLeave = () => {
      isMouseInRef.current = false
      mouseRef.current = { x: -9999, y: -9999 }
    }

    const handleMouseEnter = () => {
      isMouseInRef.current = true
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)
    canvas.addEventListener('mouseenter', handleMouseEnter)

    const animate = () => {
      const w = canvas.width / dpr
      const h = canvas.height / dpr
      ctx.clearRect(0, 0, w, h)

      const particles = particlesRef.current
      const mouse = mouseRef.current
      const isMouseIn = isMouseInRef.current

      // Update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Spring back to base position
        const dx = p.baseX - p.x
        const dy = p.baseY - p.y
        p.vx += dx * SPRING_STRENGTH
        p.vy += dy * SPRING_STRENGTH

        // Mouse attraction
        if (isMouseIn) {
          const mx = mouse.x - p.x
          const my = mouse.y - p.y
          const dist = Math.sqrt(mx * mx + my * my)
          if (dist < MOUSE_RADIUS && dist > 1) {
            const force = (1 - dist / MOUSE_RADIUS) * MOUSE_PULL
            p.vx += (mx / dist) * force * 0.08
            p.vy += (my / dist) * force * 0.08
          }
        }

        // Damping
        p.vx *= DAMPING
        p.vy *= DAMPING

        // Update position
        p.x += p.vx
        p.y += p.vy
      }

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < CONNECT_DISTANCE) {
            const opacity = (1 - dist / CONNECT_DISTANCE) * 0.08
            ctx.beginPath()
            ctx.strokeStyle = `rgba(91,125,177,${opacity.toFixed(4)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
      }

      animFrameRef.current = requestAnimationFrame(animate)
    }

    animFrameRef.current = requestAnimationFrame(animate)

    const handleResize = () => {
      cancelAnimationFrame(animFrameRef.current)
      resize()
      animFrameRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      canvas.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('resize', handleResize)
    }
  }, [initParticles])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'auto',
      }}
    />
  )
}
