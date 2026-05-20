import { siteConfig } from '../site-config'
import { useInView, useWidth } from '../hooks/useAnimatedNumber'

export default function AIBoundaries() {
  const { boundaries } = siteConfig
  const [ref, visible] = useInView(0.15)
  const w = useWidth()
  const isMobile = w < 768

  return (
    <section
      id="boundaries"
      ref={ref}
      style={{
        padding: isMobile ? '80px 24px' : 'clamp(80px, 12vw, 160px) 60px',
        background: '#fafafa',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ maxWidth: '800px', width: '100%' }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '64px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(30px)',
          transition: 'opacity 1s ease, transform 1s ease',
        }}>
          <div style={{
            fontSize: '11px',
            color: '#bbb',
            letterSpacing: '0.2em',
            marginBottom: '20px',
          }}>
            03 — AI 边界
          </div>
          <h2 style={{
            fontSize: isMobile ? '28px' : 'clamp(36px, 5vw, 52px)',
            fontWeight: 800,
            color: '#1e2a3a',
            marginBottom: '16px',
            lineHeight: 1.2,
            letterSpacing: '-0.03em',
          }}>
            {boundaries.title}
          </h2>
          <p style={{
            fontSize: 'clamp(15px, 2vw, 18px)',
            color: '#888',
            lineHeight: 1.6,
          }}>
            {boundaries.subtitle}
          </p>
        </div>

        {/* Comparison — two columns, cleaner */}
        <div style={{
          display: isMobile ? 'flex' : 'grid',
          flexDirection: isMobile ? 'column' : undefined,
          gridTemplateColumns: isMobile ? undefined : '1fr 1fr',
          gap: '32px',
          marginBottom: '64px',
        }}>
          {/* Left: AI Can Do */}
          <div
            style={{
              background: '#fff',
              borderRadius: '16px',
              padding: isMobile ? '32px 28px' : '40px 36px',
              border: '1px solid rgba(0,0,0,0.06)',
              opacity: visible ? 1 : 0,
              transform: visible ? 'none' : 'translateX(-20px)',
              transition: `opacity 1s ease 0.2s, transform 1s ease 0.2s`,
            }}
          >
            <h3 style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#1e2a3a',
              marginBottom: '28px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <span style={{
                display: 'inline-block',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#52b788',
              }} />
              交给 AI
            </h3>

            {boundaries.canDo.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: '16px 0',
                  borderBottom: i < boundaries.canDo.length - 1 ? '1px solid #f0f0f0' : 'none',
                }}
              >
                <div style={{
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#333',
                  marginBottom: '4px',
                }}>
                  {item.text}
                </div>
                <div style={{
                  fontSize: '13px',
                  color: '#52b788',
                  fontWeight: 500,
                }}>
                  {item.metric}
                </div>
              </div>
            ))}
          </div>

          {/* Right: AI Cannot Do */}
          <div
            style={{
              background: '#fff',
              borderRadius: '16px',
              padding: isMobile ? '32px 28px' : '40px 36px',
              border: '1px solid rgba(0,0,0,0.06)',
              opacity: visible ? 1 : 0,
              transform: visible ? 'none' : 'translateX(20px)',
              transition: `opacity 1s ease 0.35s, transform 1s ease 0.35s`,
            }}
          >
            <h3 style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#1e2a3a',
              marginBottom: '28px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <span style={{
                display: 'inline-block',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#e07070',
              }} />
              留给自己
            </h3>

            {boundaries.cannotDo.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: '16px 0',
                  borderBottom: i < boundaries.cannotDo.length - 1 ? '1px solid #f0f0f0' : 'none',
                }}
              >
                <div style={{
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#333',
                  marginBottom: '4px',
                }}>
                  {item.text}
                </div>
                <div style={{
                  fontSize: '13px',
                  color: '#e07070',
                  fontWeight: 500,
                }}>
                  {item.metric}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quote Card */}
        <div
          style={{
            textAlign: 'center',
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(20px)',
            transition: 'opacity 1s ease 0.5s, transform 1s ease 0.5s',
          }}
        >
          <div style={{
            maxWidth: '640px',
            margin: '0 auto',
            padding: isMobile ? '32px 24px' : '48px 40px',
            background: '#ffffff',
            borderRadius: '16px',
            borderLeft: '3px solid #5b7db1',
            paddingLeft: isMobile ? '24px' : '32px',
          }}>
            <p style={{
              fontSize: isMobile ? '16px' : 'clamp(17px, 2vw, 20px)',
              color: '#1e2a3a',
              lineHeight: 1.8,
              whiteSpace: 'pre-wrap',
              fontWeight: 400,
              marginBottom: '28px',
              textAlign: 'left',
            }}>
              {boundaries.quote}
            </p>

            <div style={{
              fontSize: '14px',
              color: '#888',
              letterSpacing: '0.03em',
              textAlign: 'left',
            }}>
              —— {boundaries.quoteAuthor}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
