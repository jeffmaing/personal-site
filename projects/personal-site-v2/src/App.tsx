import { useState } from 'react'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import Story from './components/Story'
import AIArsenal from './components/AIArsenal'
import AIBoundaries from './components/AIBoundaries'
import CTA from './components/CTA'
import ChatWidget from './components/ChatWidget'

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{
      padding: '32px 24px',
      textAlign: 'center',
      borderTop: '1px solid rgba(0,0,0,0.06)',
      fontSize: '12px',
      color: '#b0b8c4',
      background: '#f7f8fc',
      letterSpacing: '0.03em',
    }}>
      © {year} 麻明 · 用 AI 放大自己
    </footer>
  )
}

function App() {
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <div style={{
      fontFamily: '-apple-system, "PingFang SC", "Helvetica Neue", sans-serif',
      background: '#f7f8fc',
      maxWidth: '100vw',
      overflowX: 'hidden',
    }}>
      <NavBar />
      <Hero />
      <Story />
      <AIArsenal />
      <AIBoundaries />
      <CTA onOpenChat={() => setChatOpen(true)} />
      <Footer />
      <ChatWidget isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  )
}

export default App
