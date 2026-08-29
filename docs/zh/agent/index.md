# Agent 工程基础 · 课程导学

本课程共 **32 章**，打通构建生产级 AI 应用的六大基石，每一部分都严格对照权威源编写：

| 模块 | 章节 | 权威来源 |
|---|---|---|
| Harness 工程基础 | 01–06 | [walkinglabs/learn-harness-engineering](https://walkinglabs.github.io/learn-harness-engineering/en/)、OpenAI、Anthropic 官方文档 |
| 提示工程 | 07–15 | [Prompt Engineering Guide](https://www.promptingguide.ai/) |
| MCP 协议 | 16–21 | Anthropic 官方 [modelcontextprotocol](https://github.com/modelcontextprotocol) |
| Agent Skills | 22–25 | Anthropic 官方 [anthropics/skills](https://github.com/anthropics/skills) |
| Loop Engineering | 26–29 | [cobusgreyling/loop-engineering](https://github.com/cobusgreyling/loop-engineering) |
| AGENTS.md 与综合实战 | 30–32 | [agentsmd/agents.md](https://github.com/agentsmd/agents.md) |

## 你将学到什么

- **Harness 工程基础（01–06）**：强模型为何仍会失败、五子系统模型、仓库即记录、长任务连续性、控制机制、可观测性；
- **提示工程（07–15）**：从提示基本要素到 Few-shot、思维链、ReAct、ToT、RAG 增强，以及对抗攻击防御；
- **MCP 协议（16–21）**：Model Context Protocol 架构、Tools/Resources/Prompts 三大原语、传输层生命周期，动手用 Python SDK 写 Server 并接入客户端；
- **Agent Skills（22–25）**：SKILL.md 标准结构、渐进披露机制，编写高质量技能、团队治理，以及 mattpocock/skills · obra/superpowers · OpenSpec 三大仓库对比；
- **Loop Engineering（26–29）**：「停止提示，设计循环」——五大积木+Memory、七大生产循环模式、L1–L3 自主等级、Loop Ready 评分与失败模式；
- **AGENTS.md 与综合实战（30–32）**：「给智能体的 README」开放标准、嵌套优先级，把 Prompt/Harness/MCP/Skills/Loop 五件套串成完整工作流。


## 官方参考源

本课程严格对照以下权威文档编写：

| 来源 | 链接 |
|---|---|
| www.promptingguide.ai | [https://www.promptingguide.ai/](https://www.promptingguide.ai/) |
| walkinglabs.github.io | [https://walkinglabs.github.io/learn-harness-engineering/en/](https://walkinglabs.github.io/learn-harness-engineering/en/) |
| github.com | [https://github.com/modelcontextprotocol](https://github.com/modelcontextprotocol) |
| github.com | [https://github.com/anthropics/skills](https://github.com/anthropics/skills) |
| github.com | [https://github.com/cobusgreyling/loop-engineering](https://github.com/cobusgreyling/loop-engineering) |
| github.com | [https://github.com/agentsmd/agents.md](https://github.com/agentsmd/agents.md) |

内容版本基准：**多源综合**


## 学习前提

- Python 基础；MCP 实战章节需要 Python 3.10+；
- 有一个 LLM API Key（配合本站 [FastAPI](/zh/fastapi/) / [Agno](/zh/agno/) 课程效果更佳）。

## 与其他课程的关系

本课程是「原理与协议层」，与本站框架课程互补：[Agno](/zh/agno/) 和 [CrewAI](/zh/crewai/) 教你用框架造智能体，这门课教你底层的提示设计、工具协议、能力封装与运行循环。

👉 从 [第 1 章](./ch01) 开始。
