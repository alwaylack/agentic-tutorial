# LangGraph 教程 · 课程导学

本课程共 **12 章**，基于 2026-09-17 核验的 Python 官方文档编写，是原创教学整理而非官方文档的完整镜像。

LangGraph 负责显式状态与执行控制；Deep Agents 在其上提供文件工具、上下文管理和委派能力。基础机制先在本课程学习，再到 [Agent 工程实战](/zh/agent-prod/) 组合成生产服务。

先修：Python 函数、类型注解、虚拟环境。推荐 Python 3.11+。纯图示例不调用模型；模型示例需要自备支持工具调用的模型服务（任意 OpenAI 兼容端点），可能产生费用。所有代码中的凭据来自环境变量。
## 环境与版本边界

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -U langgraph
python -m pip freeze > requirements.lock.txt
```

LangGraph 的 v2 流式格式要求 1.1+；当前文档另推荐 1.2 引入的事件流。Deep Agents 文档已描述 0.7 的行为：规划需要显式启用。不要把官网文档版本与本机安装版本混为一谈；运行前用 `python -m pip show langgraph deepagents` 检查，保留锁定文件。
## 章节路线

1. [先运行一张没有模型的图](./ch01)
2. [状态、Reducer 与并发合并](./ch02)
3. [条件路由与有界循环](./ch03)
4. [消息状态与工具调用闭环](./ch04)
5. [检查点、线程与跨会话记忆](./ch05)
6. [人工审批、中断与恢复](./ch06)
7. [流式输出与前端事件协议](./ch07)
8. [子图与明确的输入输出边界](./ch08)
9. [Functional API 与任务重放](./ch09)
10. [容错、重试与幂等性](./ch10)
11. [测试状态转移与回归边界](./ch11)
12. [综合实战：有证据的本地问答图](./ch12)

- [官方 LangGraph 概览](https://docs.langchain.com/oss/python/langgraph/overview)
- [官方 Deep Agents 概览](https://docs.langchain.com/oss/python/deepagents/overview)
