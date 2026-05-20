interface ModalProps {
  children: React.ReactNode
  onClose: () => void
}

export default function Modal({ children, onClose }: ModalProps) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.3)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'modalFadeIn 0.4s ease',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '640px',
          maxHeight: '85vh',
          overflow: 'auto',
          background: '#ffffff',
          borderRadius: '20px',
          border: '1px solid rgba(0,0,0,0.06)',
          padding: 'clamp(28px, 4vw, 48px)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.1)',
          animation: 'modalSlideIn 0.5s ease',
          position: 'relative',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="关闭"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: '1px solid rgba(0,0,0,0.08)',
            background: 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            color: '#888',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = '#5b7db1'
            e.currentTarget.style.color = '#5b7db1'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'
            e.currentTarget.style.color = '#888'
          }}
        >
          ✕
        </button>

        {children}
      </div>

      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalSlideIn {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  )
}
