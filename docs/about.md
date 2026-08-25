---
title: 关于本教程站
description: 十七套系统教程、369 章内容，覆盖 Web 基础到 AI 智能体生产部署
---

# 关于 AI 工程与智能体教程站

本教程站提供 <Badge type="warning" text="17 套系统教程" /> <Badge type="info" text="369 章" /> 内容，覆盖从 Web 基础到 AI 智能体生产部署的完整学习路径。每章配有可运行示例代码、4 道随堂测验和 3 道动手实践题。

## 各课程版本基准

<div class="version-table-wrap">
<table class="about-table">
<thead><tr><th>课程</th><th>官方版本基准</th></tr></thead>
<tbody>
<tr><td>HTTP 请求</td><td>requests 2.34 / httpx 0.28</td></tr>
<tr><td>pytest</td><td>pytest 9.1</td></tr>
<tr><td>Playwright</td><td>Playwright 1.62 (Python)</td></tr>
<tr><td>Locust</td><td>Locust 2.46</td></tr>
<tr><td>FastAPI</td><td>FastAPI 0.141+</td></tr>
<tr><td>Agno</td><td>Agno 2.9</td></tr>
<tr><td>CrewAI</td><td>CrewAI 1.15</td></tr>
<tr><td>Agent 工程</td><td>PromptingGuide + Harness + MCP + Skills + Loop + AGENTS.md</td></tr>
<tr><td>Claude Code</td><td>Claude Code 2.1.x</td></tr>
<tr><td>Pi</td><td>Pi 0.84.x</td></tr>
<tr><td>Pi Agent 开发</td><td>pi-agent-core + pi-ai + pi-telemetry + pi-tui（最新 main）</td></tr>
<tr><td>Flue</td><td>@flue/runtime（最新 main）</td></tr>
<tr><td>Mastra</td><td>@mastra/core（最新）</td></tr>
<tr><td>FirstMate</td><td>firstmate 最新 main（AGENTS.md + docs/）</td></tr>
<tr><td>Hands-On LLM</td><td>O'Reilly《Hands-On Large Language Models》配套仓库 main</td></tr>
<tr><td>Vercel AI SDK</td><td>ai-sdk.dev v6 最新文档 + Cookbook</td></tr>
<tr><td>Agent 工程实战</td><td>LangGraph 1.2 + Deep Agents + AWS ECS/SQS/DynamoDB</td></tr>
</tbody>
</table>
</div>

## 全课程实战项目一览

<div class="project-grid">

<div class="project-card">
  <span class="project-tag web">🌐 Web与测试</span>
  <div class="project-name">HTTP 请求</div>
  <p class="project-desc">GitHub API 客户端：requests/httpx 全栈封装，含认证、限流、缓存与 CLI 工具</p>
</div>

<div class="project-card">
  <span class="project-tag test">✅ 测试工程</span>
  <div class="project-name">pytest</div>
  <p class="project-desc">CI 测试治理：fixture 工厂、参数化矩阵、覆盖率门禁与 pytest-xdist 并行跑测</p>
</div>

<div class="project-card">
  <span class="project-tag test">✅ 测试工程</span>
  <div class="project-name">Playwright</div>
  <p class="project-desc">E2E 策略与报告：Page Object 架构、多浏览器并行、trace viewer 与 CI 集成</p>
</div>

<div class="project-card">
  <span class="project-tag web">🌐 Web与测试</span>
  <div class="project-name">Locust</div>
  <p class="project-desc">全链路压测：HttpUser 分布式脚本、Web UI 实时监控、Docker/K8s 集群压测</p>
</div>

<div class="project-card">
  <span class="project-tag web">🌐 Web与测试</span>
  <div class="project-name">FastAPI</div>
  <p class="project-desc">生产部署实战：Docker 镜像优化、Uvicorn 多 worker、健康检查与滚动重启</p>
</div>

<div class="project-card">
  <span class="project-tag agent">🤖 智能体框架</span>
  <div class="project-name">Agno</div>
  <p class="project-desc">三实战：智能数据分析助手（工具→图表→Workflow）· 多源研究助手 Team · 客服知识库 Agent 上线 AgentOS</p>
</div>

