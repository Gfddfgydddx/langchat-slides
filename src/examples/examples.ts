export interface Example {
  id: string
  name: string
  description: string
  userMessage: string
  slides: string
}

export const examples: Example[] = [
  {
    id: 'tech-evolution',
    name: '技术演进史',
    description: '展示互联网技术发展历程',
    userMessage: '请帮我生成关于互联网技术演进史的幻灯片，包含从Web 1.0到AI时代的关键里程碑',
    slides: `infographic list-row-horizontal-icon-arrow
data
  title 互联网技术演进史
  desc 从Web 1.0到AI时代的关键里程碑
  items
    - time 1991
      label Web 1.0
      desc Tim Berners-Lee发布首个网站，开启互联网时代
      icon mdi/web
    - time 2004
      label Web 2.0
      desc 社交媒体和用户生成内容成为主流
      icon mdi/account-multiple
    - time 2007
      label 移动互联网
      desc iPhone发布，智能手机改变世界
      icon mdi/cellphone
    - time 2015
      label 云原生时代
      desc 容器化和微服务架构广泛应用
      icon mdi/cloud
    - time 2020
      label 低代码平台
      desc 可视化开发降低技术门槛
      icon mdi/application-brackets
    - time 2023
      label AI大模型
      desc ChatGPT引爆生成式AI革命
      icon mdi/brain
theme
  palette #3b82f6 #8b5cf6 #f97316`
  },
  {
    id: 'swot-analysis',
    name: 'SWOT分析',
    description: '战略分析框架',
    userMessage: '请帮我生成一个SWOT分析幻灯片，用于战略规划',
    slides: `infographic compare-swot
data
  title SWOT Analysis
  desc Strategic planning technique
  items
    - label Strengths
      desc Internal positive factors
      icon mdi/arm-flex
    - label Weaknesses
      desc Internal negative factors
      icon mdi/alert-circle-outline
    - label Opportunities
      desc External positive factors
      icon mdi/lightbulb-on-outline
    - label Threats
      desc External negative factors
      icon mdi/skull-outline
theme
  palette #10b981 #f59e0b #3b82f6 #ef4444`
  },
  {
    id: 'project-roadmap',
    name: '项目路线图',
    description: '项目阶段和里程碑',
    userMessage: '请帮我生成一个项目路线图，展示关键阶段和时间节点',
    slides: `infographic sequence-roadmap-vertical-simple
data
  title Project Roadmap
  desc Key phases and milestones
  items
    - label Phase 1
      desc Q1 2024 - Requirements gathering
      icon mdi/clipboard-text-outline
    - label Phase 2
      desc Q2 2024 - UI/UX and Architecture
      icon mdi/pencil-ruler
    - label Phase 3
      desc Q3 2024 - Implementation
      icon mdi/code-tags
    - label Phase 4
      desc Q4 2024 - Go live
      icon mdi/rocket-launch
theme
  palette #8b5cf6 #06b6d4 #10b981 #f59e0b`
  },
  {
    id: 'market-share',
    name: '市场份额',
    description: '市场占比分析',
    userMessage: '请帮我生成一个市场份额分析图表，展示各品牌占比',
    slides: `infographic chart-pie-donut-plain-text
data
  title Market Share
  desc Global Smartphone Market 2023
  items
    - label Apple
      value 20
      desc Premium segment leader
    - label Samsung
      value 19
      desc Broad portfolio
    - label Xiaomi
      value 13
      desc Value champion
    - label Others
      value 48
      desc Diverse players
theme
  palette #3b82f6 #8b5cf6 #ec4899 #94a3b8`
  },
  {
    id: 'core-values',
    name: '核心价值观',
    description: '企业文化展示',
    userMessage: '请帮我生成一个核心价值观展示幻灯片',
    slides: `infographic list-grid-badge-card
data
  title Core Values
  desc What drives our culture
  items
    - label Innovation
      desc Constantly pushing boundaries
      icon mdi/lightbulb
    - label Integrity
      desc Doing the right thing
      icon mdi/shield-check
    - label Teamwork
      desc Stronger together
      icon mdi/account-group
    - label Customer Focus
      desc Putting users first
      icon mdi/heart
theme
  palette #f97316 #10b981 #3b82f6 #ec4899`
  },
  {
    id: 'timeline-history',
    name: '历史时间轴',
    description: '公司发展历程',
    userMessage: '请帮我生成一个公司发展历程的时间轴',
    slides: `infographic sequence-color-snake-steps-horizontal-icon-line
data
  title Our Journey
  desc Company milestones over years
  items
    - label 2015
      desc Company founded
      icon mdi/rocket
    - label 2017
      desc First major client
      icon mdi/handshake
    - label 2019
      desc Expanded to 3 countries
      icon mdi/earth
    - label 2021
      desc Reached 100 employees
      icon mdi/account-multiple
    - label 2023
      desc IPO successful
      icon mdi/chart-line
theme
  palette #06b6d4 #3b82f6 #8b5cf6 #ec4899 #f59e0b`
  },
  {
    id: 'process-flow',
    name: '流程图',
    description: '业务流程展示',
    userMessage: '请帮我生成一个业务流程图，展示工作流程',
    slides: `infographic sequence-zigzag-steps-underline-text
data
  title Workflow Process
  desc Step by step guide
  items
    - label Plan
      desc Define objectives
      icon mdi/clipboard-text
    - label Design
      desc Create blueprint
      icon mdi/palette
    - label Build
      desc Develop solution
      icon mdi/hammer
    - label Test
      desc Quality check
      icon mdi/test-tube
    - label Deploy
      desc Go to production
      icon mdi/rocket-launch
theme
  palette #3b82f6 #06b6d4 #10b981 #f59e0b #ec4899`
  },
  {
    id: 'comparison',
    name: '对比分析',
    description: '产品或方案对比',
    userMessage: '请帮我生成一个产品对比分析图表',
    slides: `infographic compare-binary-horizontal-badge-card-arrow
data
  title Product Comparison
  desc Feature by feature
  items
    - label Product A
      desc Basic features
      icon mdi/package-variant
    - label Product B
      desc Standard features
      icon mdi/package-variant-closed
    - label Product C
      desc Premium features
      icon mdi/star-circle
theme
  palette #3b82f6 #8b5cf6 #f59e0b`
  },
  {
    id: 'data-statistics',
    name: '数据统计',
    description: '关键指标展示',
    userMessage: '请帮我生成一个数据统计图表，展示关键业务指标',
    slides: `infographic chart-bar-plain-text
data
  title Key Metrics
  desc Performance overview
  items
    - label Revenue
      value 850
      unit K
      icon mdi/currency-usd
    - label Users
      value 1200
      unit K
      icon mdi/account-group
    - label Orders
      value 4500
      unit 
      icon mdi/cart
    - label Growth
      value 35
      unit %
      icon mdi/trending-up
theme
  palette #10b981 #3b82f6 #f59e0b #ec4899`
  },
  {
    id: 'organization',
    name: '组织架构',
    description: '团队结构展示',
    userMessage: '请帮我生成一个组织架构图',
    slides: `infographic hierarchy-tree-tech-style-badge-card
data
  title Organization Structure
  desc Team hierarchy
  items
    - label CEO
      icon mdi/account-tie
      children
        - label CTO
          icon mdi/code-braces
        - label CMO
          icon mdi/bullhorn
        - label CFO
          icon mdi/cash
theme
  palette #3b82f6 #8b5cf6 #10b981 #f59e0b`
  },
  {
    id: 'growth-trend',
    name: '增长趋势',
    description: '折线图展示趋势变化',
    userMessage: '请帮我生成一个销售增长趋势折线图',
    slides: `infographic chart-line-plain-text
data
  title 销售增长趋势
  desc 2024年月度销售数据
  items
    - label 1月
      value 120
      icon mdi/trending-up
    - label 2月
      value 150
      icon mdi/trending-up
    - label 3月
      value 180
      icon mdi/trending-up
    - label 4月
      value 220
      icon mdi/trending-up
    - label 5月
      value 280
      icon mdi/trending-up
    - label 6月
      value 350
      icon mdi/trending-up
theme
  palette #10b981 #3b82f6 #8b5cf6`
  },
  {
    id: 'circular-process',
    name: '循环流程',
    description: '圆形循环展示',
    userMessage: '请帮我生成一个产品开发循环流程图',
    slides: `infographic sequence-circular-simple
data
  title 产品开发循环
  desc 持续改进的迭代流程
  items
    - label 需求分析
      desc 了解用户需求
      icon mdi/book-open
    - label 产品设计
      desc 创建原型和设计
      icon mdi/palette
    - label 开发实现
      desc 编写代码实现功能
      icon mdi/code-braces
    - label 测试验证
      desc 质量保证和修复
      icon mdi/test-tube
    - 发布上线
      desc 部署到生产环境
      icon mdi/rocket-launch
theme
  palette #3b82f6 #06b6d4 #10b981 #ec4899 #f59e0b`
  },
  {
    id: 'product-compare',
    name: '产品对比',
    description: '二选一对比分析',
    userMessage: '请帮我生成两个产品的对比分析',
    slides: `infographic compare-binary-horizontal-simple-fold
data
  title 产品特性对比
  desc 核心功能分析
  items
    - label 产品A
      desc 经济实惠的选择
      icon mdi/star
    - label 产品B
      desc 高端专业的选择
      icon mdi/star-circle
theme
  palette #3b82f6 #8b5cf6`
  },
  {
    id: 'quadrant-analysis',
    name: '四象限分析',
    description: '战略矩阵分析',
    userMessage: '请帮我生成一个四象限战略分析图',
    slides: `infographic quadrant-quarter-simple-card
data
  title 战略四象限分析
  desc 市场机会评估
  items
    - label 高增长-高份额
      desc 明星业务
      icon mdi/star
    - label 高增长-低份额
      desc 问题业务
      icon mdi/help-circle
    - label 低增长-高份额
      desc 现金牛
      icon mdi/cash
    - label 低增长-低份额
      desc 瘦狗业务
      icon mdi/paw
theme
  palette #10b981 #3b82f6 #f59e0b #ef4444`
  },
  {
    id: 'column-chart',
    name: '柱状图',
    description: '数据对比展示',
    userMessage: '请帮我生成一个季度业绩对比柱状图',
    slides: `infographic chart-column-simple
data
  title 季度业绩对比
  desc 2024年各季度表现
  items
    - label Q1
      value 450
      icon mdi/chart-line
    - label Q2
      value 580
      icon mdi/chart-line
    - label Q3
      value 720
      icon mdi/trending-up
    - label Q4
      value 890
      icon mdi/trending-up
theme
  palette #06b6d4 #10b981 #8b5cf6 #ec4899`
  },
  {
    id: 'pyramid-structure',
    name: '金字塔结构',
    description: '层级关系展示',
    userMessage: '请帮我生成一个需求金字塔结构图',
    slides: `infographic sequence-pyramid-simple
data
  title 用户需求金字塔
  desc 从基础到高级需求
  items
    - label 安全需求
      desc 最基础的保障
      icon mdi/shield-check
    - label 功能需求
      desc 核心功能实现
      icon mdi/cog
    - label 易用性
      desc 良好的用户体验
      icon mdi/thumb-up
    - label 个性化
      desc 定制化服务
      icon mdi/account-circle
    - label 自我实现
      desc 用户价值最大化
      icon mdi/star
theme
  palette #3b82f6 #8b5cf6 #f59e0b #ec4899 #ef4444`
  },
  {
    id: 'step-process',
    name: '步骤流程',
    description: ' ascending 步骤展示',
    userMessage: '请帮我生成一个 ascending 步骤流程图',
    slides: `infographic sequence-ascending-steps
data
  title 项目实施步骤
  desc 从计划到完成
  items
    - label 第一步
      desc 项目规划
      icon mdi/clipboard-text
    - label 第二步
      desc 资源准备
      icon mdi/package
    - label 第三步
      desc 执行实施
      icon mdi/play-circle
    - label 第四步
      desc 质量检查
      icon mdi/check-circle
    - label 第五步
      desc 项目交付
      icon mdi/rocket
theme
  palette #06b6d4 #10b981 #3b82f6 #8b5cf6 #f59e0b`
  }
]
