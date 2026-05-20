import { useAnimatedNumber, useInView, useWidth } from '../hooks/useAnimatedNumber'
import CareerTimeline from './CareerTimeline'

export default function WhyMeStats() {
  const [ref, visible] = useInView(0.15)
  const w = useWidth()
  const isMobile = w < 768

  // Hero number: "10" (minutes)
  const heroNum = useAnimatedNumber(10, { duration: 1500, delay: 200 })

  // Supporting stats
  const stat1 = useAnimatedNumber(19, { duration: 1200, delay: 200 })   // 19 年
  const stat2 = useAnimatedNumber(1000, { duration: 1500, delay: 300 })  // 1000+
  const stat3 = useAnimatedNumber(5, { duration: 1000, delay: 400 })     // 5 个

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
      <div
        ref={heroNum.ref}
        style={{
          background: 'linear-gradient(135deg, #52b788 0%, #5b7db1 100%)',
          borderRadius: '20px',
          padding: isMobile ? '40px 24px' : '56px 40px',
          textAlign: 'center',
          marginBottom: isMobile ? '32px' : '48px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
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
            {heroNum.value} 分钟
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
        <SupportingStat ref={stat1.ref} value={stat1.value} suffix="年" label="汽车行业深耕" />
        <SupportingStat ref={stat2.ref} value={stat2.value} suffix="+" label="累计服务店次" />
        <SupportingStat ref={stat3.ref} value={stat3.value} suffix="个" label="头部豪华品牌" />
      </div>

      {/* Career timeline */}
      <CareerTimeline />
    </div>
  )
}

function SupportingStat({
  ref, value, suffix, label,
}: {
  ref: React.RefObject<HTMLDivElement | null>
  value: number
  suffix: string
  label: string
}) {
  return (
    <div
      ref={ref}
      style={{
        background: '#fff',
        borderRadius: '16px',
        padding: '28px 20px',
        textAlign: 'center',
        border: '1px solid rgba(0,0,0,0.04)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
      }}
    >
      <div style={{
        fontSize: 'clamp(32px, 5vw, 48px)',
        fontWeight: 800,
        color: '#1e2a3a',
        lineHeight: 1.1,
        letterSpacing: '-0.03em',
        marginBottom: '8px',
      }}>
        {value}{suffix}
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
