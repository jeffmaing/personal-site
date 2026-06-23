import { siteConfig } from '../site-config'
import { useAnimatedNumber, useInView, useWidth } from '../hooks/useAnimatedNumber'

export default function Hero() {
  const { hero } = siteConfig
  const w = useWidth()
  const isMobile = w < 768
  const [ref, visible] = useInView(0.1)

  return (
    <section
      id="top"
      ref={ref}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: isMobile ? '120px 24px 80px' : 'clamp(140px, 18vh, 200px) 24px 120px',
        background: 'var(--bg-primary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <a href="#main-content" className="skip-to-content">
        跳转到主要内容
      </a>

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '960px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        {/* Eyebrow — narrow, professional */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '999px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            fontSize: '12px',
            color: 'var(--text-secondary)',
            letterSpacing: '0.04em',
            marginBottom: isMobile ? '24px' : '32px',
            fontFamily: 'var(--font-body)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(8px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'var(--accent-secondary)',
              display: 'inline-block',
            }}
          />
          {hero.eyebrow}
        </div>

        {/* Main headline — value proposition, not "I am" */}
        <h1
          style={{
            fontSize: isMobile ? 'clamp(32px, 8vw, 44px)' : 'clamp(40px, 6vw, 64px)',
            fontWeight: 300,
            lineHeight: 1.12,
            letterSpacing: '-0.025em',
            color: 'var(--text-primary)',
            marginBottom: isMobile ? '20px' : '24px',
            fontFamily: 'var(--font-heading)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s',
          }}
        >
          {hero.headline.split('，').map((line, i, arr) => (
            <span key={i}>
              {line}
              {i < arr.length - 1 ? '，' : ''}
            </span>
          ))}
        </h1>

        {/* Subtitle — who it's for */}
        <p
          style={{
            fontSize: isMobile ? '16px' : 'clamp(17px, 1.8vw, 20px)',
            fontWeight: 400,
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
            marginBottom: isMobile ? '32px' : '40px',
            maxWidth: '680px',
            marginLeft: 'auto',
            marginRight: 'auto',
            fontFamily: 'var(--font-body)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(16px)',
            transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
          }}
        >
          {hero.subtitle}
        </p>

        {/* CTA buttons */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: isMobile ? '40px' : '56px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(16px)',
            transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s',
          }}
        >
          <CTAButton
            href={hero.primaryCta.href}
            variant="primary"
            label={hero.primaryCta.label}
            icon="↓"
          />
          <CTAButton
            href={hero.secondaryCta.href}
            variant="secondary"
            label={hero.secondaryCta.label}
          />
        </div>

        {/* Social proof — 3 stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(3, minmax(0, 200px))',
            gap: isMobile ? '8px' : '24px',
            justifyContent: 'center',
            padding: isMobile ? '20px 0' : '28px 0',
            borderTop: '1px solid var(--border-subtle)',
            borderBottom: '1px solid var(--border-subtle)',
            marginBottom: isMobile ? '24px' : '32px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s',
          }}
        >
          {hero.stats.map((stat, i) => (
            <HeroStat key={i} {...stat} delay={500 + i * 120} />
          ))}
        </div>

        {/* Brand bar */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.8s ease 0.6s',
          }}
        >
          <div
            style={{
              fontSize: '11px',
              color: 'var(--text-light)',
              letterSpacing: '0.18em',
              marginBottom: '12px',
              fontFamily: 'var(--font-heading)',
            }}
          >
            服务过的品牌
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: isMobile ? '8px 16px' : '0 28px',
            }}
          >
            {hero.brands.map((brand, i) => (
              <span
                key={i}
                style={{
                  fontSize: '13px',
                  color: 'var(--text-light)',
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  transition: 'color 0.3s ease',
                  cursor: 'default',
                  fontFamily: 'var(--font-body)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--text-primary)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'var(--text-light)'
                }}
              >
                {brand}
              </span>
            ))}
          </div>
          <div
            style={{
              fontSize: '11px',
              color: 'var(--text-light)',
              marginTop: '14px',
              fontStyle: 'normal',
              fontFamily: 'var(--font-body)',
            }}
          >
            {hero.footnote}
          </div>
        </div>
      </div>
    </section>
  )
}

function CTAButton({
  href,
  variant,
  label,
  icon,
}: {
  href: string
  variant: 'primary' | 'secondary'
  label: string
  icon?: string
}) {
  const isPrimary = variant === 'primary'
  return (
    <a
      href={href}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '14px 28px',
        background: isPrimary ? 'var(--accent-primary)' : 'transparent',
        color: isPrimary ? 'white' : 'var(--accent-primary)',
        textDecoration: 'none',
        borderRadius: 'var(--radius-lg)',
        fontSize: '15px',
        fontWeight: 500,
        letterSpacing: '0.02em',
        transition: 'all 0.2s ease',
        boxShadow: isPrimary ? 'var(--shadow-sm)' : 'none',
        border: isPrimary ? 'none' : '1px solid var(--accent-primary)',
        cursor: 'pointer',
        fontFamily: 'var(--font-body)',
      }}
      onMouseEnter={e => {
        if (isPrimary) {
          e.currentTarget.style.transform = 'translateY(-1px)'
          e.currentTarget.style.boxShadow = 'var(--shadow-md)'
        } else {
          e.currentTarget.style.background = 'var(--accent-primary)'
          e.currentTarget.style.color = 'white'
        }
      }}
      onMouseLeave={e => {
        if (isPrimary) {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
        } else {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.color = 'var(--accent-primary)'
        }
      }}
    >
      {label}
      {icon && <span style={{ fontSize: '14px' }}>{icon}</span>}
    </a>
  )
}

function HeroStat({
  value,
  suffix,
  label,
  delay,
}: {
  value: number
  suffix: string
  label: string
  delay: number
}) {
  const { ref, value: animated } = useAnimatedNumber(value, {
    duration: 1400,
    delay,
    threshold: 0.2,
  })
  return (
    <div ref={ref}>
      <div
        style={{
          fontSize: 'clamp(24px, 4vw, 36px)',
          fontWeight: 700,
          color: 'var(--text-primary)',
          lineHeight: 1,
          letterSpacing: '-0.02em',
          fontFamily: 'var(--font-heading)',
        }}
      >
        {animated}
        <span style={{ color: 'var(--accent-primary)' }}>{suffix}</span>
      </div>
      <div
        style={{
          fontSize: '11px',
          color: 'var(--text-light)',
          marginTop: '6px',
          letterSpacing: '0.04em',
          fontFamily: 'var(--font-body)',
        }}
      >
        {label}
      </div>
    </div>
  )
}
