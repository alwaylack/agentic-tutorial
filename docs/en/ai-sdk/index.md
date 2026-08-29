# Vercel AI SDK · Course Guide

This course spans **22 chapters (including 3 capstones)**, based on the latest official documentation at [ai-sdk.dev](https://ai-sdk.dev/): **chapter structure, APIs, and example code align with the official docs**; explanatory text translated to English.

## What You Will Learn

| Stage | Chapters | Content |
|---|---|---|
| Foundation | 01–04 | SDK architecture overview, quick start, provider management, prompts and message models |
| Core | 05–15 | Text generation & streaming, structured output, tool calling & MCP, reasoning models, embeddings & reranking, middleware, telemetry, multimodal & speech |
| UI | 16–17 | useChat chat interface, UI Message Stream, message persistence |
| Agent | 18–19 | ToolLoopAgent, loop control, approval, memory, and subagents |
| Capstone | 20–22 | RAG knowledge-base Q&A → multi-agent customer ticket system → full-stack streaming chat app |

## Provider Compatibility Note ⭐

All example code in this course is **unifiedly compatible with both access methods** — switching models requires changing only one place:

```ts
// Method 1: Vercel AI Gateway (recommended default)
import { createGateway } from 'ai';

const gateway = createGateway({
  apiKey: process.env.AI_GATEWAY_API_KEY ?? '',
});

const model = gateway('openai/gpt-5'); // gateway/model-id format
```

```ts
// Method 2: Custom OpenAI-compatible Provider
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

const myProvider = createOpenAICompatible({
  name: 'my-provider',
  baseURL: process.env.OPENAI_COMPATIBLE_BASE_URL ?? '',
  apiKey: process.env.OPENAI_COMPATIBLE_API_KEY ?? '',
});

const model = myProvider('gpt-4o-mini'); // model name as your server actually provides
```

> 💡 Throughout the course, we never directly depend on vendor-specific packages like `@ai-sdk/openai` or `@ai-sdk/anthropic` — this is the essence of the AI SDK's "provider-agnostic" design. Chapter 3 covers the provider registry, aliases, and routing in depth.

## Official Reference Sources

| Source | Link |
|---|---|
| Official docs | [ai-sdk.dev](https://ai-sdk.dev/) |
| GitHub repo | [vercel/ai](https://github.com/vercel/ai) |
| Cookbook | [ai-sdk.dev/cookbook](https://ai-sdk.dev/cookbook) |

Content version baseline: **AI SDK v7** (npm `ai@7.0.x`, cross-referenced with the latest ai-sdk.dev docs).

## Learning Recommendations

- **Chapter 3 (Provider Management) is the foundation of the entire course**: all models in subsequent chapters are constructed through it;
- **Chapters 5–8 are the core daily-development APIs**: generateText / streamText / generateObject / tool;
- **The Agent duology (Chapters 18–19) progresses step by step**: learn to run the loop first, then control approval and memory;
- **The three capstone chapters can be read independently**: each is a complete, runnable project.

👉 Start with [Chapter 1](./ch01).
