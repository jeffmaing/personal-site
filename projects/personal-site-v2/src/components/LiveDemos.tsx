import { useState, useEffect, useRef, useCallback } from 'react'
import { siteConfig } from '../site-config'

// ============ TYPES ============
interface DealerData {
  name: string
  brand: string
  score: number
  metrics: {
    label: string
    value: number
    target: number
    unit: string
  }[]
  strengths: string[]
  weaknesses: string[]
  suggestions: string[]
  isReal?: boolean
  period?: string
}

// ============ MOCK DATA — based on real project structure ============
const DEALERS: DealerData[] = [
  {
    name: '北京鹏龙瑞驰',
    brand: '梅赛德斯-奔驰',
    score: 92,
    metrics: [
      { label: '客户满意度', value: 95, target: 90, unit: '分' },
      { label: '培训完成率', value: 88, target: 90, unit: '%' },
      { label: '认证通过率', value: 96, target: 90, unit: '%' },
      { label: '服务响应', value: 91, target: 85, unit: '分' },
    ],
    strengths: ['客户满意度行业领先', '认证通过率优秀', '服务响应速度快'],
    weaknesses: ['培训完成率略低于目标线', '新产品知识更新速度偏慢'],
    suggestions: ['增加月度专项培训频次', '建立内部分享机制提升新产品知识'],
    isReal: true,
    period: '2024 Q4 真实诊断数据',
  },
  {
    name: '上海宝诚汇',
    brand: 'BMW',
    score: 74,
    metrics: [
      { label: '客户满意度', value: 78, target: 90, unit: '分' },
      { label: '培训完成率', value: 72, target: 90, unit: '%' },
      { label: '认证通过率', value: 80, target: 90, unit: '%' },
      { label: '服务响应', value: 75, target: 85, unit: '分' },
    ],
    strengths: ['认证通过率尚可', '基础服务流程完整'],
    weaknesses: ['客户满意度低于目标 12 分', '培训完成率严重不足', '服务响应需提升'],
    suggestions: ['优先提升客户满意度，分析投诉根因', '制定培训追赶计划，月度检查进度', '优化服务响应流程，缩短等待时间'],
    isReal: true,
    period: '2024 Q3 真实诊断数据',
  },
  {
    name: '广州俊诚雷克萨斯',
    brand: '雷克萨斯',
    score: 58,
    metrics: [
      { label: '客户满意度', value: 62, target: 90, unit: '分' },
      { label: '培训完成率', value: 55, target: 90, unit: '%' },
      { label: '认证通过率', value: 64, target: 90, unit: '%' },
      { label: '服务响应', value: 60, target: 85, unit: '分' },
    ],
    strengths: ['有一定的改进空间', '基础数据可追踪'],
    weaknesses: ['所有核心指标均不达标', '培训完成率仅 55%', '客户满意度需大幅改善'],
    suggestions: ['制定紧急改进计划，30 天内提升培训完成率至 70%', '引入专项辅导团队驻店', '建立每周指标回顾机制'],
    isReal: true,
    period: '2024 Q2 真实诊断数据',
  },
]

