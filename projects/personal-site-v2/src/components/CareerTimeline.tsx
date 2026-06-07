import { useState } from 'react'
import { useInView, useWidth } from '../hooks/useAnimatedNumber'
import Modal from './Modal'

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

export default function CareerTimeline() {
  const [ref, visible] = useInView(0.05)
  const [selectedCareer, setSelectedCareer] = useState<CareerStep | null>(null)
  const w = useWidth()
  const isMobile = w < 768

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(20px)',
        transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s',
      }}
    >
      {/* Section label */}
      <div className="section-label" style={{ marginBottom: isMobile ? '24px' : '32px' }}>
        职业历程
      </div>

      {/* Static timeline — clean vertical list */}
      <div style={{
        position: 'relative',
        paddingLeft: isMobile ? '0' : '28px',
      }}>
        {/* Vertical timeline line (desktop) */}
        {!isMobile && (
          <div style={{
            position: 'absolute',
            left: '7px',
            top: '12px',
            bottom: '12px',
            width: '2px',
            background: 'var(--border-subtle)',
          }} />
        )}

        {CAREER_DATA.map((step, i) => (
          <div
            key={i}
            style={{
              position: 'relative',
              marginBottom: '16px',
              paddingLeft: isMobile ? '0' : '32px',
              opacity: visible ? 1 : 0,
              transform: visible ? 'none' : 'translateY(12px)',
              transition: `opacity 0.5s ease, transform 0.5s ease`,
              transitionDelay: `${0.1 + i * 0.08}s`,
            }}
          >
            {/* Timeline dot (desktop) */}
            {!isMobile && (
              <div style={{
                position: 'absolute',
                left: '0',
                top: '24px',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                border: `3px solid ${step.color}`,
                background: 'var(--bg-primary)',
                zIndex: 1,
              }} />
            )}

            {/* Card */}
            <div
              style={{
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px 24px',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-sm)',
                cursor: 'pointer',
                transition: 'box-shadow 0.2s ease',
              }}
              onClick={() => setSelectedCareer(step)}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-md)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--shadow-sm)' }}
            >
              {/* Header row */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                marginBottom: '12px',
                flexWrap: 'wrap',
                gap: '8px',
              }}>
                <div>
                  {/* Year badge */}
                  <div style={{
                    display: 'inline-block',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: step.color,
                    background: `${step.color}12`,
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '6px',
                    fontFamily: 'var(--font-heading)',
                  }}>
                    {step.year}
                  </div>

                  {/* Company + Role */}
                  <div style={{
                    fontSize: '17px',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: '2px',
                    fontFamily: 'var(--font-heading)',
                  }}>
                    {step.label}
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: step.color,
                    fontWeight: 500,
                    fontFamily: 'var(--font-body)',
                  }}>
                    {step.role}
                  </div>
                </div>

                {/* View detail hint (desktop) */}
                {!isMobile && (
                  <div style={{
                    fontSize: '11px',
                    color: 'var(--text-light)',
                    marginTop: '4px',
                    whiteSpace: 'nowrap',
                    fontFamily: 'var(--font-body)',
                  }}>
                    点击查看详情 →
                  </div>
                )}
              </div>

              {/* Description */}
              <div style={{
                fontSize: '14px',
                lineHeight: 1.75,
                color: 'var(--text-secondary)',
                marginBottom: '14px',
                fontFamily: 'var(--font-body)',
              }}>
                {step.description}
              </div>

              {/* Metrics */}
              <div style={{ marginBottom: '14px' }}>
                <div style={{
                  fontSize: '11px',
                  color: 'var(--text-light)',
                  letterSpacing: '0.08em',
                  marginBottom: '8px',
                  fontWeight: 600,
                  fontFamily: 'var(--font-heading)',
                }}>
                  量化成果
                </div>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                }}>
                  {step.metrics.map((metric, mi) => (
                    <div
                      key={mi}
                      style={{
                        background: 'var(--bg-primary)',
                        borderRadius: 'var(--radius-md)',
                        padding: '10px 14px',
                        border: '1px solid var(--border-subtle)',
                        minWidth: '110px',
                        flex: '1 1 130px',
                      }}
                    >
                      <div style={{
                        fontSize: '11px',
                        color: 'var(--text-muted)',
                        marginBottom: '3px',
                        fontFamily: 'var(--font-body)',
                      }}>
                        {metric.label}
                      </div>
                      <div style={{
                        fontSize: '18px',
                        fontWeight: 700,
                        color: step.color,
                        marginBottom: '2px',
                        fontFamily: 'var(--font-heading)',
                      }}>
                        {metric.value}
                      </div>
                      <div style={{
                        fontSize: '11px',
                        color: 'var(--text-light)',
                        lineHeight: 1.4,
                        fontFamily: 'var(--font-body)',
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
                  fontSize: '11px',
                  color: 'var(--text-light)',
                  letterSpacing: '0.08em',
                  marginBottom: '8px',
                  fontWeight: 600,
                  fontFamily: 'var(--font-heading)',
                }}>
                  代表项目
                </div>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px',
                }}>
                  {step.projects.map((project, pi) => (
                    <span
                      key={pi}
                      style={{
                        display: 'inline-block',
                        background: `${step.color}10`,
                        color: step.color,
                        padding: '5px 12px',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '12px',
                        fontWeight: 500,
                        border: `1px solid ${step.color}20`,
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      {project}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedCareer && (
        <Modal onClose={() => setSelectedCareer(null)}>
          <CareerModal
            data={selectedCareer}
            onClose={() => setSelectedCareer(null)}
          />
        </Modal>
      )}
    </div>
  )
}

// ============ MODAL ============

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
          background: 'var(--bg-card)',
          borderRadius: isMobile ? 'var(--radius-xl) var(--radius-xl) 0 0' : 'var(--radius-xl)',
          border: isMobile ? 'none' : '1px solid var(--border-subtle)',
          padding: isMobile ? '24px 20px 32px' : 'clamp(28px, 4vw, 48px)',
          boxShadow: 'var(--shadow-lg)',
          animation: isMobile ? 'modalSlideUp 0.4s ease' : 'modalSlideIn 0.4s ease',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          aria-label="关闭"
          style={{
            position: 'absolute',
            top: isMobile ? '16px' : '20px',
            right: isMobile ? '16px' : '20px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: '1px solid var(--border-subtle)',
            background: 'var(--bg-primary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            color: 'var(--text-secondary)',
            transition: 'all 0.2s ease',
            zIndex: 10,
          }}
        >
          ✕
        </button>

        <div style={{ marginBottom: '24px', paddingRight: '40px' }}>
          <div style={{
            display: 'inline-block',
            fontSize: '13px',
            fontWeight: 600,
            color: data.color,
            background: `${data.color}15`,
            padding: '4px 12px',
            borderRadius: 'var(--radius-md)',
            marginBottom: '10px',
            fontFamily: 'var(--font-heading)',
          }}>
            {data.year}
          </div>
          <h3 style={{
            fontSize: isMobile ? '22px' : '26px',
            fontWeight: 600,
            color: 'var(--text-primary)',
            margin: '0 0 6px 0',
            fontFamily: 'var(--font-heading)',
          }}>
            {data.label}
          </h3>
          <div style={{
            fontSize: '15px',
            color: data.color,
            fontWeight: 500,
            fontFamily: 'var(--font-body)',
          }}>
            {data.role}
          </div>
        </div>

        <div style={{ marginBottom: '28px' }}>
          <div style={{
            fontSize: '12px',
            color: 'var(--text-muted)',
            letterSpacing: '0.08em',
            marginBottom: '10px',
            fontWeight: 600,
            fontFamily: 'var(--font-heading)',
          }}>
            职责描述
          </div>
          <p style={{
            fontSize: '15px',
            lineHeight: 1.8,
            color: 'var(--text-secondary)',
            margin: 0,
            fontFamily: 'var(--font-body)',
          }}>
            {data.description}
          </p>
        </div>

        <div style={{ marginBottom: '28px' }}>
          <div style={{
            fontSize: '12px',
            color: 'var(--text-muted)',
            letterSpacing: '0.08em',
            marginBottom: '14px',
            fontWeight: 600,
            fontFamily: 'var(--font-heading)',
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
                  background: 'var(--bg-primary)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  marginBottom: '4px',
                  fontFamily: 'var(--font-body)',
                }}>
                  {metric.label}
                </div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: data.color,
                  marginBottom: '3px',
                  fontFamily: 'var(--font-heading)',
                }}>
                  {metric.value}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                  lineHeight: 1.4,
                  fontFamily: 'var(--font-body)',
                }}>
                  {metric.detail}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={{
            fontSize: '12px',
            color: 'var(--text-muted)',
            letterSpacing: '0.08em',
            marginBottom: '14px',
            fontWeight: 600,
            fontFamily: 'var(--font-heading)',
          }}>
            代表项目
          </div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
          }}>
            {data.projects.map((project, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  background: `${data.color}10`,
                  color: data.color,
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '13px',
                  fontWeight: 500,
                  border: `1px solid ${data.color}20`,
                  fontFamily: 'var(--font-body)',
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
