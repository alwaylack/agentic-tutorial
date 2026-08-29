import { defineConfig } from 'vitepress'

const pytest = [
  { text: '0. 课程导学', link: '/zh/pytest/' },
  { text: '01 初识自动化测试与 pytest', link: '/zh/pytest/ch01' },
  { text: '02 测试发现规则与运行控制', link: '/zh/pytest/ch02' },
  { text: '03 断言的艺术', link: '/zh/pytest/ch03' },
  { text: '04 组织测试与标记 mark', link: '/zh/pytest/ch04' },
  { text: '05 参数化测试', link: '/zh/pytest/ch05' },
  { text: '06 fixture 基础', link: '/zh/pytest/ch06' },
  { text: '07 fixture 进阶：作用域与 conftest', link: '/zh/pytest/ch07' },
  { text: '08 fixture 高级模式', link: '/zh/pytest/ch08' },
  { text: '09 内置 fixture 工具箱', link: '/zh/pytest/ch09' },
  { text: '10 Mock 测试与 monkeypatch', link: '/zh/pytest/ch10' },
  { text: '11 配置文件详解', link: '/zh/pytest/ch11' },
  { text: '12 插件体系与常用插件', link: '/zh/pytest/ch12' },
  { text: '13 覆盖率与质量门禁', link: '/zh/pytest/ch13' },
  { text: '14 并行与分布式执行', link: '/zh/pytest/ch14' },
  { text: '15 参数化高级技巧', link: '/zh/pytest/ch15' },
  { text: '16 自定义插件与 hook 开发', link: '/zh/pytest/ch16' },
  { text: '17 测试异步代码', link: '/zh/pytest/ch17' },
  { text: '18 属性基测试与 Hypothesis', link: '/zh/pytest/ch18' },
  { text: '19 测试 Web 服务与集成测试', link: '/zh/pytest/ch19' },
  { text: '20 生产实践：CI 与测试治理', link: '/zh/pytest/ch20' }
]

const fastapi = [
  { text: '0. 课程导学', link: '/zh/fastapi/' },
  { text: '01 FastAPI 简介与环境搭建', link: '/zh/fastapi/ch01' },
  { text: '02 第一个应用与自动文档', link: '/zh/fastapi/ch02' },
  { text: '03 路径参数与查询参数', link: '/zh/fastapi/ch03' },
  { text: '04 请求体与 Pydantic 模型', link: '/zh/fastapi/ch04' },
  { text: '05 参数校验进阶与 Annotated', link: '/zh/fastapi/ch05' },
  { text: '06 响应模型与状态码', link: '/zh/fastapi/ch06' },
  { text: '07 表单、文件上传与下载', link: '/zh/fastapi/ch07' },
  { text: '08 Cookie 与 Header 参数', link: '/zh/fastapi/ch08' },
  { text: '09 错误处理与自定义异常', link: '/zh/fastapi/ch09' },
  { text: '10 依赖注入系统基础', link: '/zh/fastapi/ch10' },
  { text: '11 依赖注入进阶', link: '/zh/fastapi/ch11' },
  { text: '12 中间件与 CORS', link: '/zh/fastapi/ch12' },
  { text: '13 数据库集成（SQLModel/异步 SQLAlchemy）', link: '/zh/fastapi/ch13' },
  { text: '14 安全基础：OAuth2 与 JWT', link: '/zh/fastapi/ch14' },
  { text: '15 安全进阶：Scopes 与 API Key', link: '/zh/fastapi/ch15' },
  { text: '16 异步并发与后台任务', link: '/zh/fastapi/ch16' },
  { text: '17 WebSockets 实时通信', link: '/zh/fastapi/ch17' },
  { text: '18 模板渲染与静态文件', link: '/zh/fastapi/ch18' },
  { text: '19 大型项目结构拆分', link: '/zh/fastapi/ch19' },
  { text: '20 测试 FastAPI 应用', link: '/zh/fastapi/ch20' },
  { text: '21 配置管理与应用生命周期', link: '/zh/fastapi/ch21' },
  { text: '22 生产部署实战', link: '/zh/fastapi/ch22' }
]

const agno = [
  { text: '0. 课程导学', link: '/zh/agno/' },
  { text: '01 Agent 应用开发与 Agno 概述', link: '/zh/agno/ch01' },
  { text: '02 环境搭建与第一个 Agent', link: '/zh/agno/ch02' },
  { text: '03 运行 Agent 与 RunOutput 解析', link: '/zh/agno/ch03' },
  { text: '04 流式输出与实时响应', link: '/zh/agno/ch04' },
  { text: '05 结构化输出 output_schema', link: '/zh/agno/ch05' },
  { text: '06 Prompt 工程：instructions 与描述体系', link: '/zh/agno/ch06' },
  { text: '07 工具 Tools：内置工具包原理与使用', link: '/zh/agno/ch07' },
  { text: '08 自定义工具与 Toolkit 开发', link: '/zh/agno/ch08' },
  { text: '09 Agent Team 入门：协作模式', link: '/zh/agno/ch09' },
  { text: '10 Team 进阶：共享状态与成员通信', link: '/zh/agno/ch10' },
  { text: '11 Workflow 入门：Steps 步骤编排', link: '/zh/agno/ch11' },
  { text: '12 Workflow 进阶：并行/分支/循环', link: '/zh/agno/ch12' },
  { text: '13 多模态 Agent', link: '/zh/agno/ch13' },
  { text: '14 会话管理 session state 与 chat history', link: '/zh/agno/ch14' },
  { text: '15 存储 Storage：会话持久化', link: '/zh/agno/ch15' },
  { text: '16 记忆 Memory：用户画像与摘要', link: '/zh/agno/ch16' },
  { text: '17 知识库 Knowledge 与 RAG 入门', link: '/zh/agno/ch17' },
  { text: '18 RAG 进阶：Agentic RAG 与混合检索', link: '/zh/agno/ch18' },
  { text: '19 推理 Reasoning 与思考模型', link: '/zh/agno/ch19' },
  { text: '20 Skills：可插拔的领域能力', link: '/zh/agno/ch20' },
  { text: '21 人机协同与 Guardrails', link: '/zh/agno/ch21' },
  { text: '22 MCP 协议集成', link: '/zh/agno/ch22' },
  { text: '23 AgentOS：把 Agent 发布成服务', link: '/zh/agno/ch23' },
  { text: '24 可观测性与调试', link: '/zh/agno/ch24' },
  { text: '25 性能优化与生产实践', link: '/zh/agno/ch25' },
  { text: '26 实战一：智能数据分析助手', link: '/zh/agno/ch26' },
  { text: '27 实战二：多源研究助手 Team', link: '/zh/agno/ch27' },
  { text: '28 实战三：客服知识库 Agent 上线 AgentOS', link: '/zh/agno/ch28' }
]

const crewai = [
  { text: '0. 课程导学', link: '/zh/crewai/' },
  { text: '01 多智能体与 CrewAI 概述', link: '/zh/crewai/ch01' },
  { text: '02 环境搭建与第一个 Crew', link: '/zh/crewai/ch02' },
  { text: '03 Agent 深入：角色设计方法论', link: '/zh/crewai/ch03' },
  { text: '04 Task 深入：任务定义与上下文', link: '/zh/crewai/ch04' },
  { text: '05 Crew 组队与执行流程', link: '/zh/crewai/ch05' },
  { text: '06 LLM 配置详解与三方模型接入', link: '/zh/crewai/ch06' },
  { text: '07 内置工具体系', link: '/zh/crewai/ch07' },
  { text: '08 自定义工具开发', link: '/zh/crewai/ch08' },
  { text: '09 分层流程 hierarchical 与管理者', link: '/zh/crewai/ch09' },
  { text: '10 记忆系统：短期、长期与实体记忆', link: '/zh/crewai/ch10' },
  { text: '11 知识库 Knowledge Sources', link: '/zh/crewai/ch11' },
  { text: '12 输出处理：JSON/Pydantic 与数据传递', link: '/zh/crewai/ch12' },
  { text: '13 规划 Planning、迭代与错误处理', link: '/zh/crewai/ch13' },
  { text: '14 回调、日志与事件监听', link: '/zh/crewai/ch14' },
  { text: '15 Flow 入门：事件驱动工作流', link: '/zh/crewai/ch15' },
  { text: '16 Flow 进阶：状态管理与持久化', link: '/zh/crewai/ch16' },
  { text: '17 CLI 工程化与 YAML 配置项目', link: '/zh/crewai/ch17' },
  { text: '18 多 Crew 编排与复用', link: '/zh/crewai/ch18' },
  { text: '19 MCP 集成', link: '/zh/crewai/ch19' },
  { text: '20 测试与评估：crewai test/train', link: '/zh/crewai/ch20' },
  { text: '21 可观测性与监控集成', link: '/zh/crewai/ch21' },
  { text: '22 部署与服务化', link: '/zh/crewai/ch22' },
  { text: '23 实战一：内容营销流水线', link: '/zh/crewai/ch23' },
  { text: '24 实战二：数据分析流水线', link: '/zh/crewai/ch24' },
  { text: '25 实战三：竞品监控情报 Crew', link: '/zh/crewai/ch25' },
  { text: '26 最佳实践与生产清单', link: '/zh/crewai/ch26' }
]

// ===== Playwright (Python) 1.x =====
const playwright = [
  { text: '0. 课程导学', link: '/zh/playwright/' },
  { text: '01 E2E 测试与 Playwright 概述', link: '/zh/playwright/ch01' },
  { text: '02 第一个脚本与同步 API', link: '/zh/playwright/ch02' },
  { text: '03 定位器 Locator 与严格模式', link: '/zh/playwright/ch03' },
  { text: '04 自动等待与 Actionability', link: '/zh/playwright/ch04' },
  { text: '05 Web-First 断言 expect', link: '/zh/playwright/ch05' },
  { text: '06 pytest 集成与 fixture 体系', link: '/zh/playwright/ch06' },
  { text: '07 多页面、Popup 与 iframe', link: '/zh/playwright/ch07' },
  { text: '08 网络拦截与 Mock', link: '/zh/playwright/ch08' },
  { text: '09 认证状态复用 storage_state', link: '/zh/playwright/ch09' },
  { text: '10 表单与复杂组件交互', link: '/zh/playwright/ch10' },
  { text: '11 截图、视频与 Trace Viewer', link: '/zh/playwright/ch11' },
  { text: '12 设备仿真与多浏览器', link: '/zh/playwright/ch12' },
  { text: '13 数据驱动与参数化 E2E', link: '/zh/playwright/ch13' },
  { text: '14 Page Object Model 设计模式', link: '/zh/playwright/ch14' },
  { text: '15 并行执行与 Sharding', link: '/zh/playwright/ch15' },
  { text: '16 CI 集成与 Docker', link: '/zh/playwright/ch16' },
  { text: '17 APIRequestContext 与 API 测试', link: '/zh/playwright/ch17' },
  { text: '18 异步 API 与 FastAPI 联测', link: '/zh/playwright/ch18' },
  { text: '19 调试技巧与 Flaky 治理', link: '/zh/playwright/ch19' },
  { text: '20 无障碍测试与 Aria Snapshot', link: '/zh/playwright/ch20' },
  { text: '21 WebSocket 与实时应用测试', link: '/zh/playwright/ch21' },
  { text: '22 生产实践：E2E 策略与报告', link: '/zh/playwright/ch22' }
]

