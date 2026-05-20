import { useState } from 'react'
import { useInView, useWidth } from '../hooks/useAnimatedNumber'

interface MetricItem {
  label: string
  value: string
  detail: string
}

interface CareerStep {
  year: string
  label: string
  role: string
  color: string
  description: string
  metrics: MetricItem[]
  projects: string[]
}

const CAREER_DATA: CareerStep[] = [
  {
    year: "2007-2011",
    label: "比亚迪",
    role: "海外市场开拓",
    color: "#e07070",
    description: "负责比亚迪在西非市场的开拓工作，从零建立销售网络和售后体系。",
    metrics: [
      { label: "覆盖国家", value: "3 个", detail: "贝宁、马里、喀麦隆" },
      { label: "市场阶段", value: "从 0 到 1", detail: "海外新兴市场开拓" },
    ],
    projects: ["西非三国市场开拓", "海外经销商网络建设"],
  },
  {
    year: "2011-2014",
    label: "梅赛德斯-奔驰",
    role: "项目经理",
    color: "#1e2a3a",
    description: "搭建经销商\"筹备-开业-运营\"三阶辅导体系，主导开发辅导管理系统（任务管理、案例库、BI看板），推动辅导流程线上化。",
    metrics: [
      { label: "新网点辅导", value: "34 家", detail: "帮助门店平均提前 2 个月实现盈利" },
      { label: "客户满意度", value: "90 分", detail: "提升服务标准" },
      { label: "培训周期", value: "3月→1月", detail: "新员工培训效率提升" },
    ],
    projects: ["经销商辅导管理系统（任务/案例/BI）", "三阶辅导体系搭建（筹备-开业-运营）"],
  },
  {
    year: "2014-2017",
    label: "东风英菲尼迪",
    role: "项目经理",
    color: "#1a365d",
    description: "负责经销商销售/CRM/开业标准化与销售漏斗管理，建立运营标准与数据口径，形成落地执行手册与培训体系。",
    metrics: [
      { label: "运营标准", value: "IDOS", detail: "经销商销售运营标准" },
      { label: "CRM 标准", value: "Retail CRM", detail: "零售客户管理标准" },
    ],
    projects: ["英菲尼迪经销商销售运营标准（IDOS）", "Retail CRM 管理标准", "线下活动落地执行手册"],
  },
  {
    year: "2017-2024",
    label: "安永（中国）",
    role: "高级项目经理",
    color: "#8c5a2b",
    description: "面向主机厂与经销商体系提供售后运营、审计与数字化转型咨询，负责从业务诊断到指标体系到系统方案的端到端交付。服务 20+ 车企，每年 150+ 家店。",
    metrics: [
      { label: "服务覆盖", value: "150+ 家/年", detail: "每年辅导店次" },
      { label: "运营效率", value: "提升 40%", detail: "辅导员效率提升" },
      { label: "运营成本", value: "降低 15%", detail: "辅导项目运营成本" },
    ],
    projects: ["奔驰配件部门 SOP 与经销商手册", "一汽大众售后 BI 数字化转型（200+核心指标）", "智能审计平台（OCR+PS校验+异常检测）", "辅导项目实时监控工具"],
  },
  {
    year: "2024-2025",
    label: "易车",
    role: "高级产品运营（AI方向）",
    color: "#e05c2b",
    description: "构建汽车垂直领域大模型应用框架，牵头 AI Agent 原型设计，推动领域知识注入与质量评估机制。",
    metrics: [
      { label: "内容准确率", value: "60%→85%", detail: "车型技术解析/政策解读" },
      { label: "转型成果", value: "生产→精修", detail: "团队从内容生产转向质量精修" },
    ],
    projects: ["汽车垂类大模型应用框架（资讯生成+策略分析）", "AI Agent 原型设计（需求理解/信息检索/方案生成）"],
  },
  {
    year: "2025-至今",
    label: "港泓咨询",
    role: "咨询总监（AI产品方向）",
    color: "#52b788",
    description: "负责豪华品牌数字化/数据产品与 AI 方案整体规划，牵头跨部门协同推进数据与 AI 能力产品化交付与上线运营。",
    metrics: [
      { label: "培训完成率", value: "提升 45%", detail: "雷克萨斯教育平台 AI 改造" },
      { label: "响应速度", value: "提升 60%", detail: "保时捷客户需求解析系统" },
    ],
    projects: ["雷克萨斯智能课程推荐引擎 + 虚拟讲师", "保时捷 AI 客户需求解析系统"],
  },
]

