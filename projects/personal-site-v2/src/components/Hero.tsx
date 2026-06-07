import { siteConfig } from '../site-config'
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
      background: 'var(--bg-primary)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-to-content">
        跳转到主要内容
      </a>

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '900px' }}>
        {/* Profile photo — clean circle with subtle border */}
        <div style={{
          width: 'clamp(120px, 16vw, 160px)',
          height: 'clamp(120px, 16vw, 160px)',
          borderRadius: '50%',
          margin: '0 auto 40px',
          padding: '3px',
          background: 'var(--accent-gradient)',
          boxShadow: 'var(--shadow-md)',
        }}>
          <LazyImage
            src="/personal-site-v2/profile.png"
            alt="麻明"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '3px solid var(--bg-primary)',
            }}
          />
        </div>

        {/* Main headline — Stripe style: large, light weight, confident */}
        <h1 style={{
          fontSize: 'clamp(36px, 8vw, 56px)',
          fontWeight: 300,
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          color: 'var(--text-primary)',
          marginBottom: '24px',
          fontFamily: 'var(--font-heading)',
        }}>
          {hero.headline}
        </h1>

        {/* Subtitle — clean, medium weight */}
        <p style={{
          fontSize: 'clamp(20px, 3vw, 28px)',
          fontWeight: 400,
          lineHeight: 1.4,
          color: 'var(--accent-primary)',
          marginBottom: '40px',
          maxWidth: '680px',
          marginLeft: 'auto',
          marginRight: 'auto',
          fontFamily: 'var(--font-body)',
        }}>
          {hero.headline2}
        </p>

        {/* Meta badge — conservative styling */}
        <div style={{
          display: 'inline-block',
          padding: '8px 20px',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          fontSize: 'clamp(13px, 1.5vw, 14px)',
          color: 'var(--text-secondary)',
          letterSpacing: '0.03em',
          marginBottom: '48px',
          background: 'var(--bg-card)',
          fontFamily: 'var(--font-body)',
        }}>
          {hero.meta}
        </div>

        {/* CTA Buttons — consistent design */}
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
              padding: '14px 28px',
              background: 'var(--accent-primary)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: 'var(--radius-lg)',
              fontSize: '15px',
              fontWeight: 500,
              letterSpacing: '0.02em',
              transition: 'all 0.2s ease',
              boxShadow: 'var(--shadow-sm)',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)'
              e.currentTarget.style.boxShadow = 'var(--shadow-md)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
            }}
          >
            查看我的案例
            <span style={{ fontSize: '16px' }}>↓</span>
          </a>

          {/* Secondary CTA */}
          <a
            href="#calculator"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 28px',
              background: 'transparent',
              color: 'var(--accent-primary)',
              textDecoration: 'none',
              borderRadius: 'var(--radius-lg)',
              fontSize: '15px',
              fontWeight: 500,
              letterSpacing: '0.02em',
              transition: 'all 0.2s ease',
              border: '1px solid var(--accent-primary)',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
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
                fontSize: '13px',
                color: 'var(--text-light)',
                fontWeight: 400,
                letterSpacing: '0.1em',
                transition: 'color 0.3s ease',
                cursor: 'default',
                fontFamily: 'var(--font-body)',
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
