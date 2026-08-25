# Vercel AI SDK · 课程导学

本课程共 **22 章（含 3 章实战）**，基于 [ai-sdk.dev](https://ai-sdk.dev/) 最新官方文档编写：**章节结构、API 与示例代码与官方文档一致**，文字说明翻译为中文。

## 你将学到什么

| 阶段 | 章节 | 内容 |
|---|---|---|
| 奠基 | 01–04 | SDK 架构总览、快速上手、Provider 管理、提示词与消息模型 |
| 核心 | 05–15 | 文本生成与流式输出、结构化输出、工具调用与 MCP、推理模型、嵌入与重排序、中间件、遥测、多模态与语音 |
| UI | 16–17 | useChat 聊天界面、UI Message Stream、消息持久化 |
| Agent | 18–19 | ToolLoopAgent、循环控制、审批、记忆与子代理 |
| 实战 | 20–22 | RAG 知识库问答 → 多代理客服工单系统 → 全栈流式聊天应用 |

## Provider 兼容性说明 ⭐

本课程所有示例代码**统一兼容两种接入方式**，切换模型只需改动一处：

```ts
// 方式一：Vercel AI Gateway（推荐默认）
import { createGateway } from 'ai';

const gateway = createGateway({
  apiKey: process.env.AI_GATEWAY_API_KEY ?? '',
});

const model = gateway('openai/gpt-5'); // gateway/model-id 格式
```

```ts
// 方式二：自定义 OpenAI 兼容 Provider
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

const myProvider = createOpenAICompatible({
  name: 'my-provider',
  baseURL: process.env.OPENAI_COMPATIBLE_BASE_URL ?? '',
  apiKey: process.env.OPENAI_COMPATIBLE_API_KEY ?? '',
});

const model = myProvider('gpt-4o-mini'); // 模型名按服务端实际填写
```

> 💡 全程不直接依赖 `@ai-sdk/openai`、`@ai-sdk/anthropic` 等具体厂商包——这正是 AI SDK「provider-agnostic」设计的精髓。第 3 章将深入讲解 provider 注册表、别名与路由。

## 官方参考源

| 来源 | 链接 |
|---|---|
| 官方文档 | [ai-sdk.dev](https://ai-sdk.dev/) |
| GitHub 仓库 | [vercel/ai](https://github.com/vercel/ai) |
| Cookbook | [ai-sdk.dev/cookbook](https://ai-sdk.dev/cookbook) |

内容版本基准：**AI SDK v6（最新 main 文档）**

## 学习建议

- **第 3 章 Provider 管理是全课地基**：后续所有章节的模型都由它构造；
- **第 5–8 章是日常开发主力 API**：generateText / streamText / generateObject / tool；
- **Agent 三部曲（18–20）循序渐进**：先会跑循环，再控审批与记忆；
- **实战三章可独立阅读**：每章都是完整可运行的项目。
