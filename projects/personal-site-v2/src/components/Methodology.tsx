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
        padding: isMobile
          ? 'var(--space-3xl) var(--space-sm)'
          : 'var(--space-section) var(--space-lg)',
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
        {/* Header — focal */}
        <div
          style={{
            marginBottom: isMobile ? 'var(--space-xl)' : 'var(--space-2xl)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <div className="section-label" style={{ marginBottom: 'var(--space-sm)' }}>
            {methodology.eyebrow}
          </div>
          <h2
            style={{
              fontSize: isMobile ? 'var(--font-h3)' : 'var(--font-h2)',
              fontWeight: 'var(--weight-semibold)',
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-md)',
              lineHeight: 'var(--lh-tight)',
              letterSpacing: 'var(--ls-heading)',
              fontFamily: 'var(--font-heading)',
              maxWidth: 'var(--content-max)',
            }}
          >
            {methodology.title}
          </h2>
          <p
            style={{
              fontSize: 'var(--font-body)',
              color: 'var(--text-secondary)',
              lineHeight: 'var(--lh-loose)',
              fontFamily: 'var(--font-body)',
              maxWidth: 'var(--content-narrow)',
              opacity: 0.8,
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
            gap: 'var(--space-md)',
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
            marginTop: isMobile ? 'var(--space-xl)' : 'var(--space-2xl)',
            padding: isMobile ? 'var(--space-md)' : 'var(--space-md) var(--space-lg)',
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-md)',
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
                fontSize: 'var(--font-small)',
                color: 'var(--text-light)',
                letterSpacing: '0.1em',
                fontFamily: 'var(--font-heading)',
                marginBottom: 'var(--space-xs)',
                textTransform: 'uppercase',
                opacity: 0.7,
              }}
            >
              结果导向
            </div>
            <p
              style={{
                fontSize: 'var(--font-caption)',
                color: 'var(--text-secondary)',
                lineHeight: 'var(--lh-normal)',
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
            right: '-16px',
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
          borderRadius: 'var(--radius-md)',
          padding: isMobile ? 'var(--space-md)' : 'var(--space-lg) var(--space-md)',
          border: '1px solid var(--border-subtle)',
          boxShadow: hovered ? 'var(--shadow-md)' : 'var(--shadow-sm)',
          transition: 'box-shadow 0.2s ease, transform 0.2s ease',
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
            gap: 'var(--space-xs)',
            marginBottom: 'var(--space-md)',
          }}
        >
          <span
            style={{
              fontSize: 'var(--font-h3)',
              fontWeight: 'var(--weight-light)',
              color: 'var(--accent-primary)',
              fontFamily: 'var(--font-heading)',
              letterSpacing: 'var(--ls-heading)',
              lineHeight: 1,
            }}
          >
            {data.step}
          </span>
          <span
            style={{
              fontSize: 'var(--font-small)',
              color: 'var(--text-light)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-heading)',
              fontWeight: 'var(--weight-semibold)',
              opacity: 0.7,
            }}
          >
            {data.key}
          </span>
        </div>

        {/* Title — focal within card */}
        <h3
          style={{
            fontSize: '20px',
            fontWeight: 'var(--weight-semibold)',
            color: 'var(--text-primary)',
            marginBottom: 'var(--space-xs)',
            fontFamily: 'var(--font-heading)',
            letterSpacing: 'var(--ls-heading)',
          }}
        >
          {data.title}
        </h3>
        <div
          style={{
            fontSize: 'var(--font-caption)',
            color: 'var(--text-light)',
            letterSpacing: 'var(--ls-loose)',
            fontFamily: 'var(--font-mono)',
            marginBottom: 'var(--space-md)',
            opacity: 0.6,
          }}
        >
          {data.subtitle}
        </div>

        {/* Visual */}
        <div
          style={{
            marginBottom: 'var(--space-md)',
            padding: 'var(--space-md)',
            background: 'var(--bg-tertiary)',
            borderRadius: 'var(--radius-md)',
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
            fontSize: 'var(--font-caption)',
            color: 'var(--text-secondary)',
            lineHeight: 'var(--lh-loose)',
            fontFamily: 'var(--font-body)',
            margin: '0 0 var(--space-md)',
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
            gap: 'var(--space-xs)',
          }}
        >
          {data.bullets.map((b, i) => (
            <li
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--space-xs)',
                fontSize: 'var(--font-caption)',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-body)',
                lineHeight: 'var(--lh-normal)',
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  width: '14px',
                  height: '14px',
                  borderRadius: 'var(--radius-sm)',
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
 */
function StepVisual({ kind }: { kind: string }) {
  if (kind === 'diagnose') return <DiagnoseVisual />
  if (kind === 'rebuild') return <RebuildVisual />
  if (kind === 'ai') return <AIVisual />
  return null
}

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
      <circle cx="125" cy="32" r="4" fill="#e07070" />
      <circle cx="125" cy="62" r="4" fill="#e07070" />
      <line x1="80" y1="25" x2="120" y2="32" stroke="var(--text-light)" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="80" y1="55" x2="120" y2="62" stroke="var(--text-light)" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="80" y1="85" x2="120" y2="62" stroke="var(--text-light)" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
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
      <line x1="100" y1="15" x2="100" y2="85" stroke="var(--text-light)" strokeWidth="1" strokeDasharray="2 3" opacity="0.5" />
      <circle cx="100" cy="25" r="2" fill="var(--text-light)" />
      <circle cx="100" cy="50" r="2" fill="var(--text-light)" />
      <circle cx="100" cy="75" r="2" fill="var(--text-light)" />
    </svg>
  )
}

function AIVisual() {
  return (
    <svg
      width="100%"
      height="100"
      viewBox="0 0 200 100"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <circle cx="100" cy="50" r="18" fill="var(--bg-card)" stroke="var(--accent-primary)" strokeWidth="1.5" />
      <text x="100" y="48" textAnchor="middle" fontSize="8" fill="var(--accent-primary)" fontFamily="var(--font-heading)" fontWeight="700">
        AI
      </text>
      <text x="100" y="58" textAnchor="middle" fontSize="6" fill="var(--accent-primary)" fontFamily="var(--font-mono)">
        AGENT
      </text>
      <circle cx="100" cy="50" r="26" fill="none" stroke="var(--accent-primary)" strokeWidth="0.5" opacity="0.4" />
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
