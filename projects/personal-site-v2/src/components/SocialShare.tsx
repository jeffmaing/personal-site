import { useState } from 'react'
import { siteConfig } from '../site-config'

export default function SocialShare() {
  const [copied, setCopied] = useState<string | null>(null)

  const pageUrl = typeof window !== 'undefined' ? window.location.href : siteConfig.url

  const introText = `麻明 · 19年汽车行业经验\n从比亚迪西非拓荒到AI重构诊断体系\n懂业务的没我懂AI，懂AI的没我懂业务\n${siteConfig.contact.phone} | ${siteConfig.contact.email}\n${siteConfig.url}`

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(label)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center', marginTop: '32px' }}>
      {/* WeChat share */}
      <button
        onClick={() => handleCopy(pageUrl, 'wechat')}
        style={{
          width: '44px',
          height: '44px',
          borderRadius: '12px',
          border: '1px solid rgba(0,0,0,0.08)',
          background: '#fff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          position: 'relative',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#07c160'
          e.currentTarget.style.background = '#f0fdf4'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'
          e.currentTarget.style.background = '#fff'
        }}
        title="复制链接"
      >
        {/* WeChat icon */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#07c160">
          <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.028.14-.028.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.808-.073a6.42 6.42 0 01-.248-1.758c0-3.694 3.527-6.693 7.88-6.693.22 0 .435.012.648.035C17.189 4.874 13.365 2.188 8.691 2.188zm-2.6 4.408c.58 0 1.05.47 1.05 1.05s-.47 1.05-1.05 1.05-1.05-.47-1.05-1.05.47-1.05 1.05-1.05zm5.2 0c.58 0 1.05.47 1.05 1.05s-.47 1.05-1.05 1.05-1.05-.47-1.05-1.05.47-1.05 1.05-1.05zM24 14.485c0-3.364-3.322-6.093-7.43-6.093-4.107 0-7.43 2.73-7.43 6.093 0 3.364 3.323 6.093 7.43 6.093a9.27 9.27 0 002.166-.256.672.672 0 01.557.076l1.483.87a.25.25 0 00.13.042.228.228 0 00.226-.228.666.666 0 00-.022-.166l-.304-1.153a.458.458 0 01.166-.518C22.725 18.417 24 16.568 24 14.485zm-10.18-1.19c.452 0 .818.366.818.818s-.366.818-.818.818-.818-.366-.818-.818.366-.818.818-.818zm4.56 0c.452 0 .818.366.818.818s-.366.818-.818.818-.818-.366-.818-.818.366-.818.818-.818z" />
        </svg>
        {copied === 'wechat' && <CopyTooltip text="已复制" />}
      </button>

      {/* LinkedIn share */}
      <button
        onClick={() => {
          const url = encodeURIComponent(pageUrl)
          const title = encodeURIComponent(`${siteConfig.name} · AI × 汽车行业`)
          window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${title}`, '_blank')
        }}
        style={{
          width: '44px',
          height: '44px',
          borderRadius: '12px',
          border: '1px solid rgba(0,0,0,0.08)',
          background: '#fff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          position: 'relative',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#0077b5'
          e.currentTarget.style.background = '#f0f7ff'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'
          e.currentTarget.style.background = '#fff'
        }}
        title="分享到 LinkedIn"
      >
        {/* LinkedIn icon */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#0077b5">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </button>

      {/* Copy intro button */}
      <button
        onClick={() => handleCopy(introText, 'intro')}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 20px',
          borderRadius: '12px',
          border: '1px solid rgba(0,0,0,0.08)',
          background: '#fff',
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: 500,
          color: '#6b7a8d',
          transition: 'all 0.3s ease',
          position: 'relative',
          letterSpacing: '0.02em',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#5b7db1'
          e.currentTarget.style.color = '#5b7db1'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'
          e.currentTarget.style.color = '#6b7a8d'
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
        </svg>
        复制个人介绍
        {copied === 'intro' && (
          <span
            style={{
              position: 'absolute',
              bottom: '-32px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#1e2a3a',
              color: '#fff',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '11px',
              whiteSpace: 'nowrap',
              animation: 'fadeInUp 0.3s ease',
            }}
          >
            已复制到剪贴板 ✓
          </span>
        )}
      </button>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateX(-50%) translateY(4px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  )
}

function CopyTooltip({ text }: { text: string }) {
  return (
    <span
      style={{
        position: 'absolute',
        bottom: '-32px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: '#1e2a3a',
        color: '#fff',
        padding: '4px 10px',
        borderRadius: '6px',
        fontSize: '11px',
        whiteSpace: 'nowrap',
        animation: 'fadeInUp 0.3s ease',
      }}
    >
      {text}
    </span>
  )
}
