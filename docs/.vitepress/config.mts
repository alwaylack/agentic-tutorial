import { defineConfig } from 'vitepress'

const pytest = [
  { text: '0. 课程导学', link: '/pytest/' },
  { text: '01 初识自动化测试与 pytest', link: '/pytest/ch01' },
  { text: '02 测试发现规则与运行控制', link: '/pytest/ch02' },
  { text: '03 断言的艺术', link: '/pytest/ch03' },
  { text: '04 组织测试与标记 mark', link: '/pytest/ch04' },
  { text: '05 参数化测试', link: '/pytest/ch05' },
  { text: '06 fixture 基础', link: '/pytest/ch06' },
  { text: '07 fixture 进阶：作用域与 conftest', link: '/pytest/ch07' },
  { text: '08 fixture 高级模式', link: '/pytest/ch08' },
  { text: '09 内置 fixture 工具箱', link: '/pytest/ch09' },
  { text: '10 Mock 测试与 monkeypatch', link: '/pytest/ch10' },
  { text: '11 配置文件详解', link: '/pytest/ch11' },
  { text: '12 插件体系与常用插件', link: '/pytest/ch12' },
  { text: '13 覆盖率与质量门禁', link: '/pytest/ch13' },
  { text: '14 并行与分布式执行', link: '/pytest/ch14' },
  { text: '15 参数化高级技巧', link: '/pytest/ch15' },
  { text: '16 自定义插件与 hook 开发', link: '/pytest/ch16' },
  { text: '17 测试异步代码', link: '/pytest/ch17' },
  { text: '18 属性基测试与 Hypothesis', link: '/pytest/ch18' },
  { text: '19 测试 Web 服务与集成测试', link: '/pytest/ch19' },
  { text: '20 生产实践：CI 与测试治理', link: '/pytest/ch20' }
]

const fastapi = [
  { text: '0. 课程导学', link: '/fastapi/' },
  { text: '01 FastAPI 简介与环境搭建', link: '/fastapi/ch01' },
  { text: '02 第一个应用与自动文档', link: '/fastapi/ch02' },
  { text: '03 路径参数与查询参数', link: '/fastapi/ch03' },
  { text: '04 请求体与 Pydantic 模型', link: '/fastapi/ch04' },
  { text: '05 参数校验进阶与 Annotated', link: '/fastapi/ch05' },
  { text: '06 响应模型与状态码', link: '/fastapi/ch06' },
  { text: '07 表单、文件上传与下载', link: '/fastapi/ch07' },
  { text: '08 Cookie 与 Header 参数', link: '/fastapi/ch08' },
  { text: '09 错误处理与自定义异常', link: '/fastapi/ch09' },
  { text: '10 依赖注入系统基础', link: '/fastapi/ch10' },
  { text: '11 依赖注入进阶', link: '/fastapi/ch11' },
  { text: '12 中间件与 CORS', link: '/fastapi/ch12' },
  { text: '13 数据库集成（SQLModel/异步 SQLAlchemy）', link: '/fastapi/ch13' },
  { text: '14 安全基础：OAuth2 与 JWT', link: '/fastapi/ch14' },
  { text: '15 安全进阶：Scopes 与 API Key', link: '/fastapi/ch15' },
  { text: '16 异步并发与后台任务', link: '/fastapi/ch16' },
  { text: '17 WebSockets 实时通信', link: '/fastapi/ch17' },
  { text: '18 模板渲染与静态文件', link: '/fastapi/ch18' },
  { text: '19 大型项目结构拆分', link: '/fastapi/ch19' },
  { text: '20 测试 FastAPI 应用', link: '/fastapi/ch20' },
  { text: '21 配置管理与应用生命周期', link: '/fastapi/ch21' },
  { text: '22 生产部署实战', link: '/fastapi/ch22' }
]

const agno = [
  { text: '0. 课程导学', link: '/agno/' },
  { text: '01 Agent 应用开发与 Agno 概述', link: '/agno/ch01' },
  { text: '02 环境搭建与第一个 Agent', link: '/agno/ch02' },
  { text: '03 运行 Agent 与 RunOutput 解析', link: '/agno/ch03' },
  { text: '04 流式输出与实时响应', link: '/agno/ch04' },
  { text: '05 结构化输出 output_schema', link: '/agno/ch05' },
  { text: '06 Prompt 工程：instructions 与描述体系', link: '/agno/ch06' },
  { text: '07 工具 Tools：内置工具包原理与使用', link: '/agno/ch07' },
  { text: '08 自定义工具与 Toolkit 开发', link: '/agno/ch08' },
  { text: '09 多模态 Agent', link: '/agno/ch09' },
  { text: '10 会话管理 session state 与 chat history', link: '/agno/ch10' },
  { text: '11 存储 Storage：会话持久化', link: '/agno/ch11' },
  { text: '12 记忆 Memory：用户画像与摘要', link: '/agno/ch12' },
  { text: '13 知识库 Knowledge 与 RAG 入门', link: '/agno/ch13' },
  { text: '14 RAG 进阶：Agentic RAG 与混合检索', link: '/agno/ch14' },
  { text: '15 推理 Reasoning 与思考模型', link: '/agno/ch15' },
  { text: '16 人机协同与 Guardrails', link: '/agno/ch16' },
  { text: '17 MCP 协议集成', link: '/agno/ch17' },
  { text: '18 Agent Team 入门：协作模式', link: '/agno/ch18' },
  { text: '19 Team 进阶：共享状态与成员通信', link: '/agno/ch19' },
  { text: '20 Workflow 入门：Steps 步骤编排', link: '/agno/ch20' },
  { text: '21 Workflow 进阶：并行/分支/循环', link: '/agno/ch21' },
  { text: '22 AgentOS：把 Agent 发布成服务', link: '/agno/ch22' },
  { text: '23 可观测性与调试', link: '/agno/ch23' },
  { text: '24 性能优化与生产实践', link: '/agno/ch24' },
  { text: '25 实战一：智能数据分析助手', link: '/agno/ch25' },
  { text: '26 实战二：多源研究助手 Team', link: '/agno/ch26' },
  { text: '27 实战三：客服知识库 Agent 上线 AgentOS', link: '/agno/ch27' }
]

