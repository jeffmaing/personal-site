import { useState } from 'react'
import { siteConfig } from '../site-config'
import { useInView, useWidth } from '../hooks/useAnimatedNumber'
import Modal from './Modal'

type CaseData = (typeof siteConfig.proof.cases)[number]

export default function ProofSystem() {
  const { proof } = siteConfig
  const [ref, visible] = useInView(0.08)
  const w = useWidth()
  const isMobile = w < 768
  const [activeCase, setActiveCase] = useState<CaseData | null>(null)

  return (
    <section
      id="proof"
      ref={ref}
      style={{
        padding: isMobile ? '80px 24px' : 'clamp(80px, 12vw, 140px) 60px',
        background: 'var(--bg-primary)',
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
            {proof.eyebrow}
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
              maxWidth: '720px',
            }}
          >
            {proof.title}
          </h2>
          <p
            style={{
              fontSize: isMobile ? '14px' : 'clamp(14px, 1.4vw, 16px)',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              fontFamily: 'var(--font-body)',
              maxWidth: '680px',
            }}
          >
            {proof.subtitle}
          </p>
        </div>

        {/* Case cards */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? '16px' : '20px',
          }}
        >
          {proof.cases.map((c, i) => (
            <CaseCard
              key={c.id}
              data={c}
              index={i}
              visible={visible}
              isMobile={isMobile}
              onExpand={() => setActiveCase(c)}
            />
          ))}
        </div>
      </div>

      {activeCase && (
        <Modal onClose={() => setActiveCase(null)}>
          <CaseDetail data={activeCase} />
        </Modal>
      )}
    </section>
  )
}

