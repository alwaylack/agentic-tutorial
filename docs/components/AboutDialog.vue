<script setup>
import { aboutState } from './aboutState'
</script>

<template>
  <Teleport to="body">
    <div v-if="aboutState.open" class="about-overlay" @click.self="aboutState.open = false">
      <div class="about-panel">
        <div class="about-header">
          <span class="about-title">📚 关于本教程站</span>
          <button class="about-close" @click="aboutState.open = false">✕</button>
        </div>

        <div class="about-body">
          <!-- 简介 -->
          <section class="about-section">
            <h3>课程总览</h3>
            <p class="about-intro">
              本教程站提供 <strong>17 套系统教程、369 章</strong>内容，覆盖从 Web 基础到 AI 智能体生产部署的完整学习路径。
              每章配有可运行示例代码、4 道随堂测验（答错展示解析）和 3 道动手实践。
            </p>
          </section>

          <!-- 版本基准表 -->
          <section class="about-section">
            <h3>各课程版本基准</h3>
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
          </section>

          <!-- 全课程实战一览 -->
          <section class="about-section">
            <h3>全课程实战项目一览</h3>
            <div class="project-grid">

              <div class="project-card">
                <span class="project-tag web">🌐 Web与测试</span>
                <div class="project-name">HTTP 请求 · ch20</div>
                <p class="project-desc">GitHub API 客户端：requests/httpx 全栈封装，含认证、限流、缓存与 CLI 工具</p>
              </div>

              <div class="project-card">
                <span class="project-tag test">✅ 测试工程</span>
                <div class="project-name">pytest · ch20</div>
                <p class="project-desc">CI 测试治理：fixture 工厂、参数化矩阵、覆盖率门禁与 pytest-xdist 并行跑测</p>
              </div>

              <div class="project-card">
                <span class="project-tag test">✅ 测试工程</span>
                <div class="project-name">Playwright · ch22</div>
                <p class="project-desc">E2E 策略与报告：Page Object 架构、多浏览器并行、trace viewer 与 CI 集成</p>
              </div>

              <div class="project-card">
                <span class="project-tag web">🌐 Web与测试</span>
                <div class="project-name">Locust · ch20</div>
                <p class="project-desc">全链路压测：HttpUser 分布式脚本、Web UI 实时监控、Docker/K8s 集群压测</p>
              </div>

              <div class="project-card">
                <span class="project-tag web">🌐 Web与测试</span>
                <div class="project-name">FastAPI · ch22</div>
                <p class="project-desc">生产部署实战：Docker 镜像优化、Uvicorn 多 worker、健康检查与滚动重启</p>
              </div>

              <div class="project-card">
                <span class="project-tag agent">🤖 智能体框架</span>
                <div class="project-name">Agno · ch25-27</div>
                <p class="project-desc">三实战：智能数据分析助手（工具→图表→Workflow）· 多源研究助手 Team · 客服知识库 Agent 上线 AgentOS</p>
              </div>

              <div class="project-card">
                <span class="project-tag agent">🤖 智能体框架</span>
                <div class="project-name">CrewAI · ch23-25</div>
                <p class="project-desc">三实战：内容营销流水线 · 数据分析流水线 · 竞品监控情报 Crew（hierarchical + Flow）</p>
              </div>

              <div class="project-card">
                <span class="project-tag agent">🤖 智能体框架</span>
                <div class="project-name">Mastra · ch19-21</div>
                <p class="project-desc">三实战：生产级智能客服 Agent · 全栈 AI 应用（Workflow+RAG+Memory）· 数据问答 BI Agent</p>
              </div>

              <div class="project-card">
                <span class="project-tag agent">🤖 智能体框架</span>
                <div class="project-name">Flue · ch17-19</div>
                <p class="project-desc">三实战：GitHub 自动分诊 Agent · Slack 值班助手（Sandboxes隔离+多云部署）· 代码审查 Agent</p>
              </div>

              <div class="project-card">
                <span class="project-tag agent">🤖 智能体框架</span>
                <div class="project-name">FirstMate · ch16-18</div>
                <p class="project-desc">三实战：搭建个人开发舰队 · 多项目并行交付流水线 · Secondmate 远程舰队规模化运营</p>
              </div>

              <div class="project-card">
                <span class="project-tag agent">🤖 智能体框架</span>
                <div class="project-name">Pi Agent 开发 · ch21-23</div>
                <p class="project-desc">三实战：测试智能体全流程（需求→用例→接口自动化）· 执行与报告 · CI 集成与定时回归巡检</p>
              </div>

              <div class="project-card">
                <span class="project-tag prod">🧠 AI生产部署</span>
                <div class="project-name">Vercel AI SDK · ch20-22</div>
                <p class="project-desc">三实战：语义搜索知识库问答（RAG）· 多代理客服工单系统 · 全栈流式聊天应用（多网关兼容）</p>
              </div>

              <div class="project-card">
                <span class="project-tag prod">🧠 AI生产部署</span>
                <div class="project-name">Agent 工程实战 · ch19-21</div>
                <p class="project-desc">三实战：RAG 知识库 Agent · 多代理工单处理系统 · 全栈 Agent 服务（端到端部署 AWS ECS/SQS）</p>
              </div>

            </div>
          </section>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.about-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}
