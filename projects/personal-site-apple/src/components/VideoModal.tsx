import { useState } from 'react'

export default function VideoModal({ isMobile = false }: { isMobile?: boolean }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          padding: isMobile ? '10px 24px' : '12px 28px',
          borderRadius: 100,
          background: '#1a1a2e', color: '#fff',
          fontSize: isMobile ? 13 : 14, fontWeight: 500, cursor: 'pointer',
          border: 'none',
          boxShadow: '0 4px 20px rgba(26,26,46,0.2)',
          width: isMobile ? '100%' : 'auto',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(26,26,46,0.3)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(26,26,46,0.2)'; }}
      >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
          <path d="M6.5 4.5l9 5.5-9 5.5V4.5z"/>
        </svg>
        看看我的故事
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.6)',
            WebkitBackdropFilter: 'blur(12px)',
            backdropFilter: 'blur(12px)',
            zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: isMobile ? '30px 16px' : '60px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: isMobile ? '100%' : 860,
              borderRadius: 16,
              overflow: 'hidden',
              background: '#000',
              boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
              position: 'relative',
            }}
          >
            <button
              onClick={() => setOpen(false)}
              style={{
                position: 'absolute', top: 12, right: 12,
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)', border: 'none',
                color: '#fff', fontSize: 18, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 10,
              }}
            >✕</button>
            <video
              src="./intro.mp4"
              controls
              autoPlay
              playsInline
              preload="auto"
              style={{
                width: '100%', display: 'block',
                maxHeight: isMobile ? '65vh' : '75vh',
                objectFit: 'contain', background: '#000',
              }}
            />
          </div>
        </div>
      )}
    </>
  )
}
