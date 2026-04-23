import { useState, useRef, useEffect } from "react"
const SYSTEM_PROMPT = "你是麻明的 AI 分身，19年汽车行业咨询老兵"
interface Message { role: "user" | "assistant"; content: string }
const API_URL = "https://ai-chat-proxy.mamng0319.workers.dev"

async function fetchWithTimeout(url: string, options: RequestInit, timeoutMs = 15000) {
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

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [w, setW] = useState(1024)
  const messagesEnd = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setW(window.innerWidth)
    const h = () => setW(window.innerWidth)
    window.addEventListener("resize", h)
    return () => window.removeEventListener("resize", h)
  }, [])

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const isMobile = w < 480

  const handleSend = async (isRetry = false) => {
    if (!input.trim() || loading) return
    const userMsg: Message = { role: "user", content: input.trim() }
    const userInput = input.trim(); (userInput)
    setMessages(prev => [...prev, userMsg])
    setInput("")
    setLoading(true)

    try {
      const history = [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.slice(-6),
        userMsg,
      ]
      const timeoutMs = isMobile ? 8000 : 12000
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
        setMessages(prev => [...prev, { role: "assistant", content: "网络较慢，重试中..." }])
        setTimeout(() => { setInput(userInput); handleSend(true); }, 500)
        return
      }
      setMessages(prev => [...prev, { role: "assistant", content: errorMsg + "，请刷新重试" }])
    } finally {
      setLoading(false)
    }
  }

  const quickQuestions = ["你最近在忙什么？", "聊聊合作？"]

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{ position: "fixed", bottom: isMobile ? 20 : 24, right: isMobile ? 16 : 24, zIndex: 10000, width: 56, height: 56, borderRadius: "50%", background: "#1a1a2e", color: "white", border: "none", cursor: "pointer" }}
        >
          💬
        </button>
      )}
      {open && (
        <div style={{ position: "fixed", bottom: isMobile ? 0 : 24, right: isMobile ? 0 : 24, width: isMobile ? "100%" : 380, height: isMobile ? "100%" : 600, zIndex: 10001, background: "#fff", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: 16, background: "#1a1a2e", color: "#fff", display: "flex", justifyContent: "space-between" }}>
            <h3>AI 分身</h3>
            <button onClick={() => setOpen(false)} style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer" }}>✕</button>
          </div>
          <div style={{ flex: 1, overflow: "auto", padding: 16 }}>
            {messages.length === 0 && quickQuestions.map((q, i) => (
              <button key={i} onClick={() => { setInput(q); handleSend(); }} style={{ display: "block", width: "100%", marginBottom: 8, padding: 10, textAlign: "left" }}>{q}</button>
            ))}
            {messages.map((m, i) => (
              <div key={i} style={{ marginBottom: 8, textAlign: m.role === "user" ? "right" : "left" }}>
                <span style={{ display: "inline-block", padding: 8, background: m.role === "user" ? "#1a1a2e" : "#eee", color: m.role === "user" ? "#fff" : "#000", borderRadius: 8 }}>{m.content}</span>
              </div>
            ))}
            {loading && <div>思考中...</div>}
            <div ref={messagesEnd} />
          </div>
          <div style={{ padding: 16, borderTop: "1px solid #eee", display: "flex", gap: 8 }}>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              style={{ flex: 1, padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
            />
            <button onClick={() => handleSend()} disabled={loading} style={{ padding: "10px 20px", background: "#1a1a2e", color: "#fff", border: "none", borderRadius: 8 }}>
              发送
            </button>
          </div>
        </div>
      )}
    </>
  )
}
