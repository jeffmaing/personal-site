
interface ExpData {
  period: string
  role: string
  company: string
  description: string
}

const expVideos: Record<string, string> = {
  '梅赛德斯 - 奔驰': './benz.mp4',
  '东风英菲尼迪': './infiniti.mp4',
  '安永（中国）': './ey.mp4',
  '易车': './yiche.mp4',
}

export default function ExperienceModal({ exp, isMobile, onClose }: { exp: ExpData; isMobile: boolean; onClose: () => void }) {
  const videoUrl = expVideos[exp.company]
  const hasVideo = !!videoUrl

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.6)',
        WebkitBackdropFilter: 'blur(12px)',
        backdropFilter: 'blur(12px)',
        zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: isMobile ? '20px 12px' : '40px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 800, maxHeight: '90vh',
          background: '#fff', borderRadius: 16,
          overflow: 'auto',
          boxShadow: '0 24px 80px rgba(0,0,0,0.4)',
        }}
      >
        <div style={{
          padding: isMobile ? '24px 20px 16px' : '32px 36px 20px',
          borderBottom: '1px solid #f0f0f0',
          position: 'relative',
        }}>
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: isMobile ? 16 : 20, right: isMobile ? 16 : 20,
              width: 32, height: 32, borderRadius: '50%',
              border: 'none', background: '#f5f5f5', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, color: '#666',
            }}
          >✕</button>
          <div style={{ fontSize: 12, color: '#999', marginBottom: 6 }}>{exp.period}</div>
          <h2 style={{ fontSize: isMobile ? 20 : 26, fontWeight: 700, color: '#1a1a2e', marginBottom: 4, paddingRight: 40 }}>
            {exp.company}
          </h2>
          <div style={{ fontSize: isMobile ? 13 : 15, color: '#6b7280' }}>{exp.role}</div>
        </div>

        <div style={{ padding: isMobile ? '20px' : '24px 36px' }}>
          <p style={{ fontSize: 14, color: '#4b5563', lineHeight: 1.8 }}>
            {exp.description}
          </p>
        </div>

        {hasVideo && (
          <div style={{ padding: `0 ${isMobile ? 20 : 36}px ${isMobile ? 24 : 32}px` }}>
            <div style={{ fontSize: 12, color: '#999', marginBottom: 10, fontWeight: 500 }}>
              📹 这段经历的视频介绍
            </div>
            <video
              src={videoUrl}
              controls
              playsInline
              preload="auto"
              style={{
                width: '100%', borderRadius: 10, background: '#000',
                maxHeight: isMobile ? '35vh' : '40vh', objectFit: 'contain',
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