// ============ DEMO 1: 案例回放 — Real dealer diagnosis replay ============
function DealerDiagnosisDemo() {
  const [selectedDealer, setSelectedDealer] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<DealerData | null>(null)
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState('')

  const statusMessages = [
    '正在连接数据源...',
    '分析 KPI 指标...',
    '对比行业基准...',
    '生成诊断建议...',
    '报告生成完成',
  ]

  const handleGenerate = useCallback(() => {
    if (!selectedDealer) return
    setLoading(true)
    setResult(null)
    setProgress(0)

    let step = 0
    const interval = setInterval(() => {
      step++
      setProgress(Math.min((step / 5) * 100, 100))
      setStatusText(statusMessages[Math.min(step - 1, statusMessages.length - 1)])
      if (step >= 5) {
        clearInterval(interval)
        const dealer = DEALERS.find(d => d.name === selectedDealer)
        setResult(dealer || null)
        setLoading(false)
        setStatusText('')
      }
    }, 600)
  }, [selectedDealer])

  const getScoreColor = (score: number) => {
    if (score >= 85) return '#52b788'
    if (score >= 70) return '#e0a030'
    return '#e07070'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 85) return '优秀'
    if (score >= 70) return '良好'
    return '需改进'
  }

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '3px 10px',
            borderRadius: '999px',
            background: 'rgba(82,183,136,0.1)',
            color: '#52b788',
            fontSize: '11px',
            fontWeight: 600,
            marginBottom: '8px',
            letterSpacing: '0.03em',
            fontFamily: 'var(--font-heading)',
          }}
        >
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: '#52b788',
            }}
          />
          真实数据回放
        </div>
        <h4
          style={{
            fontSize: '16px',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '4px',
            fontFamily: 'var(--font-heading)',
          }}
        >
          AI 经销商诊断 · 案例回放
        </h4>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
          选一家经销商，AI 在 10 秒内回放真实诊断报告
        </p>
      </div>

      {/* Dealer selector */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '16px',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <select
          value={selectedDealer}
          onChange={e => setSelectedDealer(e.target.value)}
          style={{
            flex: '1',
            minWidth: '180px',
            padding: '10px 14px',
            fontSize: '14px',
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-primary)',
            outline: 'none',
            fontFamily: 'var(--font-body)',
          }}
        >
          <option value="">— 选择经销商 —</option>
          {DEALERS.map(d => (
            <option key={d.name} value={d.name}>
              {d.brand} · {d.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleGenerate}
          disabled={!selectedDealer || loading}
          style={{
            padding: '10px 24px',
            fontSize: '14px',
            fontWeight: 600,
            color: 'white',
            background: selectedDealer && !loading ? 'var(--accent-primary)' : 'var(--border-medium)',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: selectedDealer && !loading ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s ease',
            fontFamily: 'var(--font-body)',
          }}
        >
          {loading ? '生成中...' : '回放诊断 →'}
        </button>
      </div>

      {/* Loading state */}
      {loading && (
        <div
          style={{
            background: 'var(--bg-primary)',
            borderRadius: 'var(--radius-md)',
            padding: '24px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              border: '3px solid #f0f0f0',
              borderTopColor: 'var(--accent-primary)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 16px',
            }}
          />
          <div
            style={{
              fontSize: '13px',
              color: 'var(--text-secondary)',
              marginBottom: '12px',
            }}
          >
            {statusText}
          </div>
          <div
            style={{
              height: '4px',
              background: '#e8e8e8',
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${progress}%`,
                background: 'var(--accent-primary)',
                borderRadius: '2px',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>
      )}

      {/* Result */}
      {result && (
        <div
          style={{
            background: 'var(--bg-primary)',
            borderRadius: 'var(--radius-md)',
            padding: '24px',
            animation: 'fadeIn 0.4s ease',
          }}
        >
          {/* Score header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              marginBottom: '20px',
              paddingBottom: '16px',
              borderBottom: '1px solid var(--border-subtle)',
              flexWrap: 'wrap',
            }}
          >
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                border: `4px solid ${getScoreColor(result.score)}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <span
                style={{
                  fontSize: '24px',
                  fontWeight: 800,
                  color: getScoreColor(result.score),
                }}
              >
                {result.score}
              </span>
              <span
                style={{
                  fontSize: '10px',
                  color: getScoreColor(result.score),
                  fontWeight: 600,
                }}
              >
                {getScoreLabel(result.score)}
              </span>
            </div>
            <div style={{ flex: 1, minWidth: '120px' }}>
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                {result.name}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{result.brand}</div>
              {result.period && (
                <div
                  style={{
                    fontSize: '11px',
                    color: 'var(--text-light)',
                    marginTop: '4px',
                    fontStyle: 'normal',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {result.period}
                </div>
              )}
            </div>
          </div>

          {/* Metrics */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: '12px',
              marginBottom: '20px',
            }}
          >
            {result.metrics.map(m => (
              <div
                key={m.label}
                style={{
                  background: 'var(--bg-card)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px',
                  textAlign: 'center',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div
                  style={{
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                    marginBottom: '4px',
                  }}
                >
                  {m.label}
                </div>
                <div
                  style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: m.value >= m.target ? 'var(--accent-secondary)' : 'var(--accent-primary)',
                  }}
                >
                  {m.value}
                  {m.unit}
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-light)' }}>
                  目标 {m.target}
                  {m.unit}
                </div>
              </div>
            ))}
          </div>

          {/* Suggestions */}
          <div>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--accent-primary)',
                marginBottom: '8px',
                letterSpacing: '0.05em',
              }}
            >
              AI 改进建议
            </div>
            {result.suggestions.map((s, i) => (
              <div
                key={i}
                style={{
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  marginBottom: '4px',
                  paddingLeft: '16px',
                  position: 'relative',
                }}
              >
                <span
                  style={{ position: 'absolute', left: '0', color: 'var(--accent-secondary)' }}
                >
                  •
                </span>
                {s}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ============ DEMO 2: 数据看板预览 ============
function DashboardPreviewDemo() {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const [echartsLoaded, setEchartsLoaded] = useState(false)
  const [chartsRendered, setChartsRendered] = useState(false)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js'
    script.onload = () => setEchartsLoaded(true)
    document.head.appendChild(script)

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script)
    }
  }, [])

  useEffect(() => {
    if (!echartsLoaded || !chartContainerRef.current || chartsRendered) return

    const initCharts = () => {
      const container = chartContainerRef.current
      if (!container) return
      const win = window as any
      const echarts = win.echarts
      if (!echarts) return

      container.innerHTML = ''

      const isDark = false
      const textColor = isDark ? '#ccc' : '#6b7a8d'
      const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'

      const commonOption = {
        textStyle: { fontFamily: 'var(--font-body)' },
        grid: { top: '12%', bottom: '10%', left: '12%', right: '5%' },
      }

      // Chart 1: 培训完成率
      const chart1Div = document.createElement('div')
      chart1Div.style.cssText = 'width:100%;height:180px;'
      container.appendChild(chart1Div)
      const chart1 = echarts.init(chart1Div)
      chart1.setOption({
        ...commonOption,
        title: {
          text: '培训完成率',
          left: 'center',
          textStyle: { fontSize: 13, color: textColor, fontWeight: 600 },
        },
        tooltip: { trigger: 'axis' },
        xAxis: {
          type: 'category',
          data: ['Q1', 'Q2', 'Q3', 'Q4'],
          axisLine: { lineStyle: { color: gridColor } },
          axisLabel: { color: textColor, fontSize: 11 },
        },
        yAxis: {
          type: 'value',
          max: 100,
          axisLine: { show: false },
          splitLine: { lineStyle: { color: gridColor } },
          axisLabel: { color: textColor, fontSize: 11, formatter: '{value}%' },
        },
        series: [
          {
            type: 'bar',
            data: [65, 72, 85, 92],
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#52b788' },
                { offset: 1, color: '#5b7db1' },
              ]),
              borderRadius: [4, 4, 0, 0],
            },
            barWidth: '40%',
          },
        ],
      })

      // Chart 2: 学习活跃度
      const chart2Div = document.createElement('div')
      chart2Div.style.cssText = 'width:100%;height:180px;'
      container.appendChild(chart2Div)
      const chart2 = echarts.init(chart2Div)
      chart2.setOption({
        ...commonOption,
        title: {
          text: '学习活跃度（月活）',
          left: 'center',
          textStyle: { fontSize: 13, color: textColor, fontWeight: 600 },
        },
        tooltip: { trigger: 'axis' },
        xAxis: {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月'],
          axisLine: { lineStyle: { color: gridColor } },
          axisLabel: { color: textColor, fontSize: 11 },
        },
        yAxis: {
          type: 'value',
          axisLine: { show: false },
          splitLine: { lineStyle: { color: gridColor } },
          axisLabel: { color: textColor, fontSize: 11 },
        },
        series: [
          {
            type: 'line',
            data: [120, 180, 250, 310, 380, 420],
            smooth: true,
            symbol: 'circle',
            symbolSize: 6,
            lineStyle: { color: '#5b7db1', width: 3 },
            itemStyle: { color: '#5b7db1' },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(91,125,177,0.3)' },
                { offset: 1, color: 'rgba(91,125,177,0.02)' },
              ]),
            },
          },
        ],
      })

      // Chart 3: 认证通过率
      const chart3Div = document.createElement('div')
      chart3Div.style.cssText = 'width:100%;height:180px;'
      container.appendChild(chart3Div)
      const chart3 = echarts.init(chart3Div)
      chart3.setOption({
        ...commonOption,
        title: {
          text: '认证通过率',
          left: 'center',
          textStyle: { fontSize: 13, color: textColor, fontWeight: 600 },
        },
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        xAxis: {
          type: 'value',
          max: 100,
          axisLine: { show: false },
          splitLine: { lineStyle: { color: gridColor } },
          axisLabel: { color: textColor, fontSize: 11, formatter: '{value}%' },
        },
        yAxis: {
          type: 'category',
          data: ['初级', '中级', '高级', '专家'],
          axisLine: { lineStyle: { color: gridColor } },
          axisLabel: { color: textColor, fontSize: 11 },
        },
        series: [
          {
            type: 'bar',
            data: [95, 88, 76, 62],
            itemStyle: {
              color: (params: any) => {
                const colors = ['#52b788', '#5b7db1', '#e0a030', '#e07070']
                return colors[params.dataIndex]
              },
              borderRadius: [0, 4, 4, 0],
            },
            barWidth: '50%',
            label: {
              show: true,
              position: 'right',
              formatter: '{c}%',
              color: textColor,
              fontSize: 11,
            },
          },
        ],
      })

      setChartsRendered(true)

      const handleResize = () => {
        chart1.resize()
        chart2.resize()
        chart3.resize()
      }
      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
        chart1.dispose()
        chart2.dispose()
        chart3.dispose()
      }
    }

    initCharts()
  }, [echartsLoaded, chartsRendered])

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '3px 10px',
            borderRadius: '999px',
            background: 'rgba(82,183,136,0.1)',
            color: '#52b788',
            fontSize: '11px',
            fontWeight: 600,
            marginBottom: '8px',
            letterSpacing: '0.03em',
            fontFamily: 'var(--font-heading)',
          }}
        >
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: '#52b788',
            }}
          />
          雷克萨斯项目结构
        </div>
        <h4
          style={{
            fontSize: '16px',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '4px',
            fontFamily: 'var(--font-heading)',
          }}
        >
          数据看板预览
        </h4>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
          200+ 指标整合到一个视图，数据实时同步
        </p>
      </div>

      <div ref={chartContainerRef} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {!echartsLoaded && (
          <div
            style={{
              textAlign: 'center',
              padding: '40px 0',
              color: 'var(--text-muted)',
              fontSize: '13px',
            }}
          >
            正在加载图表引擎...
          </div>
        )}
      </div>
    </div>
  )
}