const crewai = [
  { text: '0. 课程导学', link: '/crewai/' },
  { text: '01 多智能体与 CrewAI 概述', link: '/crewai/ch01' },
  { text: '02 环境搭建与第一个 Crew', link: '/crewai/ch02' },
  { text: '03 Agent 深入：角色设计方法论', link: '/crewai/ch03' },
  { text: '04 Task 深入：任务定义与上下文', link: '/crewai/ch04' },
  { text: '05 Crew 组队与执行流程', link: '/crewai/ch05' },
  { text: '06 LLM 配置详解与三方模型接入', link: '/crewai/ch06' },
  { text: '07 内置工具体系', link: '/crewai/ch07' },
  { text: '08 自定义工具开发', link: '/crewai/ch08' },
  { text: '09 分层流程 hierarchical 与管理者', link: '/crewai/ch09' },
  { text: '10 记忆系统：短期、长期与实体记忆', link: '/crewai/ch10' },
  { text: '11 知识库 Knowledge Sources', link: '/crewai/ch11' },
  { text: '12 输出处理：JSON/Pydantic 与数据传递', link: '/crewai/ch12' },
  { text: '13 规划 Planning、迭代与错误处理', link: '/crewai/ch13' },
  { text: '14 回调、日志与事件监听', link: '/crewai/ch14' },
  { text: '15 Flow 入门：事件驱动工作流', link: '/crewai/ch15' },
  { text: '16 Flow 进阶：状态管理与持久化', link: '/crewai/ch16' },
  { text: '17 CLI 工程化与 YAML 配置项目', link: '/crewai/ch17' },
  { text: '18 多 Crew 编排与复用', link: '/crewai/ch18' },
  { text: '19 MCP 集成', link: '/crewai/ch19' },
  { text: '20 测试与评估：crewai test/train', link: '/crewai/ch20' },
  { text: '21 可观测性与监控集成', link: '/crewai/ch21' },
  { text: '22 部署与服务化', link: '/crewai/ch22' },
  { text: '23 实战一：内容营销流水线', link: '/crewai/ch23' },
  { text: '24 实战二：数据分析流水线', link: '/crewai/ch24' },
  { text: '25 实战三：竞品监控情报 Crew', link: '/crewai/ch25' },
  { text: '26 最佳实践与生产清单', link: '/crewai/ch26' }
]

// ===== Playwright (Python) 1.x =====
const playwright = [
  { text: '0. 课程导学', link: '/playwright/' },
  { text: '01 E2E 测试与 Playwright 概述', link: '/playwright/ch01' },
  { text: '02 第一个脚本与同步 API', link: '/playwright/ch02' },
  { text: '03 定位器 Locator 与严格模式', link: '/playwright/ch03' },
  { text: '04 自动等待与 Actionability', link: '/playwright/ch04' },
  { text: '05 Web-First 断言 expect', link: '/playwright/ch05' },
  { text: '06 pytest 集成与 fixture 体系', link: '/playwright/ch06' },
  { text: '07 多页面、Popup 与 iframe', link: '/playwright/ch07' },
  { text: '08 网络拦截与 Mock', link: '/playwright/ch08' },
  { text: '09 认证状态复用 storage_state', link: '/playwright/ch09' },
  { text: '10 表单与复杂组件交互', link: '/playwright/ch10' },
  { text: '11 截图、视频与 Trace Viewer', link: '/playwright/ch11' },
  { text: '12 设备仿真与多浏览器', link: '/playwright/ch12' },
  { text: '13 数据驱动与参数化 E2E', link: '/playwright/ch13' },
  { text: '14 Page Object Model 设计模式', link: '/playwright/ch14' },
  { text: '15 并行执行与 Sharding', link: '/playwright/ch15' },
  { text: '16 CI 集成与 Docker', link: '/playwright/ch16' },
  { text: '17 APIRequestContext 与 API 测试', link: '/playwright/ch17' },
  { text: '18 异步 API 与 FastAPI 联测', link: '/playwright/ch18' },
  { text: '19 调试技巧与 Flaky 治理', link: '/playwright/ch19' },
  { text: '20 无障碍测试与 Aria Snapshot', link: '/playwright/ch20' },
  { text: '21 WebSocket 与实时应用测试', link: '/playwright/ch21' },
  { text: '22 生产实践：E2E 策略与报告', link: '/playwright/ch22' }
]

