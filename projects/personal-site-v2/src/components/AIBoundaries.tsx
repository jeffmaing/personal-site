import { useCallback, useEffect, useRef, useState } from 'react'
import { siteConfig } from '../site-config'
import { useInView, useWidth } from '../hooks/useAnimatedNumber'

const HANDLE_WIDTH = 36
const MIN_PCT = 20
const MAX_PCT = 80

export default function AIBoundaries() {
  const { boundaries } = siteConfig
  const [ref, visible] = useInView(0.15)
  const w = useWidth()
  const isMobile = w < 768

  /* --- draggable split --- */
  const containerRef = useRef<HTMLDivElement>(null)
  const [split, setSplit] = useState(50)
  const dragging = useRef(false)

  const calcSplit = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = clientX - rect.left
      const pct = (x / rect.width) * 100
      setSplit(Math.round(Math.min(MAX_PCT, Math.max(MIN_PCT, pct))))
    },
    [],
  )

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      dragging.current = true
      calcSplit(e.clientX)
    },
    [calcSplit],
  )

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      dragging.current = true
      calcSplit(e.touches[0].clientX)
    },
    [calcSplit],
  )

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return
      calcSplit(e.clientX)
    }
    const onTouchMove = (e: TouchEvent) => {
      if (!dragging.current) return
      calcSplit(e.touches[0].clientX)
    }
    const onEnd = () => {
      dragging.current = false
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onEnd)
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onEnd)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onEnd)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onEnd)
    }
  }, [calcSplit])

  /* --- render helpers --- */
  const leftPct = split
  const rightPct = 100 - split

  const listStyle = (delay: string, tx: string): React.CSSProperties => ({
    background: '#fff',
    borderRadius: '16px',
    padding: isMobile ? '32px 24px' : '40px 32px',
    border: '1px solid rgba(0,0,0,0.06)',
    opacity: visible ? 1 : 0,
    transform: visible ? 'none' : `translateX(${tx})`,
    transition: `opacity 1s ease ${delay}, transform 1s ease ${delay}`,
    overflow: 'visible',
    minWidth: 0,
  })

  const itemStyle = (
    i: number,
    total: number,
    border: string,
  ): React.CSSProperties => ({
    padding: '16px 0',
    borderBottom: i < total - 1 ? `1px solid ${border}` : 'none',
  })

  /* ========== MOBILE: stacked layout ========== */
  if (isMobile) {
    return (
      <section
        id="boundaries"
        ref={ref}
        style={{
          padding: '80px 24px',
          background: '#fafafa',
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ maxWidth: '800px', width: '100%' }}>
          <MobileHeader visible={visible} />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '32px',
              marginBottom: '64px',
            }}
          >
            <div style={listStyle('0.2s', '-20px')}>
              <SectionTitle label="交给 AI" dot="#52b788" />
              {boundaries.canDo.map((item, i) => (
                <div key={i} style={itemStyle(i, boundaries.canDo.length, '#f0f0f0')}>
                  <ItemText text={item.text} />
                  {item.metric && <ItemMetric text={item.metric} color="#52b788" />}
                </div>
              ))}
            </div>
            <div style={listStyle('0.35s', '20px')}>
              <SectionTitle label="留给自己" dot="#e07070" />
              {boundaries.cannotDo.map((item, i) => (
                <div key={i} style={itemStyle(i, boundaries.cannotDo.length, '#f0f0f0')}>
                  <ItemText text={item.text} />
                  {item.metric && <ItemMetric text={item.metric} color="#e07070" />}
                </div>
              ))}
            </div>
          </div>
          <QuoteCard visible={visible} />
        </div>
      </section>
    )
  }

  /* ========== DESKTOP: draggable split ========== */
  return (
    <section
      id="boundaries"
      ref={ref}
      style={{
        padding: 'clamp(80px, 12vw, 160px) 60px',
        background: '#fafafa',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ maxWidth: '960px', width: '100%' }}>
        <DesktopHeader visible={visible} />

        {/* Split container */}
        <div
          ref={containerRef}
          style={{
            display: 'flex',
            alignItems: 'stretch',
            marginBottom: '64px',
            position: 'relative',
            userSelect: dragging.current ? 'none' : undefined,
          }}
        >
          {/* LEFT panel */}
          <div
            style={{
              flex: `${leftPct}`,
              ...listStyle('0.2s', '-20px'),
              borderRadius: '16px 0 0 16px',
              borderRight: 'none',
              paddingRight: '20px',
            }}
          >
            <SectionTitle label="交给 AI" dot="#52b788" />
            {boundaries.canDo.map((item, i) => (
              <div key={i} style={itemStyle(i, boundaries.canDo.length, '#f0f0f0')}>
                <ItemText text={item.text} />
                {item.metric && <ItemMetric text={item.metric} color="#52b788" />}
              </div>
            ))}
          </div>

          {/* DIVIDER */}
          <div
            style={{
              width: `${HANDLE_WIDTH}px`,
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              cursor: 'col-resize',
              zIndex: 2,
            }}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
          >
            {/* thin line */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: '50%',
                width: '2px',
                background: 'rgba(91,125,177,0.15)',
                transform: 'translateX(-50%)',
              }}
            />
            {/* circular handle */}
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#fff',
                border: '2px solid rgba(91,125,177,0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
                position: 'relative',
              }}
            >
              <span style={{ fontSize: '12px', color: '#5b7db1', lineHeight: 1, fontWeight: 600 }}>‹</span>
              <span style={{ fontSize: '12px', color: '#5b7db1', lineHeight: 1, fontWeight: 600 }}>›</span>
            </div>
          </div>

          {/* RIGHT panel */}
          <div
            style={{
              flex: `${rightPct}`,
              ...listStyle('0.35s', '20px'),
              borderRadius: '0 16px 16px 0',
              borderLeft: 'none',
              paddingLeft: '20px',
            }}
          >
            <SectionTitle label="留给自己" dot="#e07070" />
            {boundaries.cannotDo.map((item, i) => (
              <div key={i} style={itemStyle(i, boundaries.cannotDo.length, '#f0f0f0')}>
                <ItemText text={item.text} />
                {item.metric && <ItemMetric text={item.metric} color="#e07070" />}
              </div>
            ))}
          </div>

          {/* Percentage labels */}
          <div
            style={{
              position: 'absolute',
              bottom: '-28px',
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'space-between',
              pointerEvents: 'none',
            }}
          >
            <span
              style={{
                fontSize: '12px',
                color: '#52b788',
                fontWeight: 600,
                paddingLeft: '40px',
              }}
            >
              AI {leftPct}%
            </span>
            <span
              style={{
                fontSize: '12px',
                color: '#e07070',
                fontWeight: 600,
                paddingRight: '40px',
              }}
            >
              自己 {rightPct}%
            </span>
          </div>
        </div>

        <QuoteCard visible={visible} />
      </div>
    </section>
  )
}

