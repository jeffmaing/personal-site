import { useState, useEffect, useRef } from 'react'
import { siteConfig } from './site-config'
import type { SiteConfig } from './site-config'
import ChatWidget from './components/ChatWidget'
import VideoModal from './components/VideoModal'
import ExperienceModal from './components/ExperienceModal'

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible] as const
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const h = () => {
      const st = document.documentElement.scrollTop
      const max = document.documentElement.scrollHeight - document.documentElement.clientHeight
      setProgress(max > 0 ? st / max : 0)
    }
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  return progress
}

function useWidth() {
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024)
  useEffect(() => {
    const h = () => setW(window.innerWidth)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])
  return w
}

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [ref, visible] = useInView(0.1)
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(30px)',
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
    }}>
      {children}
    </div>
  )
}

function ScrollProgress() {
  const p = useScrollProgress()
  return <div style={{ position: 'fixed', top: 0, left: 0, height: 2, width: `${p * 100}%`, background: '#1a1a2e', zIndex: 9999, transition: 'width 0.1s' }} />
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, height: 52,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 20px',
      background: 'rgba(255,255,255,0.9)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      borderBottom: scrolled ? '1px solid #eee' : '1px solid transparent',
      zIndex: 1000, transition: 'border-color 0.3s',
    }}>
      <span style={{ fontSize: 14, fontWeight: 600, color: '#1a1a2e' }}>{siteConfig.name}</span>
      <div style={{ display: 'flex' }}>
        {['经历', '项目', '联系'].map((label, i) => (
          <a key={label} href={`#${label}`} style={{
            fontSize: 12, color: '#86868b', textDecoration: 'none',
            marginLeft: i > 0 ? 20 : 0,
          }}>{label}</a>
        ))}
      </div>
    </nav>
  )
}

