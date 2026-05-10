import { useState, useEffect } from 'react'
import { siteConfig } from '../site-config'
import { useWidth } from '../hooks/useAnimatedNumber'

const NAV_SECTIONS = [
  { id: 'story', label: '关于我' },
  { id: 'arsenal', label: 'AI 提效' },
  { id: 'boundaries', label: 'AI 边界' },
  { id: 'contact', label: '联系我' },
]

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('story')
  const [menuOpen, setMenuOpen] = useState(false)
  const w = useWidth()
  const isMobile = w < 768

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)

      // Scroll spy
      const sectionIds = NAV_SECTIONS.map(s => s.id)
      const scrollY = window.scrollY + 120

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i])
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(sectionIds[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    if (!isMobile) setMenuOpen(false)
  }, [isMobile])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const offset = 60
      const top = el.offsetTop - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isMobile ? '0 20px' : '0 40px',
          zIndex: 9000,
          transition: 'all 0.5s ease',
          background: scrolled
            ? 'rgba(255,255,255,0.85)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: 0,
          }}
        >
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #5b7db1, #8aa5c8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '13px',
              fontWeight: 700,
            }}
          >
            M
          </span>
          <span
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: scrolled ? '#1e2a3a' : '#1e2a3a',
              letterSpacing: '-0.02em',
            }}
          >
            {siteConfig.name}
          </span>
        </button>

        {/* Desktop links */}
        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            {NAV_SECTIONS.map(section => (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: activeSection === section.id ? 600 : 400,
                  color: activeSection === section.id ? '#5b7db1' : '#888',
                  transition: 'color 0.3s ease, font-weight 0.3s ease',
                  padding: '4px 0',
                  position: 'relative',
                  letterSpacing: '0.02em',
                }}
              >
                {section.label}
                {activeSection === section.id && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '-2px',
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: '#5b7db1',
                      borderRadius: '1px',
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        )}

        {/* Hamburger (mobile) */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
            }}
            aria-label="打开菜单"
          >
            <span
              style={{
                display: 'block',
                width: 20,
                height: '2px',
                background: '#1e2a3a',
                borderRadius: '1px',
                transition: 'all 0.3s ease',
                transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
              }}
            />
            <span
              style={{
                display: 'block',
                width: 20,
                height: '2px',
                background: '#1e2a3a',
                borderRadius: '1px',
                transition: 'all 0.3s ease',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: 'block',
                width: 20,
                height: '2px',
                background: '#1e2a3a',
                borderRadius: '1px',
                transition: 'all 0.3s ease',
                transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
              }}
            />
          </button>
        )}
      </nav>

      {/* Mobile slide-in menu */}
      {isMobile && (
        <>
          {/* Backdrop */}
          {menuOpen && (
            <div
              onClick={() => setMenuOpen(false)}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.3)',
                zIndex: 8999,
                opacity: menuOpen ? 1 : 0,
                transition: 'opacity 0.3s ease',
              }}
            />
          )}

          {/* Slide-in panel */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '280px',
              maxWidth: '80vw',
              background: '#fff',
              zIndex: 9001,
              padding: '80px 32px 32px',
              transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
              transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: menuOpen ? '-10px 0 40px rgba(0,0,0,0.1)' : 'none',
            }}
          >
            {NAV_SECTIONS.map((section, i) => (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                style={{
                  display: 'block',
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  padding: '16px 0',
                  fontSize: '18px',
                  fontWeight: activeSection === section.id ? 700 : 400,
                  color: activeSection === section.id ? '#5b7db1' : '#1e2a3a',
                  borderBottom: '1px solid rgba(0,0,0,0.06)',
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? 'translateX(0)' : 'translateX(20px)',
                  transition: `all 0.3s ease ${menuOpen ? 0.1 + i * 0.05 : 0}s`,
                }}
              >
                {section.label}
              </button>
            ))}
          </div>
        </>
      )}
    </>
  )
}