/* ---- Sub-components ---- */

function MobileHeader({ visible }: { visible: boolean }) {
  const { boundaries } = siteConfig
  return (
    <div
      style={{
        textAlign: 'center',
        marginBottom: '48px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(30px)',
        transition: 'opacity 1s ease, transform 1s ease',
      }}
    >
      <div
        style={{
          fontSize: '11px',
          color: '#bbb',
          letterSpacing: '0.2em',
          marginBottom: '20px',
        }}
      >
        03 — AI 边界
      </div>
      <h2
        style={{
          fontSize: '28px',
          fontWeight: 800,
          color: '#1e2a3a',
          marginBottom: '16px',
          lineHeight: 1.2,
          letterSpacing: '-0.03em',
        }}
      >
        {boundaries.title}
      </h2>
      <p
        style={{
          fontSize: '15px',
          color: '#888',
          lineHeight: 1.6,
        }}
      >
        {boundaries.subtitle}
      </p>
    </div>
  )
}

function DesktopHeader({ visible }: { visible: boolean }) {
  const { boundaries } = siteConfig
  return (
    <div
      style={{
        textAlign: 'center',
        marginBottom: '64px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(30px)',
        transition: 'opacity 1s ease, transform 1s ease',
      }}
    >
      <div
        style={{
          fontSize: '11px',
          color: '#bbb',
          letterSpacing: '0.2em',
          marginBottom: '20px',
        }}
      >
        03 — AI 边界
      </div>
      <h2
        style={{
          fontSize: 'clamp(36px, 5vw, 52px)',
          fontWeight: 800,
          color: '#1e2a3a',
          marginBottom: '16px',
          lineHeight: 1.2,
          letterSpacing: '-0.03em',
        }}
      >
        {boundaries.title}
      </h2>
      <p
        style={{
          fontSize: 'clamp(15px, 2vw, 18px)',
          color: '#888',
          lineHeight: 1.6,
        }}
      >
        {boundaries.subtitle} — 拖动分隔条调整比例
      </p>
    </div>
  )
}

function SectionTitle({ label, dot }: { label: string; dot: string }) {
  return (
    <h3
      style={{
        fontSize: '18px',
        fontWeight: 700,
        color: '#1e2a3a',
        marginBottom: '28px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      <span
        style={{
          display: 'inline-block',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: dot,
        }}
      />
      {label}
    </h3>
  )
}

function ItemText({ text }: { text: string }) {
  return (
    <div
      style={{
        fontSize: '16px',
        fontWeight: 500,
        color: '#333',
        marginBottom: '4px',
      }}
    >
      {text}
    </div>
  )
}

function ItemMetric({ text, color }: { text: string; color: string }) {
  return (
    <div
      style={{
        fontSize: '13px',
        color,
        fontWeight: 500,
      }}
    >
      {text}
    </div>
  )
}

function QuoteCard({ visible }: { visible: boolean }) {
  const { boundaries } = siteConfig
  const w = useWidth()
  const isMobile = w < 768
  return (
    <div
      style={{
        textAlign: 'center',
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(20px)',
        transition: 'opacity 1s ease 0.5s, transform 1s ease 0.5s',
      }}
    >
      <div
        style={{
          maxWidth: '640px',
          margin: '0 auto',
          padding: isMobile ? '32px 24px' : '48px 40px',
          background: '#ffffff',
          borderRadius: '16px',
          borderLeft: '3px solid #5b7db1',
          paddingLeft: isMobile ? '24px' : '32px',
        }}
      >
        <p
          style={{
            fontSize: isMobile ? '16px' : 'clamp(17px, 2vw, 20px)',
            color: '#1e2a3a',
            lineHeight: 1.8,
            whiteSpace: 'pre-wrap',
            fontWeight: 400,
            marginBottom: '28px',
            textAlign: 'left',
          }}
        >
          {boundaries.quote}
        </p>
        <div
          style={{
            fontSize: '14px',
            color: '#888',
            letterSpacing: '0.03em',
            textAlign: 'left',
          }}
        >
          —— {boundaries.quoteAuthor}
        </div>
      </div>
    </div>
  )
}