// ===== Pi 编码智能体 0.8x =====
const pi = [
  { text: '0. 课程导学', link: '/zh/pi/' },
  { text: '01 Pi 是什么：极简终端编码智能体', link: '/zh/pi/ch01' },
  { text: '02 安装与快速上手', link: '/zh/pi/ch02' },
  { text: '03 Providers 与 Models 配置', link: '/zh/pi/ch03' },
  { text: '04 交互模式：编辑器/命令/快捷键', link: '/zh/pi/ch04' },
  { text: '05 会话管理：恢复与分支', link: '/zh/pi/ch05' },
  { text: '06 上下文压缩 Compaction 与 Context Files', link: '/zh/pi/ch06' },
  { text: '07 Settings 设置与项目信任', link: '/zh/pi/ch07' },
  { text: '08 Prompt Templates 提示词模板', link: '/zh/pi/ch08' },
  { text: '09 Skills 技能体系', link: '/zh/pi/ch09' },
  { text: '10 Extensions 入门：TypeScript 扩展 API', link: '/zh/pi/ch10' },
  { text: '11 Extensions 进阶：自定义工具与 UI', link: '/zh/pi/ch11' },
  { text: '12 Themes 主题定制', link: '/zh/pi/ch12' },
  { text: '13 Pi Packages 包生态与分发', link: '/zh/pi/ch13' },
  { text: '14 SDK 编程式嵌入', link: '/zh/pi/ch14' },
  { text: '15 RPC 模式与进程集成', link: '/zh/pi/ch15' },
  { text: '16 Print/JSON 模式与 CI 自动化', link: '/zh/pi/ch16' },
  { text: '17 工具系统与 CLI 全解', link: '/zh/pi/ch17' },
  { text: '18 安全模型与环境变量', link: '/zh/pi/ch18' },
  { text: '19 高级场景：容器化/tmux/会话格式', link: '/zh/pi/ch19' },
  { text: '20 工作流哲学与团队实践', link: '/zh/pi/ch20' },
  { text: '21 多会话协作：intercom 与 messenger', link: '/zh/pi/ch21' }
]
// ===== HTTP 请求库教程 =====
const http = [
  { text: '0. 课程导学', link: '/zh/http/', collapsed: true },
  {
    text: '一、requests 基础',
    collapsed: false,
    items: [
      { text: '01 HTTP 客户端生态概览', link: '/zh/http/ch01' },
      { text: '02 GET 请求与响应处理', link: '/zh/http/ch02' },
      { text: '03 POST 与请求体构建', link: '/zh/http/ch03' },
      { text: '04 请求参数：Headers、Cookies、Auth', link: '/zh/http/ch04' },
      { text: '05 响应详解：状态码、JSON、文件', link: '/zh/http/ch05' }
    ]
  },
  {
    text: '二、requests 进阶',
    collapsed: false,
    items: [
      { text: '06 Session 与持久连接', link: '/zh/http/ch06' },
      { text: '07 超时与重试机制', link: '/zh/http/ch07' },
      { text: '08 代理与 SSL/TLS 配置', link: '/zh/http/ch08' },
      { text: '09 异常处理与最佳实践', link: '/zh/http/ch09' }
    ]
  },
  {
    text: '三、httpx 异步客户端',
    collapsed: false,
    items: [
      { text: '10 httpx 简介与同步 API', link: '/zh/http/ch10' },
      { text: '11 异步客户端 AsyncClient', link: '/zh/http/ch11' },
      { text: '12 并发请求与并发控制', link: '/zh/http/ch12' },
      { text: '13 HTTP/2 与 WebSocket', link: '/zh/http/ch13' }
    ]
  },
  {
    text: '四、高级主题与实战',
    collapsed: false,
    items: [
      { text: '14 中间件与事件钩子', link: '/zh/http/ch14' },
      { text: '15 pytest 集成测试', link: '/zh/http/ch15' },
      { text: '16 性能优化与资源管理', link: '/zh/http/ch16' },
      { text: '17 API 客户端封装模式', link: '/zh/http/ch17' },
      { text: '18 安全最佳实践', link: '/zh/http/ch18' },
      { text: '19 生产部署与监控', link: '/zh/http/ch19' },
      { text: '20 综合实战：GitHub API 客户端', link: '/zh/http/ch20' }
    ]
  }
]




// ===== Pi Agent 开发 =====
const piAgent = [
  { text: '0. 课程导学', link: '/zh/pi-agent/' },
  { text: '01 课程导览与环境准备', link: '/zh/pi-agent/ch01' },
  { text: '02 pi-ai 快速入门：统一 LLM API', link: '/zh/pi-agent/ch02' },
  { text: '03 Provider 与模型目录', link: '/zh/pi-agent/ch03' },
  { text: '04 第一个 Agent', link: '/zh/pi-agent/ch04' },
  { text: '05 事件流订阅与流式输出', link: '/zh/pi-agent/ch05' },
  { text: '06 工具定义与执行', link: '/zh/pi-agent/ch06' },
  { text: '07 工具调用事件流', link: '/zh/pi-agent/ch07' },
  { text: '08 AgentMessage 与消息转换', link: '/zh/pi-agent/ch08' },
  { text: '09 transformContext 上下文变换', link: '/zh/pi-agent/ch09' },
  { text: '10 认证解析与凭据管理', link: '/zh/pi-agent/ch10' },
  { text: '11 思考与推理模式', link: '/zh/pi-agent/ch11' },
  { text: '12 图片输入与图像生成', link: '/zh/pi-agent/ch12' },
  { text: '13 停止原因、中止与错误处理', link: '/zh/pi-agent/ch13' },
  { text: '14 自定义 Provider 与 OpenAI 兼容端点', link: '/zh/pi-agent/ch14' },
  { text: '15 Faux Provider 与单元测试', link: '/zh/pi-agent/ch15' },
  { text: '16 跨提供商切换 Handoffs', link: '/zh/pi-agent/ch16' },
  { text: '17 会话持久化与 SQLite 后端', link: '/zh/pi-agent/ch17' },
  { text: '18 上下文序列化与浏览器使用', link: '/zh/pi-agent/ch18' },
  { text: '19 可观测性：Telemetry 与 Span 追踪', link: '/zh/pi-agent/ch19' },
  { text: '20 终端用户界面：pi-tui 与差量渲染', link: '/zh/pi-agent/ch20' },
  { text: '21 实战一：测试智能体——从需求到测试用例', link: '/zh/pi-agent/ch21' },
  { text: '22 实战二：测试智能体——自动化执行与报告', link: '/zh/pi-agent/ch22' },
  { text: '23 实战三：测试智能体——CI 集成与定时回归巡检', link: '/zh/pi-agent/ch23' }
]


// ===== Flue =====
const flue = [
  { text: '0. 课程导学', link: '/zh/flue/' },
  { text: '01 Flue 概述与 Harness 理念', link: '/zh/flue/ch01' },
  { text: '02 项目搭建与开发流程', link: '/zh/flue/ch02' },
  { text: "03 'use agent'：函数式 Agent", link: '/zh/flue/ch03' },
  { text: '04 模型配置与指令设计', link: '/zh/flue/ch04' },
  { text: '05 会话与上下文管理', link: '/zh/flue/ch05' },
  { text: '06 Tools 类型化工具', link: '/zh/flue/ch06' },
  { text: '07 Skills 技能包', link: '/zh/flue/ch07' },
  { text: '08 连接 MCP 工具生态', link: '/zh/flue/ch08' },
  { text: '09 Subagents 子代理委派', link: '/zh/flue/ch09' },
  { text: '10 Channels 事件通道', link: '/zh/flue/ch10' },
  { text: '11 Sandboxes 安全沙箱', link: '/zh/flue/ch11' },
  { text: '12 Durability 持久化与恢复', link: '/zh/flue/ch12' },
  { text: '13 Observability 可观测性', link: '/zh/flue/ch13' },
  { text: '14 CLI 与本地运行', link: '/zh/flue/ch14' },
  { text: '15 部署：Node.js 与 Cloudflare Workers', link: '/zh/flue/ch15' },
  { text: '16 部署：CI 与托管平台', link: '/zh/flue/ch16' },
  { text: '17 实战一：GitHub 自动分诊 Agent', link: '/zh/flue/ch17' },
  { text: '18 实战二：Slack 值班助手（含框架对比）', link: '/zh/flue/ch18' },
  { text: '19 实战三：代码审查 Agent', link: '/zh/flue/ch19' }
]