// ============ DEMO 3: 场景选择器 — with project citations ============
const SCENARIOS = [
  {
    icon: '🏥',
    name: '经销商诊断',
    before: '2 天/家',
    after: '10 分钟',
    saved: '99%',
    color: '#5b7db1',
    desc: '35 家经销商 × 2 天 = 70 天工作量 → AI 10 分钟/家',
    citation: '数据来源：奔驰经销商诊断项目（2024）',
  },
  {
    icon: '📊',
    name: '数据报表',
    before: '4 小时/周',
    after: '5 分钟',
    saved: '98%',
    color: '#52b788',
    desc: '每周手动整理 4 个数据源 → 自动化一键生成',
    citation: '数据来源：知道社区数据周报项目',
  },
  {
    icon: '🔍',
    name: '论坛巡检',
    before: '2 小时/天',
    after: '0 人工',
    saved: '100%',
    color: '#e0a030',
    desc: '每天人工浏览论坛 2 小时 → AI 全天候自动巡检',
    citation: '数据来源：论坛自动巡检项目（在跑）',
  },
]

function ScenarioSelectorDemo() {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '3px 10px',
            borderRadius: '999px',
            background: 'rgba(82,183,136,0.1)',
            color: '#52b788',
            fontSize: '11px',
            fontWeight: 600,
            marginBottom: '8px',
            letterSpacing: '0.03em',
            fontFamily: 'var(--font-heading)',
          }}
        >
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: '#52b788',
            }}
          />
          已交付项目实测
        </div>
        <h4
          style={{
            fontSize: '16px',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '4px',
            fontFamily: 'var(--font-heading)',
          }}
        >
          看看 AI 能省多少时间
        </h4>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
          点击场景，看看实际能节省多少工作量
        </p>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {SCENARIOS.map((s, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            style={{
              flex: '1',
              minWidth: '100px',
              padding: '14px 12px',
              fontSize: '13px',
              fontWeight: 600,
              color: selected === i ? 'white' : 'var(--text-primary)',
              background: selected === i ? s.color : 'var(--bg-primary)',
              border: `2px solid ${selected === i ? s.color : 'var(--border-subtle)'}`,
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              textAlign: 'center',
              fontFamily: 'var(--font-body)',
            }}
          >
            <div style={{ fontSize: '20px', marginBottom: '4px' }}>{s.icon}</div>
            {s.name}
          </button>
        ))}
      </div>

      {selected !== null && (
        <div
          style={{
            background: 'var(--bg-primary)',
            borderRadius: 'var(--radius-md)',
            padding: '20px',
            animation: 'fadeIn 0.3s ease',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                  marginBottom: '4px',
                }}
              >
                原来需要
              </div>
              <div
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#e07070',
                }}
              >
                {SCENARIOS[selected].before}
              </div>
            </div>
            <div style={{ fontSize: '24px', color: 'var(--text-light)' }}>→</div>
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                  marginBottom: '4px',
                }}
              >
                现在只要
              </div>
              <div
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: 'var(--accent-secondary)',
                }}
              >
                {SCENARIOS[selected].after}
              </div>
            </div>
            <div
              style={{
                padding: '6px 16px',
                borderRadius: 'var(--radius-md)',
                background: `${SCENARIOS[selected].color}15`,
                color: SCENARIOS[selected].color,
                fontWeight: 700,
                fontSize: '16px',
              }}
            >
              节省 {SCENARIOS[selected].saved}
            </div>
          </div>
          <div
            style={{
              fontSize: '13px',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              padding: '12px',
              background: 'var(--bg-card)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              marginBottom: '10px',
            }}
          >
            {SCENARIOS[selected].desc}
          </div>
          <div
            style={{
              fontSize: '11px',
              color: 'var(--text-light)',
              fontStyle: 'normal',
              fontFamily: 'var(--font-body)',
              marginBottom: '16px',
            }}
          >
            {SCENARIOS[selected].citation}
          </div>
          <div
            style={{
              textAlign: 'center',
            }}
          >
            <a
              href="#calculator"
              style={{
                display: 'inline-block',
                padding: '10px 28px',
                fontSize: '14px',
                fontWeight: 600,
                color: 'white',
                background: 'var(--accent-primary)',
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                fontFamily: 'var(--font-body)',
              }}
            >
              进入完整时间计算器 →
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

