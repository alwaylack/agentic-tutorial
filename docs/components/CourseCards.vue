<script setup>
const categories = [
  {
    id: 'web-test',
    icon: '🌐',
    title: 'Web 与测试基础',
    desc: '从 HTTP 协议到功能、E2E 与性能测试，再到生产级 Web 框架',
    courses: [
      { icon: '🌐', name: 'HTTP 请求', chapters: 20, desc: 'requests 与 httpx：同步/异步、HTTP/2、测试集成', link: '/http/' },
      { icon: '✅', name: 'pytest', chapters: 20, desc: 'pytest 9：fixture、参数化、插件开发到 CI 治理', link: '/pytest/' },
      { icon: '🎭', name: 'Playwright', chapters: 22, desc: 'E2E 测试：自动等待、网络 Mock、POM 到无障碍', link: '/playwright/' },
      { icon: '🔥', name: 'Locust', chapters: 20, desc: '性能压测：HttpUser、分布式、Docker/K8s 到 CI/CD', link: '/locust/' },
      { icon: '🚀', name: 'FastAPI', chapters: 22, desc: '官方文档全主题：依赖注入、OAuth2 到生产部署', link: '/fastapi/' }
    ]
  },
  {
    id: 'agent-framework',
    icon: '🤖',
    title: '智能体开发框架',
    desc: 'Python 与 TypeScript 双栈主流框架，从单 Agent 到多智能体系统',
    courses: [
      { icon: '🤖', name: 'Agno', chapters: 24, desc: 'Agno 2：工具、RAG、Team、Workflow 与 AgentOS', link: '/agno/' },
      { icon: '👥', name: 'CrewAI', chapters: 25, desc: '多智能体协作：角色设计、Flow 工作流与评估部署', link: '/crewai/' },
      { icon: '🌀', name: 'Mastra', chapters: 20, desc: 'TS 全栈 AI 框架：Workflow 图引擎、Memory、RAG、Evals', link: '/mastra/' },
      { icon: '🪄', name: 'Flue', chapters: 18, desc: "可编程 Harness：'use agent' 函数式、Skills、Sandboxes", link: '/flue/' },
      { icon: '⚙️', name: 'Pi Agent 开发', chapters: 20, desc: 'pi-agent-core + pi-ai：工具调用、事件流与会话持久化', link: '/pi-agent/' }
    ]
  },
  {
    id: 'ai-engineering',
    icon: '🧠',
    title: 'AI 助手与工程方法',
    desc: '驾驭 AI 编码助手，掌握超越具体框架的通用工程方法论',
    courses: [
      { icon: '🛠️', name: 'Agent 工程', chapters: 32, desc: '六大基石：Prompt、Harness、MCP、Skills、AGENTS.md、Loop', link: '/agent/' },
      { icon: '🧠', name: 'Claude Code', chapters: 21, desc: 'AI 编码助手：CLAUDE.md、MCP、Skills、Hooks 到团队工程化', link: '/claude-code/' },
      { icon: '🧩', name: 'Pi', chapters: 21, desc: '可扩展编码智能体：会话管理、技能扩展与多会话协作', link: '/pi/' }
    ]
  }
]
</script>

<template>
  <div class="course-groups">
    <section v-for="g in categories" :key="g.id" class="group">
      <div class="group-head">
        <h2 class="group-title">
          <span class="group-icon">{{ g.icon }}</span>
          {{ g.title }}
          <span class="group-count">{{ g.courses.length }} 门</span>
        </h2>
        <p class="group-desc">{{ g.desc }}</p>
      </div>
      <div class="grid">
        <a v-for="c in g.courses" :key="c.name" :href="c.link" class="card">
          <div class="card-head">
            <span class="icon">{{ c.icon }}</span>
            <span class="name">{{ c.name }}</span>
            <span class="chapters">{{ c.chapters }} 章</span>
          </div>
          <p class="desc">{{ c.desc }}</p>
          <span class="cta">开始学习 →</span>
        </a>
      </div>
    </section>
  </div>
</template>

<style scoped>
.course-groups {
  max-width: 1152px;
  margin: 0 auto;
  padding: 8px 24px 24px;
}
.group {
  margin-bottom: 36px;
}
.group:last-child {
  margin-bottom: 0;
}
.group-head {
  margin-bottom: 14px;
}
.group-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 4px;
  font-size: 1.35em;
  font-weight: 700;
  color: var(--gh-fg);
  border: none;
  padding: 0;
}
.group-icon {
  font-size: 1.15em;
}
.group-count {
  font-size: 0.6em;
  font-weight: 600;
  color: var(--gh-accent);
  background: var(--gh-canvas-subtle);
  border: 1px solid var(--gh-border);
  border-radius: 10px;
  padding: 2px 10px;
}
.group-desc {
  margin: 0;
  color: var(--gh-muted);
  font-size: 0.92em;
}
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
@media (max-width: 1279px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 767px) {
  .grid { grid-template-columns: 1fr; }
}
.card {
  display: flex;
  flex-direction: column;
  background: var(--gh-canvas-subtle);
  border: 1px solid var(--gh-border);
  border-radius: 8px;
  padding: 16px 18px 14px;
  text-decoration: none !important;
  transition: border-color 0.25s, box-shadow 0.25s;
}
.card:hover {
  border-color: var(--gh-accent);
  box-shadow: 0 4px 14px rgba(9, 105, 218, 0.10);
}
.card > * {
  pointer-events: none;
}
.card-head {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}
.icon {
  font-size: 1.4em;
}
.name {
  font-weight: 700;
  font-size: 1.05em;
  color: var(--gh-fg);
}
.chapters {
  margin-left: auto;
  font-size: 0.78em;
  font-weight: 600;
  color: var(--gh-muted);
  background: var(--gh-canvas-default);
  border: 1px solid var(--gh-border);
  border-radius: 10px;
  padding: 1px 8px;
  white-space: nowrap;
}
.desc {
  flex: 1;
  margin: 0 0 10px;
  min-height: 3.2em;
  color: var(--gh-muted);
  font-size: 0.9em;
  line-height: 1.6;
  transition: color 0.25s;
}
.card:hover .desc {
  color: var(--gh-accent);
}
.cta {
  font-size: 0.86em;
  font-weight: 600;
  color: #1f883d;
}
</style>
