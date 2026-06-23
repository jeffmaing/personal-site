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
        padding: isMobile
          ? 'var(--space-3xl) var(--space-sm)'
          : 'var(--space-section) var(--space-lg)',
        background: 'var(--bg-primary)',
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
            {proof.eyebrow}
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
              maxWidth: 'var(--content-narrow)',
            }}
          >
            {proof.title}
          </h2>
          <p
            style={{
              fontSize: 'var(--font-body)',
              color: 'var(--text-secondary)',
              lineHeight: 'var(--lh-loose)',
              fontFamily: 'var(--font-body)',
              maxWidth: 'var(--content-narrow)',
              opacity: 0.7,
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
            gap: 'var(--space-md)',
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
          borderRadius: 'var(--radius-md)',
          padding: isMobile ? 'var(--space-md)' : 'var(--space-lg)',
          border: '1px solid var(--border-subtle)',
          boxShadow: hovered ? 'var(--shadow-md)' : 'var(--shadow-sm)',
          transition: 'box-shadow 0.2s ease, transform 0.2s ease',
          transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top accent line — subtle */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: data.brandColor,
            opacity: hovered ? 0.8 : 0.5,
            transition: 'opacity 0.2s ease',
          }}
        />

        {/* Header row — metadata, de-emphasized */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-sm)',
            marginBottom: 'var(--space-md)',
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
              fontSize: 'var(--font-caption)',
              fontWeight: 'var(--weight-semibold)',
              letterSpacing: 'var(--ls-loose)',
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
              fontSize: 'var(--font-caption)',
              color: 'var(--text-light)',
              letterSpacing: 'var(--ls-loose)',
              fontFamily: 'var(--font-body)',
              opacity: 0.7,
            }}
          >
            {data.category}
          </span>
          <span
            style={{
              marginLeft: 'auto',
              padding: '3px 10px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-tertiary)',
              color: 'var(--text-secondary)',
              fontSize: 'var(--font-small)',
              fontWeight: 'var(--weight-medium)',
              letterSpacing: 'var(--ls-loose)',
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
            gap: isMobile ? 'var(--space-sm)' : 'var(--space-xl)',
            marginBottom: 'var(--space-lg)',
          }}
        >
          <Block label="问题" tone="problem" text={data.problem} />
          <Block label="方案" tone="solution" text={data.solution} />
        </div>

        {/* Result — focal */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? 'var(--space-sm)' : 'var(--space-lg)',
            padding: isMobile ? 'var(--space-md)' : 'var(--space-md) var(--space-lg)',
            background: 'linear-gradient(135deg, rgba(82,183,136,0.06), rgba(91,125,177,0.06))',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(82,183,136,0.15)',
            marginBottom: 'var(--space-md)',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div
              style={{
                fontSize: 'var(--font-small)',
                color: 'var(--text-light)',
                letterSpacing: '0.1em',
                marginBottom: '6px',
                fontFamily: 'var(--font-heading)',
                textTransform: 'uppercase',
                opacity: 0.7,
              }}
            >
              结果
            </div>
            <div
              style={{
                fontSize: isMobile ? '20px' : 'clamp(22px, 2.5vw, 26px)',
                fontWeight: 'var(--weight-bold)',
                color: 'var(--text-primary)',
                letterSpacing: 'var(--ls-heading)',
                fontFamily: 'var(--font-heading)',
                lineHeight: 1.1,
              }}
            >
              {data.resultPrimary}
            </div>
            <div
              style={{
                fontSize: 'var(--font-caption)',
                color: 'var(--accent-secondary)',
                fontWeight: 'var(--weight-medium)',
                marginTop: '6px',
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
              gap: isMobile ? 'var(--space-sm)' : 'var(--space-md)',
              marginLeft: 'auto',
              flex: 1,
              minWidth: isMobile ? '100%' : '240px',
            }}
          >
            {data.metrics.map((m, i) => (
              <div key={i}>
                <div
                  style={{
                    fontSize: 'var(--font-caption)',
                    fontWeight: 'var(--weight-bold)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  {m.value}
                </div>
                <div
                  style={{
                    fontSize: 'var(--font-small)',
                    color: 'var(--text-light)',
                    letterSpacing: 'var(--ls-loose)',
                    fontFamily: 'var(--font-body)',
                    marginTop: '2px',
                    opacity: 0.7,
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
            gap: 'var(--space-sm)',
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: 'var(--font-caption)',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-body)',
              opacity: 0.8,
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
              fontSize: 'var(--font-caption)',
              fontWeight: 'var(--weight-medium)',
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
          fontSize: 'var(--font-small)',
          color,
          letterSpacing: '0.1em',
          marginBottom: 'var(--space-xs)',
          fontWeight: 'var(--weight-semibold)',
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
          fontSize: 'var(--font-caption)',
          lineHeight: 'var(--lh-loose)',
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
      <div style={{ marginBottom: 'var(--space-xl)' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 12px',
            borderRadius: '999px',
            background: `${data.brandColor}10`,
            color: data.brandColor,
            fontSize: 'var(--font-caption)',
            fontWeight: 'var(--weight-semibold)',
            marginBottom: 'var(--space-sm)',
            fontFamily: 'var(--font-heading)',
          }}
        >
          {data.brand} · {data.category}
        </div>
        <h2
          style={{
            fontSize: 'var(--font-h3)',
            fontWeight: 'var(--weight-semibold)',
            color: 'var(--text-primary)',
            marginBottom: 'var(--space-xs)',
            fontFamily: 'var(--font-heading)',
            letterSpacing: 'var(--ls-heading)',
          }}
        >
          {data.tag}：{data.resultPrimary}
        </h2>
        <p
          style={{
            fontSize: 'var(--font-caption)',
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
          marginTop: 'var(--space-lg)',
          paddingTop: 'var(--space-md)',
          borderTop: '1px solid var(--border-subtle)',
        }}
      >
        <div
          style={{
            fontSize: 'var(--font-small)',
            color: 'var(--text-light)',
            letterSpacing: '0.1em',
            marginBottom: 'var(--space-sm)',
            fontWeight: 'var(--weight-semibold)',
            fontFamily: 'var(--font-heading)',
            textTransform: 'uppercase',
          }}
        >
          关键数据
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: 'var(--space-sm)',
          }}
        >
          {data.metrics.map((m, i) => (
            <div
              key={i}
              style={{
                background: 'var(--bg-primary)',
                borderRadius: 'var(--radius-sm)',
                padding: 'var(--space-sm)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div
                style={{
                  fontSize: 'var(--font-body)',
                  fontWeight: 'var(--weight-bold)',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-heading)',
                  marginBottom: '4px',
                }}
              >
                {m.value}
              </div>
              <div
                style={{
                  fontSize: 'var(--font-small)',
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
          marginTop: 'var(--space-lg)',
          padding: 'var(--space-md)',
          background: 'var(--bg-primary)',
          borderRadius: 'var(--radius-sm)',
          fontSize: 'var(--font-caption)',
          color: 'var(--text-muted)',
          lineHeight: 'var(--lh-normal)',
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
    <div style={{ marginBottom: 'var(--space-md)' }}>
      <div
        style={{
          fontSize: 'var(--font-small)',
          color,
          letterSpacing: '0.1em',
          marginBottom: '6px',
          textTransform: 'uppercase',
          fontWeight: 'var(--weight-semibold)',
          fontFamily: 'var(--font-heading)',
        }}
      >
        {label}
      </div>
      <p
        style={{
          fontSize: 'var(--font-caption)',
          color: 'var(--text-secondary)',
          lineHeight: 'var(--lh-loose)',
          fontFamily: 'var(--font-body)',
          margin: 0,
        }}
      >
        {content}
      </p>
    </div>
  )
}