function CaseCard({
  data,
  index,
  visible,
  isMobile,
  onExpand,
}: {
  data: CaseData
  index: number
  visible: boolean
  isMobile: boolean
  onExpand: () => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(24px)',
        transition: `opacity 0.7s ease ${0.1 + index * 0.1}s, transform 0.7s ease ${0.1 + index * 0.1}s`,
      }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-xl)',
          padding: isMobile ? '24px 20px' : 'clamp(28px, 3vw, 40px)',
          border: '1px solid var(--border-subtle)',
          boxShadow: hovered ? 'var(--shadow-md)' : 'var(--shadow-sm)',
          transition: 'box-shadow 0.25s ease, transform 0.25s ease',
          transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: data.brandColor,
            opacity: hovered ? 1 : 0.6,
            transition: 'opacity 0.3s ease',
          }}
        />

        {/* Header row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px',
            flexWrap: 'wrap',
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 12px',
              borderRadius: '999px',
              background: `${data.brandColor}10`,
              color: data.brandColor,
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.03em',
              fontFamily: 'var(--font-heading)',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: data.brandColor,
                display: 'inline-block',
              }}
            />
            {data.brand}
          </span>
          <span
            style={{
              fontSize: '12px',
              color: 'var(--text-light)',
              letterSpacing: '0.08em',
              fontFamily: 'var(--font-body)',
            }}
          >
            {data.category}
          </span>
          <span
            style={{
              marginLeft: 'auto',
              padding: '3px 10px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-tertiary)',
              color: 'var(--text-secondary)',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.04em',
              fontFamily: 'var(--font-body)',
            }}
          >
            {data.tag}
          </span>
        </div>

        {/* Problem / Solution two-column on desktop */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '12px' : '32px',
            marginBottom: '24px',
          }}
        >
          <Block label="问题" tone="problem" text={data.problem} />
          <Block
            label="方案"
            tone="solution"
            text={data.solution}
          />
        </div>

        {/* Result — big visual */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '12px' : '24px',
            padding: isMobile ? '16px' : '20px 24px',
            background: 'linear-gradient(135deg, rgba(82,183,136,0.06), rgba(91,125,177,0.06))',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(82,183,136,0.15)',
            marginBottom: '20px',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div
              style={{
                fontSize: '11px',
                color: 'var(--text-light)',
                letterSpacing: '0.1em',
                marginBottom: '4px',
                fontFamily: 'var(--font-heading)',
              }}
            >
              结果
            </div>
            <div
              style={{
                fontSize: isMobile ? '20px' : 'clamp(22px, 2.5vw, 28px)',
                fontWeight: 700,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                fontFamily: 'var(--font-heading)',
                lineHeight: 1.1,
              }}
            >
              {data.resultPrimary}
            </div>
            <div
              style={{
                fontSize: '13px',
                color: 'var(--accent-secondary)',
                fontWeight: 500,
                marginTop: '4px',
                fontFamily: 'var(--font-body)',
              }}
            >
              {data.resultSecondary}
            </div>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${data.metrics.length}, minmax(0, 1fr))`,
              gap: isMobile ? '12px' : '20px',
              marginLeft: 'auto',
              flex: 1,
              minWidth: isMobile ? '100%' : '240px',
            }}
          >
            {data.metrics.map((m, i) => (
              <div key={i}>
                <div
                  style={{
                    fontSize: isMobile ? '14px' : '15px',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  {m.value}
                </div>
                <div
                  style={{
                    fontSize: '10px',
                    color: 'var(--text-light)',
                    letterSpacing: '0.05em',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer with evidence + expand */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-body)',
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 12l2 2 4-4" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            {data.evidence}
          </div>
          <button
            onClick={onExpand}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--accent-primary)',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              padding: 0,
              fontFamily: 'var(--font-body)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateX(2px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateX(0)'
            }}
          >
            查看完整案例
            <span style={{ fontSize: '14px' }}>→</span>
          </button>
        </div>
      </div>
    </div>
  )
}

function Block({
  label,
  tone,
  text,
}: {
  label: string
  tone: 'problem' | 'solution'
  text: string
}) {
  const color = tone === 'problem' ? '#e07070' : 'var(--accent-secondary)'
  return (
    <div>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '11px',
          color,
          letterSpacing: '0.1em',
          marginBottom: '8px',
          fontWeight: 600,
          fontFamily: 'var(--font-heading)',
          textTransform: 'uppercase',
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: color,
          }}
        />
        {label}
      </div>
      <p
        style={{
          fontSize: '14px',
          lineHeight: 1.75,
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-body)',
          margin: 0,
        }}
      >
        {text}
      </p>
    </div>
  )
}

function CaseDetail({ data }: { data: CaseData }) {
  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 12px',
            borderRadius: '999px',
            background: `${data.brandColor}10`,
            color: data.brandColor,
            fontSize: '12px',
            fontWeight: 600,
            marginBottom: '12px',
            fontFamily: 'var(--font-heading)',
          }}
        >
          {data.brand} · {data.category}
        </div>
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '6px',
            fontFamily: 'var(--font-heading)',
            letterSpacing: '-0.01em',
          }}
        >
          {data.tag}：{data.resultPrimary}
        </h2>
        <p
          style={{
            fontSize: '13px',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-body)',
          }}
        >
          {data.resultSecondary}
        </p>
      </div>

      <DetailBlock label="问题背景" content={data.problem} color="#e07070" />
      <DetailBlock label="解决方案" content={data.solution} color="var(--accent-secondary)" />
      <DetailBlock label="效果" content={`${data.resultPrimary} · ${data.resultSecondary}`} color="var(--accent-primary)" />

      <div
        style={{
          marginTop: '24px',
          paddingTop: '20px',
          borderTop: '1px solid var(--border-subtle)',
        }}
      >
        <div
          style={{
            fontSize: '11px',
            color: 'var(--text-light)',
            letterSpacing: '0.1em',
            marginBottom: '12px',
            fontWeight: 600,
            fontFamily: 'var(--font-heading)',
          }}
        >
          关键数据
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '12px',
          }}
        >
          {data.metrics.map((m, i) => (
            <div
              key={i}
              style={{
                background: 'var(--bg-primary)',
                borderRadius: 'var(--radius-md)',
                padding: '14px',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-heading)',
                  marginBottom: '4px',
                }}
              >
                {m.value}
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: 'var(--text-light)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          marginTop: '24px',
          padding: '16px',
          background: 'var(--bg-primary)',
          borderRadius: 'var(--radius-md)',
          fontSize: '12px',
          color: 'var(--text-muted)',
          lineHeight: 1.6,
          fontFamily: 'var(--font-body)',
        }}
      >
        <strong style={{ color: 'var(--text-secondary)' }}>证据来源：</strong>
        {data.evidence}。如需更详细的资料或现场演示，可在下方联系我。
      </div>
    </div>
  )
}

function DetailBlock({
  label,
  content,
  color,
}: {
  label: string
  content: string
  color: string
}) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <div
        style={{
          fontSize: '11px',
          color,
          letterSpacing: '0.1em',
          marginBottom: '6px',
          textTransform: 'uppercase',
          fontWeight: 600,
          fontFamily: 'var(--font-heading)',
        }}
      >
        {label}
      </div>
      <p
        style={{
          fontSize: '14px',
          color: 'var(--text-secondary)',
          lineHeight: 1.8,
          fontFamily: 'var(--font-body)',
          margin: 0,
        }}
      >
        {content}
      </p>
    </div>
  )
}
