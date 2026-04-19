import { useState, useEffect, useRef } from 'react'
import { siteConfig } from './site-config'

// ---- Hooks ----
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

// ---- Components ----
function FadeIn({ children, delay = 0, direction = 'up' }: { children: React.ReactNode; delay?: number; direction?: 'up' | 'left' | 'right' }) {
  const [ref, visible] = useInView(0.1)
  const transformMap = { up: 'translateY(40px)', left: 'translateX(-40px)', right: 'translateX(40px)' }
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : transformMap[direction],
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

function ScrollProgress() {
  const p = useScrollProgress()
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, height: 2, width: `${p * 100}%`,
      background: 'linear-gradient(90deg, #0071e3, #6366f1)', zIndex: 9999,
      transition: 'width 0.1s linear',
    }} />
  )
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
      position: 'fixed', top: 0, left: 0, right: 0,
      height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 40px',
      background: scrolled ? 'rgba(255,255,255,0.72)' : 'transparent',
      backdropFilter: scrolled ? 'saturate(180%) blur(20px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'saturate(180%) blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : '1px solid transparent',
      zIndex: 1000,
      transition: 'all 0.36s cubic-bezier(0.16, 1, 0.3, 1)',
    }}>
      <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: -0.2 }}>{siteConfig.name}</span>
      <div style={{ display: 'flex', gap: 28 }}>
        {['三根柱子', '经历', '项目', '联系'].map(label => (
          <a key={label} href={`#${label === '三根柱子' ? 'pillars' : label}`}
            style={{ fontSize: 12, color: '#86868b', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#1d1d1f')}
            onMouseLeave={e => (e.currentTarget.style.color = '#86868b')}
          >{label}</a>
        ))}
      </div>
    </nav>
  )
}

function Hero() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 100); return () => clearTimeout(t) }, [])

  return (
    <section style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      padding: '100px 24px 60px', textAlign: 'center',
    }}>
      <FadeIn delay={0}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '6px 16px', borderRadius: 100,
          background: '#f5f5f7', fontSize: 13, fontWeight: 500, color: '#1d1d1f', marginBottom: 32,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34c759', display: 'inline-block' }} />
          {siteConfig.hero.badge}
        </div>
      </FadeIn>

      <FadeIn delay={0.12}>
        <h1 style={{
          fontSize: 'clamp(48px, 10vw, 80px)', fontWeight: 700,
          letterSpacing: -2, lineHeight: 1.05, marginBottom: 8,
          background: 'linear-gradient(135deg, #1d1d1f 0%, #424245 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          {siteConfig.hero.title.split('\n').map((line, i) => (
            <span key={i}>{line}<br /></span>
          ))}
        </h1>
      </FadeIn>

      <FadeIn delay={0.24}>
        <p style={{
          fontSize: 'clamp(18px, 3vw, 24px)', color: '#86868b',
          maxWidth: 520, margin: '0 auto', lineHeight: 1.6, marginBottom: 56,
          fontWeight: 400,
        }}>
          {siteConfig.hero.subtitle}
        </p>
      </FadeIn>

      {/* Interactive Stats */}
      <FadeIn delay={0.36}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1,
          background: '#d2d2d7', borderRadius: 20, overflow: 'hidden',
          width: '100%', maxWidth: 480,
        }}>
          {siteConfig.hero.stats.map((stat, i) => (
            <StatCard key={i} stat={stat} delay={0.4 + i * 0.1} />
          ))}
        </div>
      </FadeIn>
    </section>
  )
}

