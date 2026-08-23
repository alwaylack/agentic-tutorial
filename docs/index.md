---
layout: home

hero:
  name: 编程进阶教程站
  text: HTTP · 测试 · 压测 · Web · 智能体 · AI 助手
  tagline: 从 0 基础到生产实践的十三套系统教程，每章配有随堂测验与动手实践
  actions:
    - theme: brand
      text: 开始学习 →
      link: /http/
    - theme: alt
      text: ☁️ Cloudflare 镜像
      link: https://agentic-tutorial.pages.dev
    - theme: alt
      text: ▲ Vercel 镜像
      link: https://agentic-tutorial.vercel.app
---

<CourseCards />

## 为什么选这套教程

- **零基础友好**：所有课程默认从安装环境讲起，循序渐进到入门 / 进阶 / 高级 / 生产实践四个阶段；
- **学与练结合**：每章都有可运行示例代码、4 道交互式随堂测验（答错展示正确答案与原因解析）和 3 道动手实践题；
- **忠于官方文档**：内容严格对照各项目最新官方文档编写，各课程基准版本如下：

| 课程 | 官方版本基准 |
|---|---|
| HTTP 请求 | requests 2.34 / httpx 0.28 |
| pytest | pytest 9.1 |
| Playwright | Playwright 1.62 (Python) |
| Locust | Locust 2.46 |
| FastAPI | FastAPI 0.141+ |
| Agno | Agno 2.9 |
| CrewAI | CrewAI 1.15 |
| Agent 工程 | PromptingGuide + Harness + MCP + Skills + Loop + AGENTS.md |
| Claude Code | Claude Code 2.1.x |
| Pi | Pi 0.84.x |
| Pi Agent 开发 | pi-agent-core + pi-ai（最新 main） |
| Flue | @flue/runtime（最新 main） |
| Mastra | @mastra/core（最新） |

- **生产导向**：每门课都以真实生产场景收尾——CI 集成、容器化部署、可观测性与上线检查单；
- **实战贯穿**：智能体框架五门课均配备完整项目实战——
  - **Pi Agent 开发**：测试智能体全流程（需求 → 评审 → 测试方案 → 用例生成 → 接口/Web 自动化）；
  - **Mastra**：生产级智能客服 Agent + 全栈 AI 应用；
  - **Flue**：GitHub 自动分诊 Agent + Slack 值班助手；
  - **CrewAI**：内容营销与数据分析双流水线；
  - **Agno**：智能数据分析助手（工具调用 → 图表生成 → Workflow 报告）。

## 推荐学习路线

| 方向 | 路线 |
|---|---|
| 🌐 Web 开发 | HTTP 请求 → FastAPI → Playwright |
| ✅ 测试工程 | pytest → Playwright → Locust → Pi Agent 开发（测试智能体实战） |
| 🐍 Python 智能体 | Agent 工程 → Agno → CrewAI → Pi → Claude Code |
| 🟦 TypeScript 智能体 | Agent 工程 → Mastra → Flue → Pi Agent 开发 |