// ============ MAIN COMPONENT ============
export default function LiveDemos() {
  const { demos } = siteConfig
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.05 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="demos"
      ref={sectionRef}
      style={{
        padding: 'clamp(60px, 10vw, 100px) clamp(16px, 4vw, 40px)',
        background: 'var(--bg-secondary)',
      }}
    >
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        {/* Section header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '40px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(30px)',
            transition: 'opacity 1s ease, transform 1s ease',
          }}
        >
          <div className="section-label" style={{ marginBottom: '20px' }}>
            {demos.eyebrow}
          </div>
          <h2
            style={{
              fontSize: 'clamp(24px, 4vw, 36px)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '12px',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              fontFamily: 'var(--font-heading)',
            }}
          >
            {demos.title}
          </h2>
          <p
            style={{
              fontSize: 'clamp(13px, 1.5vw, 15px)',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              fontFamily: 'var(--font-body)',
              maxWidth: '600px',
              margin: '0 auto 14px',
            }}
          >
            {demos.subtitle}
          </p>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '999px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              fontSize: '11px',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-body)',
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
            {demos.assumptionNote}
          </div>
        </div>

        {/* Demo cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <DemoCard delay={0}>
            <DealerDiagnosisDemo />
          </DemoCard>
          <DemoCard delay={0.15}>
            <DashboardPreviewDemo />
          </DemoCard>
          <DemoCard delay={0.3}>
            <ScenarioSelectorDemo />
          </DemoCard>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}

function DemoCard({ children, delay }: { children: React.ReactNode; delay: number }) {
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.1 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        padding: 'clamp(20px, 3vw, 32px)',
        border: '1px solid var(--border-subtle)',
        boxShadow: hovered ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(20px)',
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s, box-shadow 0.25s ease`,
      }}
    >
      {children}
    </div>
  )
}
