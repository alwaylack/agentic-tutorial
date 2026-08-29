# Agent Engineering Fundamentals · Course Guide

This course consists of **32 chapters** covering six pillars for building production-grade AI applications. Every section is rigorously aligned with authoritative source material:

| Module | Chapters | Authoritative Source |
|---|---|---|
| Harness Engineering Fundamentals | 01–06 | [walkinglabs/learn-harness-engineering](https://walkinglabs.github.io/learn-harness-engineering/en/)、OpenAI、Anthropic official docs |
| Prompt Engineering | 07–15 | [Prompt Engineering Guide](https://www.promptingguide.ai/) |
| MCP Protocol | 16–21 | Anthropic official [modelcontextprotocol](https://github.com/modelcontextprotocol) |
| Agent Skills | 22–25 | Anthropic official [anthropics/skills](https://github.com/anthropics/skills) |
| Loop Engineering | 26–29 | [cobusgreyling/loop-engineering](https://github.com/cobusgreyling/loop-engineering) |
| AGENTS.md & Capstone | 30–32 | [agentsmd/agents.md](https://github.com/agentsmd/agents.md) |

## What You Will Learn

- **Harness Engineering Fundamentals (01–06)**: Why strong models still fail, the five-subsystem model, the repo-as-spec principle, long-task continuity, control mechanisms, and observability;
- **Prompt Engineering (07–15)**: From basic prompt elements to Few-shot, Chain-of-Thought, ReAct, ToT, RAG augmentation, and adversarial attack defense;
- **MCP Protocol (16–21)**: Model Context Protocol architecture, three primitives — Tools/Resources/Prompts, transport layer and lifecycle; build a Python SDK Server and connect to a client;
- **Agent Skills (22–25)**: SKILL.md standard structure, progressive disclosure mechanism, writing high-quality skills, team governance, and a three-repo comparison of mattpocock/skills · obra/superpowers · OpenSpec;
- **Loop Engineering (26–29)**: "Stop prompting, design loops" — five building blocks + Memory, seven production loop patterns, L1–L3 autonomy levels, Loop Ready scoring and failure modes;
- **AGENTS.md & Capstone (30–32)**: The open standard "README for agents", nested priority rules, wiring Prompt/Harness/MCP/Skills/Loop into a complete workflow.


## Official Reference Sources

This course is built strictly against the following authoritative references:

| Source | Link |
|---|---|
| www.promptingguide.ai | [https://www.promptingguide.ai/](https://www.promptingguide.ai/) |
| walkinglabs.github.io | [https://walkinglabs.github.io/learn-harness-engineering/en/](https://walkinglabs.github.io/learn-harness-engineering/en/) |
| github.com | [https://github.com/modelcontextprotocol](https://github.com/modelcontextprotocol) |
| github.com | [https://github.com/anthropics/skills](https://github.com/anthropics/skills) |
| github.com | [https://github.com/cobusgreyling/loop-engineering](https://github.com/cobusgreyling/loop-engineering) |
| github.com | [https://github.com/agentsmd/agents.md](https://github.com/agentsmd/agents.md) |

Content version baseline: **Multi-source integrated**


## Prerequisites

- Basic Python proficiency; MCP hands-on chapters require Python 3.10+;
- An LLM API Key (pairs well with this site's [FastAPI](/en/fastapi/) / [Agno](/en/agno/) courses).

## Relationship to Other Courses

This course covers the "principles and protocol layer." It complements the framework courses on this site: [Agno](/en/agno/) and [CrewAI](/en/crewai/) teach you to build agents with frameworks; this course teaches the underlying prompt design, tool protocols, capability packaging, and runtime loops.

👉 Start with [Chapter 1](./ch01).