function StatCard({ stat, delay }: { stat: typeof siteConfig.hero.stats[0]; delay: number }) {
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
      background: '#fff', padding: '28px 12px', textAlign: 'center',
      cursor: 'pointer', transition: 'all 0.3s',
      opacity: visible ? 1 : 0, transform: visible ? 'scale(1)' : 'scale(0.92)',
      transitionDelay: `${delay}s`,
    }}
      onMouseEnter={e => { e.currentTarget.style.background = '#f5f5f7' }}
      onMouseLeave={e => { e.currentTarget.style.background = '#fff' }}
    >
      <div style={{ fontSize: numericValue > 99 ? 28 : 36, fontWeight: 700, color: '#1d1d1f', letterSpacing: -1, lineHeight: 1.2 }}>
        {numericValue > 0 ? (numericValue > 100 ? `${count}+` : count) : stat.value}
        <span style={{ color: '#0071e3', fontSize: '0.7em' }}>{suffix.trim()}</span>
      </div>
      <div style={{ fontSize: 12, color: '#86868b', marginTop: 6 }}>{stat.label}</div>
    </div>
  )
}

function Pillars() {
  const [active, setActive] = useState(0)
  return (
    <section id="pillars" style={{ padding: '120px 24px', background: '#f5f5f7' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <FadeIn>
          <h2 style={{ fontSize: 40, fontWeight: 700, textAlign: 'center', letterSpacing: -1, marginBottom: 12 }}>
            {siteConfig.pillars.title}
          </h2>
        </FadeIn>
        <FadeIn delay={0.08}>
          <p style={{ fontSize: 18, color: '#86868b', textAlign: 'center', marginBottom: 64 }}>
            {siteConfig.pillars.subtitle}
          </p>
        </FadeIn>

        {/* Interactive Tabs */}
        <FadeIn delay={0.16}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 48 }}>
            {siteConfig.pillars.items.map((item, i) => (
              <button key={i} onClick={() => setActive(i)} style={{
                padding: '8px 20px', borderRadius: 100, border: 'none',
                background: active === i ? '#1d1d1f' : '#e8e8ed',
                color: active === i ? '#fff' : '#86868b',
                fontSize: 14, fontWeight: 500, cursor: 'pointer',
                transition: 'all 0.24s cubic-bezier(0.16, 1, 0.3, 1)',
              }}>
                {item.icon} {item.title}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Active Pillar Detail */}
        <FadeIn delay={0.24} key={active}>
          <div style={{
            background: '#fff', borderRadius: 24, padding: 48,
            maxWidth: 640, margin: '0 auto',
            boxShadow: '0 4px 40px rgba(0,0,0,0.06)',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}>
            <div style={{ fontSize: 56, marginBottom: 20 }}>{siteConfig.pillars.items[active].icon}</div>
            <h3 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16, letterSpacing: -0.5 }}>
              {siteConfig.pillars.items[active].title}
            </h3>
            <p style={{ fontSize: 17, color: '#424245', lineHeight: 1.7, marginBottom: 24 }}>
              {siteConfig.pillars.items[active].description}
            </p>
            <div style={{
              display: 'inline-block', padding: '8px 16px', borderRadius: 10,
              background: '#f5f5f7', fontSize: 15, fontWeight: 600, color: '#0071e3',
            }}>
              {siteConfig.pillars.items[active].stat}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function Experience() {
  const [expanded, setExpanded] = useState<number | null>(0)
  return (
    <section id="经历" style={{ padding: '120px 24px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <FadeIn>
          <h2 style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1, marginBottom: 64 }}>
            {siteConfig.experience.title}
          </h2>
        </FadeIn>

        <div>
          {siteConfig.experience.items.map((exp, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div
                onClick={() => setExpanded(expanded === i ? null : i)}
                style={{
                  padding: '24px 0',
                  borderBottom: '1px solid #e8e8ed',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
                  <div style={{
                    width: 10, height: 10, borderRadius: '50%', marginTop: 7, flexShrink: 0,
                    background: exp.current ? '#0071e3' : '#d2d2d7',
                    boxShadow: exp.current ? '0 0 0 4px rgba(0,113,227,0.15)' : 'none',
                  }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                      <div style={{ fontSize: 12, color: '#86868b', fontWeight: 500 }}>{exp.period}</div>
                      <span style={{
                        fontSize: 12, color: '#86868b',
                        transition: 'transform 0.24s',
                        transform: expanded === i ? 'rotate(180deg)' : 'none',
                      }}>▼</span>
                    </div>
                    <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>{exp.role}</h3>
                    <div style={{ fontSize: 15, color: '#86868b', marginBottom: expanded === i ? 12 : 0 }}>
                      {exp.company}
                    </div>
                    {expanded === i && (
                      <p style={{
                        fontSize: 15, color: '#424245', lineHeight: 1.7,
                        animation: 'fadeIn 0.3s ease-out',
                      }}>
                        {exp.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section id="项目" style={{ padding: '120px 24px', background: '#f5f5f7' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <FadeIn>
          <h2 style={{ fontSize: 40, fontWeight: 700, textAlign: 'center', letterSpacing: -1, marginBottom: 64 }}>
            {siteConfig.projects.title}
          </h2>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {siteConfig.projects.items.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index }: { project: typeof siteConfig.projects.items[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <FadeIn delay={index * 0.1}>
      <div
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        style={{
          background: '#fff', borderRadius: 24, padding: 32,
          boxShadow: hovered ? '0 8px 40px rgba(0,0,0,0.1)' : '0 2px 12px rgba(0,0,0,0.04)',
          transform: hovered ? 'translateY(-4px)' : 'none',
          transition: 'all 0.36s cubic-bezier(0.16, 1, 0.3, 1)',
          cursor: 'pointer',
        }}
      >
        <div style={{
          width: 48, height: 48, borderRadius: 14, marginBottom: 20,
          background: `linear-gradient(135deg, ${['#0071e3', '#6366f1', '#34c759'][index]}, ${['#339af0', '#818cf8', '#69db7c'][index]})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22, color: '#fff',
        }}>
          {['🔧', '️', '💬'][index]}
        </div>
        <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, letterSpacing: -0.3 }}>
          {project.title}
        </h3>
        <p style={{ fontSize: 15, color: '#86868b', lineHeight: 1.6, marginBottom: 24 }}>
          {project.description}
        </p>
        <div style={{ borderTop: '1px solid #e8e8ed', paddingTop: 16 }}>
          {project.metrics.map((metric, j) => (
            <div key={j} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: j < project.metrics.length - 1 ? 8 : 0 }}>
              <span style={{ fontSize: 13, color: '#86868b' }}>{metric.label}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#0071e3' }}>{metric.value}</span>
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  )
}

function Contact() {
  return (
    <section id="联系" style={{ padding: '120px 24px', textAlign: 'center' }}>
      <div style={{ maxWidth: 480, margin: '0 auto' }}>
        <FadeIn>
          <h2 style={{ fontSize: 36, fontWeight: 700, letterSpacing: -1, marginBottom: 12 }}>
            {siteConfig.contact.title}
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p style={{ fontSize: 17, color: '#86868b', marginBottom: 40, lineHeight: 1.6 }}>
            欢迎聊聊 AI 在汽车行业能干什么
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { icon: '📱', label: siteConfig.contact.phone, href: `tel:${siteConfig.contact.phone}` },
              { icon: '📧', label: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
              { icon: '📍', label: siteConfig.contact.location, href: undefined },
            ].map((item, i) => (
              <a key={i} href={item.href}
                style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  padding: '18px 24px', borderRadius: 16,
                  background: '#f5f5f7', textDecoration: 'none', color: '#1d1d1f',
                  fontSize: 16, fontWeight: 500,
                  transition: 'all 0.24s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#e8e8ed' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#f5f5f7' }}
              >
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                {item.label}
              </a>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer style={{
      padding: '32px 24px', textAlign: 'center',
      borderTop: '1px solid #e8e8ed', fontSize: 13, color: '#86868b',
    }}>
      {siteConfig.footer.copyright}
    </footer>
  )
}

// ---- Main App ----
function App() {
  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", "PingFang SC", sans-serif', background: '#fff', color: '#1d1d1f', WebkitFontSmoothing: 'antialiased' }}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      <ScrollProgress />
      <Nav />
      <Hero />
      <Pillars />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