// ===== Pi 编码智能体 0.8x =====
const pi = [
  { text: '0. 课程导学', link: '/pi/' },
  { text: '01 Pi 是什么：极简终端编码智能体', link: '/pi/ch01' },
  { text: '02 安装与快速上手', link: '/pi/ch02' },
  { text: '03 Providers 与 Models 配置', link: '/pi/ch03' },
  { text: '04 交互模式：编辑器/命令/快捷键', link: '/pi/ch04' },
  { text: '05 会话管理：恢复与分支', link: '/pi/ch05' },
  { text: '06 上下文压缩 Compaction 与 Context Files', link: '/pi/ch06' },
  { text: '07 Settings 设置与项目信任', link: '/pi/ch07' },
  { text: '08 Prompt Templates 提示词模板', link: '/pi/ch08' },
  { text: '09 Skills 技能体系', link: '/pi/ch09' },
  { text: '10 Extensions 入门：TypeScript 扩展 API', link: '/pi/ch10' },
  { text: '11 Extensions 进阶：自定义工具与 UI', link: '/pi/ch11' },
  { text: '12 Themes 主题定制', link: '/pi/ch12' },
  { text: '13 Pi Packages 包生态与分发', link: '/pi/ch13' },
  { text: '14 SDK 编程式嵌入', link: '/pi/ch14' },
  { text: '15 RPC 模式与进程集成', link: '/pi/ch15' },
  { text: '16 Print/JSON 模式与 CI 自动化', link: '/pi/ch16' },
  { text: '17 工具系统与 CLI 全解', link: '/pi/ch17' },
  { text: '18 安全模型与环境变量', link: '/pi/ch18' },
  { text: '19 高级场景：容器化/tmux/会话格式', link: '/pi/ch19' },
  { text: '20 工作流哲学与团队实践', link: '/pi/ch20' },
  { text: '21 多会话协作：intercom 与 messenger', link: '/pi/ch21' }
]
// ===== HTTP 请求库教程 =====
const http = [
  { text: '0. 课程导学', link: '/http/', collapsed: true },
  {
    text: '一、requests 基础',
    collapsed: false,
    items: [
      { text: '01 HTTP 客户端生态概览', link: '/http/ch01' },
      { text: '02 GET 请求与响应处理', link: '/http/ch02' },
      { text: '03 POST 与请求体构建', link: '/http/ch03' },
      { text: '04 请求参数：Headers、Cookies、Auth', link: '/http/ch04' },
      { text: '05 响应详解：状态码、JSON、文件', link: '/http/ch05' }
    ]
  },
  {
    text: '二、requests 进阶',
    collapsed: false,
    items: [
      { text: '06 Session 与持久连接', link: '/http/ch06' },
      { text: '07 超时与重试机制', link: '/http/ch07' },
      { text: '08 代理与 SSL/TLS 配置', link: '/http/ch08' },
      { text: '09 异常处理与最佳实践', link: '/http/ch09' }
    ]
  },
  {
    text: '三、httpx 异步客户端',
    collapsed: false,
    items: [
      { text: '10 httpx 简介与同步 API', link: '/http/ch10' },
      { text: '11 异步客户端 AsyncClient', link: '/http/ch11' },
      { text: '12 并发请求与并发控制', link: '/http/ch12' },
      { text: '13 HTTP/2 与 WebSocket', link: '/http/ch13' }
    ]
  },
  {
    text: '四、高级主题与实战',
    collapsed: false,
    items: [
      { text: '14 中间件与事件钩子', link: '/http/ch14' },
      { text: '15 pytest 集成测试', link: '/http/ch15' },
      { text: '16 性能优化与资源管理', link: '/http/ch16' },
      { text: '17 API 客户端封装模式', link: '/http/ch17' },
      { text: '18 安全最佳实践', link: '/http/ch18' },
      { text: '19 生产部署与监控', link: '/http/ch19' },
      { text: '20 综合实战：GitHub API 客户端', link: '/http/ch20' }
    ]
  }
]