function Hero() {
  const w = useWidth()
  const isMobile = w < 640
  const titleSize = isMobile ? 28 : w < 1024 ? 42 : 64
  const subtitleSize = isMobile ? 14 : w < 1024 ? 16 : 20

  return (
    <section style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      padding: isMobile ? '80px 24px 48px' : '120px 40px 80px', textAlign: 'center',
      maxWidth: 1100, margin: '0 auto',
    }}>
      <FadeIn>
        <div style={{
          display: 'inline-flex', alignItems: 'center', padding: isMobile ? '5px 12px' : '6px 14px',
          background: '#f5f5f5', fontSize: isMobile ? 11 : 12, fontWeight: 500, color: '#4a4a6a', marginBottom: 20,
          border: '1px solid #e5e7eb', borderRadius: 100,
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#34c759', marginRight: 7, display: 'inline-block' }} />
          {siteConfig.hero.badge}
        </div>
      </FadeIn>

      <FadeIn delay={0.12}>
        <h1 style={{
          fontSize: titleSize, fontWeight: 700,
          lineHeight: 1.2, marginBottom: 12, color: '#1a1a2e',
          maxWidth: isMobile ? '100%' : 700, margin: '0 auto 12px',
        }}>
          {siteConfig.hero.title.split('\n').map((line, i) => (
            <span key={i}>{line}<br /></span>
          ))}
        </h1>
      </FadeIn>

      <FadeIn delay={0.24}>
        <p style={{
          fontSize: subtitleSize, color: '#6b7280',
          maxWidth: isMobile ? '100%' : 520, margin: '0 auto', lineHeight: 1.8, marginBottom: isMobile ? 24 : 36,
          padding: isMobile ? '0 4px' : 0,
        }}>
          {siteConfig.hero.subtitle}
        </p>
      </FadeIn>

      <FadeIn delay={0.36}>
        <div style={{
          display: 'flex', flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 8 : 0,
          width: isMobile ? '100%' : 440,
          maxWidth: 440,
          border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden',
          background: '#fff',
        }}>
          {siteConfig.hero.stats.map((stat, i) => (
            <StatCard key={i} stat={stat} isMobile={isMobile} />
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.48}>
        <div style={{ marginTop: isMobile ? 24 : 32 }}>
          <VideoModal isMobile={isMobile} />
        </div>
      </FadeIn>
    </section>
  )
}

function StatCard({ stat, isMobile }: { stat: typeof siteConfig.hero.stats[0]; isMobile: boolean }) {
  const [ref, visible] = useInView(0.1)
  const [count, setCount] = useState(0)
  const numericValue = parseInt(stat.value) || 0
  const suffix = stat.value.replace(/[0-9]/g, '')

  useEffect(() => {
    if (!visible) return
    if (numericValue === 0) { setCount(0); return }
    let current = 0
    const step = Math.ceil(numericValue / 30)
    const timer = setInterval(() => {
      current += step
      if (current >= numericValue) { setCount(numericValue); clearInterval(timer) }
      else setCount(current)
    }, 40)
    return () => clearInterval(timer)
  }, [visible, numericValue])

  return (
    <div ref={ref} style={{
      flex: 1,
      padding: isMobile ? '14px 12px' : '16px 8px',
      textAlign: 'center', background: '#fff',
      borderRight: isMobile ? 'none' : '1px solid #eee',
      borderBottom: isMobile ? '1px solid #eee' : 'none',
    }}>
      <div style={{ fontSize: isMobile ? (numericValue > 99 ? 22 : 26) : (numericValue > 99 ? 24 : 28), fontWeight: 700, color: '#1a1a2e' }}>
        {numericValue > 0 ? `${count}${suffix}` : stat.value}
      </div>
      <div style={{ fontSize: isMobile ? 11 : 12, color: '#9ca3af', marginTop: 4 }}>{stat.label}</div>
    </div>
  )
}

function Experience() {
  const w = useWidth()
  const isMobile = w < 640
  const h2Size = isMobile ? 22 : 36
  const [selected, setSelected] = useState<SiteConfig['experience']['items'][0] | null>(null)

  return (
    <section id="经历" style={{ padding: isMobile ? '40px 20px' : '80px 24px', background: '#fafafa' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <FadeIn>
          <h2 style={{ fontSize: h2Size, fontWeight: 700, marginBottom: 8, color: '#1a1a2e' }}>
            {siteConfig.experience.title}
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p style={{ fontSize: isMobile ? 12 : 13, color: '#9ca3af', marginBottom: 20 }}>
            点击任意经历，查看详细介绍和视频
          </p>
        </FadeIn>
        <div style={{ background: '#fff', borderRadius: 12, padding: isMobile ? '8px 16px' : '12px 24px', border: '1px solid #e5e7eb' }}>
          {siteConfig.experience.items.map((exp, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div
                onClick={() => setSelected(exp)}
                style={{
                  padding: `${isMobile ? 14 : 16}px 0`,
                  borderBottom: i < siteConfig.experience.items.length - 1 ? '1px solid #f0f0f0' : 'none',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', flex: 1, minWidth: 0 }}>
                    <div style={{
                      width: 10, height: 10, borderRadius: '50%', marginTop: 6, marginRight: 12, flexShrink: 0,
                      background: exp.current ? '#1a1a2e' : '#ddd',
                    }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 11, color: '#bbb', marginBottom: 4 }}>{exp.period}</div>
                      <h3 style={{ fontSize: isMobile ? 14 : 16, fontWeight: 600, marginBottom: 4, color: '#1a1a2e' }}>{exp.role}</h3>
                      <div style={{ fontSize: 13, color: '#6b7280' }}>{exp.company}</div>
                    </div>
                  </div>
                  <svg
                    width="16" height="16" viewBox="0 0 16 16" fill="none"
                    style={{ flexShrink: 0, marginLeft: 12, marginTop: 4 }}
                  >
                    <path d="M6 4l4 4-4 4" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Experience Detail Modal */}
      {selected && (
        <ExperienceModal
          exp={selected}
          isMobile={isMobile}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  )
}

function Projects() {
  const w = useWidth()
  const isMobile = w < 640
  const h2Size = isMobile ? 22 : 36

  return (
    <section id="项目" style={{ padding: isMobile ? '40px 20px' : '80px 24px' }}>
      <div style={{ maxWidth: isMobile ? '100%' : 900, margin: '0 auto' }}>
        <FadeIn>
          <h2 style={{ fontSize: h2Size, fontWeight: 700, textAlign: 'center', marginBottom: 28, color: '#1a1a2e' }}>
            {siteConfig.projects.title}
          </h2>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 16 }}>
          {siteConfig.projects.items.map((project, i) => (
            <div key={i} style={{
              background: '#fafafa', borderRadius: isMobile ? 10 : 12, padding: isMobile ? 16 : 20,
              border: '1px solid #e5e7eb',
            }}>
              <h3 style={{ fontSize: isMobile ? 14 : 16, fontWeight: 700, marginBottom: 8, color: '#1a1a2e' }}>
                {project.title}
              </h3>
              <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.6, marginBottom: 14 }}>
                {project.description}
              </p>
              <div style={{ borderTop: '1px solid #eee', paddingTop: 12 }}>
                {project.metrics.map((metric, j) => (
                  <div key={j} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: j < project.metrics.length - 1 ? 6 : 0 }}>
                    <span style={{ fontSize: 12, color: '#6b7280' }}>{metric.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#1a1a2e' }}>{metric.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const w = useWidth()
  const isMobile = w < 640
  const h2Size = isMobile ? 22 : 36

  const contacts = [
    {
      label: siteConfig.contact.phone,
      href: `tel:${siteConfig.contact.phone}`,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
        </svg>
      ),
    },
    {
      label: siteConfig.contact.email,
      href: `mailto:${siteConfig.contact.email}`,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2"/>
          <path d="M22 4l-10 8L2 4"/>
        </svg>
      ),
    },
    {
      label: siteConfig.contact.location,
      href: undefined,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
    },
  ]

  return (
    <section id="联系" style={{ padding: isMobile ? '40px 20px' : '80px 24px', textAlign: 'center', background: '#fafafa' }}>
      <div style={{ maxWidth: isMobile ? '100%' : 440, margin: '0 auto' }}>
        <FadeIn>
          <h2 style={{ fontSize: h2Size, fontWeight: 700, marginBottom: 8, color: '#1a1a2e' }}>
            {siteConfig.contact.title}
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 24 }}>欢迎聊聊 AI 在汽车行业能干什么</p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {contacts.map((item, i) => (
              item.href ? (
                <a key={i} href={item.href}
                  style={{
                    display: 'flex', alignItems: 'center',
                    padding: '14px 16px', borderRadius: 10, marginBottom: 10,
                    background: '#fff', textDecoration: 'none', color: '#1a1a2e',
                    fontSize: 13, fontWeight: 500, border: '1px solid #e5e7eb',
                    transition: 'box-shadow 0.2s, transform 0.2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
                >
                  <span style={{ marginRight: 12, opacity: 0.7 }}>{item.icon}</span>
                  {item.label}
                </a>
              ) : (
                <div key={i}
                  style={{
                    display: 'flex', alignItems: 'center',
                    padding: '14px 16px', borderRadius: 10, marginBottom: 10,
                    background: '#fff', color: '#1a1a2e',
                    fontSize: 13, fontWeight: 500, border: '1px solid #e5e7eb',
                  }}
                >
                  <span style={{ marginRight: 12, opacity: 0.7 }}>{item.icon}</span>
                  {item.label}
                </div>
              )
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer style={{ padding: '16px', textAlign: 'center', borderTop: '1px solid #eee', fontSize: 12, color: '#bbb' }}>
      {siteConfig.footer.copyright}
    </footer>
  )
}

function App() {
  return (
    <div style={{ fontFamily: '-apple-system, "PingFang SC", "Helvetica Neue", sans-serif', background: '#fff', color: '#1a1a2e' }}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
        body { overflow-x: hidden; }
      `}</style>
      <ScrollProgress />
      <Nav />
      <Hero />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
      <ChatWidget />
    </div>
  )
}

export default App
