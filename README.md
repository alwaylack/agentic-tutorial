# Python 进阶教程站

从 0 基础到生产实践的六套系统教程（中文），基于各项目**最新官方文档**编写：

| 课程 | 章节数 | 版本基准 | 说明 |
|---|---|---|---|
| [pytest](docs/pytest/index.md) | 20 章 | pytest 9.x | 断言/fixture/参数化/插件开发/异步测试/CI 治理 |
| [FastAPI](docs/fastapi/index.md) | 22 章 | FastAPI 0.141+ | 官方文档全主题：依赖注入/OAuth2/数据库/WebSocket/部署 |
| [Agno](docs/agno/index.md) | 24 章 | Agno 2.9 | Agent/工具/RAG/Team/Workflow/AgentOS |
| [CrewAI](docs/crewai/index.md) | 25 章 | CrewAI 1.15 | Agent/Task/Crew/Flow/记忆/MCP/评估/部署 |
| [Playwright](docs/playwright/index.md) | 22 章 | Playwright 1.62 (Python) | 定位器/自动等待/网络 Mock/认证复用/POM/Sharding/CI/无障碍 |
| [HTTP 请求](docs/http/index.md) | 20 章 |
| [Locust](docs/locust/index.md) | 20 章 |
| [Claude Code](docs/claude-code/index.md) | 20 章 |
| [Agent 工程](docs/agent/index.md) | 32 章 |
| [HTTP 请求](docs/http/index.md) | 20 章 |
| [Pi](docs/pi/index.md) | 20 章 | pi 0.84.x | 会话与上下文/技能与扩展开发/SDK/RPC/包生态 |

每章包含：文字讲解 + 可运行示例代码 + **4 道交互式随堂测验**（答错展示正确答案与原因）+ **3 道动手实践题**。

Agno / CrewAI 全部示例统一使用 **OpenAI 兼容三方模型**（DeepSeek 为例，可替换为任意兼容端点）。

## 本地开发

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # 产物在 docs/.vitepress/dist
npm run preview
```

## 部署到 Vercel

方式一（推荐，Git 集成）：

1. 把本目录推送到 GitHub 仓库；
2. 在 [vercel.com](https://vercel.com) → Add New → Project → 导入该仓库；
3. Vercel 会通过 `vercel.json` 自动识别（构建命令 `npm run build`，产物目录 `docs/.vitepress/dist`），直接 Deploy 即可。

方式二（CLI）：

```bash
npm i -g vercel
vercel          # 预览部署
vercel --prod   # 生产部署
```

## 技术栈

- [VitePress](https://vitepress.dev) 静态站点 + 自定义 **GitHub Light** 主题（`docs/.vitepress/theme/github-light.css`）
- 交互测验组件：`docs/components/Quiz.vue`（Vue 3，全局注册）
