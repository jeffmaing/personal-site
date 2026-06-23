import { useState, lazy, Suspense, useEffect } from 'react'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import Methodology from './components/Methodology'
import ProofSystem from './components/ProofSystem'
import LiveDemos from './components/LiveDemos'
import { setupSmoothScroll } from './utils/smoothScroll'

// Lazy load components that are not immediately visible
const CTA = lazy(() => import('./components/CTA'))
const TimeCalculator = lazy(() => import('./components/TimeCalculator'))
const ChatWidget = lazy(() => import('./components/ChatWidget'))

// Loading fallback component
function LoadingFallback() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '200px',
      background: 'var(--bg-primary)',
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '3px solid #f0f0f0',
        borderTopColor: 'var(--accent-primary)',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      }} />
    </div>
  )
}

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{
      padding: '32px 24px',
      textAlign: 'center',
      borderTop: '1px solid var(--border-subtle)',
      fontSize: '12px',
      color: 'var(--text-light)',
      background: 'var(--bg-primary)',
      letterSpacing: '0.03em',
      fontFamily: 'var(--font-body)',
    }}>
      © {year} 麻明 · 用 AI 放大自己
    </footer>
  )
}

function App() {
  const [chatOpen, setChatOpen] = useState(false)

  // Setup smooth scroll on mount
  useEffect(() => {
    setupSmoothScroll()
  }, [])

  return (
    <div id="main-content" style={{
      fontFamily: 'var(--font-body)',
      background: 'var(--bg-primary)',
      maxWidth: '100vw',
      overflowX: 'hidden',
    }}>
      <NavBar />
      <Hero />
      <Methodology />
      <ProofSystem />

      {/* Live Demos — interactive section */}
      <LiveDemos />

      {/* Time Calculator — moved up, more prominent */}
      <section
        id="calculator"
        style={{
          padding: '0 24px clamp(60px, 10vw, 100px)',
          background: 'var(--bg-primary)',
        }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <TimeCalculator />
        </Suspense>
      </section>

      <Suspense fallback={<LoadingFallback />}>
        <CTA onOpenChat={() => setChatOpen(true)} />
        <ChatWidget isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      </Suspense>
      <Footer />
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default App