// ===== FirstMate =====
const firstmate = [
  { text: '0. 课程导学', link: '/zh/firstmate/' },
  { text: '01 FirstMate 概述：Agent Distro 与舰队理念', link: '/zh/firstmate/ch01' },
  { text: '02 环境搭建与首次启航', link: '/zh/firstmate/ch02' },
  { text: '03 AGENTS.md 解剖：第一副手的岗位职责', link: '/zh/firstmate/ch03' },
  { text: '04 五条硬规则与安全边界', link: '/zh/firstmate/ch04' },
  { text: '05 运行时布局：FM_HOME 与目录约定', link: '/zh/firstmate/ch05' },
  { text: '06 会话后端：tmux 参考后端', link: '/zh/firstmate/ch06' },
  { text: '07 实验性后端：herdr、zellij、Orca 与 cmux', link: '/zh/firstmate/ch07' },
  { text: '08 Crewmate 委派：ship 任务与 scout 任务', link: '/zh/firstmate/ch08' },
  { text: '09 Worktree 隔离与并行交付', link: '/zh/firstmate/ch09' },
  { text: '10 项目模式与合并权限：no-mistakes / direct-PR / local-only', link: '/zh/firstmate/ch10' },
  { text: '11 零 token 事件驱动监督：watcher 与 turn-end guard', link: '/zh/firstmate/ch11' },
  { text: '12 内置技能：/ahoy、/bearings、/afk、/stow、/updatefirstmate', link: '/zh/firstmate/ch12' },
  { text: '13 两层技能体系与自定义扩展', link: '/zh/firstmate/ch13' },
  { text: '14 Secondmate：持久第二副手与隔离章程', link: '/zh/firstmate/ch14' },
  { text: '15 远程舰队、Relay 与运维工具箱', link: '/zh/firstmate/ch15' },
  { text: '16 实战一：搭建个人开发舰队', link: '/zh/firstmate/ch16' },
  { text: '17 实战二：多项目并行交付流水线', link: '/zh/firstmate/ch17' },
  { text: '18 实战三：Secondmate 远程舰队规模化运营', link: '/zh/firstmate/ch18' }
]

// ===== Hands-On LLM =====
const handsOnLLM = [
  { text: '0. 课程导学', link: '/zh/hands-on-llm/' },
  { text: '01 语言模型导论', link: '/zh/hands-on-llm/ch01' },
  { text: '02 Token 与 Token 嵌入', link: '/zh/hands-on-llm/ch02' },
  { text: '03 深入 LLM 内部', link: '/zh/hands-on-llm/ch03' },
  { text: '04 文本分类', link: '/zh/hands-on-llm/ch04' },
  { text: '05 文本聚类与主题建模', link: '/zh/hands-on-llm/ch05' },
  { text: '06 提示工程', link: '/zh/hands-on-llm/ch06' },
  { text: '07 高级文本生成技术与工具', link: '/zh/hands-on-llm/ch07' },
  { text: '08 语义搜索', link: '/zh/hands-on-llm/ch08' },
  { text: '09 多模态大语言模型', link: '/zh/hands-on-llm/ch09' },
  { text: '10 构建文本嵌入模型', link: '/zh/hands-on-llm/ch10' },
  { text: '11 微调 BERT', link: '/zh/hands-on-llm/ch11' },
  { text: '12 微调生成模型', link: '/zh/hands-on-llm/ch12' },
  { text: '13 扩展阅读（Bonus）', link: '/zh/hands-on-llm/bonus' }
]

// ===== Vercel AI SDK =====
const aiSdk = [
  { text: '0. 课程导学', link: '/zh/ai-sdk/' },
  { text: '01 AI SDK 概览与架构', link: '/zh/ai-sdk/ch01' },
  { text: '02 快速开始：环境搭建与第一次生成', link: '/zh/ai-sdk/ch02' },
  { text: '03 Provider 管理：AI Gateway 与自定义 Provider', link: '/zh/ai-sdk/ch03' },
  { text: '04 提示词与消息模型', link: '/zh/ai-sdk/ch04' },
  { text: '05 文本生成与流式输出', link: '/zh/ai-sdk/ch05' },
  { text: '06 生成设置与生命周期回调', link: '/zh/ai-sdk/ch06' },
  { text: '07 结构化输出', link: '/zh/ai-sdk/ch07' },
  { text: '08 工具调用', link: '/zh/ai-sdk/ch08' },
  { text: '09 多步工具循环与 MCP', link: '/zh/ai-sdk/ch09' },
  { text: '10 推理模型', link: '/zh/ai-sdk/ch10' },
  { text: '11 嵌入向量与重排序', link: '/zh/ai-sdk/ch11' },
  { text: '12 中间件与测试', link: '/zh/ai-sdk/ch12' },
  { text: '13 遥测与错误处理', link: '/zh/ai-sdk/ch13' },
  { text: '14 图像生成与多模态输入', link: '/zh/ai-sdk/ch14' },
  { text: '15 语音转写与合成', link: '/zh/ai-sdk/ch15' },
  { text: '16 Chatbot：useChat 与流协议', link: '/zh/ai-sdk/ch16' },
  { text: '17 流式数据、元数据与消息持久化', link: '/zh/ai-sdk/ch17' },
  { text: '18 Agent 入门：ToolLoopAgent 与循环控制', link: '/zh/ai-sdk/ch18' },
  { text: '19 审批、记忆与子代理', link: '/zh/ai-sdk/ch19' },
  { text: '20 实战一：构建语义搜索知识库问答（RAG）', link: '/zh/ai-sdk/ch20' },
  { text: '21 实战二：多代理客服工单系统', link: '/zh/ai-sdk/ch21' },
  { text: '22 实战三：全栈流式聊天应用', link: '/zh/ai-sdk/ch22' }
]

// ===== Agent 工程实战 =====
const agentProd = [
  { text: '0. 课程导学', link: '/zh/agent-prod/' },
  { text: '01 Python 异步编程与 FastAPI 生产进阶', link: '/zh/agent-prod/ch01' },
  { text: '02 消息队列：Redis Queue 与 Celery Worker', link: '/zh/agent-prod/ch02' },
  { text: '03 分布式协调与容器化部署', link: '/zh/agent-prod/ch03' },
  { text: '04 LangGraph 概述与 StateGraph 入门', link: '/zh/agent-prod/ch04' },
  { text: '05 状态管理与工具调用', link: '/zh/agent-prod/ch05' },
  { text: '06 条件边、子图与模块化', link: '/zh/agent-prod/ch06' },
  { text: '07 持久化：Checkpointer 与 Thread', link: '/zh/agent-prod/ch07' },
  { text: '08 流式输出与中断恢复', link: '/zh/agent-prod/ch08' },
  { text: '09 Deep Agents 入门：create_deep_agent', link: '/zh/agent-prod/ch09' },
  { text: '10 Skills、Memory 与审批模式', link: '/zh/agent-prod/ch10' },
  { text: '11 上下文工程：截断、压缩与 Token 预算', link: '/zh/agent-prod/ch11' },
  { text: '12 LLM-as-judge 评估器', link: '/zh/agent-prod/ch12' },
  { text: '13 A/B 测试与对照实验', link: '/zh/agent-prod/ch13' },
  { text: '14 Langfuse + OpenTelemetry', link: '/zh/agent-prod/ch14' },
  { text: '15 多模型网关与成本优化', link: '/zh/agent-prod/ch15' },
  { text: '16 AWS ECS/Fargate 与 S3', link: '/zh/agent-prod/ch16' },
  { text: '17 SQS 消息队列与 DynamoDB', link: '/zh/agent-prod/ch17' },
  { text: '18 CloudWatch 监控与 CI/CD', link: '/zh/agent-prod/ch18' },
  { text: '19 扩展一：复杂文档解析管线（PDF/PPT/OCR/转录）', link: '/zh/agent-prod/ch19' },
  { text: '20 扩展二：音视频处理与无头渲染管线（FFmpeg/OpenCV/Playwright）', link: '/zh/agent-prod/ch20' },
  { text: '21 实战一：RAG 知识库 Agent', link: '/zh/agent-prod/ch21' },
  { text: '22 实战二：多代理工单处理系统', link: '/zh/agent-prod/ch22' },
  { text: '23 实战三：全栈 Agent 服务', link: '/zh/agent-prod/ch23' }
]

// ===== Mastra =====
const mastra = [
  { text: '0. 课程导学', link: '/zh/mastra/' },
  { text: '01 Mastra 概述与环境搭建', link: '/zh/mastra/ch01' },
  { text: '02 项目结构与 Mastra Studio', link: '/zh/mastra/ch02' },
  { text: '03 Model Routing 模型路由', link: '/zh/mastra/ch03' },
  { text: '04 第一个 Agent', link: '/zh/mastra/ch04' },
  { text: '05 Tools 工具定义', link: '/zh/mastra/ch05' },
  { text: '06 Agent 与工具集成实战', link: '/zh/mastra/ch06' },
  { text: '07 Workflow 基础与 .then()', link: '/zh/mastra/ch07' },
  { text: '08 分支与并行执行', link: '/zh/mastra/ch08' },
  { text: '09 Suspend & Resume 人机协同', link: '/zh/mastra/ch09' },
  { text: '10 Memory 对话历史', link: '/zh/mastra/ch10' },
  { text: '11 Observational Memory 观察记忆', link: '/zh/mastra/ch11' },
  { text: '12 RAG 检索增强', link: '/zh/mastra/ch12' },
  { text: '13 Storage 存储层', link: '/zh/mastra/ch13' },
  { text: '14 构建 MCP Server', link: '/zh/mastra/ch14' },
  { text: '15 Evals 评估体系', link: '/zh/mastra/ch15' },
  { text: '16 Observability 可观测性', link: '/zh/mastra/ch16' },
  { text: '17 集成 React 与 Next.js', link: '/zh/mastra/ch17' },
  { text: '18 独立部署与服务端', link: '/zh/mastra/ch18' },
  { text: '19 实战一：生产级智能客服 Agent', link: '/zh/mastra/ch19' },
  { text: '20 实战二：全栈 AI 应用', link: '/zh/mastra/ch20' },
  { text: '21 实战三：数据问答 BI Agent', link: '/zh/mastra/ch21' }
]

// ===== Locust 性能测试 =====
const locust = [
  { text: '0. 课程导学', link: '/zh/locust/' },
  { text: '01 性能测试与 Locust 概述', link: '/zh/locust/ch01' },
  { text: '02 安装与第一个脚本', link: '/zh/locust/ch02' },
  { text: '03 HttpUser 与任务编写', link: '/zh/locust/ch03' },
  { text: '04 任务权重与等待时间', link: '/zh/locust/ch04' },
  { text: '05 Web UI 与无头模式', link: '/zh/locust/ch05' },
  { text: '06 断言与失败检测', link: '/zh/locust/ch06' },
  { text: '07 TaskSet 与嵌套任务', link: '/zh/locust/ch07' },
  { text: '08 事件钩子与自定义统计', link: '/zh/locust/ch08' },
  { text: '09 参数化与数据驱动', link: '/zh/locust/ch09' },
  { text: '10 分布式压测', link: '/zh/locust/ch10' },
  { text: '11 Docker 容器化运行', link: '/zh/locust/ch11' },
  { text: '12 Kubernetes Operator', link: '/zh/locust/ch12' },
  { text: '13 测试非 HTTP 协议', link: '/zh/locust/ch13' },
  { text: '14 asyncio 支持', link: '/zh/locust/ch14' },
  { text: '15 作为库使用', link: '/zh/locust/ch15' },
  { text: '16 插件与扩展', link: '/zh/locust/ch16' },
  { text: '17 性能调优与请求率提升', link: '/zh/locust/ch17' },
  { text: '18 CI/CD 集成', link: '/zh/locust/ch18' },
  { text: '19 监控与结果分析', link: '/zh/locust/ch19' },
  { text: '20 综合实战：全链路压测', link: '/zh/locust/ch20' }
]

