# Agno Tutorial · 课程导学

 **Agno 3.x **， **28 **， AgentOS 。

## 模型接入约定

， **OpenAI **（ DeepSeek ，OpenRouter//Kimi ）：

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
Agno  `agno.models.openai.like.OpenAILike` ， OpenAI ，。
:::

## What You Will Learn

| Phase | Chapters | Content |
|---|---|---|
| Basics | 01–06 | Agno 架构、第一个 Agent、RunOutput、流式输出、结构化输出、Prompt 设计 |
|  | 07–12 |  Toolkit、Agent Team、Workflow  |
|  | 13–18 | 、、、、 RAG |
| 模型Advanced与扩展 | 19–20 | Reasoning 思考模型、Skills 技能包 |
|  | 21–22 |  Guardrails、MCP  |
| Production | 23–25 | AgentOS 服务化、可观测性、性能优化与生产部署 |
| Capstones | 26–28 | 三大实战：智能数据分析助手 / 多源研究 Team / 客服知识库上线 AgentOS |

> 章节顺序对照 [docs.agno.com](https://docs.agno.com/) 官方文档导航编排：Agents → Tools → Teams → Workflows → Multimodal & Sessions → Storage → Memory → Knowledge → Models → Skills → 安全 → 生产。


## Official Reference Sources

：

|  |  |
|---|---|
| docs.agno.com | [https://docs.agno.com/](https://docs.agno.com/) |
| github.com | [https://github.com/agno-agi/agno](https://github.com/agno-agi/agno) |

：**Agno 3.x**（agno 3.0.1）


## Prerequisites

- Python  +  Pydantic（ [FastAPI ](/fastapi/)  4 ）；
-  API Key。

👉  [ 1 ](./ch01) 。
