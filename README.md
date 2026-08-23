# 📚 编程进阶教程站

[![Cloudflare Pages](https://img.shields.io/badge/☁️_Cloudflare_Pages-agentic--tutorial.pages.dev-F38020?style=for-the-badge)](https://agentic-tutorial.pages.dev)
[![Vercel](https://img.shields.io/badge/▲_Vercel-agentic--tutorial.vercel.app-000000?style=for-the-badge)](https://agentic-tutorial.vercel.app)

从 0 基础到生产实践的**十三套系统教程**（中文），基于各项目**最新官方文档**编写。

仓库：[alwaylack/agentic-tutorial](https://github.com/alwaylack/agentic-tutorial)

## 课程总览

| 课程 | 章节数 | 版本基准 | 说明 |
|---|---|---|---|
| [HTTP 请求](docs/http/index.md) | 20 章 | requests 2.34 / httpx 0.28 | 同步/异步、HTTP/2、认证、测试集成 |
| [pytest](docs/pytest/index.md) | 20 章 | pytest 9.x | 断言/fixture/参数化/插件开发/CI 治理 |
| [Playwright](docs/playwright/index.md) | 22 章 | Playwright 1.62 (Python) | 定位器/自动等待/网络 Mock/POM/Sharding/无障碍 |
| [Locust](docs/locust/index.md) | 20 章 | Locust 2.46 | HttpUser/TaskSet/分布式/Docker/K8s/asyncio 压测 |
| [FastAPI](docs/fastapi/index.md) | 22 章 | FastAPI 0.141+ | 依赖注入/OAuth2/数据库/WebSocket/部署 |
| [Agno](docs/agno/index.md) | 24 章 | Agno 2.9 | Agent/工具/RAG/Team/Workflow/AgentOS |
| [CrewAI](docs/crewai/index.md) | 25 章 | CrewAI 1.15 | Agent/Task/Crew/Flow/记忆/MCP/评估 |
| [Agent 工程](docs/agent/index.md) | 32 章 | — | PromptingGuide/Harness/MCP/Skills/AGENTS.md/Loop 六大基石 |
| [Claude Code](docs/claude-code/index.md) | 21 章 | Claude Code 2.1.x | CLAUDE.md/MCP/Skills/Hooks/SDK + 近期新特性 |
| [Pi](docs/pi/index.md) | 21 章 | pi 0.84.x | 会话管理/技能扩展/SDK/RPC/pi-intercom 与 pi-messenger 多会话协作 |
| [Pi Agent 开发](docs/pi-agent/index.md) | 20 章 | pi-agent-core / pi-ai | 统一 LLM API/工具调用/事件流/Provider/会话持久化 |
| [Flue](docs/flue/index.md) | 18 章 | @flue/runtime | 函数式 Harness/Tools/Skills/Sandboxes/Durability/Channels |
| [Mastra](docs/mastra/index.md) | 20 章 | @mastra/core (TS) | Workflow 图引擎/Memory/RAG/MCP/Evals/部署 |

**共 285 章。**

每章包含：文字讲解 + 可运行示例代码 + **4 道交互式随堂测验**（答错展示正确答案与原因）+ **3 道动手实践题**。

> Agno / CrewAI 全部示例统一使用 **OpenAI 兼容三方模型**（DeepSeek 为例，可替换为任意兼容端点）。

## 推荐学习路线

| 方向 | 路线 |
|---|---|
| 🌐 Web 开发 | HTTP 请求 → FastAPI → Playwright |
| ✅ 测试工程 | pytest → Playwright → Locust |
| 🤖 智能体开发 | Agent 工程 → Agno → CrewAI → Pi → Pi Agent 开发 → Claude Code → Flue → Mastra |

## 本地开发

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # 产物在 docs/.vitepress/dist
npm run preview
```

## 部署

详细步骤见 [DEPLOY.md](DEPLOY.md)。支持 Vercel 与 Cloudflare Pages 双平台：

### Vercel

1. 在 [vercel.com](https://vercel.com) 导入本仓库，自动读取 `vercel.json` 直接 Deploy；
2. 或 CLI：`npx vercel --prod`

### Cloudflare Pages

1. 在 [dash.cloudflare.com](https://dash.cloudflare.com) → Workers & Pages → Pages → Connect to Git；
   Framework preset 选 **VitePress**（或 None 并手动填写 Build command `npm run build`、Output directory `docs/.vitepress/dist`）
2. 或 CLI：`npx wrangler login && npm run deploy:cf`

每次推送到 `main` 分支，两个平台均会自动重新部署。

## 技术栈

- [VitePress](https://vitepress.dev) 静态站点 + 自定义 **GitHub Light** 主题
- 交互测验组件 `Quiz.vue`、响应式课程轮播 `CourseCards.vue`
- 右上角实时 GitHub Star 徽章 `NavGitHubStars.vue`