.about-panel {
  background: var(--gh-canvas);
  border: 1px solid var(--gh-border);
  border-radius: 12px;
  width: 100%;
  max-width: 860px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 16px 48px rgba(0,0,0,0.18);
  overflow: hidden;
}
.about-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--gh-border);
  flex-shrink: 0;
}
.about-title {
  font-weight: 700;
  font-size: 1.1em;
  color: var(--gh-fg);
}
.about-close {
  background: none;
  border: 1px solid var(--gh-border);
  border-radius: 6px;
  padding: 0.2rem 0.55rem;
  cursor: pointer;
  color: var(--gh-muted);
  font-size: 0.88em;
  transition: background 0.15s, color 0.15s;
  font-family: inherit;
}
.about-close:hover {
  background: var(--gh-canvas-subtle);
  color: var(--gh-fg);
}
.about-body {
  overflow-y: auto;
  padding: 1.25rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.about-section h3 {
  font-size: 0.95em;
  font-weight: 700;
  color: var(--gh-fg);
  margin: 0 0 0.5rem;
  padding-bottom: 0.35rem;
  border-bottom: 1px solid var(--gh-border);
}
.about-intro {
  color: var(--gh-muted);
  font-size: 0.9em;
  line-height: 1.65;
  margin: 0;
}

/* 版本表 */
.version-table-wrap {
  max-height: 220px;
  overflow-y: auto;
  border: 1px solid var(--gh-border);
  border-radius: 6px;
}
.about-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.87em;
}
.about-table th {
  text-align: left;
  padding: 0.5rem 0.85rem;
  background: var(--gh-canvas-subtle);
  border-bottom: 2px solid var(--gh-border);
  color: var(--gh-fg);
  font-weight: 600;
  position: sticky;
  top: 0;
  white-space: nowrap;
}
.about-table td {
  padding: 0.38rem 0.85rem;
  border-bottom: 1px solid var(--gh-border);
  color: var(--gh-muted);
}
.about-table tr:last-child td { border-bottom: none; }
.about-table tr:hover td { background: var(--gh-canvas-subtle); }
.about-table td:first-child {
  font-weight: 600;
  color: var(--gh-fg);
  white-space: nowrap;
}

/* 实战项目卡片 */
.project-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 11px;
}
.project-card {
  background: var(--gh-canvas-subtle);
  border: 1px solid var(--gh-border);
  border-radius: 8px;
  padding: 0.8rem 0.95rem;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.project-card:hover {
  border-color: var(--gh-accent);
  box-shadow: 0 2px 10px rgba(9,105,218,0.10);
}
.project-tag {
  display: inline-block;
  font-size: 0.68em;
  font-weight: 600;
  border-radius: 4px;
  padding: 0.08em 0.38em;
  margin-bottom: 0.3rem;
  border: 1px solid;
}
.project-tag.web { color: #0550ae; border-color: rgba(5,80,174,0.3); background: rgba(5,80,174,0.07); }
.project-tag.test { color: #8250df; border-color: rgba(130,80,223,0.3); background: rgba(130,80,223,0.07); }
.project-tag.agent { color: #1f883d; border-color: rgba(31,136,61,0.3); background: rgba(31,136,61,0.07); }
.project-tag.prod { color: #9e6a03; border-color: rgba(158,106,3,0.3); background: rgba(158,106,3,0.07); }
.project-name {
  font-weight: 700;
  font-size: 0.88em;
  color: var(--gh-fg);
  margin: 0 0 0.25rem;
}
.project-desc {
  font-size: 0.8em;
  color: var(--gh-muted);
  line-height: 1.5;
  margin: 0;
}

@media (max-width: 640px) {
  .project-grid { grid-template-columns: 1fr; }
  .about-overlay { padding: 0.25rem; }
  .about-panel { max-height: 96vh; border-radius: 8px; }
}
</style>
