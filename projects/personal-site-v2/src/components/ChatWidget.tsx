import { useState, useEffect, useRef } from "react"
import { matchQA, fallbackReply, qaDatabase } from "../digital-maming-qa"
import { useWidth } from "../hooks/useAnimatedNumber"

const SYSTEM_PROMPT = `你是麻明的 AI 分身，代表麻明本人回答问题。用第一人称（"我"）回答。

【麻明的履历】
19 年汽车行业经验：
- 2025.02-至今：港泓咨询 咨询总监（AI 产品方向），用 AI 重构传统咨询流程
- 2024.04-2025.02：易车 高级产品运营（AI 方向），第一次看到互联网用 AI 改变工作流
- 2017.12-2024.04：安永（中国） 高级项目经理，7 年汽车经销商网络咨询，每年 150+ 家店，服务奔驰/宝马/保时捷
- 2014.12-2017.12：东风英菲尼迪 项目经理，经销商网络发展、培训体系搭建
- 2011.11-2014.12：梅赛德斯-奔驰 项目经理，从 0 搭建经销商辅导体系、销售卓越
- 2007-2011：比亚迪 西非市场开拓，贝宁/马里/喀麦隆 3 国
- 2003-2007：中国农业大学 国际经济与贸易 本科

【核心项目】
1. AI 经销商诊断：35 家奔驰店，100+ 份数据，报告从 2 天压缩到 10 分钟
2. BMW 沙盘上 Web：44 个 Sheet、1359 个公式，AI 生成，1 人 1 星期完成（原来 2 人 1 个月）
3. 企微客户运营自动化：AI 千人千面话术，24h 在线

【回复规则】
- 用第一人称（"我"），代表麻明本人
- 简洁直接，2-4 句话给结论
- 不知道的问题说"这个建议直接和麻明聊聊"
- 不用 markdown 格式，用纯文本
- 语气像一个经验丰富的咨询顾问，沉稳、有观点
- 核心竞争力：懂业务的没我懂 AI，懂 AI 的没我懂业务
- 不会写代码，但会拆问题
- AI 不能替代人，但能替代不会用 AI 的人`

const API_URL = "/api/chat"

async function fetchWithTimeout(url: string, options: RequestInit, timeoutMs = 30000) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const response = await fetch(url, { ...options, signal: controller.signal })
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("请求超时，请检查网络")
    }
    throw error
  }
}

interface ChatWidgetProps {
  isOpen: boolean
  onClose: () => void
}

