# AGENTS.md — AI 助手协作规范

本项目是 **AI 工程与智能体教程站**（VitePress 静态站点），维护 17 门课程、中文 + 英文双语言内容。

---

## 一、语言约定（Anchor）

所有对用户的回答、解释、说明、commit 信息、PR 描述，一律使用**中文**。

- 代码本身保持英文（含变量名、字符串、注释）。
- 代码块外的说明文字用中文。
- 技术术语有公认英文写法的可保留（`VitePress`、`frontmatter`、`Pydantic` 等）。

---

## 二、多语言内容同步（Sync）

项目有 `docs/`（中文）和 `docs/en/`（英文）两套目录。**新增或修改内容时必须同步维护两份**，除非该课程明确只更新中文版。

| 课程 | 中文 | 英文 | 状态 |
|---|---|---|---|
| agno | 28 章 | 28 章 | ✅ 已完成 |
| pytest | 21 章 | 21 章 | ✅ 已完成 |
| http | 21 章 | 21 章 | ✅ 已完成 |
| agent-prod | 24 章 | 24 章 | ✅ 已完成 |
| agent / ai-sdk / claude-code / crewai / fastapi / firstmate / flue / hands-on-llm / locust / mastra / pi / pi-agent / playwright | 若干 | 无 | 🔄 待翻译 |

修改已有课程时：
1. 先改中文原文（`docs/<课程>/`）；
2. 再将改动同步到英文版（`docs/en/<课程>/`）；
3. 若英文版尚无该文件，标注为"待翻译"而非跳过——在 commit 信息中说明。

---

## 三、构建与预览

```bash
npm run dev        # 本地开发服务器（http://localhost:5173），无需确认
npm run build      # 生产构建，输出至 docs/.vitepress/dist
npm run preview    # 本地预览构建产物
```

构建失败时（`.md` 中有 JS 语法错误，如 quiz `<script setup>` 内的引号不匹配），**先定位错误文件再修复**，不要盲目回滚。

---

## 四、部署门禁（Gate）

**任何推送到线上环境的操作都必须先获得用户明确确认**，包括：

- `npm run deploy:cf`（Cloudflare Pages）
- `npx vercel --prod`（Vercel）
- `git push origin main`（触发自动部署）
- 任何会覆盖 `docs/.vitepress/dist` 的命令

操作前必须展示：
1. 将要执行的命令；
2. 影响范围（哪个站点、哪个分支）；
3. 预期结果。

本地预览（`npm run dev` / `npm run preview`）不需要确认，但需说明用途。

---

## 五、文件操作边界

- **不删除**用户未明确要求删除的任何 `.md`、配置或资源文件。
- **不升级**依赖（`package.json` / `package-lock.json`）——先说明版本变化和影响，等用户确认后再执行。
- 密钥、token 等敏感信息走 `.env`，绝不写入代码或提交记录。

---

## 六、改动较大的工作流

当任务涉及以下任一情况时，**先输出方案概要，获认可后再动手**：

- 新增一门课程（创建目录结构 + 导航配置）
- 修改 `.vitepress/config.mts`（影响全局导航/侧边栏）
- 大规模翻译或重构（超过 5 个文件）
- 引入新组件或第三方依赖

小改动（单文件修 typo、调整间距、修正一处链接）可直接执行并说明。

---

## 七、提交规范

```
类型: 简述
```

类型可选：`文档` / `翻译` / `修复` / `重构` / `配置` / ` chore`

示例：
- `翻译: agno ch11-ch20 英文完成`
- `修复: ch25 quiz 引号不匹配导致构建失败`
- `文档: 更新部署指南`
