import { useState, useRef, useEffect } from 'react'

// ============================================================
// OpenMythos-inspired Design Patterns Applied:
// 1. Input Injection — 原始输入始终注入每阶段
// 2. Loop Index Embedding — 阶段标记引导行为分层
// 3. ACT Adaptive Halting — 根据置信度决定是否精炼
// 4. MoE Routing — 领域识别选择对应系统 Prompt
// 5. Stability Constraint — 输出边界约束
// ============================================================

const BASE_SYSTEM_PROMPT = `你是麻明的 AI 分身，代表麻明与访客对话。

【身份】
19年汽车行业咨询老兵 | 前奔驰·英菲尼迪·安永·易车 → 现港泓咨询 AI 咨询总监

【实战项目】
- 小鹏智能助手 POC / 宝马金融 AI 项目
- 奔驰经销商高密度落地方案
- 雷克萨斯新媒体运营体系 / 易慧数字员工体系

【AI 哲学】
AI 是"数字牛马"——水质好了，养什么都能活。
Harness Engineering 四件套：动态上下文、框架约束、循环反馈、定期清理

【回答规则】
- 先给结论，再给证据
- 用第一人称代表麻明
- 控制在 3-5 句话
- 语气专业但不死板，像资深从业者在聊天
- 想了解更多时引导联系：jeffmaming@163.com

【底线】不准编数据、不准编经历，不知道就说不知道`

const DOMAIN_PROMPTS: Record<string, string> = {
  auto: '请侧重汽车经销商运营、巡检体系、试驾交车SOP等专业视角回答。',
  ai: '请侧重 AI 产品设计、对话逻辑、智能助手落地等专业视角回答。',
  consulting: '请侧重咨询方法论、项目管理、客户交付等专业视角回答。',
  career: '请侧重职业发展、行业趋势、转型建议等专业视角回答。',
}

function detectDomain(input: string): string {
  const l = input.toLowerCase()
  if (l.match(/奔驰|宝马|bmw|雷克萨斯|小鹏|经销商|试驾|交车|sop|巡检|新媒体|运营|店次/)) return 'auto'
  if (l.match(/\bai\b|智能助手|对话|产品|落地|ai 哲学|数字牛马|harness|数字员工/)) return 'ai'
  if (l.match(/咨询|方法论|项目|交付|管理|方案|合作/)) return 'consulting'
  if (l.match(/职业|跳槽|转型|发展|建议|简历|面试|行业/)) return 'career'
  return 'shared'
}

function buildStage1Prompt(originalInput: string, domain: string): string {
  const domainHint = DOMAIN_PROMPTS[domain] || ''
  return `【Phase 1/2 — 理解与分析】
原始问题：${originalInput}

请先在内心分析：
1. 用户真正想问的是什么？
2. 我的经历中哪些相关？
3. 回答需要包含哪些关键点？

${domainHint ? '专业方向：' + domainHint : ''}
完成分析后，给出简洁有力的回答。`
}

function buildStage2Prompt(originalInput: string, stage1: string, confidence: number): string {
  if (confidence >= 0.9) return ''
  return `【Phase 2/2 — 自我精炼】
原始问题：${originalInput}
你的初稿：
${stage1}

请检查：
1. 是否直接回答了用户的问题？
2. 有没有编造信息？
3. 语言是否够简洁有力？
如有问题，请修正后输出最终回答。如无问题，直接复述初稿。`
}

function estimateConfidence(response: string, userInput: string): number {
  let score = 0.5
  if (response.length > 30) score += 0.15
  if (!response.match(/不确定|抱歉|不知道/)) score += 0.15
  if (response.length <= 300) score += 0.1
  const userWords = userInput.replace(/[？?！!，,。、\s]/g, '').toLowerCase()
  const replyLower = response.toLowerCase()
  const overlap = userWords.split('').filter(c => replyLower.includes(c)).length
  if (overlap > userWords.length * 0.3) score += 0.1
  return Math.min(score, 1.0)
}

interface Message {
  role: 'user' | 'assistant' | 'thinking'
  content: string
}

// ===== Ollama 本地调用 =====
const callOllama = async (messages: any[]): Promise<string> => {
  const res = await fetch('http://localhost:11434/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'qwen3:8b',
      messages,
      stream: false,
    }),
  })
  const data = await res.json()
  return data.message?.content || ''
}