// ===== Claude Code =====
const claudeCode = [
  { text: '0. 课程导学', link: '/zh/claude-code/' },
  { text: '01 Claude Code 简介与安装', link: '/zh/claude-code/ch01' },
  { text: '02 基本对话与代码生成', link: '/zh/claude-code/ch02' },
  { text: '03 项目上下文与 CLAUDE.md', link: '/zh/claude-code/ch03' },
  { text: '04 文件操作与代码编辑', link: '/zh/claude-code/ch04' },
  { text: '05 Bash 执行与自动化', link: '/zh/claude-code/ch05' },
  { text: '06 权限模型与安全设置', link: '/zh/claude-code/ch06' },
  { text: '07 多轮会话与上下文管理', link: '/zh/claude-code/ch07' },
  { text: '08 Git 集成与代码审查', link: '/zh/claude-code/ch08' },
  { text: '09 自定义指令与配置', link: '/zh/claude-code/ch09' },
  { text: '10 MCP 集成与外部工具', link: '/zh/claude-code/ch10' },
  { text: '11 Skills 技能系统', link: '/zh/claude-code/ch11' },
  { text: '12 子代理与并行工作流', link: '/zh/claude-code/ch12' },
  { text: '13 Hooks 自动化钩子', link: '/zh/claude-code/ch13' },
  { text: '14 IDE 集成', link: '/zh/claude-code/ch14' },
  { text: '15 SDK 与编程式调用', link: '/zh/claude-code/ch15' },
  { text: '16 企业级配置与管理', link: '/zh/claude-code/ch16' },
  { text: '17 成本控制与用量管理', link: '/zh/claude-code/ch17' },
  { text: '18 高级技巧与最佳实践', link: '/zh/claude-code/ch18' },
  { text: '19 团队协作规范', link: '/zh/claude-code/ch19' },
  { text: '20 综合实战项目', link: '/zh/claude-code/ch20' },
  { text: '21 近期更新与新特性', link: '/zh/claude-code/ch21' }
]

// ===== Agent 工程基础 =====
const agent = [
  { text: '0. 课程导学', link: '/zh/agent/', collapsed: true },
  {
    text: '一、Harness 工程基础',
    collapsed: false,
    items: [
      { text: '01 为什么强模型仍会失败', link: '/zh/agent/ch01' },
      { text: '02 Harness 到底是什么', link: '/zh/agent/ch02' },
      { text: '03 仓库即记录系统与初始化', link: '/zh/agent/ch03' },
      { text: '04 长任务连续性管理', link: '/zh/agent/ch04' },
      { text: '05 控制机制：防止越界与过早胜利', link: '/zh/agent/ch05' },
      { text: '06 可观测性与会话清理', link: '/zh/agent/ch06' }
    ]
  },
  {
    text: '二、提示工程',
    collapsed: false,
    items: [
      { text: '07 大模型与提示工程概述', link: '/zh/agent/ch07' },
      { text: '08 提示基本要素与指令设计', link: '/zh/agent/ch08' },
      { text: '09 Zero-shot 与 Few-shot', link: '/zh/agent/ch09' },
      { text: '10 思维链 Chain-of-Thought', link: '/zh/agent/ch10' },
      { text: '11 自洽性与生成知识', link: '/zh/agent/ch11' },
      { text: '12 ReAct：推理与行动协同', link: '/zh/agent/ch12' },
      { text: '13 高级技术：ToT 与 Prompt Chaining', link: '/zh/agent/ch13' },
      { text: '14 RAG 与检索增强提示', link: '/zh/agent/ch14' },
      { text: '15 对抗攻击与防御', link: '/zh/agent/ch15' }
    ]
  },
  {
    text: '三、MCP 协议',
    collapsed: false,
    items: [
      { text: '16 MCP 概述与架构', link: '/zh/agent/ch16' },
      { text: '17 核心原语：Tools/Resources/Prompts', link: '/zh/agent/ch17' },
      { text: '18 传输层与生命周期', link: '/zh/agent/ch18' },
      { text: '19 编写第一个 MCP Server', link: '/zh/agent/ch19' },
      { text: '20 MCP 客户端集成实战', link: '/zh/agent/ch20' },
      { text: '21 MCP 安全与生产实践', link: '/zh/agent/ch21' }
    ]
  },
  {
    text: '四、Agent Skills',
    collapsed: false,
    items: [
      { text: '22 Agent Skills 标准与 SKILL.md', link: '/zh/agent/ch22' },
      { text: '23 编写高质量技能', link: '/zh/agent/ch23' },
      { text: '24 技能生态与团队治理', link: '/zh/agent/ch24' },
      { text: '25 三大技能仓库对比', link: '/zh/agent/ch25' }
    ]
  },
  {
    text: '五、Loop Engineering',
    collapsed: false,
    items: [
      { text: '26 Loop Engineering：从提示到循环', link: '/zh/agent/ch26' },
      { text: '27 七大生产循环模式', link: '/zh/agent/ch27' },
      { text: '28 自主等级与 Loop Ready 评分', link: '/zh/agent/ch28' },
      { text: '29 循环安全与失败模式', link: '/zh/agent/ch29' }
    ]
  },
  {
    text: '六、AGENTS.md 与综合实战',
    collapsed: false,
    items: [
      { text: '30 AGENTS.md 标准：给智能体的 README', link: '/zh/agent/ch30' },
      { text: '31 综合实战：五件套打通完整工作流', link: '/zh/agent/ch31' },
      { text: '32 课程总结与学习路线', link: '/zh/agent/ch32' }
    ]
  }
]

const enHttp = [
  { text: "0. Course Guide", link: "/en/http/" },
  { text: "01. HTTP Client Libraries: requests & httpx", link: "/en/http/ch01.html" },
  { text: "02. GET Requests and Response Handling", link: "/en/http/ch02.html" },
  { text: "03. POST and Request Body Construction", link: "/en/http/ch03.html" },
  { text: "04. Request Parameters in Depth", link: "/en/http/ch04.html" },
  { text: "05. Responses in Depth", link: "/en/http/ch05.html" },
  { text: "06. Sessions and Persistent Connections", link: "/en/http/ch06.html" },
  { text: "07. Timeouts and Retries", link: "/en/http/ch07.html" },
  { text: "08. Proxies and SSL/TLS", link: "/en/http/ch08.html" },
  { text: "09. Exception Handling and Best Practices", link: "/en/http/ch09.html" },
  { text: "10. httpx Introduction and Sync API", link: "/en/http/ch10.html" },
  { text: "11. The AsyncClient", link: "/en/http/ch11.html" },
  { text: "12. Concurrent Requests and Concurrency Control", link: "/en/http/ch12.html" },
  { text: "13. HTTP/2 and WebSocket", link: "/en/http/ch13.html" },
  { text: "14. Middleware and Event Hooks", link: "/en/http/ch14.html" },
  { text: "15. pytest Integration Testing", link: "/en/http/ch15.html" },
  { text: "16. Performance Optimization and Resource Management", link: "/en/http/ch16.html" },
  { text: "17. API Client Encapsulation Patterns", link: "/en/http/ch17.html" },
  { text: "18. Security Best Practices", link: "/en/http/ch18.html" },
  { text: "19. Production Deployment and Monitoring", link: "/en/http/ch19.html" },
  { text: "20. Capstone: GitHub API Client", link: "/en/http/ch20.html" }
]

const enPytest = [
  { text: "0. Course Guide", link: "/en/pytest/" },
  { text: "01. Introduction to Automated Testing and pytest", link: "/en/pytest/ch01.html" },
  { text: "02. Test Discovery Rules and Run Control", link: "/en/pytest/ch02.html" },
  { text: "03. The Art of Assertions", link: "/en/pytest/ch03.html" },
  { text: "04. Organizing Tests and Marks", link: "/en/pytest/ch04.html" },
  { text: "05. Parametrized Tests", link: "/en/pytest/ch05.html" },
  { text: "06. Fixture Fundamentals", link: "/en/pytest/ch06.html" },
  { text: "07. Fixtures Advanced: Scopes and conftest", link: "/en/pytest/ch07.html" },
  { text: "08. Advanced Fixture Patterns", link: "/en/pytest/ch08.html" },
  { text: "09. The Built-in Fixture Toolbox", link: "/en/pytest/ch09.html" },
  { text: "10. Mock Testing and monkeypatch", link: "/en/pytest/ch10.html" },
  { text: "11. Configuration Files In Depth", link: "/en/pytest/ch11.html" },
  { text: "12. The Plugin System and Essential Plugins", link: "/en/pytest/ch12.html" },
  { text: "13. Coverage and Quality Gates", link: "/en/pytest/ch13.html" },
  { text: "14. Parallel and Distributed Execution", link: "/en/pytest/ch14.html" },
  { text: "15. Advanced Parametrization", link: "/en/pytest/ch15.html" },
  { text: "16. Custom Plugins and Hook Development", link: "/en/pytest/ch16.html" },
  { text: "17. Testing Asynchronous Code", link: "/en/pytest/ch17.html" },
  { text: "18. Property-Based Testing with Hypothesis", link: "/en/pytest/ch18.html" },
  { text: "19. Testing Web Services and Integration Testing", link: "/en/pytest/ch19.html" },
  { text: "20. Production Practice: CI and Test Governance", link: "/en/pytest/ch20.html" }
]

