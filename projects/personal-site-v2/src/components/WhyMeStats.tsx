import { useState, useEffect } from 'react'
import { useInView, useWidth } from '../hooks/useAnimatedNumber'
import CareerTimeline from './CareerTimeline'

export default function WhyMeStats() {
  const [ref, visible] = useInView(0.15)
  const w = useWidth()
  const isMobile = w < 768

  return (
    <div
      ref={ref}
      style={{
        marginTop: isMobile ? '40px' : '64px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(20px)',
        transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
      }}
    >
      {/* Section label */}
      <div style={{
        fontSize: '11px',
        color: '#bbb',
        letterSpacing: '0.2em',
        marginBottom: isMobile ? '24px' : '32px',
      }}>
        核心优势
      </div>

      {/* Hero metric — 2天→10分钟 as visual center */}
      <div style={{
        background: 'linear-gradient(135deg, #52b788 0%, #5b7db1 100%)',
        borderRadius: '20px',
        padding: isMobile ? '40px 24px' : '56px 40px',
        textAlign: 'center',
        marginBottom: isMobile ? '32px' : '48px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Subtle pattern overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            fontSize: 'clamp(14px, 2vw, 16px)',
            color: 'rgba(255,255,255,0.8)',
            letterSpacing: '0.05em',
            marginBottom: '16px',
          }}>
            单店诊断效率
          </div>

          <div style={{
            fontSize: 'clamp(56px, 12vw, 120px)',
            fontWeight: 800,
            color: '#fff',
            lineHeight: 1,
            letterSpacing: '-0.04em',
          }}>
            <AnimatedHeroNumber visible={visible} />
          </div>

          <div style={{
            fontSize: 'clamp(16px, 2.5vw, 20px)',
            color: 'rgba(255,255,255,0.9)',
            marginTop: '12px',
            fontWeight: 400,
          }}>
            过去需要 2 天，现在只需 10 分钟
          </div>
        </div>
      </div>

      {/* Supporting stats — 3 columns */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
        gap: isMobile ? '16px' : '24px',
        marginBottom: isMobile ? '32px' : '48px',
      }}>
        <SupportingStat value={19} suffix="年" label="汽车行业深耕" visible={visible} delay={0.2} />
        <SupportingStat value={1000} suffix="+" label="累计服务店次" visible={visible} delay={0.3} />
        <SupportingStat value={5} suffix="个" label="头部豪华品牌" visible={visible} delay={0.4} />
      </div>

      {/* Career timeline */}
      <CareerTimeline />
    </div>
  )
}

function AnimatedHeroNumber({ visible }: { visible: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!visible) return
    const duration = 1500
    const startTime = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * 10))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [visible])

  return <>{count} 分钟</>
}

function SupportingStat({
  value, suffix, label, visible, delay,
}: {
  value: number; suffix: string; label: string; visible: boolean; delay: number;
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!visible) return
    const duration = 2000
    const startTime = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * value))
      if (progress < 1) requestAnimationFrame(animate)
    }
    const timer = setTimeout(() => requestAnimationFrame(animate), delay * 1000)
    return () => clearTimeout(timer)
  }, [visible, value, delay])

  return (
    <div style={{
      background: '#fff',
      borderRadius: '16px',
      padding: '28px 20px',
      textAlign: 'center',
      border: '1px solid rgba(0,0,0,0.04)',
      boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
    }}>
      <div style={{
        fontSize: 'clamp(32px, 5vw, 48px)',
        fontWeight: 800,
        color: '#1e2a3a',
        lineHeight: 1.1,
        letterSpacing: '-0.03em',
        marginBottom: '8px',
      }}>
        {count}{suffix}
      </div>
      <div style={{
        fontSize: '13px',
        color: '#999',
        letterSpacing: '0.03em',
      }}>
        {label}
      </div>
    </div>
  )
}
