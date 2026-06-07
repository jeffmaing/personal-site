import { useState, useEffect } from 'react'
import { siteConfig } from '../site-config'
import Modal from './Modal'
import { useInView, useWidth } from '../hooks/useAnimatedNumber'

interface ProductDetail {
  background: string
  solution: string
  result: string
  techStack: string
}

interface Product {
  tab: string
  name: string
  status: string
  description: string
  metrics: string[]
  tech: string
  detail: ProductDetail
}

// Flagship products — the top 5 to showcase
const FLAGSHIP_NAMES = [
  'AI 经销商诊断',
  '雷克萨斯数据看板',
  '奔驰排课系统',
  '知道社区数据周报',
  '论坛自动巡检',
]

export default function AIArsenal() {
  const { arsenal } = siteConfig
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [ref, visible] = useInView(0.1)
  const [expanded, setExpanded] = useState(false)
  const w = useWidth()
  const isMobile = w < 768

  const flagshipProducts = arsenal.products.filter(p => FLAGSHIP_NAMES.includes(p.name))
  const otherProducts = arsenal.products.filter(p => !FLAGSHIP_NAMES.includes(p.name))

  return (
    <section
      id="arsenal"
      ref={ref}
      style={{
        padding: isMobile ? '60px 16px' : 'clamp(60px, 8vw, 100px) clamp(24px, 6vw, 80px)',
        background: 'var(--bg-secondary)',
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(30px)',
          transition: 'opacity 1s ease, transform 1s ease',
        }}>
          <div className="section-label" style={{ marginBottom: '20px' }}>
            02 — 精选产品
          </div>
          <h2 style={{
            fontSize: isMobile ? '24px' : 'clamp(28px, 4vw, 40px)',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '10px',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            fontFamily: 'var(--font-heading)',
          }}>
            {arsenal.title}
          </h2>
          <p style={{
            fontSize: 'clamp(13px, 1.5vw, 15px)',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
            fontFamily: 'var(--font-body)',
          }}>
            {arsenal.subtitle}
          </p>
        </div>

        {/* Flagship Cards — full width, stacked */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? '14px' : '20px',
        }}>
          {flagshipProducts.map((product, i) => (
            <FlagshipCard
              key={product.name}
              product={product}
              index={i}
              visible={visible}
              onClick={() => setSelectedProduct(product)}
            />
          ))}
        </div>

        {/* Expand / Collapse button */}
        <div style={{
          textAlign: 'center',
          marginTop: '32px',
          opacity: visible ? 1 : 0,
          transition: 'opacity 1s ease 0.5s',
        }}>
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              background: 'transparent',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-lg)',
              padding: '12px 32px',
              fontSize: '14px',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              letterSpacing: '0.03em',
              fontFamily: 'var(--font-body)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--accent-primary)'
              e.currentTarget.style.color = 'var(--accent-primary)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border-medium)'
              e.currentTarget.style.color = 'var(--text-secondary)'
            }}
          >
            {expanded ? '收起' : `查看其他 ${otherProducts.length} 个项目`} →
          </button>

          {/* Collapsed products */}
          {expanded && (
            <div style={{
              marginTop: '32px',
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: '16px',
              opacity: 0,
              animation: 'fadeIn 0.6s ease forwards',
            }}>
              {otherProducts.map((product, i) => (
                <CompactCard
                  key={product.name}
                  product={product}
                  index={i}
                  onClick={() => setSelectedProduct(product)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedProduct && (
        <Modal onClose={() => setSelectedProduct(null)}>
          <ProductDetailModal product={selectedProduct} />
        </Modal>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}

function FlagshipCard({
  product,
  index,
  visible,
  onClick,
}: {
  product: Product
  index: number
  visible: boolean
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024)
  const isMobile = w < 768

  useEffect(() => {
    const h = () => setW(window.innerWidth)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])

  // Split metrics into before/after for display
  const parseMetric = (m: string) => {
    if (m.includes('→')) {
      const parts = m.split('→')
      return { before: parts[0].trim(), after: parts[1].trim() }
    }
    return { before: null, after: m }
  }

  const metricsParsed = product.metrics.map(parseMetric)

  return (
    <div
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
      role="button"
      tabIndex={0}
      style={{
        cursor: 'pointer',
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(20px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
        transitionDelay: `${index * 0.12}s`,
      }}
    >
      {/* Static card — no tilt */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          padding: isMobile ? '18px 20px' : 'clamp(22px, 3vw, 32px) clamp(24px, 4vw, 40px)',
          border: '1px solid var(--border-subtle)',
          boxShadow: hovered ? 'var(--shadow-md)' : 'var(--shadow-sm)',
          position: 'relative',
          transition: 'box-shadow 0.2s ease',
        }}
      >
        {/* Status badge */}
        <div style={{
          position: 'absolute',
          top: isMobile ? '18px' : '24px',
          right: isMobile ? '20px' : '32px',
          display: 'inline-block',
          padding: '4px 12px',
          borderRadius: 'var(--radius-md)',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.05em',
          background: product.status === '在跑'
            ? 'rgba(82, 183, 136, 0.1)'
            : 'rgba(224, 112, 112, 0.1)',
          color: product.status === '在跑' ? '#52b788' : '#e07070',
          fontFamily: 'var(--font-body)',
        }}>
          {product.status}
        </div>

        {/* Product name */}
        <h3 style={{
          fontSize: 'clamp(16px, 2.2vw, 20px)',
          fontWeight: 600,
          color: 'var(--text-primary)',
          marginBottom: '8px',
          lineHeight: 1.3,
          letterSpacing: '-0.01em',
          paddingRight: isMobile ? '80px' : '100px',
          fontFamily: 'var(--font-heading)',
        }}>
          {product.name}
        </h3>

        {/* Description */}
        <p style={{
          fontSize: 'clamp(13px, 1.5vw, 14px)',
          color: 'var(--text-muted)',
          lineHeight: 1.6,
          marginBottom: '16px',
          maxWidth: '600px',
          fontFamily: 'var(--font-body)',
        }}>
          {product.description}
        </p>

        {/* Metrics */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: isMobile ? '12px' : '18px',
          marginBottom: isMobile ? '12px' : '16px',
        }}>
          {metricsParsed.map((m, i) => (
            <div key={i}>
              {m.before ? (
                <div style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '8px',
                }}>
                  <span style={{
                    fontSize: isMobile ? '18px' : 'clamp(20px, 2.5vw, 28px)',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                    fontFamily: 'var(--font-heading)',
                  }}>
                    {m.before}
                  </span>
                  <span style={{
                    fontSize: isMobile ? '12px' : '14px',
                    color: 'var(--text-light)',
                    fontWeight: 300,
                  }}>→</span>
                  <span style={{
                    fontSize: isMobile ? '18px' : 'clamp(20px, 2.5vw, 28px)',
                    fontWeight: 700,
                    color: 'var(--accent-secondary)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                    fontFamily: 'var(--font-heading)',
                  }}>
                    {m.after}
                  </span>
                </div>
              ) : (
                <div style={{
                  fontSize: isMobile ? '18px' : 'clamp(20px, 2.5vw, 28px)',
                  fontWeight: 700,
                  color: 'var(--accent-primary)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  fontFamily: 'var(--font-heading)',
                }}>
                  {m.after}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA — right aligned */}
        <div style={{
          textAlign: 'right',
          fontSize: '14px',
          color: 'var(--accent-primary)',
          transition: 'color 0.3s ease',
          fontFamily: 'var(--font-body)',
        }}>
          查看案例 <span style={{
            display: 'inline-block',
            transition: 'transform 0.3s ease',
            transform: hovered ? 'translateX(4px)' : 'translateX(0)',
          }}>→</span>
        </div>
      </div>
    </div>
  )
}

function CompactCard({
  product,
  index,
  onClick,
}: {
  product: Product
  index: number
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
      role="button"
      tabIndex={0}
      style={{
        cursor: 'pointer',
        animationDelay: `${index * 0.08}s`,
      }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          border: '1px solid var(--border-subtle)',
          boxShadow: hovered ? 'var(--shadow-sm)' : 'none',
          minHeight: '120px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: 'box-shadow 0.2s ease',
        }}
      >
        <div>
          <h4 style={{
            fontSize: '15px',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '6px',
            fontFamily: 'var(--font-heading)',
          }}>
            {product.name}
          </h4>
          <p style={{
            fontSize: '13px',
            color: 'var(--text-muted)',
            lineHeight: 1.5,
            marginBottom: '12px',
            fontFamily: 'var(--font-body)',
          }}>
            {product.description}
          </p>
        </div>
        <div style={{
          fontSize: '13px',
          color: 'var(--accent-primary)',
          transition: 'transform 0.3s ease',
          transform: hovered ? 'translateX(3px)' : 'translateX(0)',
          fontWeight: 500,
          padding: '8px 0',
          fontFamily: 'var(--font-body)',
        }}>
          查看案例 →
        </div>
      </div>
    </div>
  )
}

function ProductDetailModal({ product }: { product: Product }) {
  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 600,
          color: 'var(--text-primary)',
          marginBottom: '8px',
          fontFamily: 'var(--font-heading)',
        }}>
          {product.name}
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>{product.description}</p>
      </div>

      {/* Detail sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <DetailBlock
          label="问题背景"
          content={product.detail.background}
          color="#e07070"
        />
        <DetailBlock
          label="解决方案"
          content={product.detail.solution}
          color="var(--accent-secondary)"
        />
        <DetailBlock
          label="效果数据"
          content={product.detail.result}
          color="var(--accent-primary)"
        />
      </div>

      {/* Metrics */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        marginTop: '28px',
        paddingTop: '20px',
        borderTop: '1px solid var(--border-subtle)',
      }}>
        {product.metrics.map((m, i) => (
          <span
            key={i}
            style={{
              fontSize: '13px',
              color: 'var(--accent-primary)',
              background: 'rgba(91,125,177,0.06)',
              padding: '6px 14px',
              borderRadius: 'var(--radius-md)',
              fontFamily: 'var(--font-body)',
            }}
          >
            {m}
          </span>
        ))}
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
    <div>
      <div style={{
        fontSize: '11px',
        color,
        letterSpacing: '0.1em',
        marginBottom: '8px',
        textTransform: 'uppercase',
        fontWeight: 600,
        fontFamily: 'var(--font-heading)',
      }}>
        {label}
      </div>
      <p style={{
        fontSize: '14px',
        color: 'var(--text-secondary)',
        lineHeight: 1.8,
        whiteSpace: 'pre-wrap',
        fontFamily: 'var(--font-body)',
      }}>
        {content}
      </p>
    </div>
  )
}
