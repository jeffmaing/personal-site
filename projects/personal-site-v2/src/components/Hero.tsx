import { siteConfig } from '../site-config'
import ParticleBackground from './ParticleBackground'
import LazyImage from './LazyImage'

export default function Hero() {
  const { hero } = siteConfig

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 'clamp(120px, 15vh, 200px) 24px 120px',
      background: '#f7f8fc',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Particle background */}
      <ParticleBackground />

      {/* Subtle radial glow */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '900px',
        height: '900px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(82,183,136,0.06) 0%, rgba(91,125,177,0.04) 40%, transparent 70%)',
        pointerEvents: 'none',
      }}>

        {/* Skip link for accessibility */}
        <a href="#main-content" className="skip-to-content">
          跳转到主要内容
        </a>
      </div>

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '900px' }}>
        {/* Profile photo — bigger, with elegant border */}
        <div style={{
          width: 'clamp(140px, 20vw, 200px)',
          height: 'clamp(140px, 20vw, 200px)',
          borderRadius: '50%',
          margin: '0 auto 40px',
          padding: '4px',
          background: 'var(--accent-gradient)',
          boxShadow: 'var(--shadow-lg)',
        }}>
          <LazyImage
            src="/personal-site-v2/profile.png"
            alt="麻明"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '4px solid var(--bg-primary)',
            }}
          />
        </div>

        {/* Main headline — cleaner hierarchy */}
        <h1 style={{
          fontSize: 'clamp(42px, 10vw, 108px)',
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: '-0.04em',
          color: 'var(--text-primary)',
          marginBottom: '24px',
        }}>
          {hero.headline}
        </h1>

        {/* Subtitle — static, no typewriter */}
        <p style={{
          fontSize: 'clamp(20px, 4vw, 40px)',
          fontWeight: 500,
          lineHeight: 1.3,
          color: 'var(--accent-primary)',
          marginBottom: '48px',
          maxWidth: '680px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          {hero.headline2}
        </p>

        {/* Meta badge */}
        <div style={{
          display: 'inline-block',
          padding: '12px 28px',
          border: '1px solid var(--border-subtle)',
          borderRadius: '100px',
          fontSize: 'clamp(13px, 1.5vw, 15px)',
          color: 'var(--text-secondary)',
          letterSpacing: '0.03em',
          marginBottom: '56px',
          background: 'rgba(255,255,255,0.5)',
          backdropFilter: 'blur(8px)',
        }}>
          {hero.meta}
        </div>

        {/* CTA Buttons */}
        <div style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '48px',
        }}>
          {/* Primary CTA */}
          <a
            href="#arsenal"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '16px 32px',
              background: 'var(--accent-primary)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '100px',
              fontSize: '16px',
              fontWeight: 600,
              letterSpacing: '0.02em',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 16px rgba(91, 125, 177, 0.25)',
              border: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(91, 125, 177, 0.35)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(91, 125, 177, 0.25)'
            }}
          >
            查看我的案例
            <span style={{ fontSize: '18px' }}>↓</span>
          </a>

          {/* Secondary CTA */}
          <a
            href="#calculator"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '16px 32px',
              background: 'transparent',
              color: 'var(--accent-primary)',
              textDecoration: 'none',
              borderRadius: '100px',
              fontSize: '16px',
              fontWeight: 600,
              letterSpacing: '0.02em',
              transition: 'all 0.3s ease',
              border: '2px solid var(--accent-primary)',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--accent-primary)'
              e.currentTarget.style.color = 'white'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'var(--accent-primary)'
            }}
          >
            计算提效空间
          </a>
        </div>

        {/* Trust bar */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0 24px',
          padding: '20px 0',
        }}>
          {hero.brands.map((brand, i) => (
            <span
              key={i}
              style={{
                fontSize: '14px',
                color: 'var(--text-light)',
                fontWeight: 400,
                letterSpacing: '0.1em',
                transition: 'color 0.5s ease',
                cursor: 'default',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-light)' }}
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
