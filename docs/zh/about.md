---
title: 关于本教程站
description: 十七套系统教程、371 章内容，覆盖 Web 基础到 AI 智能体生产部署
---

# 关于 AI 工程与智能体教程站

本教程站提供 <Badge type="warning" text="17 套系统教程" /> <Badge type="info" text="371 章" /> 内容，覆盖从 Web 基础到 AI 智能体生产部署的完整学习路径。每章配有可运行示例代码、4 道随堂测验和 3 道动手实践题。

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
<tr><td>Agno</td><td>Agno 3.x</td></tr>
<tr><td>CrewAI</td><td>CrewAI 1.15</td></tr>
<tr><td>Agent 工程</td><td>PromptingGuide + Harness + MCP + Skills + Loop + AGENTS.md</td></tr>
<tr><td>Claude Code</td><td>Claude Code 2.1.x</td></tr>
<tr><td>Pi</td><td>Pi 0.84.x</td></tr>
<tr><td>Pi Agent 开发</td><td>pi-agent-core + pi-ai + pi-telemetry + pi-tui（最新 main）</td></tr>
<tr><td>Flue</td><td>@flue/runtime 2.0.3</td></tr>
<tr><td>Mastra</td><td>@mastra/core（最新）</td></tr>
<tr><td>FirstMate</td><td>firstmate 最新 main（AGENTS.md + docs/）</td></tr>
<tr><td>Hands-On LLM</td><td>O'Reilly《Hands-On Large Language Models》配套仓库 main</td></tr>
<tr><td>Vercel AI SDK</td><td>ai-sdk.dev v7 最新文档 + Cookbook</td></tr>
<tr><td>Agent 工程实战</td><td>LangGraph 1.2 + Deep Agents + AWS ECS/SQS/DynamoDB</td></tr>
</tbody>
</table>
</div>

## 推荐学习路线

<div class="roadmap">

<div class="roadmap-category">
  <div class="roadmap-category-header" style="--cat-color: #0550ae;">
    <span class="roadmap-cat-icon">🌐</span>
    <span class="roadmap-cat-label">Web 开发</span>
  </div>
  <div class="roadmap-path">
    <div class="roadmap-node">HTTP 请求</div>
    <div class="roadmap-arrow">→</div>
    <div class="roadmap-node">FastAPI</div>
    <div class="roadmap-arrow">→</div>
    <div class="roadmap-node">Playwright</div>
  </div>
  <p class="roadmap-desc">从网络基础到全栈 API，再到 E2E 自动化测试，覆盖 Web 应用完整生命周期。</p>
</div>

<div class="roadmap-category">
  <div class="roadmap-category-header" style="--cat-color: #8250df;">
    <span class="roadmap-cat-icon">✅</span>
    <span class="roadmap-cat-label">测试工程</span>
  </div>
  <div class="roadmap-path">
    <div class="roadmap-node">pytest</div>
    <div class="roadmap-arrow">→</div>
    <div class="roadmap-node">Playwright</div>
    <div class="roadmap-arrow">→</div>
    <div class="roadmap-node">Locust</div>
    <div class="roadmap-arrow">→</div>
    <div class="roadmap-node">Pi Agent 开发</div>
  </div>
  <p class="roadmap-desc">从单元测试到 E2E 压测，再到测试智能体全流程自动化，打造质量保障闭环。</p>
</div>

<div class="roadmap-category">
  <div class="roadmap-category-header" style="--cat-color: #1f883d;">
    <span class="roadmap-cat-icon">🐍</span>
    <span class="roadmap-cat-label">Python 智能体</span>
  </div>
  <div class="roadmap-path">
    <div class="roadmap-node">Agent 工程</div>
    <div class="roadmap-arrow">→</div>
    <div class="roadmap-node">Agno</div>
    <div class="roadmap-arrow">→</div>
    <div class="roadmap-node">CrewAI</div>
    <div class="roadmap-arrow">→</div>
    <div class="roadmap-node">Claude Code</div>
  </div>
  <p class="roadmap-desc">从 Harness/MCP 基础到多 Agent 框架，再到 AI 编码助手，深入 Python Agent 生态。</p>
