# Agno 教程 · 课程导学

本课程基于 **Agno 2.x 官方文档**编写，共 **25 章**，从零基础到 AgentOS 生产部署。

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
| 进阶 | 07–12 | 工具与 Toolkit、多模态、会话状态、存储、记忆 |
| 高级 | 13–19 | 知识库 RAG、推理模式、人机协同、MCP、Agent Team 协作 |
| 生产实践 | 20–24 | Workflow 编排、AgentOS 服务化、可观测性、性能优化与生产部署 |


## 官方参考源

本课程严格对照以下权威文档编写：

| 来源 | 链接 |
|---|---|
| docs.agno.com | [https://docs.agno.com/](https://docs.agno.com/) |
| github.com | [https://github.com/agno-agi/agno](https://github.com/agno-agi/agno) |

内容版本基准：**Agno 2.9**


## 学习前提

- Python 基础 + 了解 Pydantic（本站 [FastAPI 教程](/fastapi/) 第 4 章可快速补齐）；
- 一个三方模型的 API Key。

👉 从 [第 1 章](./ch01) 开始。
