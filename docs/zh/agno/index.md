# Agno 教程 · 课程导学

本课程基于 **Agno 3.x 官方文档**编写，共 **28 章**，从零基础到 AgentOS 生产部署。

## 模型接入约定

按课程要求，所有示例均使用 **OpenAI 兼容的三方模型**（以 DeepSeek 为例，OpenRouter/通义/Kimi 等同理）：

```python
from agno.agent import Agent
from agno.models.openai import OpenAIChat

agent = Agent(
    model=OpenAIChat(
        id="deepseek-chat",
        api_key="sk-xxx",
        base_url="https://api.deepseek.com/v1",
    ),
)
```

::: tip
Agno 也提供 `agno.models.openai.like.OpenAILike` 类，专用于任意 OpenAI 兼容端点，效果等同。
:::

## 你将学到什么

| 阶段 | 章节 | 内容 |
|---|---|---|
| 入门 | 01–06 | Agno 架构、第一个 Agent、RunOutput、流式输出、结构化输出、Prompt 设计 |
| 协作与编排 | 07–12 | 工具与 Toolkit、Agent Team、Workflow 步骤编排 |
| 数据与记忆 | 13–18 | 多模态、会话状态、存储、用户记忆、知识库 RAG |
| 模型进阶与扩展 | 19–20 | Reasoning 思考模型、Skills 技能包 |
| 安全与生态 | 21–22 | 人机协同 Guardrails、MCP 协议集成 |
| 生产实践 | 23–25 | AgentOS 服务化、可观测性、性能优化与生产部署 |
| 综合实战 | 26–28 | 三大实战：智能数据分析助手 / 多源研究 Team / 客服知识库上线 AgentOS |

> 章节顺序对照 [docs.agno.com](https://docs.agno.com/) 官方文档导航编排：Agents → Tools → Teams → Workflows → Multimodal & Sessions → Storage → Memory → Knowledge → Models → Skills → 安全 → 生产。


## 官方参考源

本课程严格对照以下权威文档编写：

| 来源 | 链接 |
|---|---|
| docs.agno.com | [https://docs.agno.com/](https://docs.agno.com/) |
| github.com | [https://github.com/agno-agi/agno](https://github.com/agno-agi/agno) |

内容版本基准：**Agno 3.x**（agno 3.0.1）


## 学习前提

- Python 基础 + 了解 Pydantic（本站 [FastAPI 教程](/zh/fastapi/) 第 4 章可快速补齐）；
- 一个三方模型的 API Key。

👉 从 [第 1 章](./ch01) 开始。
