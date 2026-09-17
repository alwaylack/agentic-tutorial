# Deep Agents Tutorial · Course Guide

本课程共 **14 章**，基于 2026-09-17 核验的 Python 官方文档编写，是原创教学整理而非官方文档的完整镜像。

Deep Agents is an agent harness built on LangGraph: built-in filesystem tools, skills, memory, subagent delegation, and human-in-the-loop approval. The course goes from your first agent to production-grade composition (approval + idempotency + sandboxes).

Prerequisite: read [LangGraph Tutorial](/en/langgraph/) chapters 1, 4, and 6 (graphs, tool calling, interrupts). Model examples need your own tool-calling model service (any OpenAI-compatible endpoint); credentials come from environment variables.
## 环境与版本边界

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -U deepagents
python -m pip freeze > requirements.lock.txt
```

Since Deep Agents 0.7, task planning (write_todos) is opt-in; the `delete` file tool and the filesystem tool allowlist also require 0.7+. The version verified locally is 0.7.15. With `pip show deepagents` below 0.7, planning and some file-tool behavior differ.
## 章节路线

1. [Your first deep agent and its file tools](./ch01)
2. [Model routing and provider strings](./ch02)
3. [Filesystem permissions and path boundaries](./ch03)
4. [Sandbox execution and the shell tool](./ch04)
5. [Skills and progressive disclosure](./ch05)
6. [Memory and AGENTS.md](./ch06)
7. [Context compression and prompt caching](./ch07)
8. [Task planning and write_todos](./ch08)
9. [Subagents and context isolation](./ch09)
10. [Human-in-the-loop and conditional interrupts](./ch10)
11. [Streaming and subagent events](./ch11)
12. [Capstone: files + skills + delegation + approval](./ch12)
13. [Capstone 2: read-only codebase audit assistant](./ch13)
14. [Capstone 3: planning, delegation, and approval research pipeline](./ch14)

- [官方 Deep Agents 概览](https://docs.langchain.com/oss/python/deepagents/overview)
- [官方 LangGraph 概览](https://docs.langchain.com/oss/python/langgraph/overview)