</div>

<div class="roadmap-category">
  <div class="roadmap-category-header" style="--cat-color: #9e6a03;">
    <span class="roadmap-cat-icon">🟦</span>
    <span class="roadmap-cat-label">TypeScript 智能体</span>
  </div>
  <div class="roadmap-path">
    <div class="roadmap-node">Agent 工程</div>
    <div class="roadmap-arrow">→</div>
    <div class="roadmap-node">Mastra</div>
    <div class="roadmap-arrow">→</div>
    <div class="roadmap-node">Flue</div>
    <div class="roadmap-arrow">→</div>
    <div class="roadmap-node">Pi Agent 开发</div>
  </div>
  <p class="roadmap-desc">从 Agent 设计模式到 TS 框架实战，结合 FirstMate 舰队编排，掌握企业级 Agent 工程。</p>
</div>

<div class="roadmap-category">
  <div class="roadmap-category-header" style="--cat-color: #1f883d;">
    <span class="roadmap-cat-icon">☁️</span>
    <span class="roadmap-cat-label">AI 生产部署</span>
  </div>
  <div class="roadmap-path">
    <div class="roadmap-node">Agent 工程</div>
    <div class="roadmap-arrow">→</div>
    <div class="roadmap-node">Agent 工程实战</div>
  </div>
  <p class="roadmap-desc">从 LangGraph 工作流到 Deep Agents 审批与上下文工程，最终落地 AWS ECS/SQS 生产部署。</p>
</div>

<div class="roadmap-category">
  <div class="roadmap-category-header" style="--cat-color: #9e6a03;">
    <span class="roadmap-cat-icon">🔬</span>
    <span class="roadmap-cat-label">LLM 应用开发</span>
  </div>
  <div class="roadmap-path">
    <div class="roadmap-node">Vercel AI SDK</div>
    <div class="roadmap-arrow">→</div>
    <div class="roadmap-node">Agent 工程实战</div>
    <div class="roadmap-arrow">→</div>
    <div class="roadmap-node">Hands-On LLM</div>
  </div>
  <p class="roadmap-desc">从多网关兼容的 LLM 调用层到生产级 Agent 系统，再到微调与推理实践。</p>
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
  margin: 1rem 0 3rem;
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

/* 路线图 */
.roadmap {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1.5rem;
}
.roadmap-category {
  background: var(--gh-canvas-subtle);
  border: 1px solid var(--gh-border);
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  border-left: 4px solid var(--cat-color, var(--gh-accent));
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
}
.roadmap-category:hover {
  border-color: var(--cat-color, var(--gh-accent));
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  transform: translateX(4px);
}
.roadmap-category-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.75rem;
}
.roadmap-cat-icon {
  font-size: 1.3em;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--cat-color, var(--gh-accent));
  border-radius: 8px;
  color: #fff;
}
.roadmap-cat-label {
  font-weight: 700;
  font-size: 1.05em;
  color: var(--cat-color, var(--gh-fg));
}
.roadmap-path {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 0.6rem;
  padding: 0.75rem 1rem;
  background: var(--gh-canvas);
  border: 1px solid var(--gh-border);
  border-radius: 8px;
}
.roadmap-node {
  display: inline-flex;
  align-items: center;
  padding: 0.3rem 0.7rem;
  background: var(--gh-canvas-subtle);
  border: 1px solid var(--gh-border);
  border-radius: 6px;
  font-size: 0.88em;
  font-weight: 600;
  color: var(--gh-fg);
  white-space: nowrap;
}
.roadmap-arrow {
  color: var(--gh-muted);
  font-size: 0.85em;
  font-weight: 700;
}
.roadmap-desc {
  font-size: 0.88em;
  color: var(--gh-muted);
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 640px) {
  .roadmap-path {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.3rem;
  }
  .roadmap-arrow {
    display: none;
  }
}
</style>
