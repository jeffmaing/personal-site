export const siteConfig = {
  // === Meta ===
  name: "麻明",
  tagline: "AI × 汽车",
  description: "懂业务的没我懂 AI，懂 AI 的没我懂业务",
  url: "https://jeffmaming.github.io/personal-site",

  // === Hero (value-proposition focused) ===
  hero: {
    eyebrow: "AI 提效顾问 · 汽车行业 19 年",
    headline: "把你最耗时间的重复工作，交给 AI",
    subtitle:
      "为车企、经销商网络和咨询团队搭建可落地的 AI 工作流。从 2 天的人工诊断到 10 分钟的自动报告，让数据自己说话。",
    primaryCta: { label: "看看真实案例", href: "#proof" },
    secondaryCta: { label: "立即咨询", href: "#contact" },
    stats: [
      { value: 19, suffix: "年", label: "汽车行业深耕" },
      { value: 5, suffix: "家", label: "豪华品牌合作" },
      { value: 100, suffix: "+", label: "经销商诊断" },
    ],
    brands: ["梅赛德斯-奔驰", "雷克萨斯", "保时捷", "宝马", "英菲尼迪"],
    footnote: "曾任职：奔驰 · 英菲尼迪 · 安永 · 易车 · 港泓咨询",
  },

  // === Methodology System — how the work gets done ===
  methodology: {
    eyebrow: "方法论 — 我如何工作",
    title: "用系统思维 + AI，拆解企业的运营难题",
    subtitle:
      "不看 PPT、不卖理念。三个固定步骤：先把业务拆成可量化的环节，再重构流程与数据结构，最后把 AI 嵌进去自动化执行。",
    flow: [
      {
        step: "01",
        key: "Diagnose",
        title: "拆解系统",
        subtitle: "Diagnose the System",
        summary:
          "把模糊的「效率低」拆成具体的环节、数据和瓶颈，找到 AI 能真正发挥作用的切入点。",
        bullets: [
          "业务流程全景图绘制",
          "时间黑洞与重复环节识别",
          "数据流与系统现状盘点",
        ],
        visual: "diagnose",
      },
      {
        step: "02",
        key: "Rebuild",
        title: "重构系统",
        subtitle: "Rebuild the System",
        summary:
          "在 AI 接管之前，先把流程、SOP、数据结构理顺。系统不对，AI 也救不了。",
        bullets: [
          "SOP 标准化与岗位重塑",
          "BI 看板与指标体系搭建",
          "工作流与数据架构优化",
        ],
        visual: "rebuild",
      },
      {
        step: "03",
        key: "Apply AI",
        title: "叠加 AI 层",
        subtitle: "Apply the AI Layer",
        summary:
          "把该交给 AI 的交出去：自动化执行、决策支持、Agent 自主完成任务。",
        bullets: [
          "重复工作自动化",
          "实时决策支持",
          "Agent 自主执行任务",
        ],
        visual: "ai",
      },
    ],
  },

  // === Proof System — 3 flagship case studies ===
  proof: {
    eyebrow: "01 — 证据系统",
    title: "三个真实案例，每一个都有数据支撑",
    subtitle:
      "不看 PPT、不谈理念。下面三个案例都已经在客户现场跑起来，结果是真实测出来的。",
    cases: [
      {
        id: "diagnosis",
        brand: "梅赛德斯-奔驰",
        brandColor: "#1e2a3a",
        category: "经销商诊断",
        tag: "效率重构",
        problem:
          "35 家经销商的诊断，原来靠教练进店、看数据、手动算指标、写报告，一家店 2 天，35 家就是 70 天。",
        solution:
          "把 35 家店的 KPI 数据集中喂给 AI，自动对比行业基准、生成评分、给出改进建议。让 AI 基于真实数据说话，而不是空谈。",
        resultPrimary: "2 天 → 10 分钟",
        resultSecondary: "100+ 报告零差错",
        metrics: [
          { label: "效率提升", value: "约 288 倍" },
          { label: "覆盖店数", value: "35 家" },
          { label: "准确率", value: "100%" },
        ],
        evidence: "可在下方「活的证据」现场演示",
      },
      {
        id: "dashboard",
        brand: "雷克萨斯",
        brandColor: "#5b7db1",
        category: "数据看板",
        tag: "决策重构",
        problem:
          "总部对经销商培训执行情况缺乏全景视角，200+ 指标散落在 4 个数据源的 Excel 里，每天人工汇总 2 小时。",
        solution:
          "搭建自动化数据管道，4 个数据源实时同步，200+ 指标整合到一个看板。打开即看，决策无需等待。",
        resultPrimary: "2 小时 → 0 秒",
        resultSecondary: "决策即时",
        metrics: [
          { label: "数据源", value: "4 个" },
          { label: "实时指标", value: "200+" },
          { label: "人工整理", value: "0" },
        ],
        evidence: "雷克萨斯教育平台已上线运行",
      },
      {
        id: "ai-apps",
        brand: "雷克萨斯 & 保时捷",
        brandColor: "#52b788",
        category: "AI 应用改造",
        tag: "能力重构",
        problem:
          "雷克萨斯培训完成率长期不达标；保时捷客户需求解析响应慢，影响销售转化。",
        solution:
          "雷克萨斯上线智能课程推荐 + 虚拟讲师；保时捷上线 AI 客户需求解析系统。两个项目并行交付。",
        resultPrimary: "完成率 +45%",
        resultSecondary: "响应速度 +60%",
        metrics: [
          { label: "培训完成率", value: "+45%" },
          { label: "响应速度", value: "+60%" },
          { label: "交付周期", value: "8 周" },
        ],
        evidence: "港泓咨询 2025–至今项目",
      },
    ],
  },

  // === Live Demos — kept, reframed as evidence ===
  demos: {
    eyebrow: "02 — 活的证据",
    title: "别听我说，自己试",
    subtitle:
      "下面三个 demo 可以直接交互，不需要注册，不需要后端。所有数据都来自真实项目。",
    assumptionNote:
      "测算依据：基于已交付项目实测，AI 平均可自动化重复性工作 60–70%，这里取保守值 60%。",
  },

  // === Method — 3-step workflow + AI capability matrix ===
  method: {
    eyebrow: "03 — 方法论",
    title: "三步工作流，每一步都有时间承诺",
    subtitle: "诊断 → 方案 → 落地。不画大饼，每一步告诉你工具、效果和交付物。",
    steps: [
      {
        number: "01",
        title: "诊断",
        duration: "30 分钟通话",
        tool: "业务访谈 + AI 经销商诊断",
        effect: "定位你工作流里最耗时间的 3 个环节",
        output: "一页纸改造清单",
      },
      {
        number: "02",
        title: "方案",
        duration: "1 周交付",
        tool: "MVP 原型 + 真实数据测算",
        effect: "用你的真实数据跑通一个端到端 demo",
        output: "可演示的最小可行产品",
      },
      {
        number: "03",
        title: "落地",
        duration: "2–4 周上线",
        tool: "系统集成 + 团队培训",
        effect: "AI 工作流嵌入日常运营，团队能独立使用",
        output: "上线运行 + 操作手册",
      },
    ],
    capabilities: {
      title: "AI 能做什么，不能做什么",
      subtitle: "把该交给 AI 的交出去，把该留给人的留下来",
      canDo: [
        "海量数据处理",
        "标准化报告生成",
        "异常自动预警",
        "24 小时不间断工作",
        "多语言内容生成",
      ],
      cannotDo: [
        "复杂谈判与决策",
        "团队激励与管理",
        "创新思维与洞察",
        "情感连接与信任",
        "模糊地带的判断",
      ],
      quote:
        "AI 不会拆问题，这个得人来。\n大模型读过所有报告，但没去过现场。\n它知道数据，但不知道数据背后的人和事。\n这才是我的价值。",
      quoteAuthor: "麻明",
    },
  },

  // === Contact ===
  contact: {
    phone: "185-1359-5306",
    email: "jeffmaming@163.com",
    location: "北京·朝阳区",
  },

  // === Footer ===
  footer: {
    copyright: `© ${new Date().getFullYear()} 麻明 · 用 AI 放大自己`,
  },

  // === Legacy (kept for ChatWidget / digital-maming-qa references) ===
  legacy: {
    arsenalProducts: [
      { name: "AI 经销商诊断", status: "在跑" },
      { name: "雷克萨斯数据看板", status: "在跑" },
      { name: "奔驰排课系统", status: "在跑" },
      { name: "知道社区数据周报", status: "在跑" },
      { name: "论坛自动巡检", status: "在跑" },
    ],
  },
}

export type SiteConfig = typeof siteConfig
