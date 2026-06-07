import { siteConfig } from '../site-config'
import WhyMeStats from './WhyMeStats'
import { useInView, useWidth } from '../hooks/useAnimatedNumber'
import LazyImage from './LazyImage'

export default function Story() {
  const { story } = siteConfig
  const [ref, visible] = useInView(0.15)
  const w = useWidth()
  const isMobile = w < 768

  return (
    <section
      id="story"
      ref={ref}
      style={{
        padding: isMobile ? '80px 24px' : 'clamp(80px, 12vw, 160px) 60px',
        background: 'var(--bg-tertiary)',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{
        maxWidth: '1100px',
        width: '100%',
        display: 'flex',
        gap: isMobile ? '48px' : '80px',
        alignItems: 'center',
        flexDirection: isMobile ? 'column' : 'row',
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(30px)',
        transition: 'opacity 1s ease, transform 1s ease',
      }}>
        {/* Left: Clean prose text */}
        <div style={{
          flex: isMobile ? 'none' : '65%',
          width: isMobile ? '100%' : 'auto',
        }}>
          {/* Section label */}
          <div className="section-label" style={{ marginBottom: '40px' }}>
            01 — 关于我
          </div>

          {story.paragraphs.map((p, i) => (
            <p
              key={i}
              style={{
                fontSize: isMobile ? 'clamp(16px, 4vw, 20px)' : 'clamp(18px, 2vw, 20px)',
                lineHeight: 1.8,
                color: 'var(--text-secondary)',
                fontWeight: 400,
                marginBottom: '24px',
                fontFamily: 'var(--font-body)',
                transition: `opacity 0.8s ease ${i * 0.1}s`,
                ...(p.highlight ? {
                  background: 'var(--bg-dark)',
                  color: 'var(--text-white)',
                  padding: '20px 24px',
                  borderRadius: 'var(--radius-lg)',
                  fontWeight: 400,
                  marginBottom: '32px',
                } : {}),
              }}
            >
              {p.text}
            </p>
          ))}

          {/* Decorative line */}
          <div style={{
            width: '60px',
            height: '2px',
            background: 'var(--accent-primary)',
            marginTop: '40px',
            borderRadius: '1px',
            opacity: 0.4,
          }} />

          {/* Animated stats + career timeline */}
          <WhyMeStats />
        </div>

        {/* Right: Photo */}
        <div style={{
          flex: isMobile ? 'none' : '35%',
          width: isMobile ? '100%' : 'auto',
          maxWidth: isMobile ? '280px' : '320px',
          margin: isMobile ? '0 auto' : '0',
        }}>
          <LazyImage
            src={story.photoSrc}
            alt="麻明"
            aspectRatio="3/4"
            style={{
              width: '100%',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-md)',
              objectFit: 'cover',
              display: 'block',
              border: '1px solid var(--border-subtle)',
            }}
          />
          {/* Caption */}
          <div style={{
            marginTop: '12px',
            fontSize: '11px',
            color: 'var(--text-light)',
            textAlign: 'center',
            letterSpacing: '0.08em',
            fontFamily: 'var(--font-body)',
          }}>
            麻明 · 北京 · 2026
          </div>
        </div>
      </div>
    </section>
  )
}