const enPlaywright = [
  { text: "0. Course Guide", link: "/en/playwright/" },
  { text: "01. E2E Testing and Playwright Overview", link: "/en/playwright/ch01.html" },
  { text: "02. First Script and Sync API", link: "/en/playwright/ch02.html" },
  { text: "03. Locators and Strict Mode", link: "/en/playwright/ch03.html" },
  { text: "04. Auto-Wait and Actionability", link: "/en/playwright/ch04.html" },
  { text: "05. Web-First Assertions with expect", link: "/en/playwright/ch05.html" },
  { text: "06. pytest Integration and Fixture System", link: "/en/playwright/ch06.html" },
  { text: "07. Multi-Page, Popups, and iframes", link: "/en/playwright/ch07.html" },
  { text: "08. Network Interception and Mock", link: "/en/playwright/ch08.html" },
  { text: "09. Auth State Reuse with storage_state", link: "/en/playwright/ch09.html" },
  { text: "10. Forms and Complex Component Interaction", link: "/en/playwright/ch10.html" },
  { text: "11. Screenshots, Video, and Trace Viewer", link: "/en/playwright/ch11.html" },
  { text: "12. Device Emulation and Multi-Browser", link: "/en/playwright/ch12.html" },
  { text: "13. Data-Driven and Parameterized E2E", link: "/en/playwright/ch13.html" },
  { text: "14. Page Object Model", link: "/en/playwright/ch14.html" },
  { text: "15. Parallel Execution and Sharding", link: "/en/playwright/ch15.html" },
  { text: "16. CI Integration and Docker", link: "/en/playwright/ch16.html" },
  { text: "17. APIRequestContext and API Testing", link: "/en/playwright/ch17.html" },
  { text: "18. Async API and FastAPI Integration Testing", link: "/en/playwright/ch18.html" },
  { text: "19. Debugging Techniques and Flaky Test Resolution", link: "/en/playwright/ch19.html" },
  { text: "20. Accessibility Testing and Aria Snapshot", link: "/en/playwright/ch20.html" },
  { text: "21. WebSocket and Real-Time Application Testing", link: "/en/playwright/ch21.html" },
  { text: "22. Production Practice: E2E Strategy and Reporting", link: "/en/playwright/ch22.html" }
]

const enLocust = [
  { text: "0. Course Guide", link: "/en/locust/" },
  { text: "01. Performance Testing and Locust Overview", link: "/en/locust/ch01.html" },
  { text: "02. Installation and First Script", link: "/en/locust/ch02.html" },
  { text: "03. HttpUser and Task Writing", link: "/en/locust/ch03.html" },
  { text: "04. Task Weights and Wait Time", link: "/en/locust/ch04.html" },
  { text: "05. Web UI and Headless Mode", link: "/en/locust/ch05.html" },
  { text: "06. Assertions and Failure Detection", link: "/en/locust/ch06.html" },
  { text: "07. TaskSet and Nested Tasks", link: "/en/locust/ch07.html" },
  { text: "08. Event Hooks and Custom Statistics", link: "/en/locust/ch08.html" },
  { text: "09. Parametrization and Data-Driven Testing", link: "/en/locust/ch09.html" },
  { text: "10. Distributed Load Testing", link: "/en/locust/ch10.html" },
  { text: "11. Docker Containerized Running", link: "/en/locust/ch11.html" },
  { text: "12. Kubernetes Operator", link: "/en/locust/ch12.html" },
  { text: "13. Non-HTTP Protocol Testing", link: "/en/locust/ch13.html" },
  { text: "14. asyncio Support", link: "/en/locust/ch14.html" },
  { text: "15. Using Locust as a Library", link: "/en/locust/ch15.html" },
  { text: "16. Plugins and Extensions", link: "/en/locust/ch16.html" },
  { text: "17. Performance Tuning and RPS Optimization", link: "/en/locust/ch17.html" },
  { text: "18. CI/CD Integration", link: "/en/locust/ch18.html" },
  { text: "19. Monitoring and Results Analysis", link: "/en/locust/ch19.html" },
  { text: "20. Capstone: Full-Stack Load Testing", link: "/en/locust/ch20.html" }
]

const enFastapi = [
  { text: "0. Course Guide", link: "/en/fastapi/" },
  { text: "01. FastAPI Overview and Environment Setup", link: "/en/fastapi/ch01.html" },
  { text: "02. First App and Auto-Generated Documentation", link: "/en/fastapi/ch02.html" },
  { text: "03. Path Parameters and Query Parameters", link: "/en/fastapi/ch03.html" },
  { text: "04. Request Body and Pydantic Models", link: "/en/fastapi/ch04.html" },
  { text: "05. Advanced Validation with Annotated", link: "/en/fastapi/ch05.html" },
  { text: "06. Response Models and Status Codes", link: "/en/fastapi/ch06.html" },
  { text: "07. Forms, File Upload, and Download", link: "/en/fastapi/ch07.html" },
  { text: "08. Cookie and Header Parameters", link: "/en/fastapi/ch08.html" },
  { text: "09. Error Handling and Custom Exceptions", link: "/en/fastapi/ch09.html" },
  { text: "10. Dependency Injection Basics", link: "/en/fastapi/ch10.html" },
  { text: "11. Advanced Dependency Injection", link: "/en/fastapi/ch11.html" },
  { text: "12. Middleware and CORS", link: "/en/fastapi/ch12.html" },
  { text: "13. Database Integration (SQLModel and Async SQLAlchemy)", link: "/en/fastapi/ch13.html" },
  { text: "14. Security Basics: OAuth2 and JWT", link: "/en/fastapi/ch14.html" },
  { text: "15. Security Advanced: Scopes and API Keys", link: "/en/fastapi/ch15.html" },
  { text: "16. Async Concurrency and Background Tasks", link: "/en/fastapi/ch16.html" },
  { text: "17. WebSocket Real-Time Communication", link: "/en/fastapi/ch17.html" },
  { text: "18. Template Rendering and Static Files", link: "/en/fastapi/ch18.html" },
  { text: "19. Large Project Structure with APIRouter", link: "/en/fastapi/ch19.html" },
  { text: "20. Testing FastAPI Applications", link: "/en/fastapi/ch20.html" },
  { text: "21. Configuration Management and Application Lifecycle", link: "/en/fastapi/ch21.html" },
  { text: "22. Production Deployment", link: "/en/fastapi/ch22.html" }
]

const enAgno = [
  { text: "0. Course Guide", link: "/en/agno/" },
  { text: "01. Agent Application Development and Agno Overview", link: "/en/agno/ch01.html" },
  { text: "02. Environment Setup and Your First Agent", link: "/en/agno/ch02.html" },
  { text: "03. Running Agents and Parsing RunOutput", link: "/en/agno/ch03.html" },
  { text: "04. Streaming Output and Real-Time Responses", link: "/en/agno/ch04.html" },
  { text: "05. Structured Output with output_schema", link: "/en/agno/ch05.html" },
  { text: "06. Prompt Engineering: instructions and the Description System", link: "/en/agno/ch06.html" },
  { text: "07. Tools: Built-in Toolkit Principles and Usage", link: "/en/agno/ch07.html" },
  { text: "08. Custom Tools and Toolkit Development", link: "/en/agno/ch08.html" },
  { text: "09. Agent Team Basics: Collaboration Patterns", link: "/en/agno/ch09.html" },
  { text: "10. Team Advanced: Shared State and Member Communication", link: "/en/agno/ch10.html" },
  { text: "11. Workflow Basics: Step Orchestration", link: "/en/agno/ch11.html" },
  { text: "12. Workflow Advanced: Parallel / Branch / Loop", link: "/en/agno/ch12.html" },
  { text: "13. Multimodal Agents", link: "/en/agno/ch13.html" },
  { text: "14. Session Management: session state and chat history", link: "/en/agno/ch14.html" },
  { text: "15. Storage: Session Persistence", link: "/en/agno/ch15.html" },
  { text: "16. Memory: User Profiles and Summaries", link: "/en/agno/ch16.html" },
  { text: "17. Knowledge Bases and RAG Basics", link: "/en/agno/ch17.html" },
  { text: "18. RAG Advanced: Agentic RAG and Hybrid Retrieval", link: "/en/agno/ch18.html" },
  { text: "19. Reasoning and Thinking Models", link: "/en/agno/ch19.html" },
  { text: "20. Skills: Pluggable Domain Capabilities", link: "/en/agno/ch20.html" },
  { text: "21. Human-in-the-Loop and Guardrails", link: "/en/agno/ch21.html" },
  { text: "22. MCP Protocol Integration", link: "/en/agno/ch22.html" },
  { text: "23. AgentOS: Publishing Agents as Services", link: "/en/agno/ch23.html" },
  { text: "24. Observability and Debugging", link: "/en/agno/ch24.html" },
  { text: "25. Performance Optimization and Production Practice", link: "/en/agno/ch25.html" },
  { text: "26. Capstone 1: Intelligent Data Analysis Assistant", link: "/en/agno/ch26.html" },
  { text: "27. Capstone 2: Multi-Source Research Assistant Team", link: "/en/agno/ch27.html" },
  { text: "28. Capstone 3: Customer-Support Knowledge Base Agent on AgentOS", link: "/en/agno/ch28.html" }
]

const enCrewai = [
  { text: "0. Course Guide", link: "/en/crewai/" },
  { text: "01. Multi-Agent Systems and CrewAI Overview", link: "/en/crewai/ch01.html" },
  { text: "02. Environment Setup and First Crew", link: "/en/crewai/ch02.html" },
  { text: "03. Agent Deep Dive: Role Design Methodology", link: "/en/crewai/ch03.html" },
  { text: "04. Task Deep Dive: Task Definition and Context", link: "/en/crewai/ch04.html" },
  { text: "05. Crew Assembly and Execution Flow", link: "/en/crewai/ch05.html" },
  { text: "06. LLM Configuration Deep Dive and Third-Party Model Integration", link: "/en/crewai/ch06.html" },
  { text: "07. Built-in Tooling System", link: "/en/crewai/ch07.html" },
  { text: "08. Custom Tool Development", link: "/en/crewai/ch08.html" },
  { text: "09. Hierarchical Process and Manager Agents", link: "/en/crewai/ch09.html" },
  { text: "10. Memory System: Short-term, Long-term, and Entity Memory", link: "/en/crewai/ch10.html" },
  { text: "11. Knowledge Sources", link: "/en/crewai/ch11.html" },
  { text: "12. Output Processing: JSON, Pydantic, and Data Passing", link: "/en/crewai/ch12.html" },
  { text: "13. Planning, Iteration, and Error Handling", link: "/en/crewai/ch13.html" },
  { text: "14. Callbacks, Logging, and Event Listening", link: "/en/crewai/ch14.html" },
  { text: "15. Flow入门: Event-Driven Workflows", link: "/en/crewai/ch15.html" },
  { text: "16. Flow Advanced: State Management and Persistence", link: "/en/crewai/ch16.html" },
  { text: "17. CLI Engineering and YAML Configuration Projects", link: "/en/crewai/ch17.html" },
  { text: "18. Multi-Crew Orchestration and Reuse", link: "/en/crewai/ch18.html" },
  { text: "19. MCP Integration", link: "/en/crewai/ch19.html" },
  { text: "20. Testing and Evaluation: crewai test/train", link: "/en/crewai/ch20.html" },
  { text: "21. Observability and Monitoring Integration", link: "/en/crewai/ch21.html" },
  { text: "22. Deployment and Service", link: "/en/crewai/ch22.html" },
  { text: "23. Capstone 1: Content Marketing Pipeline", link: "/en/crewai/ch23.html" },
  { text: "24. Capstone 2: Data Analysis Pipeline", link: "/en/crewai/ch24.html" },
  { text: "25. Capstone 3: Competitor Monitoring Intelligence Crew", link: "/en/crewai/ch25.html" },
  { text: "26. Best Practices and Production Checklist", link: "/en/crewai/ch26.html" }
]

