import { siteConfig } from '../site-config'

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
      }} />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '900px' }}>
        {/* Profile photo — bigger, with elegant border */}
        <div style={{
          width: 'clamp(140px, 20vw, 200px)',
          height: 'clamp(140px, 20vw, 200px)',
          borderRadius: '50%',
          margin: '0 auto 40px',
          padding: '4px',
          background: 'linear-gradient(135deg, #52b788, #5b7db1)',
          boxShadow: '0 12px 40px rgba(82,183,136,0.15), 0 4px 16px rgba(91,125,177,0.1)',
        }}>
          <img
            src="/personal-site-v2/profile.png"
            alt="麻明"
            loading="lazy"
            decoding="async"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '4px solid #f7f8fc',
            }}
          />
        </div>

        {/* Main headline — cleaner hierarchy */}
        <h1 style={{
          fontSize: 'clamp(42px, 10vw, 108px)',
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: '-0.04em',
          color: '#1e2a3a',
          marginBottom: '24px',
        }}>
          {hero.headline}
        </h1>

        {/* Subtitle — static, no typewriter */}
        <p style={{
          fontSize: 'clamp(20px, 4vw, 40px)',
          fontWeight: 500,
          lineHeight: 1.3,
          color: '#5b7db1',
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
          border: '1px solid rgba(0,0,0,0.06)',
          borderRadius: '100px',
          fontSize: 'clamp(13px, 1.5vw, 15px)',
          color: '#6b7a8d',
          letterSpacing: '0.03em',
          marginBottom: '56px',
          background: 'rgba(255,255,255,0.5)',
          backdropFilter: 'blur(8px)',
        }}>
          {hero.meta}
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
                color: '#b0b8c4',
                fontWeight: 400,
                letterSpacing: '0.1em',
                transition: 'color 0.5s ease',
                cursor: 'default',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#1e2a3a' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#b0b8c4' }}
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
