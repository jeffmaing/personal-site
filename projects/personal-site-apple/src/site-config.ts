export const siteConfig = {
  // === Meta ===
  name: "麻明",
  tagline: "AI × 汽车行业",
  description: "懂业务的没我懂 AI，懂 AI 的没我懂业务",
  url: "https://jeffmaing.github.io/personal-site",
  
  // === Hero Section ===
  hero: {
    badge: "汽车行业 · 18 年",
    title: "懂业务的\n没我懂 AI",
    subtitle: "从比亚迪西非拓荒到 AI 重构诊断体系，18 年一直在进化。不是转行，是叠加。",
    stats: [
      { value: "1000+", label: "累计服务店次" },
      { value: "18 年", label: "汽车行业深耕" },
      { value: "10×", label: "AI 效率提升" },
    ],
  },
  
  // === 核心经历 ===
  experience: {
    title: "进化之路",
    items: [
      {
        period: "2025.02 — 至今",
        role: "咨询总监（网络发展 / 数字化 AI 方向）",
        company: "港泓咨询",
        description: "用 AI 重构经销商诊断体系，打造智能化线上学习平台和 BI 系统。为奔驰提供闭店后 Winback 业务标准指导和智能化辅导工具。",
        current: true,
      },
      {
        period: "2024.04 — 2025.02",
        role: "高级产品运营（平台与工具方向）",
        company: "易车",
        description: "AI 新媒体智能托管平台、AI + BI 数值研究院平台、AI 智能机器人（小鹏汽车合作）。探索互联网产品思维在汽车网络管理中的应用。",
      },
      {
        period: "2017.12 — 2024.04",
        role: "高级项目经理（汽车行业）",
        company: "安永（中国）",
        description: "主导 BBA 等头部主机厂网络运营与治理咨询。每年管理 150+ 店，累计 1000+ 店次。协助奔驰更新 OTR 平台效率模块。",
      },
      {
        period: "2014.12 — 2017.12",
        role: "辅导项目经理（网络发展）",
        company: "东风英菲尼迪",
        description: "优化英菲尼迪经销商销售运营标准（IDOS）与 Retail CRM 管理标准。100% 经销商完成销售辅导项目入店。建立销售漏斗数据统计口径。",
      },
      {
        period: "2011.11 — 2014.12",
        role: "项目经理（网络发展 / 网络辅导）",
        company: "梅赛德斯 - 奔驰",
        description: "从 0 到 1 开发经销商辅导管理系统。搭建「筹备 - 开业 - 运营」三阶辅导体系。参与 20+ 家新网点的现场辅导与支持。",
      },
      {
        period: "2009.06 — 2011.11",
        role: "销售部 · 销售标准与新技术导入",
        company: "一汽丰田",
        description: "全中国第一次导入 G-book 车机系统并在一汽丰田全网完成测试导入。完成 20+ 新经销商开业后标准检核和导入。支持丰田管理法中国本地化。",
      },
      {
        period: "2007.06 — 2009.05",
        role: "海外网络拓展（西非市场）",
        company: "比亚迪汽车",
        description: "协助比亚迪建立西非 3 国（贝宁、马里、喀麦隆）经销商销售网络。参与新兴市场进入、经销商筛选评估与规则标准落地。",
      },
    ],
  },
  
  // === 代表项目 ===
  projects: {
    title: "代表项目",
    items: [
      {
        title: "AI 经销商诊断系统",
        description: "把近 100 份真实门店数据喂给 AI，替代人工分析报告。35 家店从 2 天/店压缩到 10 分钟出报告。",
        metrics: [
          { label: "效率", value: "2 天 → 10 分钟" },
          { label: "覆盖", value: "35 家店" },
        ],
      },
      {
        title: "BMW 沙盘推演系统",
        description: "44 个 Sheet、1359 个公式的 Excel 沙盘，用 AI 生成 Web 版本。1 个人 + AI，1 星期交付。",
        metrics: [
          { label: "周期", value: "1 个月 → 1 星期" },
          { label: "团队", value: "1 人 + AI" },
        ],
      },
      {
        title: "雷克萨斯 BI 系统",
        description: "建立雷克萨斯培训学院 BI 系统，提升总部对网络执行情况的可视性与管理效率。打造智能化 + AI 线上学习平台。",
        metrics: [
          { label: "可视化", value: "总部全景可视" },
          { label: "平台", value: "AI + 学习" },
        ],
      },
    ],
  },
  
  // === 联系 ===
  contact: {
    title: "想聊聊 AI 在汽车行业能干什么？",
    phone: "185-1359-5306",
    email: "jeffmaming@163.com",
    location: "北京·朝阳区",
  },
  
  // === Footer ===
  footer: {
    copyright: `© ${new Date().getFullYear()} 麻明 · 用 AI 放大自己`,
  },
}

export type SiteConfig = typeof siteConfig
