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
  // Simulated effect for "看效果"
  effectPreview?: string
  effectMetrics?: string[]
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
  const [effectProduct, setEffectProduct] = useState<Product | null>(null)
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
              onSeeEffect={() => setEffectProduct(product)}
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
                  onSeeEffect={() => setEffectProduct(product)}
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

      {/* Effect Preview Modal */}
      {effectProduct && (
        <Modal onClose={() => setEffectProduct(null)}>
          <EffectPreviewModal product={effectProduct} />
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
  onSeeEffect,
}: {
  product: Product
  index: number
  visible: boolean
  onClick: () => void
  onSeeEffect: () => void
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

        {/* CTA — right aligned with two buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '16px',
          alignItems: 'center',
          fontSize: '14px',
          fontFamily: 'var(--font-body)',
        }}>
          <span
            onClick={(e) => { e.stopPropagation(); onSeeEffect() }}
            style={{
              color: 'var(--accent-secondary)',
              cursor: 'pointer',
              fontWeight: 500,
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#3d9e6f' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--accent-secondary)' }}
          >
            看效果 →
          </span>
          <span style={{
            color: 'var(--accent-primary)',
            transition: 'color 0.3s ease',
          }}>
            查看案例 <span style={{
              display: 'inline-block',
              transition: 'transform 0.3s ease',
              transform: hovered ? 'translateX(4px)' : 'translateX(0)',
            }}>→</span>
          </span>
        </div>
      </div>
    </div>
  )
}

function CompactCard({
  product,
  index,
  onClick,
  onSeeEffect,
}: {
  product: Product
  index: number
  onClick: () => void
  onSeeEffect: () => void
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
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
          fontSize: '13px',
          fontWeight: 500,
          padding: '8px 0',
          fontFamily: 'var(--font-body)',
        }}>
          <span
            onClick={(e) => { e.stopPropagation(); onSeeEffect() }}
            style={{
              color: 'var(--accent-secondary)',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              transform: hovered ? 'translateX(3px)' : 'translateX(0)',
            }}
          >
            看效果 →
          </span>
          <span style={{
            color: 'var(--accent-primary)',
            transition: 'transform 0.3s ease',
          }}>
            查看案例 →
          </span>
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

// ============ EFFECT PREVIEW MODAL ============
function EffectPreviewModal({ product }: { product: Product }) {
  const effectData = getEffectData(product.name)

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: 'var(--text-primary)',
          marginBottom: '4px',
          fontFamily: 'var(--font-heading)',
        }}>
          {product.name} — 效果预览
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
          {product.description}
        </p>
      </div>

      {/* Simulated screenshot placeholder */}
      <div style={{
        background: 'var(--bg-primary)',
        borderRadius: 'var(--radius-md)',
        padding: '40px 24px',
        textAlign: 'center',
        marginBottom: '24px',
        border: '2px dashed var(--border-medium)',
      }}>
        <div style={{ fontSize: '48px', marginBottom: '12px' }}>{effectData.icon}</div>
        <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 500 }}>
          {effectData.title}
        </div>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
          {effectData.description}
        </div>
      </div>

      {/* Before/After metrics */}
      <div style={{
        display: 'flex',
        gap: '16px',
        marginBottom: '20px',
        flexWrap: 'wrap',
      }}>
        <div style={{
          flex: 1,
          minWidth: '120px',
          background: '#fef5f5',
          borderRadius: 'var(--radius-md)',
          padding: '16px',
          textAlign: 'center',
          border: '1px solid rgba(224,112,112,0.2)',
        }}>
          <div style={{ fontSize: '11px', color: '#e07070', marginBottom: '6px', fontWeight: 600, letterSpacing: '0.05em' }}>BEFORE</div>
          <div style={{ fontSize: '22px', fontWeight: 700, color: '#e07070' }}>{effectData.before}</div>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          fontSize: '20px',
          color: 'var(--text-light)',
        }}>→</div>
        <div style={{
          flex: 1,
          minWidth: '120px',
          background: '#f0faf5',
          borderRadius: 'var(--radius-md)',
          padding: '16px',
          textAlign: 'center',
          border: '1px solid rgba(82,183,136,0.2)',
        }}>
          <div style={{ fontSize: '11px', color: '#52b788', marginBottom: '6px', fontWeight: 600, letterSpacing: '0.05em' }}>AFTER</div>
          <div style={{ fontSize: '22px', fontWeight: 700, color: '#52b788' }}>{effectData.after}</div>
        </div>
      </div>

      {/* Key results */}
      {effectData.results.length > 0 && (
        <div>
          <div style={{ fontSize: '11px', color: 'var(--accent-primary)', marginBottom: '8px', fontWeight: 600, letterSpacing: '0.05em' }}>
            关键结果
          </div>
          {effectData.results.map((r, i) => (
            <div key={i} style={{
              fontSize: '13px',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '4px',
              paddingLeft: '16px',
              position: 'relative',
            }}>
              <span style={{ position: 'absolute', left: '0', color: 'var(--accent-secondary)' }}>✓</span>
              {r}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Effect preview data for each product
function getEffectData(productName: string) {
  const data: Record<string, { icon: string; title: string; description: string; before: string; after: string; results: string[] }> = {
    'AI 经销商诊断': {
      icon: '🏥',
      title: '诊断报告生成界面',
      description: 'AI 读取经销商 KPI 数据 → 自动对比行业基准 → 生成评分和改进建议',
      before: '2 天/家',
      after: '10 分钟',
      results: ['35 家店诊断从 70 天压缩到 6 小时', '100+ 报告零差错', 'AI 自动识别风险指标'],
    },
    '雷克萨斯数据看板': {
      icon: '📊',
      title: '实时数据看板',
      description: '200+ 指标整合到一个页面，4 个数据源自动同步，打开即看',
      before: '2 小时/天',
      after: '0 秒',
      results: ['总部决策效率提升 10 倍', '零人工整理报表', '数据实时同步'],
    },
    '奔驰排课系统': {
      icon: '📅',
      title: '在线排课调度平台',
      description: '35 家店统一调度，讲师负载可视化，自动冲突检测',
      before: '人工协调 1 周',
      after: '1 键排课',
      results: ['排课效率提升 5 倍', '零冲突', '讲师资源利用率提升 40%'],
    },
    '知道社区数据周报': {
      icon: '📋',
      title: '自动化周报生成',
      description: '自动采集 PV/UV 数据，AI 生成分析结论，一键输出排版好的报告',
      before: '4 小时/周',
      after: '5 分钟',
      results: ['每周释放 4 小时', '数据 100% 准确', '零人工干预'],
    },
    'ES 日报自动化': {
      icon: '📈',
      title: '日报自动生成',
      description: '整合 4 个数据源，自动生成透视表和 Excel 日报，定时推送',
      before: '30 分钟/天',
      after: '10 秒',
      results: ['每天准时自动推送', '4 个数据源无缝整合', '零人工操作'],
    },
    '论坛自动巡检': {
      icon: '🔍',
      title: '全天候论坛监控',
      description: '自动抓取帖子，AI 分析异常内容，每天 17:30 定时推送报告',
      before: '2 小时/天',
      after: '0 人工',
      results: ['365 天无间断', '异常自动预警', '发现即推送'],
    },
    '汽车行业资讯速递': {
      icon: '📰',
      title: '行业资讯自动采集',
      description: '7 个信息源自动采集，AI 摘要生成 PDF，每 8 小时推送',
      before: '1 小时/天',
      after: '自动推送',
      results: ['覆盖全网重要资讯', 'AI 自动摘要', '零人工阅读'],
    },
    'AI 视频剪辑': {
      icon: '🎬',
      title: '本地 AI 视频分析',
      description: '本地部署视频分析工具，AI 驱动内容分析，语音自动转文字',
      before: '商业工具订阅费',
      after: '零订阅费',
      results: ['数据完全本地', '零订阅费用', 'AI 辅助剪辑提效'],
    },
    '本地 AI 智能代理环境': {
      icon: '🤖',
      title: '本地 AI 工作环境',
      description: '全流程本地推理，数据不出本机，7×24 可用',
      before: '依赖云端',
      after: '完全本地',
      results: ['数据零泄露风险', '全天候可用', '多模型协同工作'],
    },
    '麻明第一款小程序': {
      icon: '📱',
      title: 'AI 辅助小程序开发',
      description: '用 AI 辅助从 0 到 1 完成小程序开发，全流程 AI 辅助',
      before: '不懂开发',
      after: '完整产品上线',
      results: ['AI 辅助全链路开发', '从需求到上线', '验证 AI 辅助开发可行性'],
    },
    '小红书爆款扫描器': {
      icon: '📕',
      title: '爆款标题分析',
      description: '自动抓取热门内容，AI 分析标题规律和爆款特征',
      before: '手动分析',
      after: '自动化提取',
      results: ['爆款特征自动识别', '标题规律数据库', '辅助内容创作'],
    },
    '股票监控双智能代理': {
      icon: '💹',
      title: '持仓实时监控',
      description: '双智能代理架构：风控实时监控 + 策略分析，异常即时提醒',
      before: '手动盯盘',
      after: 'AI 自动监控',
      results: ['9 只股票实时监控', '风控指标异常即时提醒', 'AI 辅助决策'],
    },
  }

  return data[productName] || {
    icon: '🚀',
    title: '效果预览',
    description: productName + ' 效果预览',
    before: '—',
    after: '—',
    results: [],
  }
}
