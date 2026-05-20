import { siteConfig } from '../site-config'
import WhyMeStats from './WhyMeStats'
import { useInView, useWidth } from '../hooks/useAnimatedNumber'

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
        background: '#fafafa',
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
        {/* Left: Magazine-style text */}
        <div style={{
          flex: isMobile ? 'none' : '65%',
          width: isMobile ? '100%' : 'auto',
        }}>
          {/* Section label */}
          <div style={{
            fontSize: '11px',
            color: '#bbb',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '40px',
          }}>
            01 — 关于我
          </div>

          {story.paragraphs.map((p, i) => (
            <p
              key={i}
              style={{
                fontSize: isMobile ? 'clamp(16px, 4vw, 20px)' : 'clamp(18px, 2vw, 22px)',
                lineHeight: p.highlight ? 1.9 : 2.0,
                color: p.highlight ? '#3d5a80' : '#555',
                fontWeight: p.highlight ? 600 : 400,
                marginBottom: '24px',
                fontFamily: p.highlight
                  ? "-apple-system, 'PingFang SC', 'Helvetica Neue', sans-serif"
                  : "Georgia, 'Noto Serif SC', 'Songti SC', serif",
                transition: `opacity 0.8s ease ${i * 0.1}s`,
                ...(p.highlight ? {
                  borderLeft: '3px solid #5b7db1',
                  paddingLeft: '16px',
                  display: 'block',
                } : {}),
              }}
            >
              {p.text}
            </p>
          ))}

          {/* Decorative line — longer, subtler */}
          <div style={{
            width: '80px',
            height: '2px',
            background: 'linear-gradient(90deg, rgba(82,183,136,0.4), rgba(91,125,177,0.3))',
            marginTop: '40px',
            borderRadius: '1px',
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
          <img
            src={story.photoSrc}
            alt="麻明"
            loading="lazy"
            decoding="async"
            style={{
              width: '100%',
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              aspectRatio: '3/4',
              objectFit: 'cover',
              display: 'block',
              border: '1px solid rgba(0,0,0,0.08)',
            }}
          />
          {/* Caption */}
          <div style={{
            marginTop: '16px',
            fontSize: '11px',
            color: '#bbb',
            textAlign: 'center',
            letterSpacing: '0.08em',
          }}>
            麻明 · 北京 · 2026
          </div>
        </div>
      </div>
    </section>
  )
}