// ===== 百炼云端调用（兜底） =====
const callBailian = async (systemPrompt: string, messages: any[]): Promise<string> => {
  const apiKey = import.meta.env.VITE_DASHSCOPE_API_KEY || ''
  if (!apiKey) return ''
  const res = await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'qwen3.6-plus',
      messages: [{ role: 'system', content: systemPrompt }, ...messages],
      temperature: 0.7,
      max_tokens: 1000,
    }),
  })
  const data = await res.json()
  return data.choices?.[0]?.message?.content || ''
}

// ===== 智能路由：本地优先，云端兜底 =====
const callAI = async (
  systemPrompt: string,
  userMessages: any[],
  fullHistory: any[]
): Promise<string> => {
  // 先试本地 Ollama
  try {
    const ollamaMessages = [{ role: 'system', content: systemPrompt }, ...fullHistory]
    const reply = await callOllama(ollamaMessages)
    if (reply) return reply
  } catch {
    // Ollama 不可用，静默失败
  }

  // 兜底：百炼云端
  try {
    const reply = await callBailian(systemPrompt, userMessages)
    if (reply) return reply
  } catch {
    // 云端也失败
  }

  return ''
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [useLocal, setUseLocal] = useState<boolean | null>(null) // null=检测中
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 375)
  const messagesEnd = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const h = () => setW(window.innerWidth)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // 检测本地 Ollama 是否可用
  useEffect(() => {
    fetch('http://localhost:11434/api/tags', { signal: AbortSignal.timeout(2000) })
      .then(() => setUseLocal(true))
      .catch(() => setUseLocal(false))
  }, [])

  const isMobile = w < 480

  const handleSend = async () => {
    if (!input.trim() || loading) return
    const userMsg: Message = { role: 'user', content: input.trim() }
    const userInput = input.trim()
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const domain = detectDomain(userInput)
      const stage1Prompt = buildStage1Prompt(userInput, domain)
      const history = messages.filter(m => m.role !== 'thinking').slice(-6)

      // Stage 1: 理解与分析
      setMessages(prev => [...prev, { role: 'thinking', content: useLocal ? '💻 本地 AI 思考中...' : '☁️ 云端 AI 思考中...' }])
      const stage1Resp = await callAI(BASE_SYSTEM_PROMPT, [
        { role: 'user', content: stage1Prompt },
        ...history,
        userMsg,
      ], [
        { role: 'system', content: BASE_SYSTEM_PROMPT },
        ...history,
        userMsg,
      ])
      setMessages(prev => prev.filter(m => m.role !== 'thinking'))

      if (!stage1Resp) {
        setMessages(prev => [...prev, { role: 'assistant', content: '抱歉，AI 引擎暂时不可用。本地 Ollama 未运行且云端 API Key 未配置。' }])
        setLoading(false)
        return
      }

      const confidence = estimateConfidence(stage1Resp, userInput)
      let finalReply = stage1Resp

      if (confidence < 0.9) {
        setMessages(prev => [...prev, { role: 'thinking', content: '正在精炼回答...' }])
        const stage2Prompt = buildStage2Prompt(userInput, stage1Resp, confidence)
        if (stage2Prompt) {
          const stage2Resp = await callAI(BASE_SYSTEM_PROMPT, [
            { role: 'user', content: stage2Prompt },
          ], [
            { role: 'system', content: BASE_SYSTEM_PROMPT },
            { role: 'user', content: stage2Prompt },
          ])
          if (stage2Resp) finalReply = stage2Resp
        }
        setMessages(prev => prev.filter(m => m.role !== 'thinking'))
      }

      setMessages(prev => [...prev, { role: 'assistant', content: finalReply }])
    } catch {
      setMessages(prev => prev.filter(m => m.role !== 'thinking'))
      setMessages(prev => [...prev, { role: 'assistant', content: '抱歉，我暂时无法回复，请稍后再试。' }])
    } finally {
      setLoading(false)
    }
  }

  const quickQuestions = [
    '你最近在忙什么项目？',
    '雷克萨斯新媒体怎么做？',
    '宝马/小鹏 AI 项目怎么落地？',
    '能不能聊聊合作？',
  ]

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            position: 'fixed', bottom: isMobile ? 20 : 24, right: isMobile ? 16 : 24,
            width: isMobile ? 52 : 56, height: isMobile ? 52 : 56,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%)',
            color: 'white', border: 'none',
            boxShadow: '0 4px 20px rgba(26,26,46,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', zIndex: 10000,
            transition: 'transform 0.3s',
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          aria-label="和麻明聊聊"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      )}

      {/* Chat Panel */}
      {open && (
        <div style={{
          position: 'fixed',
          bottom: isMobile ? 0 : 24,
          right: isMobile ? 0 : 24,
          left: isMobile ? 0 : 'auto',
          width: isMobile ? '100%' : 380,
          height: isMobile ? '100%' : 600,
          maxHeight: isMobile ? '100vh' : 600,
          background: '#fafafa',
          borderRadius: isMobile ? 0 : 20,
          boxShadow: isMobile ? 'none' : '0 8px 40px rgba(0,0,0,0.12)',
          display: 'flex', flexDirection: 'column',
          zIndex: 10001,
          overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{
            padding: isMobile ? '16px 16px 12px' : '16px 20px 12px',
            background: '#1a1a2e',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            paddingBottom: isMobile ? 12 : 12,
          }}>
            <div>
              <h3 style={{ color: '#fff', fontWeight: 600, fontSize: 16, margin: 0 }}>麻明的 AI 分身</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, margin: '2px 0 0' }}>
                {useLocal === null ? '检测引擎中...' : useLocal ? '💻 本地模式 · qwen3:8b' : '☁️ 云端模式 · qwen3.6-plus'}
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 8,
                width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#fff',
              }}
              aria-label="关闭"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: 'auto', padding: isMobile ? 16 : 16,
            display: 'flex', flexDirection: 'column', gap: 12,
            background: '#fff',
          }}>
            {messages.length === 0 && (
              <div style={{ textAlign: 'center', padding: isMobile ? '40px 16px' : '32px 16px' }}>
                <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 16 }}>👋 你好，我是麻明的 AI 分身</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {quickQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => { setInput(q); setTimeout(() => handleSend(), 50); }}
                      style={{
                        width: '100%', textAlign: 'left',
                        padding: '10px 14px', background: '#f3f4f6', color: '#374151',
                        fontSize: 13, borderRadius: 10, border: '1px solid #e5e7eb',
                        cursor: 'pointer', transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#e5e7eb'; e.currentTarget.style.color = '#1a1a2e'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = '#f3f4f6'; e.currentTarget.style.color = '#374151'; }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} style={{
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
              }}>
                {msg.role === 'thinking' ? (
                  <div style={{
                    padding: '8px 14px', borderRadius: 16,
                    background: '#fff7ed', fontSize: 13, color: '#c2410c',
                    border: '1px solid #fed7aa',
                  }}>
                    🧠 {msg.content}
                  </div>
                ) : (
                  <div style={{
                    padding: '10px 14px', borderRadius: 16,
                    fontSize: 14, lineHeight: 1.6,
                    background: msg.role === 'user' ? '#1a1a2e' : '#f3f4f6',
                    color: msg.role === 'user' ? '#fff' : '#1a1a2e',
                    borderBottomRightRadius: msg.role === 'user' ? 4 : 16,
                    borderBottomLeftRadius: msg.role === 'assistant' ? 4 : 16,
                  }}>
                    {msg.content.split('\n').map((line, j) => (
                      <p key={j} style={{ margin: j > 0 ? '6px 0 0' : 0 }}>{line}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {loading && !messages.some(m => m.role === 'thinking') && (
              <div style={{ alignSelf: 'flex-start' }}>
                <div style={{
                  padding: '10px 14px', borderRadius: 16,
                  background: '#f3f4f6', fontSize: 14, color: '#6b7280',
                  borderBottomLeftRadius: 4,
                }}>
                  麻明<span className="animate-dots">...</span>
                </div>
              </div>
            )}
            <div ref={messagesEnd} />
          </div>

          {/* Input */}
          {!isMobile && (
            <div style={{
              padding: 12, background: '#fff', borderTop: '1px solid #e5e7eb',
            }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                  placeholder="和麻明聊聊..."
                  style={{
                    flex: 1, background: '#f3f4f6', color: '#1a1a2e', fontSize: 14,
                    padding: '10px 14px', borderRadius: 10, border: '1px solid #e5e7eb', outline: 'none',
                  }}
                  disabled={loading}
                />
                <button
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  style={{
                    background: '#1a1a2e', color: '#fff',
                    padding: '10px 16px', borderRadius: 10, border: 'none',
                    fontSize: 14, fontWeight: 500, cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                    opacity: loading || !input.trim() ? 0.5 : 1,
                  }}
                >
                  发送
                </button>
              </div>
              <p style={{ textAlign: 'center', fontSize: 11, color: '#9ca3af', margin: '8px 0 0' }}>
                AI 分身 · 本地优先引擎 · 循环精炼 v2 · 仅供参考
              </p>
            </div>
          )}
        </div>
      )}
    </>
  )
}