const enAiSdk = [
  { text: "0. Course Guide", link: "/en/ai-sdk/" },
  { text: "01. AI SDK Overview and Architecture", link: "/en/ai-sdk/ch01.html" },
  { text: "02. Quick Start: Environment Setup and First Generation", link: "/en/ai-sdk/ch02.html" },
  { text: "03. Provider Management: AI Gateway and Custom Providers", link: "/en/ai-sdk/ch03.html" },
  { text: "04. Prompts and Message Models", link: "/en/ai-sdk/ch04.html" },
  { text: "05. Text Generation and Streaming Output", link: "/en/ai-sdk/ch05.html" },
  { text: "06. Generation Settings and Lifecycle Callbacks", link: "/en/ai-sdk/ch06.html" },
  { text: "07. Structured Output", link: "/en/ai-sdk/ch07.html" },
  { text: "08. Tool Calling", link: "/en/ai-sdk/ch08.html" },
  { text: "09. Multi-Step Tool Loops and MCP", link: "/en/ai-sdk/ch09.html" },
  { text: "10. Reasoning Models", link: "/en/ai-sdk/ch10.html" },
  { text: "11. Embeddings and Reranking", link: "/en/ai-sdk/ch11.html" },
  { text: "12. Middleware and Testing", link: "/en/ai-sdk/ch12.html" },
  { text: "13. Telemetry and Error Handling", link: "/en/ai-sdk/ch13.html" },
  { text: "14. Image Generation and Multimodal Input", link: "/en/ai-sdk/ch14.html" },
  { text: "15. Speech Transcription and Synthesis", link: "/en/ai-sdk/ch15.html" },
  { text: "16. Chatbot: useChat and Stream Protocols", link: "/en/ai-sdk/ch16.html" },
  { text: "17. Streaming Data, Metadata, and Message Persistence", link: "/en/ai-sdk/ch17.html" },
  { text: "18. Agent Introduction: ToolLoopAgent and Loop Control", link: "/en/ai-sdk/ch18.html" },
  { text: "19. Approvals, Memory, and Subagents", link: "/en/ai-sdk/ch19.html" },
  { text: "20. Capstone 1: Building a Semantic Search Knowledge-Base Q&A (RAG)", link: "/en/ai-sdk/ch20.html" },
  { text: "21. Capstone 2: Multi-Agent Customer Ticket System", link: "/en/ai-sdk/ch21.html" },
  { text: "22. Capstone 3: Full-Stack Streaming Chat Application", link: "/en/ai-sdk/ch22.html" }
]

const enAgentProd = [
  { text: "0. Course Guide", link: "/en/agent-prod/" },
  { text: "01. Python Async Programming and FastAPI Production", link: "/en/agent-prod/ch01.html" },
  { text: "02. Message Queues: Redis Queue and Celery Worker", link: "/en/agent-prod/ch02.html" },
  { text: "03. Distributed Coordination and Containerized Deployment Advanced", link: "/en/agent-prod/ch03.html" },
  { text: "04. LangGraph Overview and StateGraph Introduction", link: "/en/agent-prod/ch04.html" },
  { text: "05. State Management and Tool Calling", link: "/en/agent-prod/ch05.html" },
  { text: "06. Conditional Edges, Subgraphs, and Modularity", link: "/en/agent-prod/ch06.html" },
  { text: "07. Persistence: Checkpointer and Thread", link: "/en/agent-prod/ch07.html" },
  { text: "08. Streaming Output and Interrupt Recovery", link: "/en/agent-prod/ch08.html" },
  { text: "09. Deep Agents Introduction: create_deep_agent", link: "/en/agent-prod/ch09.html" },
  { text: "10. Skills, Memory, and Approval Modes", link: "/en/agent-prod/ch10.html" },
  { text: "11. Chapter 11", link: "/en/agent-prod/ch11.html" },
  { text: "12. Chapter 12", link: "/en/agent-prod/ch12.html" },
  { text: "13. Chapter 13", link: "/en/agent-prod/ch13.html" },
  { text: "14. Chapter 14", link: "/en/agent-prod/ch14.html" },
  { text: "15. Chapter 15", link: "/en/agent-prod/ch15.html" },
  { text: "16. Chapter 16", link: "/en/agent-prod/ch16.html" },
  { text: "17. Chapter 17", link: "/en/agent-prod/ch17.html" },
  { text: "18. Chapter 18", link: "/en/agent-prod/ch18.html" },
  { text: "19. Chapter 19", link: "/en/agent-prod/ch19.html" },
  { text: "20. Chapter 20", link: "/en/agent-prod/ch20.html" },
  { text: "21. Chapter 21", link: "/en/agent-prod/ch21.html" },
  { text: "22. Chapter 22", link: "/en/agent-prod/ch22.html" },
  { text: "23. Chapter 23", link: "/en/agent-prod/ch23.html" }
]

const enMastra = [
  { text: "0. Course Guide", link: "/en/mastra/" },
  { text: "01. Mastra Overview and Environment Setup", link: "/en/mastra/ch01.html" },
  { text: "02. Project Structure and Mastra Studio", link: "/en/mastra/ch02.html" },
  { text: "03. Model Routing", link: "/en/mastra/ch03.html" },
  { text: "04. Your First Agent", link: "/en/mastra/ch04.html" },
  { text: "05. Tools Definition", link: "/en/mastra/ch05.html" },
  { text: "06. Agent and Tool Integration in Practice", link: "/en/mastra/ch06.html" },
  { text: "07. Workflow Basics and .then()", link: "/en/mastra/ch07.html" },
  { text: "08. Branching and Parallel Execution", link: "/en/mastra/ch08.html" },
  { text: "09. Suspend & Resume: Human-in-the-Loop Collaboration", link: "/en/mastra/ch09.html" },
  { text: "10. Memory: Conversation History", link: "/en/mastra/ch10.html" },
  { text: "11. Observational Memory", link: "/en/mastra/ch11.html" },
  { text: "12. RAG: Retrieval-Augmented Generation", link: "/en/mastra/ch12.html" },
  { text: "13. Storage Layer", link: "/en/mastra/ch13.html" },
  { text: "14. Building an MCP Server", link: "/en/mastra/ch14.html" },
  { text: "15. Evals: Evaluation System", link: "/en/mastra/ch15.html" },
  { text: "16. Observability", link: "/en/mastra/ch16.html" },
  { text: "17. Integrating React and Next.js", link: "/en/mastra/ch17.html" },
  { text: "18. Standalone Deployment and Server-Side", link: "/en/mastra/ch18.html" },
  { text: "19. Capstone 1: Production-Grade Smart Customer Service Agent", link: "/en/mastra/ch19.html" },
  { text: "20. Capstone 2: Full-Stack AI Application", link: "/en/mastra/ch20.html" },
  { text: "21. Capstone 3: Data Q&A BI Agent", link: "/en/mastra/ch21.html" }
]

const enFlue = [
  { text: "0. Course Guide", link: "/en/flue/" },
  { text: "01. Flue Overview and the Harness Philosophy", link: "/en/flue/ch01.html" },
  { text: "02. Project Setup and Development Workflow", link: "/en/flue/ch02.html" },
  { text: "03. 'use agent': The Functional Agent", link: "/en/flue/ch03.html" },
  { text: "04. Model Configuration and Instruction Design", link: "/en/flue/ch04.html" },
  { text: "05. Sessions and Context Management", link: "/en/flue/ch05.html" },
  { text: "06. Type-Safe Tools", link: "/en/flue/ch06.html" },
  { text: "07. Skills: On-Demand Domain Knowledge Packs", link: "/en/flue/ch07.html" },
  { text: "08. Connecting the MCP Tool Ecosystem", link: "/en/flue/ch08.html" },
  { text: "09. Subagents: Expert Delegation", link: "/en/flue/ch09.html" },
  { text: "10. Channels: Event Inbound Routing", link: "/en/flue/ch10.html" },
  { text: "11. Sandboxes: Safe Execution Environments", link: "/en/flue/ch11.html" },
  { text: "12. Durability: Persistence and Recovery", link: "/en/flue/ch12.html" },
  { text: "13. Observability", link: "/en/flue/ch13.html" },
  { text: "14. CLI and Local Run", link: "/en/flue/ch14.html" },
  { text: "15. Deployment: Node.js and Cloudflare Workers", link: "/en/flue/ch15.html" },
  { text: "16. Deployment: CI and Hosted Platforms", link: "/en/flue/ch16.html" },
  { text: "17. Capstone 1: GitHub Auto-Triage Agent", link: "/en/flue/ch17.html" },
  { text: "18. Capstone 2: Slack On-Call Assistant (with Framework Comparison)", link: "/en/flue/ch18.html" },
  { text: "19. Capstone 3: Code Review Agent", link: "/en/flue/ch19.html" }
]

