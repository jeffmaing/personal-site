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
        padding: isMobile
          ? 'var(--space-3xl) var(--space-sm)'
          : 'var(--space-section) var(--space-lg)',
        background: 'var(--bg-primary)',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '700px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(30px)',
          transition: 'opacity 1s ease, transform 1s ease',
        }}
      >
        {/* Section label — tertiary */}
        <div
          style={{
            fontSize: 'var(--font-small)',
            color: 'var(--text-light)',
            letterSpacing: '0.2em',
            marginBottom: 'var(--space-xl)',
            fontFamily: 'var(--font-heading)',
            textTransform: 'uppercase',
            opacity: 0.7,
          }}
        >
          04 — 联系我
        </div>

        {/* Headline — focal */}
        <h2
          style={{
            fontSize: isMobile ? 'var(--font-h3)' : 'var(--font-h1)',
            fontWeight: 'var(--weight-bold)',
            color: 'var(--text-primary)',
            lineHeight: 'var(--lh-tight)',
            marginBottom: 'var(--space-md)',
            letterSpacing: 'var(--ls-heading)',
            fontFamily: 'var(--font-heading)',
          }}
        >
          想知道 AI 能帮你
          <br />
          <span style={{ color: 'var(--accent-primary)' }}>省多少时间？</span>
        </h2>

        {/* Subtitle — secondary */}
        <p
          style={{
            fontSize: 'var(--font-body)',
            color: 'var(--text-muted)',
            marginBottom: 'var(--space-2xl)',
            lineHeight: 'var(--lh-loose)',
            fontFamily: 'var(--font-body)',
            opacity: 0.7,
          }}
        >
          无论是经销商诊断、数据自动化，还是智能代理搭建
          <br />
          聊聊看，也许你的工作流也能被重构
        </p>

        {/* Primary CTA */}
        <button
          onClick={onOpenChat}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--space-xs)',
            padding: isMobile ? '16px 32px' : '18px 40px',
            background: 'var(--accent-primary)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            fontSize: isMobile ? '15px' : 'var(--font-body)',
            fontWeight: 'var(--weight-semibold)',
            cursor: 'pointer',
            transition: 'background 0.2s ease, box-shadow 0.2s ease',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: 'var(--space-md)',
            letterSpacing: 'var(--ls-loose)',
            fontFamily: 'var(--font-body)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#4a6a9e'
            e.currentTarget.style.boxShadow = 'var(--shadow-md)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'var(--accent-primary)'
            e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
          }}
        >
          和我聊聊
        </button>

        {/* Secondary actions */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 'var(--space-sm)',
            marginBottom: 'var(--space-2xl)',
          }}
        >
          <a
            href="/personal-site-v2/resume-麻明.pdf"
            download
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-xs)',
              padding: '12px 24px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              background: 'var(--bg-card)',
              cursor: 'pointer',
              fontSize: 'var(--font-caption)',
              fontWeight: 'var(--weight-medium)',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              transition: 'border-color 0.2s ease, color 0.2s ease',
              letterSpacing: 'var(--ls-loose)',
              fontFamily: 'var(--font-body)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--accent-primary)'
              e.currentTarget.style.color = 'var(--accent-primary)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)'
              e.currentTarget.style.color = 'var(--text-secondary)'
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            下载完整简历
          </a>

          <CopyIntroButton />
        </div>

        {/* FAQ */}
        <div
          id="faq"
          style={{
            textAlign: 'left',
            marginBottom: 'var(--space-2xl)',
          }}
        >
          <div
            style={{
              fontSize: 'var(--font-small)',
              color: 'var(--text-light)',
              letterSpacing: '0.15em',
              marginBottom: 'var(--space-md)',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-heading)',
              fontWeight: 'var(--weight-medium)',
            }}
          >
            常见问题
          </div>
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        {/* Contact info */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: isMobile ? 'var(--space-xs) var(--space-md)' : '0 var(--space-2xl)',
            fontSize: 'var(--font-caption)',
            color: 'var(--text-muted)',
            lineHeight: 1.8,
            fontFamily: 'var(--font-body)',
            opacity: 0.8,
          }}
        >
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

        <SocialShare />
      </div>
    </section>
  )
}

function CopyIntroButton() {
  const [copied, setCopied] = useState(false)

  const introText = `麻明 · 19年汽车行业经验\n从比亚迪西非拓荒到AI重构诊断体系\n懂业务的没我懂AI，懂AI的没我懂业务\n电话 185-1359-5306 | 邮箱 jeffmaming@163.com\n链接 https://jeffmaming.github.io/personal-site`

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
        gap: 'var(--space-xs)',
        padding: '12px 24px',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--border-subtle)',
        background: 'var(--bg-card)',
        cursor: 'pointer',
        fontSize: 'var(--font-caption)',
        fontWeight: 'var(--weight-medium)',
        color: copied ? 'var(--accent-secondary)' : 'var(--text-secondary)',
        transition: 'border-color 0.2s ease, color 0.2s ease',
        letterSpacing: 'var(--ls-loose)',
        fontFamily: 'var(--font-body)',
      }}
      onMouseEnter={e => {
        if (!copied) {
          e.currentTarget.style.borderColor = 'var(--accent-primary)'
          e.currentTarget.style.color = 'var(--accent-primary)'
        }
      }}
      onMouseLeave={e => {
        if (!copied) {
          e.currentTarget.style.borderColor = 'var(--border-subtle)'
          e.currentTarget.style.color = 'var(--text-secondary)'
        }
      }}
    >
      {copied ? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
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
    <div
      style={{
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: 'var(--space-md) 0',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          gap: 'var(--space-sm)',
          fontFamily: 'var(--font-body)',
        }}
      >
        <span
          style={{
            fontSize: 'var(--font-body)',
            fontWeight: 'var(--weight-medium)',
            color: open ? 'var(--text-primary)' : 'var(--text-secondary)',
            transition: 'color 0.2s ease',
            fontFamily: 'var(--font-body)',
          }}
        >
          {question}
        </span>
        <IconChevron size={16} direction={open ? 'up' : 'down'} />
      </button>
      <div
        style={{
          maxHeight: open ? '300px' : '0',
          opacity: open ? 1 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.4s ease, opacity 0.4s ease',
        }}
      >
        <p
          style={{
            fontSize: 'var(--font-caption)',
            color: 'var(--text-muted)',
            lineHeight: 'var(--lh-loose)',
            paddingBottom: 'var(--space-md)',
            whiteSpace: 'pre-wrap',
            margin: 0,
            fontFamily: 'var(--font-body)',
          }}
        >
          {answer}
        </p>
      </div>
    </div>
  )
}