// ===== Pi Agent 开发 =====
const piAgent = [
  { text: '0. 课程导学', link: '/pi-agent/' },
  { text: '01 课程导览与环境准备', link: '/pi-agent/ch01' },
  { text: '02 pi-ai 快速入门：统一 LLM API', link: '/pi-agent/ch02' },
  { text: '03 Provider 与模型目录', link: '/pi-agent/ch03' },
  { text: '04 第一个 Agent', link: '/pi-agent/ch04' },
  { text: '05 事件流订阅与流式输出', link: '/pi-agent/ch05' },
  { text: '06 工具定义与执行', link: '/pi-agent/ch06' },
  { text: '07 工具调用事件流', link: '/pi-agent/ch07' },
  { text: '08 AgentMessage 与消息转换', link: '/pi-agent/ch08' },
  { text: '09 transformContext 上下文变换', link: '/pi-agent/ch09' },
  { text: '10 认证解析与凭据管理', link: '/pi-agent/ch10' },
  { text: '11 思考与推理模式', link: '/pi-agent/ch11' },
  { text: '12 图片输入与图像生成', link: '/pi-agent/ch12' },
  { text: '13 停止原因、中止与错误处理', link: '/pi-agent/ch13' },
  { text: '14 自定义 Provider 与 OpenAI 兼容端点', link: '/pi-agent/ch14' },
  { text: '15 Faux Provider 与单元测试', link: '/pi-agent/ch15' },
  { text: '16 跨提供商切换 Handoffs', link: '/pi-agent/ch16' },
  { text: '17 会话持久化与 SQLite 后端', link: '/pi-agent/ch17' },
  { text: '18 上下文序列化与浏览器使用', link: '/pi-agent/ch18' },
  { text: '19 可观测性：Telemetry 与 Span 追踪', link: '/pi-agent/ch19' },
  { text: '20 终端用户界面：pi-tui 与差量渲染', link: '/pi-agent/ch20' },
  { text: '21 实战一：测试智能体——从需求到测试用例', link: '/pi-agent/ch21' },
  { text: '22 实战二：测试智能体——自动化执行与报告', link: '/pi-agent/ch22' },
  { text: '23 实战三：测试智能体——CI 集成与定时回归巡检', link: '/pi-agent/ch23' }
]


// ===== Flue =====
const flue = [
  { text: '0. 课程导学', link: '/flue/' },
  { text: '01 Flue 概述与 Harness 理念', link: '/flue/ch01' },
  { text: '02 项目搭建与开发流程', link: '/flue/ch02' },
  { text: "03 'use agent'：函数式 Agent", link: '/flue/ch03' },
  { text: '04 模型配置与指令设计', link: '/flue/ch04' },
  { text: '05 会话与上下文管理', link: '/flue/ch05' },
  { text: '06 Tools 类型化工具', link: '/flue/ch06' },
  { text: '07 Skills 技能包', link: '/flue/ch07' },
  { text: '08 连接 MCP 工具生态', link: '/flue/ch08' },
  { text: '09 Subagents 子代理委派', link: '/flue/ch09' },
  { text: '10 Channels 事件通道', link: '/flue/ch10' },
  { text: '11 Sandboxes 安全沙箱', link: '/flue/ch11' },
  { text: '12 Durability 持久化与恢复', link: '/flue/ch12' },
  { text: '13 Observability 可观测性', link: '/flue/ch13' },
  { text: '14 CLI 与本地运行', link: '/flue/ch14' },
  { text: '15 部署：Node.js 与 Cloudflare Workers', link: '/flue/ch15' },
  { text: '16 部署：CI 与托管平台', link: '/flue/ch16' },
  { text: '17 实战一：GitHub 自动分诊 Agent', link: '/flue/ch17' },
  { text: '18 实战二：Slack 值班助手（含框架对比）', link: '/flue/ch18' },
  { text: '19 实战三：代码审查 Agent', link: '/flue/ch19' }
]

// ===== FirstMate =====
const firstmate = [
  { text: '0. 课程导学', link: '/firstmate/' },
  { text: '01 FirstMate 概述：Agent Distro 与舰队理念', link: '/firstmate/ch01' },
  { text: '02 环境搭建与首次启航', link: '/firstmate/ch02' },
  { text: '03 AGENTS.md 解剖：第一副手的岗位职责', link: '/firstmate/ch03' },
  { text: '04 五条硬规则与安全边界', link: '/firstmate/ch04' },
  { text: '05 运行时布局：FM_HOME 与目录约定', link: '/firstmate/ch05' },
  { text: '06 会话后端：tmux 参考后端', link: '/firstmate/ch06' },
  { text: '07 实验性后端：herdr、zellij、Orca 与 cmux', link: '/firstmate/ch07' },
  { text: '08 Crewmate 委派：ship 任务与 scout 任务', link: '/firstmate/ch08' },
  { text: '09 Worktree 隔离与并行交付', link: '/firstmate/ch09' },
  { text: '10 项目模式与合并权限：no-mistakes / direct-PR / local-only', link: '/firstmate/ch10' },
  { text: '11 零 token 事件驱动监督：watcher 与 turn-end guard', link: '/firstmate/ch11' },
  { text: '12 内置技能：/ahoy、/bearings、/afk、/stow、/updatefirstmate', link: '/firstmate/ch12' },
  { text: '13 两层技能体系与自定义扩展', link: '/firstmate/ch13' },
  { text: '14 Secondmate：持久第二副手与隔离章程', link: '/firstmate/ch14' },
  { text: '15 远程舰队、Relay 与运维工具箱', link: '/firstmate/ch15' },
  { text: '16 实战一：搭建个人开发舰队', link: '/firstmate/ch16' },
  { text: '17 实战二：多项目并行交付流水线', link: '/firstmate/ch17' },
  { text: '18 实战三：Secondmate 远程舰队规模化运营', link: '/firstmate/ch18' }
]