const enFirstmate = [
  { text: "0. Course Guide", link: "/en/firstmate/" },
  { text: "01. FirstMate Overview: Agent Distro and Fleet Philosophy", link: "/en/firstmate/ch01.html" },
  { text: "02. Environment Setup and First Sail", link: "/en/firstmate/ch02.html" },
  { text: "03. AGENTS.md Anatomy: The First Mate's Job Description", link: "/en/firstmate/ch03.html" },
  { text: "04. The Five Hard Rules and Safety Boundaries", link: "/en/firstmate/ch04.html" },
  { text: "05. Runtime Layout: FM_HOME and Directory Conventions", link: "/en/firstmate/ch05.html" },
  { text: "06. Session Backends: tmux Reference Backend", link: "/en/firstmate/ch06.html" },
  { text: "07. Experimental Backends: herdr, zellij, Orca, and cmux", link: "/en/firstmate/ch07.html" },
  { text: "08. Crewmate Delegation: Ship Tasks and Scout Tasks", link: "/en/firstmate/ch08.html" },
  { text: "09. Worktree Isolation and Parallel Delivery", link: "/en/firstmate/ch09.html" },
  { text: "10. Project Modes and Merge Permissions: no-mistakes / direct-PR / local-only", link: "/en/firstmate/ch10.html" },
  { text: "11. Zero-Token Event-Driven Supervision: Watcher and Turn-End Guard", link: "/en/firstmate/ch11.html" },
  { text: "12. Built-in Skills: /ahoy, /bearings, /afk, /stow, /updatefirstmate", link: "/en/firstmate/ch12.html" },
  { text: "13. Two-Layer Skill System and Custom Extensions", link: "/en/firstmate/ch13.html" },
  { text: "14. Secondmate: Persistent Deputy and Isolated Charter", link: "/en/firstmate/ch14.html" },
  { text: "15. Remote Fleet, Relay, and the Ops Toolbelt", link: "/en/firstmate/ch15.html" },
  { text: "16. Capstone 1: Building a Personal Dev Fleet", link: "/en/firstmate/ch16.html" },
  { text: "17. Capstone 2: Multi-Project Parallel Delivery Pipeline", link: "/en/firstmate/ch17.html" },
  { text: "18. Capstone 3: Secondmate Remote Fleet Scaling Operations", link: "/en/firstmate/ch18.html" }
]

const enPiAgent = [
  { text: "0. Course Guide", link: "/en/pi-agent/" },
  { text: "01. Course Overview and Environment Setup", link: "/en/pi-agent/ch01.html" },
  { text: "02. pi-ai Quickstart: Unified LLM API", link: "/en/pi-agent/ch02.html" },
  { text: "03. Providers and Model Catalog", link: "/en/pi-agent/ch03.html" },
  { text: "04. Your First Agent", link: "/en/pi-agent/ch04.html" },
  { text: "05. Event Stream Subscription and Streaming Output", link: "/en/pi-agent/ch05.html" },
  { text: "06. Tool Definition and Execution", link: "/en/pi-agent/ch06.html" },
  { text: "07. Tool Call Event Streams", link: "/en/pi-agent/ch07.html" },
  { text: "08. AgentMessage and Message Transformation", link: "/en/pi-agent/ch08.html" },
  { text: "09. transformContext: Context Transformation", link: "/en/pi-agent/ch09.html" },
  { text: "10. Auth Resolution and Credential Management", link: "/en/pi-agent/ch10.html" },
  { text: "11. Thinking and Reasoning Modes", link: "/en/pi-agent/ch11.html" },
  { text: "12. Image Input and Image Generation", link: "/en/pi-agent/ch12.html" },
  { text: "13. Stop Reasons, Abort, and Error Handling", link: "/en/pi-agent/ch13.html" },
  { text: "14. Custom Providers and OpenAI-Compatible Endpoints", link: "/en/pi-agent/ch14.html" },
  { text: "15. Faux Provider and Unit Testing", link: "/en/pi-agent/ch15.html" },
  { text: "16. Cross-Provider Handoffs", link: "/en/pi-agent/ch16.html" },
  { text: "17. Session Persistence and SQLite Backend", link: "/en/pi-agent/ch17.html" },
  { text: "18. Context Serialization and Browser Usage", link: "/en/pi-agent/ch18.html" },
  { text: "19. Executable Agents: From Requirements to Test Cases", link: "/en/pi-agent/ch19.html" },
  { text: "20. Terminal UI: pi-tui and Diff Rendering", link: "/en/pi-agent/ch20.html" },
  { text: "21. Capstone Project 1: Test Agent — From Requirements to Test Cases", link: "/en/pi-agent/ch21.html" },
  { text: "22. Capstone Project 2: Test Agent — Automated Execution and Reporting", link: "/en/pi-agent/ch22.html" },
  { text: "23. Capstone Project 3: Test Agent — CI Integration and Scheduled Regression Inspection", link: "/en/pi-agent/ch23.html" }
]

const enHandsOnLlm = [
  { text: "0. Course Guide", link: "/en/hands-on-llm/" },
  { text: "01. Introduction to Language Models", link: "/en/hands-on-llm/ch01.html" },
  { text: "02. Tokens and Token Embeddings", link: "/en/hands-on-llm/ch02.html" },
  { text: "03. Inside the LLM", link: "/en/hands-on-llm/ch03.html" },
  { text: "04. Text Classification", link: "/en/hands-on-llm/ch04.html" },
  { text: "05. Text Clustering and Topic Modeling", link: "/en/hands-on-llm/ch05.html" },
  { text: "06. Prompt Engineering", link: "/en/hands-on-llm/ch06.html" },
  { text: "07. Advanced Text Generation Techniques and Tools", link: "/en/hands-on-llm/ch07.html" },
  { text: "08. Semantic Search", link: "/en/hands-on-llm/ch08.html" },
  { text: "09. Multimodal Large Language Models", link: "/en/hands-on-llm/ch09.html" },
  { text: "10. Building Text Embedding Models", link: "/en/hands-on-llm/ch10.html" },
  { text: "11. Fine-Tuning BERT", link: "/en/hands-on-llm/ch11.html" },
  { text: "12. Fine-Tuning Generative Models", link: "/en/hands-on-llm/ch12.html" },
  { text: "Bonus Material", link: "/en/hands-on-llm/bonus.html" }
]

const enAgent = [
  { text: "0. Course Guide", link: "/en/agent/" },
  { text: "01. Why Strong Models Still Fail", link: "/en/agent/ch01.html" },
  { text: "02. What Exactly Is a Harness", link: "/en/agent/ch02.html" },
  { text: "03. Repo-as-Record System and Initialization", link: "/en/agent/ch03.html" },
  { text: "04. Long-Task Continuity Management", link: "/en/agent/ch04.html" },
  { text: "05. Control Mechanisms: Preventing Scope Creep and Premature Victory", link: "/en/agent/ch05.html" },
  { text: "06. Observability and Session Cleanup", link: "/en/agent/ch06.html" },
  { text: "07. LLM and Prompt Engineering Overview", link: "/en/agent/ch07.html" },
  { text: "08. Basic Prompt Elements and Instruction Design", link: "/en/agent/ch08.html" },
  { text: "09. Self-Consistency and Generated Knowledge", link: "/en/agent/ch09.html" },
  { text: "10. Chain-of-Thought", link: "/en/agent/ch10.html" },
  { text: "11. Tree of Thoughts and Prompt Chaining", link: "/en/agent/ch11.html" },
  { text: "12. ReAct: Reasoning and Acting in Concert", link: "/en/agent/ch12.html" },
  { text: "13. Advanced Techniques: ToT and Prompt Chaining", link: "/en/agent/ch13.html" },
  { text: "14. Repo-as-Spec and the AGENTS.md Design", link: "/en/agent/ch14.html" },
  { text: "15. Adversarial Attacks and Defense", link: "/en/agent/ch15.html" },
  { text: "16. MCP Overview and Architecture", link: "/en/agent/ch16.html" },
  { text: "17. Core Primitives: Tools / Resources / Prompts", link: "/en/agent/ch17.html" },
  { text: "18. Transport Layer and Lifecycle", link: "/en/agent/ch18.html" },
  { text: "19. Writing Your First MCP Server", link: "/en/agent/ch19.html" },
  { text: "20. MCP Client Integration in Practice", link: "/en/agent/ch20.html" },
  { text: "21. MCP Security and Production Practices", link: "/en/agent/ch21.html" },
  { text: "22. Agent Skills Standards and SKILL.md", link: "/en/agent/ch22.html" },
  { text: "23. Writing High-Quality Skills", link: "/en/agent/ch23.html" },
  { text: "24. Skills Ecosystem and Team Governance", link: "/en/agent/ch24.html" },
  { text: "25. Three Skills Repositories Compared", link: "/en/agent/ch25.html" },
  { text: "26. Loop Engineering: From Prompts to Loops", link: "/en/agent/ch26.html" },
  { text: "27. Seven Production Loop Patterns", link: "/en/agent/ch27.html" },
  { text: "28. Autonomy Levels and Loop Ready Scoring", link: "/en/agent/ch28.html" },
  { text: "29. Loop Security and Failure Modes", link: "/en/agent/ch29.html" },
  { text: "30. AGENTS.md Standard: A README for Agents", link: "/en/agent/ch30.html" },
  { text: "31. Capstone: Wiring the Five-Piece Set into a Complete Workflow", link: "/en/agent/ch31.html" },
  { text: "32. Course Summary and Learning Roadmap", link: "/en/agent/ch32.html" }
]

const enClaudeCode = [
  { text: "0. Course Guide", link: "/en/claude-code/" },
  { text: "01. Introduction to Claude Code", link: "/en/claude-code/ch01.html" },
  { text: "02. Basic Conversations and Code Generation", link: "/en/claude-code/ch02.html" },
  { text: "03. Project Context and CLAUDE.md", link: "/en/claude-code/ch03.html" },
  { text: "04. File Operations and Code Editing", link: "/en/claude-code/ch04.html" },
  { text: "05. Bash Execution and Automation", link: "/en/claude-code/ch05.html" },
  { text: "06. Permission Model and Security Settings", link: "/en/claude-code/ch06.html" },
  { text: "07. Multi-turn Sessions and Context Management", link: "/en/claude-code/ch07.html" },
  { text: "08. Git Integration and Code Review", link: "/en/claude-code/ch08.html" },
  { text: "09. Custom Instructions and Configuration", link: "/en/claude-code/ch09.html" },
  { text: "10. MCP Integration and External Tools", link: "/en/claude-code/ch10.html" },
  { text: "11. Skills System", link: "/en/claude-code/ch11.html" },
  { text: "12. Sub-agents and Parallel Workflows", link: "/en/claude-code/ch12.html" },
  { text: "13. Hooks Automation", link: "/en/claude-code/ch13.html" },
  { text: "14. IDE Integration", link: "/en/claude-code/ch14.html" },
  { text: "15. SDK and Programmatic Invocation", link: "/en/claude-code/ch15.html" },
  { text: "16. Enterprise Configuration and Cost Management", link: "/en/claude-code/ch16.html" },
  { text: "17. Best Practices and Team Norms", link: "/en/claude-code/ch17.html" },
  { text: "18. Advanced Techniques and Best Practices", link: "/en/claude-code/ch18.html" },
  { text: "19. Team Collaboration Norms", link: "/en/claude-code/ch19.html" },
  { text: "20. Capstone Project", link: "/en/claude-code/ch20.html" },
  { text: "21. Recent Updates and New Features", link: "/en/claude-code/ch21.html" }
]

