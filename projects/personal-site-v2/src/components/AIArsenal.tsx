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
        padding: isMobile ? '80px 20px' : 'clamp(80px, 12vw, 160px) 60px',
        background: '#f0f2f7',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
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
            02 — 精选产品
          </div>
          <h2 style={{
            fontSize: isMobile ? '32px' : 'clamp(40px, 6vw, 64px)',
            fontWeight: 800,
            color: '#1e2a3a',
            marginBottom: '16px',
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
          }}>
            {arsenal.title}
          </h2>
          <p style={{
            fontSize: 'clamp(15px, 2vw, 18px)',
            color: '#888',
            lineHeight: 1.6,
          }}>
            {arsenal.subtitle}
          </p>
        </div>

        {/* Flagship Cards — full width, stacked */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? '20px' : '32px',
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
          marginTop: '48px',
          opacity: visible ? 1 : 0,
          transition: 'opacity 1s ease 0.5s',
        }}>
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              background: 'transparent',
              border: '1px solid rgba(0,0,0,0.12)',
              borderRadius: '100px',
              padding: '12px 32px',
              fontSize: '14px',
              color: '#6b7a8d',
              cursor: 'pointer',
              transition: 'all 0.5s ease',
              letterSpacing: '0.03em',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#5b7db1'
              e.currentTarget.style.color = '#5b7db1'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)'
              e.currentTarget.style.color = '#6b7a8d'
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
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
      role="button"
      tabIndex={0}
      style={{
        background: '#ffffff',
        borderRadius: isMobile ? '16px' : '20px',
        padding: isMobile ? '24px' : 'clamp(32px, 5vw, 48px)',
        cursor: 'pointer',
        transition: 'all 0.6s ease',
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(20px)',
        transitionDelay: `${index * 0.12}s`,
        boxShadow: hovered ? '0 16px 48px rgba(0,0,0,0.06)' : '0 2px 12px rgba(0,0,0,0.03)',
        border: '1px solid rgba(0,0,0,0.06)',
      }}
    >
      {/* Product name — big */}
      <h3 style={{
        fontSize: 'clamp(20px, 3vw, 28px)',
        fontWeight: 700,
        color: '#1e2a3a',
        marginBottom: '12px',
        lineHeight: 1.3,
        letterSpacing: '-0.02em',
      }}>
        {product.name}
      </h3>

      {/* Description — gray, readable */}
      <p style={{
        fontSize: 'clamp(14px, 1.8vw, 16px)',
        color: '#888',
        lineHeight: 1.7,
        marginBottom: '28px',
        maxWidth: '600px',
      }}>
        {product.description}
      </p>

      {/* Metrics — big numbers */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: isMobile ? '16px' : '24px',
        marginBottom: isMobile ? '20px' : '28px',
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
                  fontSize: isMobile ? '24px' : 'clamp(28px, 4vw, 48px)',
                  fontWeight: 800,
                  color: '#1e2a3a',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                }}>
                  {m.before}
                </span>
                <span style={{
                  fontSize: isMobile ? '14px' : '18px',
                  color: '#bbb',
                  fontWeight: 300,
                }}>→</span>
                <span style={{
                  fontSize: isMobile ? '24px' : 'clamp(28px, 4vw, 48px)',
                  fontWeight: 800,
                  color: '#52b788',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                }}>
                  {m.after}
                </span>
              </div>
            ) : (
              <div style={{
                fontSize: isMobile ? '24px' : 'clamp(28px, 4vw, 48px)',
                fontWeight: 800,
                color: '#5b7db1',
                letterSpacing: '-0.03em',
                lineHeight: 1,
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
        color: '#5b7db1',
        transition: 'color 0.5s ease',
      }}>
        查看案例 <span style={{
          display: 'inline-block',
          transition: 'transform 0.5s ease',
          transform: hovered ? 'translateX(4px)' : 'translateX(0)',
        }}>→</span>
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
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
      role="button"
      tabIndex={0}
      style={{
        background: '#ffffff',
        borderRadius: '12px',
        padding: '24px',
        cursor: 'pointer',
        transition: 'all 0.5s ease',
        border: hovered ? '1px solid #5b7db1' : '1px solid rgba(0,0,0,0.06)',
        boxShadow: hovered ? '0 4px 16px rgba(0,0,0,0.04)' : 'none',
        animationDelay: `${index * 0.08}s`,
      }}
    >
      <h4 style={{
        fontSize: '15px',
        fontWeight: 600,
        color: '#1e2a3a',
        marginBottom: '6px',
      }}>
        {product.name}
      </h4>
      <p style={{
        fontSize: '13px',
        color: '#999',
        lineHeight: 1.5,
        marginBottom: '12px',
      }}>
        {product.description}
      </p>
      <div style={{
        fontSize: '12px',
        color: '#5b7db1',
      }}>
        查看案例 →
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
          fontWeight: 700,
          color: '#1e2a3a',
          marginBottom: '8px',
        }}>
          {product.name}
        </h2>
        <p style={{ fontSize: '15px', color: '#888', lineHeight: 1.6 }}>{product.description}</p>
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
          color="#52b788"
        />
        <DetailBlock
          label="效果数据"
          content={product.detail.result}
          color="#5b7db1"
        />
      </div>

      {/* Metrics */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        marginTop: '28px',
        paddingTop: '20px',
        borderTop: '1px solid #f0f0f0',
      }}>
        {product.metrics.map((m, i) => (
          <span
            key={i}
            style={{
              fontSize: '13px',
              color: '#5b7db1',
              background: 'rgba(91,125,177,0.06)',
              padding: '6px 14px',
              borderRadius: '8px',
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
      }}>
        {label}
      </div>
      <p style={{
        fontSize: '14px',
        color: '#666',
        lineHeight: 1.8,
        whiteSpace: 'pre-wrap',
      }}>
        {content}
      </p>
    </div>
  )
}
