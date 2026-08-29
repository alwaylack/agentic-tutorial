# CrewAI Tutorial · Course Guide

This course is based on the **CrewAI 1.x official documentation**, spanning **26 chapters** from zero to enterprise-grade multi-agent applications.

## Model Integration Conventions

CrewAI supports hundreds of models through LiteLLM. Per course requirements, all examples use **OpenAI-compatible third-party models**:

```python
from crewai import LLM

llm = LLM(
    model="openai/deepseek-chat",          # provider/model format
    base_url="https://api.deepseek.com/v1",
    api_key="sk-xxx",
    temperature=0.7,
)
```

## What You Will Learn

| Stage | Chapters | Content |
|---|---|---|
| Getting Started | 01–05 | Core concepts, first Crew, deep dive into Agent/Task/Crew |
| Intermediate | 06–12 | LLM configuration, tooling system, hierarchical process, memory, knowledge bases, structured output |
| Advanced | 13–19 | Planning & fault tolerance, callback events, Flow workflows, engineering project structure, multi-Crew orchestration |
| Production Practice | 20–26 | MCP, evaluation & training, observability, deployment & service, three capstone projects, best practices checklist |

## Official Reference Sources

This course is strictly aligned with these authoritative sources:

| Source | Link |
|---|---|
| docs.crewai.com | [https://docs.crewai.com/](https://docs.crewai.com/) |
| github.com | [https://github.com/joaomdmoura/crewAI](https://github.com/joaomdmoura/crewAI) |

Content version baseline: **CrewAI 1.15+**

## Prerequisites

- Python basics; recommended to complete chapters 1–6 of this site's [Agno tutorial](/en/agno/) first for a solid Agent concept foundation;
- Python 3.10–3.13 environment (CrewAI official requirement).

👉 Start with [Chapter 1](./ch01).