<div class="project-card">
  <span class="project-tag agent">🤖 智能体框架</span>
  <div class="project-name">CrewAI</div>
  <p class="project-desc">三实战：内容营销流水线 · 数据分析流水线 · 竞品监控情报 Crew（hierarchical + Flow）</p>
</div>

<div class="project-card">
  <span class="project-tag agent">🤖 智能体框架</span>
  <div class="project-name">Mastra</div>
  <p class="project-desc">三实战：生产级智能客服 Agent · 全栈 AI 应用（Workflow+RAG+Memory）· 数据问答 BI Agent</p>
</div>

<div class="project-card">
  <span class="project-tag agent">🤖 智能体框架</span>
  <div class="project-name">Flue</div>
  <p class="project-desc">三实战：GitHub 自动分诊 Agent · Slack 值班助手（Sandboxes隔离+多云部署）· 代码审查 Agent</p>
</div>

<div class="project-card">
  <span class="project-tag agent">🤖 智能体框架</span>
  <div class="project-name">FirstMate</div>
  <p class="project-desc">三实战：搭建个人开发舰队 · 多项目并行交付流水线 · Secondmate 远程舰队规模化运营</p>
</div>

<div class="project-card">
  <span class="project-tag agent">🤖 智能体框架</span>
  <div class="project-name">Pi Agent 开发</div>
  <p class="project-desc">三实战：测试智能体全流程（需求→用例→接口自动化）· 执行与报告 · CI 集成与定时回归巡检</p>
</div>

<div class="project-card">
  <span class="project-tag prod">🧠 AI生产部署</span>
  <div class="project-name">Vercel AI SDK</div>
  <p class="project-desc">三实战：语义搜索知识库问答（RAG）· 多代理客服工单系统 · 全栈流式聊天应用（多网关兼容）</p>
</div>

<div class="project-card">
  <span class="project-tag prod">🧠 AI生产部署</span>
  <div class="project-name">Agent 工程实战</div>
  <p class="project-desc">三实战：RAG 知识库 Agent · 多代理工单处理系统 · 全栈 Agent 服务（端到端部署 AWS ECS/SQS）</p>
</div>

</div>

<style scoped>
h1 {
  font-size: 1.8em;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

/* 版本表 */
.version-table-wrap {
  margin: 1rem 0 2.5rem;
  overflow-x: auto;
}
.about-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.92em;
}
.about-table th {
  text-align: left;
  padding: 0.55rem 1rem;
  border-bottom: 2px solid var(--gh-border);
  color: var(--gh-fg);
  font-weight: 600;
  white-space: nowrap;
}
.about-table td {
  padding: 0.45rem 1rem;
  border-bottom: 1px solid var(--gh-border);
  color: var(--gh-muted);
}
.about-table tr:hover td {
  background: var(--gh-canvas-subtle);
}
.about-table td:first-child {
  font-weight: 600;
  color: var(--gh-fg);
}

/* 实战项目卡片 */
.project-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-top: 1rem;
}
.project-card {
  background: var(--gh-canvas-subtle);
  border: 1px solid var(--gh-border);
  border-radius: 8px;
  padding: 1rem 1.1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.project-card:hover {
  border-color: var(--gh-accent);
  box-shadow: 0 4px 14px rgba(9, 105, 218, 0.10);
}
.project-tag {
  display: inline-block;
  font-size: 0.72em;
  font-weight: 600;
  border-radius: 4px;
  padding: 0.08em 0.4em;
  margin-bottom: 0.4rem;
  border: 1px solid;
}
.project-tag.web { color: #0550ae; border-color: rgba(5,80,174,0.3); background: rgba(5,80,174,0.07); }
.project-tag.test { color: #8250df; border-color: rgba(130,80,223,0.3); background: rgba(130,80,223,0.07); }
.project-tag.agent { color: #1f883d; border-color: rgba(31,136,61,0.3); background: rgba(31,136,61,0.07); }
.project-tag.prod { color: #9e6a03; border-color: rgba(158,106,3,0.3); background: rgba(158,106,3,0.07); }
.project-name {
  font-weight: 700;
  font-size: 1em;
  color: var(--gh-fg);
  margin: 0 0 0.35rem;
}
.project-desc {
  font-size: 0.85em;
  color: var(--gh-muted);
  line-height: 1.55;
  margin: 0;
}

@media (max-width: 900px) {
  .project-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .project-grid { grid-template-columns: 1fr; }
}
</style>
