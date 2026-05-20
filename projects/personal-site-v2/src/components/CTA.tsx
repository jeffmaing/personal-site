import { useState } from 'react'
import { siteConfig } from '../site-config'
import { IconPhone, IconMail, IconLocation, IconChevron } from '../icons'
import { qaDatabase } from '../digital-maming-qa'
import SocialShare from './SocialShare'
import { useInView, useWidth } from '../hooks/useAnimatedNumber'

interface CTAProps {
  onOpenChat: () => void
}

export default function CTA({ onOpenChat }: CTAProps) {
  const { contact } = siteConfig
  const [ref, visible] = useInView(0.2)
  const w = useWidth()
  const isMobile = w < 768

  // FAQ data
  const faqs = [
    {
      question: 'AI 能帮我做什么？',
      answer: qaDatabase.find(q => q.question.includes('做什么'))?.answer || 'AI 可以帮你自动化重复性任务、生成报告初稿、抓取和分析数据、搭建内部工具等。我主要聚焦在汽车行业的经销商诊断、数据自动化和智能代理搭建。',
    },
    {
      question: '你的服务流程是什么？',
      answer: qaDatabase.find(q => q.question.includes('流程') || q.question.includes('合作'))?.answer || '先聊 30 分钟了解你的工作流和痛点，然后给出一个具体的 AI 改造方案。确认合作后，我用 1-2 周时间搭建 MVP，验证效果后迭代优化。',
    },
    {
      question: '怎么联系麻明？',
      answer: `电话：${contact.phone}\n邮箱：${contact.email}\n地址：${contact.location}\n\n也可以直接点击上方的"和我聊聊"按钮，和 AI 助理先聊聊。`,
    },
  ]

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: isMobile ? '80px 24px' : 'clamp(80px, 12vw, 160px) 60px',
        background: '#f7f8fc',
        textAlign: 'center',
      }}
    >
      <div style={{
        maxWidth: '700px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(30px)',
        transition: 'opacity 1s ease, transform 1s ease',
      }}>
        {/* Section label */}
        <div style={{
          fontSize: '11px',
          color: '#bbb',
          letterSpacing: '0.2em',
          marginBottom: '28px',
        }}>
          04 — 联系我
        </div>

        {/* Main headline */}
        <h2 style={{
          fontSize: isMobile ? '32px' : 'clamp(40px, 6vw, 64px)',
          fontWeight: 800,
          color: '#1e2a3a',
          lineHeight: 1.15,
          marginBottom: '20px',
          letterSpacing: '-0.03em',
        }}>
          想知道 AI 能帮你
          <br />
          <span style={{
            color: '#5b7db1',
          }}>
            省多少时间？
          </span>
        </h2>

        {/* Subtitle */}
        <p style={{
          fontSize: 'clamp(15px, 2vw, 18px)',
          color: '#888',
          marginBottom: '48px',
          lineHeight: 1.7,
        }}>
          无论是经销商诊断、数据自动化，还是智能代理搭建
          <br />
          聊聊看，也许你的工作流也能被重构
        </p>

        {/* CTA Button */}
        <button
          onClick={onOpenChat}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: isMobile ? '16px 32px' : '18px 40px',
            background: '#5b7db1',
            color: '#fff',
            border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: '12px',
            fontSize: isMobile ? '15px' : 'clamp(16px, 2vw, 18px)',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.5s ease',
            boxShadow: 'none',
            marginBottom: '16px',
            letterSpacing: '0.02em',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#4a6a9e'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = '#5b7db1'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          和我聊聊
        </button>

        {/* Download Resume + Copy Intro buttons */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '48px',
        }}>
          <a
            href="/personal-site-v2/resume-麻明.pdf"
            download
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              borderRadius: '12px',
              border: '1px solid rgba(0,0,0,0.08)',
              background: '#fff',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 500,
              color: '#6b7a8d',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
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
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            下载完整简历
          </a>

          <CopyIntroButton />
        </div>

        {/* FAQ section with id */}
        <div id="faq" style={{
          textAlign: 'left',
          marginBottom: '48px',
        }}>
          <div style={{
            fontSize: '11px',
            color: '#bbb',
            letterSpacing: '0.15em',
            marginBottom: '20px',
            textTransform: 'uppercase',
          }}>
            常见问题
          </div>
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        {/* Contact info */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: isMobile ? '12px 20px' : '40px',
          fontSize: isMobile ? '13px' : '14px',
          color: '#888',
          lineHeight: 1.8,
        }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <IconPhone size={14} />
            {contact.phone}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <IconMail size={14} />
            {contact.email}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <IconLocation size={14} />
            {contact.location}
          </span>
        </div>

        {/* Social share */}
        <SocialShare />
      </div>
    </section>
  )
}

function CopyIntroButton() {
  const [copied, setCopied] = useState(false)

  const introText = `麻明 · 19年汽车行业经验\n从比亚迪西非拓荒到AI重构诊断体系\n懂业务的没我懂AI，懂AI的没我懂业务\n📞 185-1359-5306 | 📧 jeffmaming@163.com\n🔗 https://jeffmaming.github.io/personal-site`

  const handleCopy = () => {
    navigator.clipboard.writeText(introText).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <button
      onClick={handleCopy}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 24px',
        borderRadius: '12px',
        border: '1px solid rgba(0,0,0,0.08)',
        background: '#fff',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 500,
        color: copied ? '#52b788' : '#6b7a8d',
        transition: 'all 0.3s ease',
        letterSpacing: '0.02em',
        position: 'relative',
      }}
      onMouseEnter={(e) => {
        if (!copied) {
          e.currentTarget.style.borderColor = '#5b7db1'
          e.currentTarget.style.color = '#5b7db1'
        }
      }}
      onMouseLeave={(e) => {
        if (!copied) {
          e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'
          e.currentTarget.style.color = '#6b7a8d'
        }
      }}
    >
      {copied ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
        </svg>
      )}
      {copied ? '已复制 ✓' : '复制个人介绍'}
    </button>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{
      borderBottom: '1px solid rgba(0,0,0,0.06)',
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: '20px 0',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          gap: '12px',
        }}
      >
        <span style={{
          fontSize: '15px',
          fontWeight: 500,
          color: open ? '#1e2a3a' : '#6b7a8d',
          transition: 'color 0.5s ease',
        }}>
          {question}
        </span>
        <IconChevron size={16} direction={open ? 'up' : 'down'} />
      </button>
      <div style={{
        maxHeight: open ? '300px' : '0',
        opacity: open ? 1 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.6s ease, opacity 0.6s ease',
      }}>
        <p style={{
          fontSize: '14px',
          color: '#888',
          lineHeight: 1.8,
          paddingBottom: '20px',
          whiteSpace: 'pre-wrap',
          margin: 0,
        }}>
          {answer}
        </p>
      </div>
    </div>
  )
}