// ===== Hands-On LLM =====
const handsOnLLM = [
  { text: '0. 课程导学', link: '/hands-on-llm/' },
  { text: '01 语言模型导论', link: '/hands-on-llm/ch01' },
  { text: '02 Token 与 Token 嵌入', link: '/hands-on-llm/ch02' },
  { text: '03 深入 LLM 内部', link: '/hands-on-llm/ch03' },
  { text: '04 文本分类', link: '/hands-on-llm/ch04' },
  { text: '05 文本聚类与主题建模', link: '/hands-on-llm/ch05' },
  { text: '06 提示工程', link: '/hands-on-llm/ch06' },
  { text: '07 高级文本生成技术与工具', link: '/hands-on-llm/ch07' },
  { text: '08 语义搜索', link: '/hands-on-llm/ch08' },
  { text: '09 多模态大语言模型', link: '/hands-on-llm/ch09' },
  { text: '10 构建文本嵌入模型', link: '/hands-on-llm/ch10' },
  { text: '11 微调 BERT', link: '/hands-on-llm/ch11' },
  { text: '12 微调生成模型', link: '/hands-on-llm/ch12' },
  { text: '13 扩展阅读（Bonus）', link: '/hands-on-llm/bonus' }
]

// ===== Vercel AI SDK =====
const aiSdk = [
  { text: '0. 课程导学', link: '/ai-sdk/' },
  { text: '01 AI SDK 概览与架构', link: '/ai-sdk/ch01' },
  { text: '02 快速开始：环境搭建与第一次生成', link: '/ai-sdk/ch02' },
  { text: '03 Provider 管理：AI Gateway 与自定义 Provider', link: '/ai-sdk/ch03' },
  { text: '04 提示词与消息模型', link: '/ai-sdk/ch04' },
  { text: '05 文本生成与流式输出', link: '/ai-sdk/ch05' },
  { text: '06 生成设置与生命周期回调', link: '/ai-sdk/ch06' },
  { text: '07 结构化输出', link: '/ai-sdk/ch07' },
  { text: '08 工具调用', link: '/ai-sdk/ch08' },
  { text: '09 多步工具循环与 MCP', link: '/ai-sdk/ch09' },
  { text: '10 推理模型', link: '/ai-sdk/ch10' },
  { text: '11 嵌入向量与重排序', link: '/ai-sdk/ch11' },
  { text: '12 中间件与测试', link: '/ai-sdk/ch12' },
  { text: '13 遥测与错误处理', link: '/ai-sdk/ch13' },
  { text: '14 图像生成与多模态输入', link: '/ai-sdk/ch14' },
  { text: '15 语音转写与合成', link: '/ai-sdk/ch15' },
  { text: '16 Chatbot：useChat 与流协议', link: '/ai-sdk/ch16' },
  { text: '17 流式数据、元数据与消息持久化', link: '/ai-sdk/ch17' },
  { text: '18 Agent 入门：ToolLoopAgent 与循环控制', link: '/ai-sdk/ch18' },
  { text: '19 审批、记忆与子代理', link: '/ai-sdk/ch19' },
  { text: '20 实战一：构建语义搜索知识库问答（RAG）', link: '/ai-sdk/ch20' },
  { text: '21 实战二：多代理客服工单系统', link: '/ai-sdk/ch21' },
  { text: '22 实战三：全栈流式聊天应用', link: '/ai-sdk/ch22' }
]

// ===== Agent 工程实战 =====
const agentProd = [
  { text: '0. 课程导学', link: '/agent-prod/' },
  { text: '01 Python 异步编程与 FastAPI 生产进阶', link: '/agent-prod/ch01' },
  { text: '02 消息队列：Redis Queue 与 Celery Worker', link: '/agent-prod/ch02' },
  { text: '03 分布式协调与容器化部署', link: '/agent-prod/ch03' },
  { text: '04 LangGraph 概述与 StateGraph 入门', link: '/agent-prod/ch04' },
  { text: '05 状态管理与工具调用', link: '/agent-prod/ch05' },
  { text: '06 条件边、子图与模块化', link: '/agent-prod/ch06' },
  { text: '07 持久化：Checkpointer 与 Thread', link: '/agent-prod/ch07' },
  { text: '08 流式输出与中断恢复', link: '/agent-prod/ch08' },
  { text: '09 Deep Agents 入门：create_deep_agent', link: '/agent-prod/ch09' },
  { text: '10 Skills、Memory 与审批模式', link: '/agent-prod/ch10' },
  { text: '11 上下文工程：截断、压缩与 Token 预算', link: '/agent-prod/ch11' },
  { text: '12 LLM-as-judge 评估器', link: '/agent-prod/ch12' },
  { text: '13 A/B 测试与对照实验', link: '/agent-prod/ch13' },
  { text: '14 Langfuse + OpenTelemetry', link: '/agent-prod/ch14' },
  { text: '15 多模型网关与成本优化', link: '/agent-prod/ch15' },
  { text: '16 AWS ECS/Fargate 与 S3', link: '/agent-prod/ch16' },
  { text: '17 SQS 消息队列与 DynamoDB', link: '/agent-prod/ch17' },
  { text: '18 CloudWatch 监控与 CI/CD', link: '/agent-prod/ch18' },
  { text: '19 实战一：RAG 知识库 Agent', link: '/agent-prod/ch19' },
  { text: '20 实战二：多代理工单处理系统', link: '/agent-prod/ch20' },
  { text: '21 实战三：全栈 Agent 服务', link: '/agent-prod/ch21' },
  { text: '22 扩展：复杂文档解析管线（PDF/PPT/OCR）', link: '/agent-prod/ch22' },
  { text: '23 扩展：音视频处理与无头渲染管线', link: '/agent-prod/ch23' }
]

