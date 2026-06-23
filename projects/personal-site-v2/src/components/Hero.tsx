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
        padding: isMobile
          ? 'clamp(120px, 18vh, 180px) var(--space-sm) var(--space-2xl)'
          : 'clamp(160px, 20vh, 240px) var(--space-md) clamp(120px, 15vw, 160px)',
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
          maxWidth: 'var(--content-max)',
          width: '100%',
          textAlign: 'center',
        }}
      >
        {/* Eyebrow — tertiary, muted */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--space-xs)',
            padding: '6px 14px',
            borderRadius: '999px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            fontSize: 'var(--font-caption)',
            color: 'var(--text-secondary)',
            letterSpacing: 'var(--ls-loose)',
            marginBottom: 'var(--space-lg)',
            fontFamily: 'var(--font-body)',
            opacity: visible ? 0.7 : 0,
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

        {/* H1 — dominant focal point */}
        <h1
          style={{
            fontSize: isMobile ? 'clamp(36px, 9vw, 48px)' : 'var(--font-h1)',
            fontWeight: 'var(--weight-bold)',
            lineHeight: 'var(--lh-tight)',
            letterSpacing: 'var(--ls-heading)',
            color: 'var(--text-primary)',
            marginBottom: 'var(--space-lg)',
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

        {/* Subtitle — secondary, 0.7 opacity */}
        <p
          style={{
            fontSize: isMobile ? 'var(--font-body)' : 'clamp(17px, 1.8vw, 20px)',
            fontWeight: 'var(--weight-regular)',
            lineHeight: 'var(--lh-loose)',
            color: 'var(--text-secondary)',
            marginBottom: 'var(--space-xl)',
            maxWidth: '640px',
            marginLeft: 'auto',
            marginRight: 'auto',
            fontFamily: 'var(--font-body)',
            opacity: visible ? 0.7 : 0,
            transform: visible ? 'none' : 'translateY(16px)',
            transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
          }}
        >
          {hero.subtitle}
        </p>

        {/* CTA buttons — primary prominent, secondary subtle */}
        <div
          style={{
            display: 'flex',
            gap: 'var(--space-sm)',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: 'var(--space-2xl)',
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

        {/* Stats — tertiary, small, spaced */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(3, minmax(0, 200px))',
            gap: isMobile ? 'var(--space-xs)' : 'var(--space-lg)',
            justifyContent: 'center',
            padding: 'var(--space-lg) 0',
            borderTop: '1px solid var(--border-subtle)',
            borderBottom: '1px solid var(--border-subtle)',
            marginBottom: 'var(--space-xl)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s',
          }}
        >
          {hero.stats.map((stat, i) => (
            <HeroStat key={i} {...stat} delay={500 + i * 120} />
          ))}
        </div>

        {/* Brand bar — tertiary */}
        <div
          style={{
            opacity: visible ? 0.6 : 0,
            transition: 'opacity 0.8s ease 0.6s',
          }}
        >
          <div
            style={{
              fontSize: 'var(--font-small)',
              color: 'var(--text-light)',
              letterSpacing: '0.18em',
              marginBottom: 'var(--space-sm)',
              fontFamily: 'var(--font-heading)',
              textTransform: 'uppercase',
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
              gap: isMobile ? 'var(--space-xs) var(--space-sm)' : '0 var(--space-xl)',
            }}
          >
            {hero.brands.map((brand, i) => (
              <span
                key={i}
                style={{
                  fontSize: 'var(--font-caption)',
                  color: 'var(--text-light)',
                  fontWeight: 'var(--weight-medium)',
                  letterSpacing: 'var(--ls-loose)',
                  transition: 'color 0.2s ease',
                  cursor: 'default',
                  fontFamily: 'var(--font-body)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--text-secondary)'
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
              fontSize: 'var(--font-small)',
              color: 'var(--text-light)',
              marginTop: 'var(--space-sm)',
              fontStyle: 'normal',
              fontFamily: 'var(--font-body)',
              opacity: 0.7,
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
        gap: 'var(--space-xs)',
        padding: '14px 28px',
        background: isPrimary ? 'var(--accent-primary)' : 'transparent',
        color: isPrimary ? 'white' : 'var(--accent-primary)',
        textDecoration: 'none',
        borderRadius: 'var(--radius-sm)',
        fontSize: '15px',
        fontWeight: 'var(--weight-medium)',
        letterSpacing: 'var(--ls-loose)',
        transition: 'all 0.2s ease',
        boxShadow: isPrimary ? 'var(--shadow-sm)' : 'none',
        border: isPrimary ? 'none' : '1px solid var(--accent-primary)',
        cursor: 'pointer',
        fontFamily: 'var(--font-body)',
      }}
      onMouseEnter={e => {
        if (isPrimary) {
          e.currentTarget.style.background = '#4a6a9e'
          e.currentTarget.style.boxShadow = 'var(--shadow-md)'
        } else {
          e.currentTarget.style.background = 'var(--accent-primary)'
          e.currentTarget.style.color = 'white'
        }
      }}
      onMouseLeave={e => {
        if (isPrimary) {
          e.currentTarget.style.background = 'var(--accent-primary)'
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
          fontSize: 'clamp(24px, 4vw, 32px)',
          fontWeight: 'var(--weight-bold)',
          color: 'var(--text-primary)',
          lineHeight: 1,
          letterSpacing: 'var(--ls-tight)',
          fontFamily: 'var(--font-heading)',
        }}
      >
        {animated}
        <span style={{ color: 'var(--accent-primary)' }}>{suffix}</span>
      </div>
      <div
        style={{
          fontSize: 'var(--font-small)',
          color: 'var(--text-light)',
          marginTop: 'var(--space-xs)',
          letterSpacing: 'var(--ls-loose)',
          fontFamily: 'var(--font-body)',
          opacity: 0.7,
        }}
      >
        {label}
      </div>
    </div>
  )
}