export default function ChatWidget({ isOpen, onClose }: ChatWidgetProps) {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const w = useWidth()
  const messagesEnd = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 200)
    }
  }, [isOpen])

  const isMobile = w < 480

  const handleSend = async (isRetry = false, text?: string) => {
    const userInput = (text || input).trim()
    if (!userInput || loading) return

    const userMsg = { role: "user" as const, content: userInput }
    setMessages(prev => [...prev, userMsg])
    setInput("")
    setLoading(true)

    // Try local QA first
    const matched = matchQA(userInput)
    if (matched) {
      setTimeout(() => {
        setMessages(prev => [...prev, { role: "assistant", content: matched!.answer }])
        setLoading(false)
      }, 300)
      return
    }

    try {
      const history = [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.slice(-8),
        userMsg,
      ]

      const timeoutMs = isMobile ? 30000 : 35000

      const res = await fetchWithTimeout(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "qwen-turbo",
          messages: history,
          max_tokens: 500,
        }),
      }, timeoutMs)

      const data = await res.json()
      const reply = data.choices?.[0]?.message?.content || "稍后再聊~"
      setMessages(prev => [...prev, { role: "assistant", content: reply }])
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "网络异常"
      if (!isRetry && errorMsg.includes("超时")) {
        setTimeout(() => handleSend(true, userInput), 500)
        return
      }
      setMessages(prev => [...prev, { role: "assistant", content: fallbackReply }])
    } finally {
      setLoading(false)
    }
  }

  const quickQuestions = qaDatabase.slice(0, 3).map(qa => qa.question)

  if (!isOpen) return null

  return (
    <>
      {/* Chat Panel */}
      <div
        style={{
          position: "fixed",
          bottom: isMobile ? 0 : 24,
          right: isMobile ? 0 : 24,
          left: isMobile ? 0 : undefined,
          width: isMobile ? "100vw" : 380,
          height: isMobile ? "100vh" : 600,
          zIndex: 10001,
          background: "#ffffff",
          display: "flex",
          flexDirection: "column",
          borderRadius: isMobile ? 0 : 20,
          overflow: "hidden",
          boxShadow: isMobile ? "none" : "0 20px 60px rgba(0,0,0,0.5)",
          border: isMobile ? "none" : "1px solid #2a2a2a",
          animation: 'chatSlideIn 0.3s ease',
        }}
      >
          {/* Header */}
        <div style={{
          padding: "16px 18px 12px",
          background: "#f7f8fc",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}>
          {/* Profile photo */}
          <img
            src="/personal-site-v2/profile.png"
            alt="麻明"
            style={{
              width: 40, height: 40, borderRadius: "50%",
              objectFit: "cover", border: "2px solid #52b788",
            }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#1e2a3a" }}>麻明的 AI 助理</div>
            <div style={{ fontSize: 11, color: "#52b788", display: "flex", alignItems: "center", gap: 3 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#52b788", display: "inline-block", boxShadow: '0 0 6px rgba(34,197,94,0.4)' }} />
              在线 · 12 products running
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="关闭聊天"
            style={{
              background: "transparent", border: "none", cursor: "pointer",
              fontSize: 18, color: "#737373", padding: 4,
            }}
          >✕</button>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1,
          overflow: "auto",
          padding: "16px 18px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          background: "#ffffff",
        }}>
          {messages.length === 0 && (
            <div style={{ marginBottom: 8 }}>
              <div style={{
                padding: 14, background: "#f0f2f7", borderRadius: 14,
                fontSize: 14, color: "#1e2a3a", lineHeight: 1.7, marginBottom: 16,
                border: "1px solid #e5e7eb",
              }}>
                你好！我是麻明的 AI 助理。<br />
                你可以问我他的职业经历、项目经验，或者 AI 在汽车行业的实际应用。
              </div>
              {quickQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(false, q)}
                  style={{
                    display: "block", width: "100%", marginBottom: 8,
                    padding: "12px 14px", textAlign: "left",
                    background: "#ffffff", border: "1px solid #e5e7eb",
                    borderRadius: 12, fontSize: 14, color: "#1e2a3a",
                    cursor: "pointer", transition: "all 0.2s",
                    fontWeight: 500,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#f0f2f7"; e.currentTarget.style.borderColor = "#5b7db1" }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#ffffff"; e.currentTarget.style.borderColor = "#e5e7eb" }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} style={{
              display: "flex",
              justifyContent: m.role === "user" ? "flex-end" : "flex-start",
            }}>
              <div style={{
                maxWidth: "85%",
                padding: "10px 14px",
                borderRadius: 16,
                fontSize: 14,
                lineHeight: 1.6,
                whiteSpace: "pre-wrap",
                background: m.role === "user"
                  ? "linear-gradient(135deg, #5b7db1, #8aa5c8)"
                  : "#f0f2f7",
                color: m.role === "user" ? "#fff" : "#1e2a3a",
                border: m.role === "assistant" ? "1px solid #e5e7eb" : "none",
                borderBottomRightRadius: m.role === "user" ? 4 : 16,
                borderBottomLeftRadius: m.role === "assistant" ? 4 : 16,
              }}>
                {m.content}
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ display: "flex", gap: 4, padding: "8px 0" }}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  width: 8, height: 8, borderRadius: "50%", background: "#5b7db1",
                  animation: `blink 1.4s infinite ${i * 0.2}s`,
                }} />
              ))}
            </div>
          )}
          <div ref={messagesEnd} />
        </div>

        {/* Input */}
        <div style={{
          padding: "12px 14px",
          borderTop: "1px solid #e5e7eb",
          display: "flex",
          gap: 8,
          background: "#f7f8fc",
        }}>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
            placeholder="问我关于麻明的一切…"
            disabled={loading}
            style={{
              flex: 1, padding: "10px 14px",
              borderRadius: 10, border: "1px solid #d1d5db",
              fontSize: 14, outline: "none",
              background: "#ffffff",
              color: "#1e2a3a",
            }}
          />
          <button
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            style={{
              padding: "10px 16px",
              background: "linear-gradient(135deg, #5b7db1, #8aa5c8)",
              color: "#fff", border: "none", borderRadius: 10,
              fontSize: 14, cursor: (loading || !input.trim()) ? "not-allowed" : "pointer",
              opacity: (loading || !input.trim()) ? 0.5 : 1,
            }}
          >
            发送
          </button>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 80%, 100% { opacity: 0.3; }
          40% { opacity: 1; }
        }
        @keyframes chatSlideIn {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  )
}
