import { useState } from 'react'
import { siteConfig } from '../site-config'
import { useInView, useWidth } from '../hooks/useAnimatedNumber'

type StepData = (typeof siteConfig.methodology.flow)[number]

export default function Methodology() {
  const { methodology } = siteConfig
  const [ref, visible] = useInView(0.08)
  const w = useWidth()
  const isMobile = w < 768

  return (
    <section
      id="methodology"
      ref={ref}
      style={{
        padding: isMobile ? '80px 24px' : 'clamp(80px, 12vw, 140px) 60px',
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
        {/* Header */}
        <div
          style={{
            marginBottom: isMobile ? '40px' : '56px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <div className="section-label" style={{ marginBottom: '16px' }}>
            {methodology.eyebrow}
          </div>
          <h2
            style={{
              fontSize: isMobile ? '26px' : 'clamp(30px, 4vw, 42px)',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: '12px',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              fontFamily: 'var(--font-heading)',
              maxWidth: '780px',
            }}
          >
            {methodology.title}
          </h2>
          <p
            style={{
              fontSize: isMobile ? '14px' : 'clamp(14px, 1.4vw, 16px)',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              fontFamily: 'var(--font-body)',
              maxWidth: '720px',
            }}
          >
            {methodology.subtitle}
          </p>
        </div>

        {/* 3-step flow */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: isMobile ? '20px' : '20px',
            position: 'relative',
          }}
        >
          {methodology.flow.map((s, i) => (
            <StepCard
              key={s.step}
              data={s}
              index={i}
              visible={visible}
              isMobile={isMobile}
              isLast={i === methodology.flow.length - 1}
            />
          ))}
        </div>

        {/* Outcome band — bridges methodology to proof */}
        <div
          style={{
            marginTop: isMobile ? '40px' : '56px',
            padding: isMobile ? '20px' : '24px 32px',
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            flexWrap: 'wrap',
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background:
                'linear-gradient(135deg, rgba(82,183,136,0.12), rgba(91,125,177,0.12))',
              color: 'var(--accent-primary)',
              flexShrink: 0,
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <div style={{ flex: 1, minWidth: '240px' }}>
            <div
              style={{
                fontSize: '11px',
                color: 'var(--text-light)',
                letterSpacing: '0.1em',
                fontFamily: 'var(--font-heading)',
                marginBottom: '4px',
              }}
            >
              结果导向
            </div>
            <p
              style={{
                fontSize: isMobile ? '14px' : '15px',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                fontFamily: 'var(--font-body)',
                margin: 0,
              }}
            >
              三步走完，你能拿到一个嵌入日常运营、团队自己用得起来的 AI 工作流——
              不是 demo，是上线交付物。下方三个案例都是这么跑出来的。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function StepCard({
  data,
  index,
  visible,
  isMobile,
  isLast,
}: {
  data: StepData
  index: number
  visible: boolean
  isMobile: boolean
  isLast: boolean
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{
        position: 'relative',
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(24px)',
        transition: `opacity 0.7s ease ${0.15 + index * 0.12}s, transform 0.7s ease ${0.15 + index * 0.12}s`,
      }}
    >
      {/* Arrow between cards (desktop only) */}
      {!isMobile && !isLast && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            right: '-14px',
            transform: 'translateY(-50%)',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-primary)',
            zIndex: 2,
            boxShadow: 'var(--shadow-sm)',
          }}
          aria-hidden="true"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      )}

      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-xl)',
          padding: isMobile ? '24px 20px' : '28px 24px',
          border: '1px solid var(--border-subtle)',
          boxShadow: hovered ? 'var(--shadow-md)' : 'var(--shadow-sm)',
          transition: 'box-shadow 0.25s ease, transform 0.25s ease',
          transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Step number + key */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '10px',
            marginBottom: '20px',
          }}
        >
          <span
            style={{
              fontSize: '32px',
              fontWeight: 200,
              color: 'var(--accent-primary)',
              fontFamily: 'var(--font-heading)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            {data.step}
          </span>
          <span
            style={{
              fontSize: '11px',
              color: 'var(--text-light)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
            }}
          >
            {data.key}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: '20px',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '4px',
            fontFamily: 'var(--font-heading)',
            letterSpacing: '-0.01em',
          }}
        >
          {data.title}
        </h3>
        <div
          style={{
            fontSize: '12px',
            color: 'var(--text-light)',
            letterSpacing: '0.05em',
            fontFamily: 'var(--font-mono)',
            marginBottom: '14px',
          }}
        >
          {data.subtitle}
        </div>

        {/* Visual */}
        <div
          style={{
            marginBottom: '20px',
            padding: '18px',
            background: 'var(--bg-tertiary)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)',
            minHeight: '120px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <StepVisual kind={data.visual} />
        </div>

        {/* Summary */}
        <p
          style={{
            fontSize: '13px',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            fontFamily: 'var(--font-body)',
            marginBottom: '16px',
            margin: '0 0 16px',
          }}
        >
          {data.summary}
        </p>

        {/* Bullet list */}
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          {data.bullets.map((b, i) => (
            <li
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                fontSize: '13px',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-body)',
                lineHeight: 1.5,
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  width: '14px',
                  height: '14px',
                  borderRadius: '3px',
                  background: `${getStepColor(index)}15`,
                  color: getStepColor(index),
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '3px',
                }}
              >
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function getStepColor(index: number) {
  const colors = ['#5b7db1', '#52b788', '#1e2a3a']
  return colors[index % colors.length]
}

/**
 * Minimal visual representations — McKinsey-style abstract diagrams.
 * No images, pure SVG so they scale cleanly on all devices.
 */
function StepVisual({ kind }: { kind: string }) {
  if (kind === 'diagnose') return <DiagnoseVisual />
  if (kind === 'rebuild') return <RebuildVisual />
  if (kind === 'ai') return <AIVisual />
  return null
}

/**
 * Step 01 — Diagnose: scattered process nodes converging into identified bottlenecks
 */
function DiagnoseVisual() {
  const nodes = [
    { x: 20, y: 25, label: '环节 A', w: 60 },
    { x: 20, y: 55, label: '环节 B', w: 60 },
    { x: 20, y: 85, label: '环节 C', w: 60 },
  ]
  return (
    <svg
      width="100%"
      height="110"
      viewBox="0 0 200 110"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {/* Input nodes */}
      {nodes.map((n, i) => (
        <g key={i}>
          <rect
            x={n.x}
            y={n.y - 8}
            width={n.w}
            height="16"
            rx="3"
            fill="var(--bg-card)"
            stroke="var(--border-medium)"
            strokeWidth="1"
          />
          <text
            x={n.x + n.w / 2}
            y={n.y + 3}
            textAnchor="middle"
            fontSize="8"
            fill="var(--text-secondary)"
            fontFamily="var(--font-mono)"
          >
            {n.label}
          </text>
        </g>
      ))}
      {/* Bottleneck markers — red dots */}
      <circle cx="125" cy="32" r="4" fill="#e07070" />
      <circle cx="125" cy="62" r="4" fill="#e07070" />
      <line x1="80" y1="25" x2="120" y2="32" stroke="var(--text-light)" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="80" y1="55" x2="120" y2="62" stroke="var(--text-light)" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="80" y1="85" x2="120" y2="62" stroke="var(--text-light)" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
      {/* Output — flagged bottlenecks */}
      <rect x="145" y="25" width="40" height="55" rx="4" fill="rgba(224,112,112,0.08)" stroke="#e07070" strokeWidth="1" strokeDasharray="3 2" />
      <text x="165" y="45" textAnchor="middle" fontSize="7" fill="#e07070" fontFamily="var(--font-mono)" fontWeight="600">
        瓶颈
      </text>
      <text x="165" y="56" textAnchor="middle" fontSize="6" fill="#e07070" fontFamily="var(--font-mono)">
        2 处
      </text>
      <text x="165" y="68" textAnchor="middle" fontSize="6" fill="#e07070" fontFamily="var(--font-mono)">
        已定位
      </text>
    </svg>
  )
}

/**
 * Step 02 — Rebuild: layered architecture (SOP / BI / Workflow)
 */
function RebuildVisual() {
  const layers = [
    { y: 25, label: 'SOP 标准化', color: 'rgba(91,125,177,0.12)', text: 'var(--accent-primary)' },
    { y: 50, label: 'BI 数据看板', color: 'rgba(82,183,136,0.12)', text: 'var(--accent-secondary)' },
    { y: 75, label: '工作流优化', color: 'rgba(91,125,177,0.08)', text: 'var(--accent-primary)' },
  ]
  return (
    <svg
      width="100%"
      height="100"
      viewBox="0 0 200 100"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {layers.map((l, i) => (
        <g key={i}>
          <rect x="20" y={l.y - 10} width="160" height="18" rx="3" fill={l.color} stroke="var(--border-subtle)" strokeWidth="1" />
          <text x="100" y={l.y + 2} textAnchor="middle" fontSize="9" fill={l.text} fontFamily="var(--font-heading)" fontWeight="600">
            {l.label}
          </text>
        </g>
      ))}
      {/* Layer connectors */}
      <line x1="100" y1="15" x2="100" y2="85" stroke="var(--text-light)" strokeWidth="1" strokeDasharray="2 3" opacity="0.5" />
      <circle cx="100" cy="25" r="2" fill="var(--text-light)" />
      <circle cx="100" cy="50" r="2" fill="var(--text-light)" />
      <circle cx="100" cy="75" r="2" fill="var(--text-light)" />
    </svg>
  )
}

/**
 * Step 03 — Apply AI: agent node orchestrating automated tasks
 */
function AIVisual() {
  return (
    <svg
      width="100%"
      height="100"
      viewBox="0 0 200 100"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {/* Center AI core */}
      <circle cx="100" cy="50" r="18" fill="var(--bg-card)" stroke="var(--accent-primary)" strokeWidth="1.5" />
      <text x="100" y="48" textAnchor="middle" fontSize="8" fill="var(--accent-primary)" fontFamily="var(--font-heading)" fontWeight="700">
        AI
      </text>
      <text x="100" y="58" textAnchor="middle" fontSize="6" fill="var(--accent-primary)" fontFamily="var(--font-mono)">
        AGENT
      </text>
      {/* Pulsing ring */}
      <circle cx="100" cy="50" r="26" fill="none" stroke="var(--accent-primary)" strokeWidth="0.5" opacity="0.4" />
      {/* Orbiting task nodes */}
      {[
        { x: 30, y: 30, label: '执行' },
        { x: 170, y: 30, label: '决策' },
        { x: 30, y: 75, label: '生成' },
        { x: 170, y: 75, label: '预警' },
      ].map((n, i) => (
        <g key={i}>
          <line x1="100" y1="50" x2={n.x} y2={n.y} stroke="var(--text-light)" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
          <rect x={n.x - 15} y={n.y - 7} width="30" height="14" rx="7" fill="var(--bg-card)" stroke="var(--accent-secondary)" strokeWidth="1" />
          <text x={n.x} y={n.y + 3} textAnchor="middle" fontSize="7" fill="var(--accent-secondary)" fontFamily="var(--font-mono)" fontWeight="600">
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  )
}