// ===== Mastra =====
const mastra = [
  { text: '0. 课程导学', link: '/mastra/' },
  { text: '01 Mastra 概述与环境搭建', link: '/mastra/ch01' },
  { text: '02 项目结构与 Mastra Studio', link: '/mastra/ch02' },
  { text: '03 Model Routing 模型路由', link: '/mastra/ch03' },
  { text: '04 第一个 Agent', link: '/mastra/ch04' },
  { text: '05 Tools 工具定义', link: '/mastra/ch05' },
  { text: '06 Agent 与工具集成实战', link: '/mastra/ch06' },
  { text: '07 Workflow 基础与 .then()', link: '/mastra/ch07' },
  { text: '08 分支与并行执行', link: '/mastra/ch08' },
  { text: '09 Suspend & Resume 人机协同', link: '/mastra/ch09' },
  { text: '10 Memory 对话历史', link: '/mastra/ch10' },
  { text: '11 Observational Memory 观察记忆', link: '/mastra/ch11' },
  { text: '12 RAG 检索增强', link: '/mastra/ch12' },
  { text: '13 Storage 存储层', link: '/mastra/ch13' },
  { text: '14 构建 MCP Server', link: '/mastra/ch14' },
  { text: '15 Evals 评估体系', link: '/mastra/ch15' },
  { text: '16 Observability 可观测性', link: '/mastra/ch16' },
  { text: '17 集成 React 与 Next.js', link: '/mastra/ch17' },
  { text: '18 独立部署与服务端', link: '/mastra/ch18' },
  { text: '19 实战一：生产级智能客服 Agent', link: '/mastra/ch19' },
  { text: '20 实战二：全栈 AI 应用', link: '/mastra/ch20' },
  { text: '21 实战三：数据问答 BI Agent', link: '/mastra/ch21' }
]

// ===== Locust 性能测试 =====
const locust = [
  { text: '0. 课程导学', link: '/locust/' },
  { text: '01 性能测试与 Locust 概述', link: '/locust/ch01' },
  { text: '02 安装与第一个脚本', link: '/locust/ch02' },
  { text: '03 HttpUser 与任务编写', link: '/locust/ch03' },
  { text: '04 任务权重与等待时间', link: '/locust/ch04' },
  { text: '05 Web UI 与无头模式', link: '/locust/ch05' },
  { text: '06 断言与失败检测', link: '/locust/ch06' },
  { text: '07 TaskSet 与嵌套任务', link: '/locust/ch07' },
  { text: '08 事件钩子与自定义统计', link: '/locust/ch08' },
  { text: '09 参数化与数据驱动', link: '/locust/ch09' },
  { text: '10 分布式压测', link: '/locust/ch10' },
  { text: '11 Docker 容器化运行', link: '/locust/ch11' },
  { text: '12 Kubernetes Operator', link: '/locust/ch12' },
  { text: '13 测试非 HTTP 协议', link: '/locust/ch13' },
  { text: '14 asyncio 支持', link: '/locust/ch14' },
  { text: '15 作为库使用', link: '/locust/ch15' },
  { text: '16 插件与扩展', link: '/locust/ch16' },
  { text: '17 性能调优与请求率提升', link: '/locust/ch17' },
  { text: '18 CI/CD 集成', link: '/locust/ch18' },
  { text: '19 监控与结果分析', link: '/locust/ch19' },
  { text: '20 综合实战：全链路压测', link: '/locust/ch20' }
]

// ===== Claude Code =====
const claudeCode = [
  { text: '0. 课程导学', link: '/claude-code/' },
  { text: '01 Claude Code 简介与安装', link: '/claude-code/ch01' },
  { text: '02 基本对话与代码生成', link: '/claude-code/ch02' },
  { text: '03 项目上下文与 CLAUDE.md', link: '/claude-code/ch03' },
  { text: '04 文件操作与代码编辑', link: '/claude-code/ch04' },
  { text: '05 Bash 执行与自动化', link: '/claude-code/ch05' },
  { text: '06 权限模型与安全设置', link: '/claude-code/ch06' },
  { text: '07 多轮会话与上下文管理', link: '/claude-code/ch07' },
  { text: '08 Git 集成与代码审查', link: '/claude-code/ch08' },
  { text: '09 自定义指令与配置', link: '/claude-code/ch09' },
  { text: '10 MCP 集成与外部工具', link: '/claude-code/ch10' },
  { text: '11 Skills 技能系统', link: '/claude-code/ch11' },
  { text: '12 子代理与并行工作流', link: '/claude-code/ch12' },
  { text: '13 Hooks 自动化钩子', link: '/claude-code/ch13' },
  { text: '14 IDE 集成', link: '/claude-code/ch14' },
  { text: '15 SDK 与编程式调用', link: '/claude-code/ch15' },
  { text: '16 企业级配置与管理', link: '/claude-code/ch16' },
  { text: '17 成本控制与用量管理', link: '/claude-code/ch17' },
  { text: '18 高级技巧与最佳实践', link: '/claude-code/ch18' },
  { text: '19 团队协作规范', link: '/claude-code/ch19' },
  { text: '20 综合实战项目', link: '/claude-code/ch20' }
]

