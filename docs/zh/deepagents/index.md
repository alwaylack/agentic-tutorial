# Deep Agents 教程 · 课程导学

本课程共 **12 章**，基于 2026-09-17 核验的 Python 官方文档编写，是原创教学整理而非官方文档的完整镜像。

Deep Agents 是构建在 LangGraph 之上的“agent harness”：内置文件系统工具、Skills、Memory、子智能体委派与人工审批。课程从第一个 agent 讲到生产级组合（审批 + 幂等 + 沙箱）。

先修：建议先读 [LangGraph 教程](/zh/langgraph/) 第 1、4、6 章（图、工具调用、中断）。模型示例需要自备支持工具调用的模型服务（任意 OpenAI 兼容端点），凭据来自环境变量。
## 环境与版本边界

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -U deepagents
python -m pip freeze > requirements.lock.txt
```

Deep Agents 0.7 起任务规划（write_todos）为显式启用；`delete` 文件工具与文件工具 allowlist 也要求 0.7+。本机核验版本为 0.7.15。`pip show deepagents` 低于 0.7 时，本章的规划与部分文件工具行为会不同。
## 章节路线

1. [第一个 Deep Agent 与文件工具](./ch01)
2. [模型接入与字符串路由](./ch02)
3. [文件系统权限与路径边界](./ch03)
4. [沙箱执行与 Shell 工具](./ch04)
5. [Skills 与渐进披露](./ch05)
6. [Memory 与 AGENTS.md](./ch06)
7. [上下文压缩与 Prompt Caching](./ch07)
8. [任务规划与 write_todos](./ch08)
9. [子智能体与上下文隔离](./ch09)
10. [人工审批与条件中断](./ch10)
11. [流式输出与子智能体事件](./ch11)
12. [综合实战：文件 + Skills + 子任务 + 审批](./ch12)

- [官方 Deep Agents 概览](https://docs.langchain.com/oss/python/deepagents/overview)
- [官方 LangGraph 概览](https://docs.langchain.com/oss/python/langgraph/overview)