const enPi = [
  { text: "0. Course Guide", link: "/en/pi/" },
  { text: "01. What Is Pi: The Minimal Terminal Coding Agent", link: "/en/pi/ch01.html" },
  { text: "02. Installation and Quickstart", link: "/en/pi/ch02.html" },
  { text: "03. Providers and Models Config", link: "/en/pi/ch03.html" },
  { text: "04. Interactive Mode: Editor / Commands / Keybindings", link: "/en/pi/ch04.html" },
  { text: "05. Session Management: Resume and Branch", link: "/en/pi/ch05.html" },
  { text: "06. Context Compaction and Context Files", link: "/en/pi/ch06.html" },
  { text: "07. Settings and Project Trust", link: "/en/pi/ch07.html" },
  { text: "08. Prompt Templates", link: "/en/pi/ch08.html" },
  { text: "09. Skills System", link: "/en/pi/ch09.html" },
  { text: "10. Extensions Intro: TypeScript Extension API", link: "/en/pi/ch10.html" },
  { text: "11. Extensions Advanced: Custom Tools and UI", link: "/en/pi/ch11.html" },
  { text: "12. Themes Customization", link: "/en/pi/ch12.html" },
  { text: "13. Pi Packages Ecosystem and Distribution", link: "/en/pi/ch13.html" },
  { text: "14. SDK Programmatic Embedding", link: "/en/pi/ch14.html" },
  { text: "15. RPC Mode and Process Integration", link: "/en/pi/ch15.html" },
  { text: "16. Print/JSON Mode and CI Automation", link: "/en/pi/ch16.html" },
  { text: "17. Tool System and CLI Reference", link: "/en/pi/ch17.html" },
  { text: "18. Security Model and Environment Variables", link: "/en/pi/ch18.html" },
  { text: "19. Advanced Scenarios: Containerization / tmux / Session Format", link: "/en/pi/ch19.html" },
  { text: "20. Workflow Philosophy and Team Practices", link: "/en/pi/ch20.html" },
  { text: "21. Multi-Session Collaboration: pi-intercom and pi-messenger", link: "/en/pi/ch21.html" }
]

// ===== 站点配置：/zh/ 中文 · /en/ 英文 · 根路径跳转 /zh/ =====
export default defineConfig({
  title: 'AI 工程与智能体教程站',
  description: '从零基础到生产实践：HTTP · pytest · Playwright · Locust · FastAPI · Agno · CrewAI · Agent 工程 · Claude Code · Pi · Flue · Mastra',
  // localhost 示例地址（如 Mastra Studio :4111）不算死链
  ignoreDeadLinks: [/^https?:\/\/localhost/, /^\.\/ch/],
  // 锁定 GitHub Light 浅色主题：禁用深色模式与右上角主题切换开关
  appearance: false,
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]],
  themeConfig: {
    siteTitle: '📚 AI 工程与智能体教程站',
    socialLinks: [{ icon: 'github', link: 'https://github.com/alwaylack/agentic-tutorial' }]
  },
  locales: {
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      themeConfig: {
        nav: [
          { text: '首页', link: '/zh/' },
          {
            text: '🌐 Web 与测试基础',
            items: [
              { text: 'HTTP 请求', link: '/zh/http/' },
              { text: 'pytest', link: '/zh/pytest/' },
              { text: 'Playwright', link: '/zh/playwright/' },
              { text: 'Locust', link: '/zh/locust/' },
              { text: 'FastAPI', link: '/zh/fastapi/' }
            ]
          },
          {
            text: '🤖 智能体框架',
            items: [
              { text: 'Agno', link: '/zh/agno/' },
              { text: 'CrewAI', link: '/zh/crewai/' },
              { text: 'Vercel AI SDK', link: '/zh/ai-sdk/' },
              { text: 'Agent 工程实战', link: '/zh/agent-prod/' },
              { text: 'Mastra', link: '/zh/mastra/' },
              { text: 'Flue', link: '/zh/flue/' },
              { text: 'FirstMate', link: '/zh/firstmate/' },
              { text: 'Pi Agent 开发', link: '/zh/pi-agent/' }
            ]
          },
          {
            text: '🧠 AI 助手与工程',
            items: [
              { text: 'Hands-On LLM', link: '/zh/hands-on-llm/' },
              { text: 'Agent 工程', link: '/zh/agent/' },
              { text: 'Claude Code', link: '/zh/claude-code/' },
              { text: 'Pi 编码智能体', link: '/zh/pi/' }
            ]
          },
          { text: '关于', link: '/zh/about/' }
        ],
        sidebar: {
      '/zh/http/': [{ text: 'HTTP 请求库教程（20 章）', items: http }],
      '/zh/pytest/': [{ text: 'pytest 9 教程（20 章）', items: pytest }],
      '/zh/playwright/': [{ text: 'Playwright 教程（22 章）', items: playwright }],
      '/zh/fastapi/': [{ text: 'FastAPI 教程（22 章）', items: fastapi }],
      '/zh/agno/': [{ text: 'Agno 3 教程（28 章）', items: agno }],
      '/zh/crewai/': [{ text: 'CrewAI 教程（26 章）', items: crewai }],
      '/zh/locust/': [{ text: 'Locust 性能测试教程（20 章）', items: locust }],
      '/zh/claude-code/': [{ text: 'Claude Code 教程（21 章）', items: claudeCode }],
      '/zh/pi-agent/': [{ text: 'Pi Agent 开发教程（23 章）', items: piAgent }],
      '/zh/flue/': [{ text: 'Flue 教程（19 章）', items: flue }],
      '/zh/firstmate/': [{ text: 'FirstMate 舰队编排教程（18 章）', items: firstmate }],
      '/zh/hands-on-llm/': [{ text: 'Hands-On LLM 教程（12 章 + 扩展）', items: handsOnLLM }],
      '/zh/ai-sdk/': [{ text: 'Vercel AI SDK 教程（22 章）', items: aiSdk }],
      '/zh/agent-prod/': [{ text: 'Agent 工程实战教程（23 章）', items: agentProd }],
      '/zh/mastra/': [{ text: 'Mastra 教程（21 章）', items: mastra }],
      '/zh/agent/': [{ text: 'Agent 工程基础教程（32 章）', items: agent }],
      '/zh/pi/': [{ text: 'Pi 编码智能体教程（21 章）', items: pi }]
        },
        outline: { level: [2, 3], label: '本页目录' },
        docFooter: { prev: '上一章', next: '下一章' },
        lastUpdated: { text: '最后更新于' }
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          {
            text: '🌐 Web & Testing',
            items: [
              { text: 'HTTP Requests', link: '/en/http/' },
              { text: 'pytest', link: '/en/pytest/' },
              { text: 'Playwright', link: '/en/playwright/' },
              { text: 'Locust', link: '/en/locust/' },
              { text: 'FastAPI', link: '/en/fastapi/' }
            ]
          },
          {
            text: '🤖 Agent Frameworks',
            items: [
              { text: 'Agno', link: '/en/agno/' },
              { text: 'CrewAI', link: '/en/crewai/' },
              { text: 'Vercel AI SDK', link: '/en/ai-sdk/' },
              { text: 'Agent Engineering in Production', link: '/en/agent-prod/' },
              { text: 'Mastra', link: '/en/mastra/' },
              { text: 'Flue', link: '/en/flue/' },
              { text: 'FirstMate', link: '/en/firstmate/' },
              { text: 'Pi Agent Development', link: '/en/pi-agent/' }
            ]
          },
          {
            text: '🧠 AI Assistants & Engineering',
            items: [
              { text: 'Hands-On LLM', link: '/en/hands-on-llm/' },
              { text: 'Agent Engineering', link: '/en/agent/' },
              { text: 'Claude Code', link: '/en/claude-code/' },
              { text: 'Pi Coding Agent', link: '/en/pi/' }
            ]
          },
          { text: 'About', link: '/en/about/' }
        ],
        sidebar: {
      '/en/http/': [{ text: "HTTP Requests (20 chapters)", items: enHttp }],
      '/en/pytest/': [{ text: "pytest 9 (20 chapters)", items: enPytest }],
      '/en/playwright/': [{ text: "Playwright (Python) (22 chapters)", items: enPlaywright }],
      '/en/locust/': [{ text: "Locust (20 chapters)", items: enLocust }],
      '/en/fastapi/': [{ text: "FastAPI (22 chapters)", items: enFastapi }],
      '/en/agno/': [{ text: "Agno 3 (28 chapters)", items: enAgno }],
      '/en/crewai/': [{ text: "CrewAI (26 chapters)", items: enCrewai }],
      '/en/ai-sdk/': [{ text: "Vercel AI SDK (22 chapters)", items: enAiSdk }],
      '/en/agent-prod/': [{ text: "Agent Engineering in Production (24 chapters)", items: enAgentProd }],
      '/en/mastra/': [{ text: "Mastra (21 chapters)", items: enMastra }],
      '/en/flue/': [{ text: "Flue (19 chapters)", items: enFlue }],
      '/en/firstmate/': [{ text: "FirstMate (18 chapters)", items: enFirstmate }],
      '/en/pi-agent/': [{ text: "Pi Agent Development (23 chapters)", items: enPiAgent }],
      '/en/hands-on-llm/': [{ text: "Hands-On LLM (12 chapters + bonus)", items: enHandsOnLlm }],
      '/en/agent/': [{ text: "Agent Engineering (32 chapters)", items: enAgent }],
      '/en/claude-code/': [{ text: "Claude Code (21 chapters)", items: enClaudeCode }],
      '/en/pi/': [{ text: "Pi Coding Agent (21 chapters)", items: enPi }]
        },
        outline: { level: [2, 3], label: 'On this page' },
        docFooter: { prev: 'Previous', next: 'Next' },
        lastUpdated: { text: 'Last updated' }
      }
    }
  },
  markdown: { lineNumbers: true }
})
