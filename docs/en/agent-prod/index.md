# Agent 工程实战 · 课程导学

本课程共 **20 章核心 + 3 章综合实战（实战排在课程最后）**，基于 **LangGraph 1.2.x**、**Deep Agents**、**FastAPI**、**AWS** 等最新官方文档编写。岗位面向 Agent 工程师——从产品设计到生产上线的完整链路，覆盖多 Agent 协作、上下文工程、评估体系与可观测性。

## 你将学到什么

| 阶段 | 章节 | 内容 | 前置链接 |
|---|---|---|---|
| 异步基础 | 01–03 | asyncio 深入、消息队列 Redis/Celery、分布式协调与 Docker | [FastAPI](/fastapi/) ch01-22 |
| LangGraph 核心 | 04–08 | StateGraph、工具调用、子图、持久化、流式输出与中断恢复 | [Agent 工程](/agent/) ch01-12 |
| Deep Agents | 09–11 | create_deep_agent、Skills/Memory、上下文工程 | [LangGraph](./ch04) |
| 评估与可观测 | 12–15 | LLM-as-judge、A/B 测试、Langfuse/OpenTelemetry、多网关成本优化 | [Vercel AI SDK](/ai-sdk/) ch03 |
| 生产部署 | 16–18 | AWS ECS/Fargate、SQS/DynamoDB、CloudWatch/CI-CD | [FastAPI](/fastapi/) ch22 |
| 多模态扩展 | 19–20 | 文档解析管线（PDF/PPT/OCR/转录）、音视频处理与无头渲染 | [Playwright](/playwright/) 全课 |
| 综合实战 | 21–23 | RAG Agent → 多代理工单系统 → 全栈 Agent 服务（课程终点） | 无 |

> 📌 课程中涉及已有课程覆盖的基础知识时，直接链接到对应章节，避免重复内容。

## 核心技术栈

```
Python 3.12+  ·  asyncio  ·  FastAPI  ·  LangGraph 1.2.x
Deep Agents   ·  Redis / Celery  ·  Docker
AWS (ECS/Fargate, SQS, S3, DynamoDB, CloudWatch)
Langfuse      ·  OpenTelemetry
```

## 官方参考源

| 来源 | 链接 | 版本基准 |
|---|---|---|
| LangGraph | [docs.langchain.com/langgraph](https://docs.langchain.com/oss/python/langgraph/overview) | 1.2.11 |
| Deep Agents | [docs.langchain.com/deepagents](https://docs.langchain.com/oss/python/deepagents/overview) | latest |
| FastAPI | [fastapi.tiangolo.com](https://fastapi.tiangolo.com/) | 0.141+ |
| AWS SDK (boto3) | [boto3.amazonaws.com](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html) | latest |
| Langfuse | [langfuse.com/docs](https://langfuse.com/docs) | latest |

## 学习建议

- **阶段一不要跳**：异步编程和消息队列是生产 Agent 服务的基石；
- **LangGraph 是核心**：第 4–8 章构成了整个课程的骨架；
- **实战三章可独立运行**：每章都是完整项目，可直接用于求职作品集；
- 建议配合 [Vercel AI SDK](/ai-sdk/) 课程学习 Provider 管理部分。

👉 从 [第 1 章](./ch01) 开始。
