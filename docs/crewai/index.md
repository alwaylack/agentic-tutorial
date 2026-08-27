# CrewAI 教程 · 课程导学

本课程基于 **CrewAI 1.x 官方文档**编写，共 **26 章**，从零基础到企业级多智能体应用。

## 模型接入约定

CrewAI 通过 LiteLLM 支持上百种模型。按课程要求，所有示例均使用 **OpenAI 兼容的三方模型**：

```python
from crewai import LLM

llm = LLM(
    model="openai/deepseek-chat",          # provider/model 格式
    base_url="https://api.deepseek.com/v1",
    api_key="sk-xxx",
    temperature=0.7,
)
```

## 你将学到什么

| 阶段 | 章节 | 内容 |
|---|---|---|
| 入门 | 01–05 | 核心概念、第一个 Crew、Agent/Task/Crew 三大件详解 |
| 进阶 | 06–12 | LLM 配置、工具体系、分层流程、记忆、知识库、结构化输出 |
| 高级 | 13–19 | 规划与容错、回调事件、Flow 工作流、工程化项目、多 Crew 编排 |
| 生产实践 | 20–26 | MCP、评估训练、可观测性、部署服务化、三个综合实战与最佳实践清单 |


## 官方参考源

本课程严格对照以下权威文档编写：

| 来源 | 链接 |
|---|---|
| docs.crewai.com | [https://docs.crewai.com/](https://docs.crewai.com/) |
| github.com | [https://github.com/joaomdmoura/crewAI](https://github.com/joaomdmoura/crewAI) |

内容版本基准：**CrewAI 1.15+**


## 学习前提

- Python 基础；建议先完成本站 [Agno 教程](/agno/) 前 6 章，理解 Agent 基本概念后学习效果更佳；
- Python 3.10–3.13 环境（CrewAI 官方要求）。

👉 从 [第 1 章](./ch01) 开始。
