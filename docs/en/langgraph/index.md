# LangGraph Tutorial · Course Guide

本课程共 **12 章**，基于 2026-09-17 核验的 Python 官方文档编写，是原创教学整理而非官方文档的完整镜像。

LangGraph provides explicit state and execution control; Deep Agents adds filesystem tools, context management, and delegation on top of it. Learn the mechanisms here, then combine them into production services in [Agent Engineering in Production](/en/agent-prod/).

Prerequisites: Python functions, type annotations, virtual environments. Python 3.11+ recommended. Pure-graph examples do not call a model; model examples need your own tool-calling model service (any OpenAI-compatible endpoint) and may incur cost. All credentials in the code come from environment variables.
## 环境与版本边界

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -U langgraph
python -m pip freeze > requirements.lock.txt
```

LangGraph v2 streaming requires 1.1+; current docs also recommend the event stream introduced in 1.2. Deep Agents docs describe 0.7 behavior: planning must be enabled explicitly. Do not mix the website doc version with your installed version; check with `python -m pip show langgraph deepagents` before running and keep the lock file.
## 章节路线

1. [Run a graph without a model](./ch01)
2. [State, reducers, and concurrent updates](./ch02)
3. [Conditional routing and bounded loops](./ch03)
4. [Messages and the tool-calling loop](./ch04)
5. [Checkpoints, threads, and cross-thread memory](./ch05)
6. [Human approval, interrupts, and resume](./ch06)
7. [Streaming and frontend event contracts](./ch07)
8. [Subgraphs and explicit boundaries](./ch08)
9. [Functional API and task replay](./ch09)
10. [Fault tolerance, retries, and idempotency](./ch10)
11. [Test transitions and regression boundaries](./ch11)
12. [Capstone: evidence-grounded local QA](./ch12)

- [官方 LangGraph 概览](https://docs.langchain.com/oss/python/langgraph/overview)
- [官方 Deep Agents 概览](https://docs.langchain.com/oss/python/deepagents/overview)