function CareerModal({ data, onClose }: { data: CareerStep; onClose: () => void }) {
  const w = useWidth()
  const isMobile = w < 768

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: isMobile ? 'flex-end' : 'center',
        justifyContent: 'center',
        padding: isMobile ? '0' : '20px',
        animation: 'modalFadeIn 0.3s ease',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: isMobile ? '100%' : '600px',
          maxHeight: isMobile ? '90vh' : '85vh',
          height: isMobile ? '90vh' : 'auto',
          overflow: 'auto',
          background: '#ffffff',
          borderRadius: isMobile ? '24px 24px 0 0' : '20px',
          border: isMobile ? 'none' : '1px solid rgba(0,0,0,0.06)',
          padding: isMobile ? '24px 20px 32px' : 'clamp(28px, 4vw, 48px)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.15)',
          animation: isMobile ? 'modalSlideUp 0.4s ease' : 'modalSlideIn 0.4s ease',
          position: 'relative',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="关闭"
          style={{
            position: 'absolute',
            top: isMobile ? '16px' : '20px',
            right: isMobile ? '16px' : '20px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: '1px solid rgba(0,0,0,0.1)',
            background: '#f8f9fa',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            color: '#666',
            transition: 'all 0.3s ease',
            zIndex: 10,
          }}
        >
          ✕
        </button>

        {/* Header */}
        <div style={{ marginBottom: '24px', paddingRight: '40px' }}>
          <div style={{
            display: 'inline-block',
            fontSize: '13px',
            fontWeight: 700,
            color: data.color,
            background: `${data.color}15`,
            padding: '6px 14px',
            borderRadius: '8px',
            marginBottom: '12px',
          }}>
            {data.year}
          </div>
          <h3 style={{
            fontSize: isMobile ? '22px' : '26px',
            fontWeight: 700,
            color: '#1e2a3a',
            margin: '0 0 6px 0',
          }}>
            {data.label}
          </h3>
          <div style={{
            fontSize: '15px',
            color: data.color,
            fontWeight: 500,
          }}>
            {data.role}
          </div>
        </div>

        {/* Description */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{
            fontSize: '12px',
            color: '#999',
            letterSpacing: '0.08em',
            marginBottom: '10px',
            fontWeight: 600,
          }}>
            职责描述
          </div>
          <p style={{
            fontSize: '15px',
            lineHeight: 1.8,
            color: '#444',
            margin: 0,
          }}>
            {data.description}
          </p>
        </div>

        {/* Metrics */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{
            fontSize: '12px',
            color: '#999',
            letterSpacing: '0.08em',
            marginBottom: '14px',
            fontWeight: 600,
          }}>
            量化成果
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '12px',
          }}>
            {data.metrics.map((metric, i) => (
              <div
                key={i}
                style={{
                  background: 'linear-gradient(135deg, #f8f9fa 0%, #fff 100%)',
                  borderRadius: '14px',
                  padding: '18px 16px',
                  border: '1px solid rgba(0,0,0,0.04)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                }}
              >
                <div style={{
                  fontSize: '11px',
                  color: '#888',
                  marginBottom: '6px',
                }}>
                  {metric.label}
                </div>
                <div style={{
                  fontSize: '22px',
                  fontWeight: 700,
                  color: data.color,
                  marginBottom: '4px',
                }}>
                  {metric.value}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#999',
                  lineHeight: 1.4,
                }}>
                  {metric.detail}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div>
          <div style={{
            fontSize: '12px',
            color: '#999',
            letterSpacing: '0.08em',
            marginBottom: '14px',
            fontWeight: 600,
          }}>
            代表项目
          </div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
          }}>
            {data.projects.map((project, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  background: `${data.color}10`,
                  color: data.color,
                  padding: '10px 16px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 500,
                  border: `1px solid ${data.color}20`,
                }}
              >
                {project}
              </span>
            ))}
          </div>
        </div>
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
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(100%); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

export default function CareerTimeline() {
  const [ref, visible] = useInView(0.1)
  const [selectedCareer, setSelectedCareer] = useState<CareerStep | null>(null)
  const w = useWidth()
  const isMobile = w < 768

  return (
    <>
      <div
        ref={ref}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s',
        }}
      >
        {/* Section label */}
        <div style={{
          fontSize: '11px',
          color: '#bbb',
          letterSpacing: '0.2em',
          marginBottom: isMobile ? '24px' : '32px',
        }}>
          职业历程
        </div>

        {/* Milestone cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
          gap: '16px',
        }}>
          {CAREER_DATA.map((step, i) => (
            <div
              key={i}
              onClick={() => setSelectedCareer(step)}
              style={{
                background: '#fff',
                borderRadius: '14px',
                padding: '20px 16px',
                border: '1px solid rgba(0,0,0,0.04)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : 'translateY(12px)',
                transition: 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                transitionDelay: `${0.1 + i * 0.08}s`,
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'
                e.currentTarget.style.borderColor = step.color + '30'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.03)'
                e.currentTarget.style.borderColor = 'rgba(0,0,0,0.04)'
              }}
            >
              {/* Year badge */}
              <div style={{
                display: 'inline-block',
                fontSize: '12px',
                fontWeight: 700,
                color: step.color,
                background: `${step.color}12`,
                padding: '4px 10px',
                borderRadius: '6px',
                marginBottom: '10px',
              }}>
                {step.year}
              </div>

              {/* Company */}
              <div style={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#1e2a3a',
                marginBottom: '4px',
              }}>
                {step.label}
              </div>

              {/* Role */}
              <div style={{
                fontSize: '12px',
                color: '#999',
                letterSpacing: '0.02em',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <span>{step.role}</span>
                <span style={{
                  fontSize: '10px',
                  color: '#bbb',
                  marginLeft: '8px',
                }}>查看详情 →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedCareer && (
        <CareerModal
          data={selectedCareer}
          onClose={() => setSelectedCareer(null)}
        />
      )}
    </>
  )
}