// ===== Agent 工程基础 =====
const agent = [
  { text: '0. 课程导学', link: '/agent/', collapsed: true },
  {
    text: '一、Harness 工程基础',
    collapsed: false,
    items: [
      { text: '01 为什么强模型仍会失败', link: '/agent/ch01' },
      { text: '02 Harness 到底是什么', link: '/agent/ch02' },
      { text: '03 仓库即记录系统与初始化', link: '/agent/ch03' },
      { text: '04 长任务连续性管理', link: '/agent/ch04' },
      { text: '05 控制机制：防止越界与过早胜利', link: '/agent/ch05' },
      { text: '06 可观测性与会话清理', link: '/agent/ch06' }
    ]
  },
  {
    text: '二、提示工程',
    collapsed: false,
    items: [
      { text: '07 大模型与提示工程概述', link: '/agent/ch07' },
      { text: '08 提示基本要素与指令设计', link: '/agent/ch08' },
      { text: '09 Zero-shot 与 Few-shot', link: '/agent/ch09' },
      { text: '10 思维链 Chain-of-Thought', link: '/agent/ch10' },
      { text: '11 自洽性与生成知识', link: '/agent/ch11' },
      { text: '12 ReAct：推理与行动协同', link: '/agent/ch12' },
      { text: '13 高级技术：ToT 与 Prompt Chaining', link: '/agent/ch13' },
      { text: '14 RAG 与检索增强提示', link: '/agent/ch14' },
      { text: '15 对抗攻击与防御', link: '/agent/ch15' }
    ]
  },
  {
    text: '三、MCP 协议',
    collapsed: false,
    items: [
      { text: '16 MCP 概述与架构', link: '/agent/ch16' },
      { text: '17 核心原语：Tools/Resources/Prompts', link: '/agent/ch17' },
      { text: '18 传输层与生命周期', link: '/agent/ch18' },
      { text: '19 编写第一个 MCP Server', link: '/agent/ch19' },
      { text: '20 MCP 客户端集成实战', link: '/agent/ch20' },
      { text: '21 MCP 安全与生产实践', link: '/agent/ch21' }
    ]
  },
  {
    text: '四、Agent Skills',
    collapsed: false,
    items: [
      { text: '22 Agent Skills 标准与 SKILL.md', link: '/agent/ch22' },
      { text: '23 编写高质量技能', link: '/agent/ch23' },
      { text: '24 技能生态与团队治理', link: '/agent/ch24' },
      { text: '25 三大技能仓库对比', link: '/agent/ch25' }
    ]
  },
  {
    text: '五、Loop Engineering',
    collapsed: false,
    items: [
      { text: '26 Loop Engineering：从提示到循环', link: '/agent/ch26' },
      { text: '27 七大生产循环模式', link: '/agent/ch27' },
      { text: '28 自主等级与 Loop Ready 评分', link: '/agent/ch28' },
      { text: '29 循环安全与失败模式', link: '/agent/ch29' }
    ]
  },
  {
    text: '六、AGENTS.md 与综合实战',
    collapsed: false,
    items: [
      { text: '30 AGENTS.md 标准：给智能体的 README', link: '/agent/ch30' },
      { text: '31 综合实战：五件套打通完整工作流', link: '/agent/ch31' },
      { text: '32 课程总结与学习路线', link: '/agent/ch32' }
    ]
  }
]

