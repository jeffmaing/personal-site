export const siteConfig = {
  // === Meta ===
  name: "麻明",
  tagline: "AI × 汽车行业",
  description: "懂业务的没我懂 AI，懂 AI 的没我懂业务",
  url: "https://jeffmaming.github.io/personal-site",

  // === Hero ===
  hero: {
    headline: "麻明",
    headline2: "用 AI 放大自己",
    meta: "19年汽车行业 · 5大豪华品牌 · AI提效顾问",
    brands: ["梅赛德斯-奔驰", "英菲尼迪", "保时捷", "宝马", "雷克萨斯"],
    terminalStatus: "",
  },

  // === Story ===
  story: {
    photoSrc: "/personal-site-v2/hero.png",
    paragraphs: [
      { text: "我在汽车行业干了 19 年。从奔驰到宝马，从保时捷到雷克萨斯，一路做的是经销商管理和数字化落地。", highlight: false },
      { text: "ChatGPT 出现后，我发现了一个残酷的现实：会用 AI 的人，正在把不会用的人甩开。", highlight: true },
      { text: "不是 AI 替代人，是人用 AI 替代不用 AI 的人。", highlight: true },
      { text: "所以我把 19 年的行业经验全部装进 AI 工具里——诊断、报表、巡检、排课，以前 2 天做完的事，现在 10 分钟搞定。", highlight: false },
      { text: "懂业务的没我懂 AI，懂 AI 的没我懂业务。这就是我的价值。", highlight: true },
    ],
  },

  // === AI Arsenal ===
  arsenal: {
    title: "业务提效产品",
    subtitle: "19年行业经验沉淀，5个落地产品验证有效",
    tabs: [
      { id: "data", label: "数据看板" },
      { id: "auto", label: "自动报表" },
      { id: "tools", label: "效率工具" },
    ],
    products: [
      // Tab 1: 数据看板
      {
        tab: "data",
        name: "AI 经销商诊断",
        status: "在跑",
        description: "经销商诊断报告，原来要 2 天做完。用 AI 重构后，10 分钟出报告。",
        metrics: ["100+ 诊断报告", "效率提升 10 倍", "覆盖 35 家经销商"],
        tech: "AI 诊断架构 + 真实数据驱动",
        detail: {
          background: "以前做经销商诊断：教练进店 → 看数据 → 手动算指标 → 写分析报告，一家店 2 天。35 家店就是 70 天的工作量。",
          solution: "把 35 家店的 KPI 数据喂给 AI → AI 出分析框架和图表 → 我补充行业洞察。让 AI 基于真实数据说话，而不是空谈。",
          result: "2 天 → 10 分钟，100+ 店次零差错",
          techStack: "AI 诊断架构 + 真实数据驱动",
        },
      },
      {
        tab: "data",
        name: "雷克萨斯数据看板",
        status: "在跑",
        description: "总部每天要看 30 个 Excel 报表。搭建自动化数据看板后，所有指标一个页面搞定。",
        metrics: ["4 个数据源自动同步", "零人工整理", "200+ 指标实时更新"],
        tech: "数据整合 + 可视化看板",
        detail: {
          background: "总部对经销商培训执行情况缺乏全景视角。数据散落在 Excel 和各个系统里，想看到全貌需要手动汇总。",
          solution: "搭建数据看板，将 200+ 核心指标整合到一个视图。自动化数据管道，实时更新。",
          result: "从每天 2 小时报表整理，到打开即看",
          techStack: "数据整合 + 可视化看板",
        },
      },
      {
        tab: "data",
        name: "奔驰排课系统",
        status: "在跑",
        description: "培训排课全靠人工协调，经常撞车漏排。搭建在线排课平台后，讲师资源一目了然。",
        metrics: ["35 家店统一调度", "讲师负载可视化", "自动冲突检测"],
        tech: "在线平台 + 智能调度",
        detail: {
          background: "原有培训排期系统功能有限，无法支持多品牌并行运营。找人开发周期长、成本高。",
          solution: "用 AI 辅助搭建在线排课平台，自动检测冲突、可视化讲师负载。1 人 1 周交付。",
          result: "排课效率提升 5 倍，零冲突",
          techStack: "在线平台 + 智能调度",
        },
      },
      // Tab 2: 自动化
      {
        tab: "auto",
        name: "知道社区数据周报",
        status: "在跑",
        description: "每周人工抓取数据做 PPT，耗时 4 小时。自动化脚本一键生成，5 分钟出报告。",
        metrics: ["4 小时 → 5 分钟", "零人工干预", "数据 100% 准确"],
        tech: "自动化脚本 + 智能生成",
        detail: {
          background: "每周要手动整理社区数据、做 PPT 报告，至少花 4 小时。格式、排版、数据一致性都是体力活。",
          solution: "自动采集 PV/UV 数据，AI 生成分析结论，一键输出排版好的 PPT。定时自动执行。",
          result: "周报自动化，释放每周 4 小时",
          techStack: "自动化脚本 + 智能生成",
        },
      },
      {
        tab: "auto",
        name: "ES 日报自动化",
        status: "在跑",
        description: "每天要从 4 个数据源整理报表，耗时 30 分钟。自动化后，10 秒出报告。",
        metrics: ["30 分钟 → 10 秒", "4 个数据源整合", "每天准时推送"],
        tech: "模板引擎 + 数据整合",
        detail: {
          background: "每天要从 4 个数据源手动整理数据，做透视表、写日报，至少 30 分钟。",
          solution: "脚本整合 4 个数据源，自动生成透视表和 Excel 日报。模板预设格式，一键输出。",
          result: "30 分钟压缩到 10 秒。每天自动生成，准时发送。",
          techStack: "模板引擎 + 数据整合",
        },
      },
      {
        tab: "auto",
        name: "论坛自动巡检",
        status: "在跑",
        description: "每天人工盯论坛看有没有违规内容。用智能代理自动巡检后，每天定时出报告。",
        metrics: ["365 天无间断", "异常自动预警", "人工零介入"],
        tech: "自动采集 + AI 分析 + 即时推送",
        detail: {
          background: "论坛舆情监控完全靠人工，每天花大量时间浏览帖子、截图、整理。容易遗漏关键信息。",
          solution: "自动抓取论坛帖子，建立智能索引，AI 分析异常内容，定时推送报告。每天 17:30 自动执行。",
          result: "全年无休自动巡检，发现即预警",
          techStack: "自动采集 + AI 分析 + 即时推送",
        },
      },
      {
        tab: "auto",
        name: "汽车行业资讯速递",
        status: "在跑",
        description: "每天从 7 个网站搜集资讯，耗时 1 小时。自动化后，每 8 小时推送摘要。",
        metrics: ["7 个信息源自动采集", "每 8 小时推送", "零人工阅读"],
        tech: "多源采集 + AI 摘要",
        detail: {
          background: "行业资讯需要手动从多个网站搜集、阅读、整理。信息量大、耗时多，还容易错过重要内容。",
          solution: "7 个信息源自动采集（Google/懂车帝/易车/盖世等），AI 自动摘要生成 PDF，定时推送。",
          result: "每 8 小时自动推送，覆盖全网重要资讯。人工只需要读摘要，不需要再逐个网站翻阅。",
          techStack: "多源采集 + AI 摘要",
        },
      },
      // Tab 3: 工具与平台
      {
        tab: "tools",
        name: "AI 视频剪辑",
        status: "在跑",
        description: "商业视频剪辑工具订阅费贵。本地部署后，零订阅费，数据不出本机。",
        metrics: ["本地部署", "零订阅费", "数据完全本地"],
        tech: "本地 AI 推理 + 语音识别",
        detail: {
          background: "商业视频剪辑工具订阅费贵，且数据要上传到第三方。",
          solution: "本地部署视频分析工具，AI 驱动内容分析，语音自动转文字。全流程本地运行，零订阅费。",
          result: "免费使用，数据完全本地。视频剪辑效率提升，不需要等商业工具排队。",
          techStack: "本地 AI 推理 + 语音识别",
        },
      },
      {
        tab: "tools",
        name: "本地 AI 智能代理环境",
        status: "在跑",
        description: "云端 AI 服务有数据泄露风险。搭建本地环境后，数据不出本机，全天可用。",
        metrics: ["全流程本地推理", "数据不出本机", "全天候可用"],
        tech: "本地 AI 工作环",
        detail: {
          background: "云端 AI 服务有数据泄露风险，且受网络限制。需要一个完全本地的 AI 工作环境。",
          solution: "搭建本地 AI 推理环境，部署语言模型、嵌入模型、视觉模型。向量数据库做智能检索。智能代理做任务编排。",
          result: "全流程本地推理，数据不出本机。7×24 可用，不受网络影响。",
          techStack: "本地 AI 工作环境",
        },
      },
      {
        tab: "tools",
        name: "麻明第一款小程序",
        status: "在跑",
        description: "不懂小程序开发。用 AI 辅助后，从 0 到 1 完成第一款小程序。",
        metrics: ["AI 辅助开发", "从 0 到 1", "全流程 AI"],
        tech: "AI 辅助开发",
        detail: {
          background: "一直想做自己的微信小程序，但不懂小程序开发。",
          solution: "用 AI 辅助生成小程序代码，从需求分析到 UI 设计到代码实现，全流程 AI 辅助。不会写代码也能做出产品。",
          result: "第一款小程序从 0 到 1 完成。验证了 AI 辅助开发的可行性。",
          techStack: "AI 辅助开发",
        },
      },
      {
        tab: "tools",
        name: "小红书爆款扫描器",
        status: "调试中",
        description: "想做小红书内容，不知道什么标题能爆。自动化分析后，建立爆款标题数据库。",
        metrics: ["自动化分析", "标题规律提取", "爆款特征总结"],
        tech: "自动采集 + AI 分析",
        detail: {
          background: "想做小红书内容，但不知道什么样的标题能爆。手动分析效率太低。",
          solution: "自动抓取热门内容，AI 分析标题规律和爆款特征，输出分析报告。",
          result: "调试中。目标是建立爆款标题数据库，辅助内容创作。",
          techStack: "自动采集 + AI 分析",
        },
      },
      {
        tab: "tools",
        name: "股票监控双智能代理",
        status: "在跑",
        description: "持仓股票手动盯盘不现实。搭建双智能代理后，实时监控风控指标。",
        metrics: ["9 只股票实时监控", "双智能代理协作", "异常即时提醒"],
        tech: "实时监控 + AI 辅助决策",
        detail: {
          background: "持仓股票需要实时监控风控指标，手动盯盘不现实。",
          solution: "双智能代理架构：一个负责风控实时监控，一个负责策略分析。定时执行，AI 做决策辅助。",
          result: "9 只股票实时监控，风控指标异常即时提醒。",
          techStack: "实时监控 + AI 辅助决策",
        },
      },
    ],
  },

  // === AI Boundaries ===
  boundaries: {
    title: "人和 AI 的分工",
    subtitle: "什么交给 AI，什么留给自己",
    canDo: [
      { icon: "", text: "海量数据处理", metric: "" },
      { icon: "", text: "标准化报告生成", metric: "" },
      { icon: "", text: "异常自动预警", metric: "" },
      { icon: "", text: "24小时不间断工作", metric: "" },
      { icon: "", text: "多语言内容生成", metric: "" },
    ],
    cannotDo: [
      { icon: "", text: "复杂谈判与决策", metric: "" },
      { icon: "", text: "团队激励与管理", metric: "" },
      { icon: "", text: "创新思维与洞察", metric: "" },
      { icon: "", text: "情感连接与信任", metric: "" },
      { icon: "", text: "模糊地带的判断", metric: "" },
    ],
    quote: "AI 不会拆问题。这个得人来。\n\n大模型读过所有报告，但没去过现场。\n它知道数据，但不知道数据背后的人和事。\n\n这才是我的价值。",
    quoteAuthor: "麻明",
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
}

export type SiteConfig = typeof siteConfig
