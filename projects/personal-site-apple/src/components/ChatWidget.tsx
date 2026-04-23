import { useState, useRef, useEffect } from 'react'

const SYSTEM_PROMPT = `你是麻明的 AI 分身，代表麻明与访客对话。

【身份】19年汽车行业咨询老兵 | 前奔驰·英菲尼迪·安永·易车 → 现港泓咨询 AI 咨询总监

【实战项目】小鹏智能助手POC / 宝马金融AI项目 / 奔驰经销商落地方案 / 雷克萨斯新媒体运营体系 / 易慧数字员工

【AI哲学】AI是"数字牛马"——水质好了养什么都能活。Harness Engineering四件套：动态上下文、框架约束、循环反馈、定期清理

【规则】先给结论再给证据 · 第一人称代表麻明 · 3-5句话 · 专业不死板 · 想了解更多引导联系 jeffmaming@163.com

【底线】不准编数据、不准编经历，不知道就说不知道`

const DOMAIN_EXTRAS: Record<string, string> = {
  auto: '（侧重汽车经销商运营、巡检体系、试驾交车SOP视角）',
  ai: '（侧重AI产品设计、对话逻辑、智能助手落地视角）',
  consulting: '（侧重咨询方法论、项目管理、客户交付视角）',
  career: '（侧重职业发展、行业趋势、转型建议视角）',
}

function detectDomain(input: string): string {
  const l = input.toLowerCase()
  if (l.match(/奔驰|宝马|bmw|雷克萨斯|小鹏|经销商|试驾|交车|sop|巡检|新媒体|运营|店次/)) return 'auto'
  if (l.match(/\bai\b|智能助手|对话|产品|落地|ai 哲学|数字牛马|harness|数字员工/)) return 'ai'
  if (l.match(/咨询|方法论|项目|交付|管理|方案|合作/)) return 'consulting'
  if (l.match(/职业|跳槽|转型|发展|建议|简历|面试|行业/)) return 'career'
  return 'shared'
}

interface Message {
  role: 'user' | 'assistant'
  content: string
}

// 百炼 API 直接调用（GitHub Pages 部署用）
const DASHSCOPE_API_KEY = import.meta.env.VITE_DASHSCOPE_API_KEY || ''
const API_URL = 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions'

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
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
      const extra = DOMAIN_EXTRAS[domain] || ''
      const fullPrompt = extra ? `${userInput} ${extra}` : userInput

      const history = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.slice(-6),
        { role: 'user', content: fullPrompt },
      ]

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DASHSCOPE_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'qwen3.6-plus',
          messages: history,
          temperature: 0.7,
          max_tokens: 600,
        }),
      })

      const data = await res.json()
      const reply = data.choices?.[0]?.message?.content || '抱歉，我现在有点忙，稍后再聊~'
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch {
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
          <div style={{
            padding: isMobile ? '16px 16px 12px' : '16px 20px 12px',
            background: '#1a1a2e',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <h3 style={{ color: '#fff', fontWeight: 600, fontSize: 16, margin: 0 }}>麻明的 AI 分身</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, margin: '2px 0 0' }}>19年汽车咨询老兵 · 随时在线</p>
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

          <div style={{
            flex: 1, overflowY: 'auto', padding: 16,
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
              </div>
            ))}
            {loading && (
              <div style={{ alignSelf: 'flex-start' }}>
                <div style={{
                  padding: '10px 14px', borderRadius: 16,
                  background: '#f3f4f6', fontSize: 14, color: '#6b7280',
                  borderBottomLeftRadius: 4,
                }}>
                  思考中<span className="animate-dots">...</span>
                </div>
              </div>
            )}
            <div ref={messagesEnd} />
          </div>

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
                AI 分身基于麻明真实经历 · 仅供参考
              </p>
            </div>
          )}
        </div>
      )}
    </>
  )
}