export default defineConfig({
  title: 'AI 工程与智能体教程站',
  description: '从零基础到生产实践：HTTP · pytest · Playwright · Locust · FastAPI · Agno · CrewAI · Agent 工程 · Claude Code · Pi · Flue · Mastra',
  // localhost 示例地址（如 Mastra Studio :4111）不算死链
  ignoreDeadLinks: [/^https?:\/\/localhost/,
    /^\/agent-prod\/ch/],
  // 锁定 GitHub Light 浅色主题：禁用深色模式与右上角主题切换开关
  appearance: false,
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]],
  themeConfig: {
    siteTitle: '📚 AI 工程与智能体教程站',    nav: [
      { text: '首页', link: '/' },
      {
        text: '🌐 Web 与测试基础',
        items: [
          { text: 'HTTP 请求', link: '/http/' },
          { text: 'pytest', link: '/pytest/' },
          { text: 'Playwright', link: '/playwright/' },
          { text: 'Locust', link: '/locust/' },
          { text: 'FastAPI', link: '/fastapi/' }
        ]
      },
      {
        text: '🤖 智能体框架',
        items: [
          { text: 'Agno', link: '/agno/' },
          { text: 'CrewAI', link: '/crewai/' },
          { text: 'Vercel AI SDK', link: '/ai-sdk/' },
          { text: 'Agent 工程实战', link: '/agent-prod/' },
          { text: 'Mastra', link: '/mastra/' },
          { text: 'Flue', link: '/flue/' },
          { text: 'FirstMate', link: '/firstmate/' },
          { text: 'Pi Agent 开发', link: '/pi-agent/' }
        ]
      },
      {
        text: '🧠 AI 助手与工程',
        items: [
          { text: 'Hands-On LLM', link: '/hands-on-llm/' },
          { text: 'Agent 工程', link: '/agent/' },
          { text: 'Claude Code', link: '/claude-code/' },
          { text: 'Pi 编码智能体', link: '/pi/' }
        ]
      },
      { text: '关于', link: '/about/' }
    ],
    sidebar: {
      '/http/': [{
        text: 'HTTP 请求库教程（20 章）',
        items: [
          { text: '0. 课程导学', link: '/http/' },
          {
            text: '一、requests 基础',
            collapsed: false,
            items: [
              { text: '01 HTTP 客户端生态概览', link: '/http/ch01' },
              { text: '02 GET 请求与响应处理', link: '/http/ch02' },
              { text: '03 POST 与请求体构建', link: '/http/ch03' },
              { text: '04 请求参数：Headers、Cookies、Auth', link: '/http/ch04' },
              { text: '05 响应详解：状态码、JSON、文件', link: '/http/ch05' }
            ]
          },
          {
            text: '二、requests 进阶',
            collapsed: false,
            items: [
              { text: '06 Session 与持久连接', link: '/http/ch06' },
              { text: '07 超时与重试机制', link: '/http/ch07' },
              { text: '08 代理与 SSL/TLS 配置', link: '/http/ch08' },
              { text: '09 异常处理与最佳实践', link: '/http/ch09' }
            ]
          },
          {
            text: '三、httpx 异步客户端',
            collapsed: false,
            items: [
              { text: '10 httpx 简介与同步 API', link: '/http/ch10' },
              { text: '11 异步客户端 AsyncClient', link: '/http/ch11' },
              { text: '12 并发请求与并发控制', link: '/http/ch12' },
              { text: '13 HTTP/2 与 WebSocket', link: '/http/ch13' }
            ]
          },
          {
            text: '四、高级主题与实战',
            collapsed: false,
            items: [
              { text: '14 中间件与事件钩子', link: '/http/ch14' },
              { text: '15 pytest 集成测试', link: '/http/ch15' },
              { text: '16 性能优化与资源管理', link: '/http/ch16' },
              { text: '17 API 客户端封装模式', link: '/http/ch17' },
              { text: '18 安全最佳实践', link: '/http/ch18' },
              { text: '19 生产部署与监控', link: '/http/ch19' },
              { text: '20 综合实战：GitHub API 客户端', link: '/http/ch20' }
            ]
          }
        ]
      }],
      '/pytest/': [{ text: 'pytest 9 教程（20 章）', items: pytest }],
      '/playwright/': [{ text: 'Playwright 教程（22 章）', items: playwright }],
      '/fastapi/': [{ text: 'FastAPI 教程（22 章）', items: fastapi }],
      '/agno/': [{ text: 'Agno 2 教程（24 章）', items: agno }],
      '/crewai/': [{ text: 'CrewAI 教程（26 章）', items: crewai }],
      '/locust/': [{ text: 'Locust 性能测试教程（20 章）', items: locust }],
      '/claude-code/': [{ text: 'Claude Code 教程（20 章）', items: claudeCode }],
      '/pi-agent/': [{ text: 'Pi Agent 开发教程（23 章）', items: piAgent }],
      '/flue/': [{ text: 'Flue 教程（19 章）', items: flue }],
      '/firstmate/': [{ text: 'FirstMate 舰队编排教程（18 章）', items: firstmate }],
      '/hands-on-llm/': [{ text: 'Hands-On LLM 教程（12 章 + 扩展）', items: handsOnLLM }],
      '/ai-sdk/': [{ text: 'Vercel AI SDK 教程（22 章）', items: aiSdk }],
      '/agent-prod/': [{ text: 'Agent 工程实战教程（23 章）', items: agentProd }],
      '/mastra/': [{ text: 'Mastra 教程（21 章）', items: mastra }],
      '/agent/': [{ text: 'Agent 工程基础教程（32 章）', items: agent }],
      '/pi/': [{ text: 'Pi 编码智能体教程（21 章）', items: pi }]
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/alwaylack/agentic-tutorial' }],
    outline: { level: [2, 3], label: '本页目录' },
    docFooter: { prev: '上一章', next: '下一章' },
    lastUpdated: { text: '最后更新于' }
  },
  markdown: { lineNumbers: true }
})
