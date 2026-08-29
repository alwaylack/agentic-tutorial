# Agno Tutorial · Course Guide

This course is based on the **Agno 3.x official documentation**, covering **28 chapters** from zero foundation to AgentOS production deployment.

## Model Integration Convention

Per course requirements, all examples use **third-party models with OpenAI-compatible APIs** (using DeepSeek as the example — OpenRouter, Tongyi, Kimi, etc. work the same):

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
Agno also provides `agno.models.openai.like.OpenAILike` for any OpenAI-compatible endpoint — functionally equivalent.
:::

## What You Will Learn

| Stage | Chapters | Content |
|---|---|---|
| Getting Started | 01–06 | Agno architecture, your first Agent, RunOutput, streaming output, structured output, prompt design |
| Collaboration & Orchestration | 07–12 | Tools & Toolkits, Agent Team, Workflow step orchestration |
| Data & Memory | 13–18 | Multimodal, session state, storage, user memory, knowledge base RAG |
| Advanced Models & Extensions | 19–20 | Reasoning models, Skills plugins |
| Safety & Ecosystem | 21–22 | Human-in-the-loop Guardrails, MCP protocol integration |
| Production Practice | 23–25 | AgentOS service publishing, observability, performance optimization |
| Capstone Projects | 26–28 | Three projects: Intelligent Data Analysis Assistant / Multi-Source Research Team / Customer-Support KB on AgentOS |

> Chapter order follows the [docs.agno.com](https://docs.agno.com/) official navigation: Agents → Tools → Teams → Workflows → Multimodal & Sessions → Storage → Memory → Knowledge → Models → Skills → Safety → Production.

## Official References

This course is written strictly against the following authoritative documentation:

| Source | Link |
|---|---|
| docs.agno.com | [https://docs.agno.com/](https://docs.agno.com/) |
| github.com | [https://github.com/agno-agi/agno](https://github.com/agno-agi/agno) |

Version baseline: **Agno 3.x** (agno 3.0.1)

## Prerequisites

- Basic Python + familiarity with Pydantic (our [FastAPI course](/en/fastapi/) Chapter 4 can quickly bring you up to speed);
- A third-party model API Key.

👉 Start with [Chapter 1](./ch01).
