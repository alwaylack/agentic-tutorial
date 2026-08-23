<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const courses = [
  { icon: '🌐', name: 'HTTP 请求', desc: '20 章掌握 requests 与 httpx：同步/异步、HTTP/2、测试集成与生产实践', link: '/http/', cta: '开始学习' },
  { icon: '✅', name: 'pytest', desc: '20 章吃透 pytest 9：fixture、参数化、插件开发到 CI 测试治理', link: '/pytest/', cta: '开始学习' },
  { icon: '🎭', name: 'Playwright', desc: '22 章搞定 E2E 测试：自动等待、网络 Mock、POM 到无障碍与 CI', link: '/playwright/', cta: '开始学习' },
  { icon: '🔥', name: 'Locust', desc: '20 章掌握性能压测：HttpUser、分布式、Docker/K8s 到 CI/CD 集成', link: '/locust/', cta: '开始学习' },
  { icon: '🚀', name: 'FastAPI', desc: '22 章覆盖官方文档全主题：Pydantic 校验、依赖注入、OAuth2 安全到生产部署', link: '/fastapi/', cta: '开始学习' },
  { icon: '🤖', name: 'Agno', desc: '27 章玩转 Agno 2 智能体：工具、RAG、Team、Workflow、AgentOS 与数据分析实战：工具、RAG、Team、Workflow 与 AgentOS', link: '/agno/', cta: '开始学习' },
  { icon: '👥', name: 'CrewAI', desc: '26 章精通 CrewAI 多智能体：角色设计、Flow 工作流与评估部署', link: '/crewai/', cta: '开始学习' },
  { icon: '🛠️', name: 'Agent 工程', desc: '32 章打通 Prompt、Harness、MCP、Skills、AGENTS.md 与 Loop Engineering 六大基石', link: '/agent/', cta: '开始学习' },
  { icon: '🧠', name: 'Claude Code', desc: '20 章驾驭 AI 编码助手：CLAUDE.md、MCP、Skills、Hooks 到团队工程化', link: '/claude-code/', cta: '开始学习' },
  { icon: '🧩', name: 'Pi', desc: '21 章定制你的编码智能体：会话管理、技能扩展与多会话协作', link: '/pi/', cta: '开始学习' },
  { icon: '⚙️', name: 'Pi Agent 开发', desc: '21 章用 pi-agent-core 与 pi-ai 构建生产级智能体：工具调用、事件流与会话持久化', link: '/pi-agent/', cta: '开始学习' },
  { icon: '🪄', name: 'Flue', desc: '19 章掌握可编程 Agent Harness：use agent 函数式写法、Skills、Sandboxes 与多云部署', link: '/flue/', cta: '开始学习' },
  { icon: '🌀', name: 'Mastra', desc: '21 章掌握 TypeScript AI 框架：Workflow 图引擎、Memory、RAG、Evals 与部署', link: '/mastra/', cta: '开始学习' }
]

const innerWidth = ref(1200)
const current = ref(0)
let timer = null
let hovering = false

function updateWidth() {
  if (typeof window !== 'undefined') innerWidth.value = window.innerWidth
}

const visible = computed(() => {
  if (innerWidth.value >= 1280) return 3
  if (innerWidth.value >= 768) return 2
  return 1
})

const maxIndex = computed(() => courses.length - visible.value)

// 轮动：到尾部回到开头
function next() {
  if (!hovering) current.value = current.value >= maxIndex.value ? 0 : current.value + 1
}

onMounted(() => {
  updateWidth()
  window.addEventListener('resize', updateWidth)
  timer = setInterval(next, 3500)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth)
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div
    class="carousel"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <div class="viewport">
      <div
        class="track"
        :style="{ transform: `translateX(-${current * (100 / visible)}%)` }"
      >
        <a
          v-for="c in courses"
          :key="c.name"
          :href="c.link"
          class="card"
          :style="{ width: `${100 / visible}%` }"
        >
          <div class="card-head">
            <span class="icon">{{ c.icon }}</span>
            <span class="name">{{ c.name }}</span>
          </div>
          <p class="desc">{{ c.desc }}</p>
          <span class="cta">{{ c.cta }} →</span>
        </a>
      </div>
    </div>
    <div class="dots">
      <button
        v-for="(c, i) in courses.slice(0, maxIndex + 1)"
        :key="i"
        :class="['dot', { active: i === current }]"
        :aria-label="'切换到 ' + c.name"
        @click="current = i"
      />
    </div>
  </div>
</template>

<style scoped>
.carousel {
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 24px 12px;
}
.viewport {
  overflow: hidden;
  border-radius: 8px;
}
.track {
  display: flex;
  transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.35, 1);
}
.card {
  flex-shrink: 0;
  display: block;
  /* 左右内边距即卡片间距（相邻卡片各贡献一半，视觉间隔 48px） */
  padding: 12px 24px;
  box-sizing: border-box;
  text-decoration: none !important;
}
.card:hover .desc {
  color: var(--gh-accent);
}
.card > * {
  pointer-events: none;
}
.card {
  background: var(--gh-canvas-subtle);
  border: 1px solid var(--gh-border);
  border-radius: 8px;
  padding: 18px 20px 16px;
  height: 100%;
  transition: border-color 0.25s, box-shadow 0.25s;
}
.card:hover {
  border-color: var(--gh-accent);
  box-shadow: 0 4px 14px rgba(9, 105, 218, 0.10);
}
.card-head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}
.icon {
  font-size: 1.5em;
}
.name {
  font-weight: 700;
  font-size: 1.08em;
  color: var(--gh-fg);
}
.desc {
  margin: 0 0 10px;
  min-height: 3.2em;
  color: var(--gh-muted);
  font-size: 0.92em;
  line-height: 1.6;
  transition: color 0.25s;
}
.cta {
  font-size: 0.88em;
  font-weight: 600;
  color: #1f883d;
}
.dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  padding-top: 6px;
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: var(--gh-border);
  cursor: pointer;
  padding: 0;
  transition: background 0.25s, width 0.25s;
}
.dot.active {
  background: var(--gh-accent);
  width: 20px;
  border-radius: 4px;
}
</style>
