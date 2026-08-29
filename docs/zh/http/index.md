# HTTP 请求库教程 · 课程导学

本课程共 **20 章**，系统讲解 Python 最主流的两大 HTTP 客户端库：

| 库 | 定位 | 版本基准 |
|---|---|---|
| **requests** | 同步请求事实标准，生态最丰富 | requests **2.34.x** |
| **httpx** | 现代全功能客户端，原生异步+HTTP2 | httpx **0.28.x** |

## 你将学到什么

| 阶段 | 章节 | 内容 |
|---|---|---|
| 入门 | 01–05 | HTTP 基础、requests 核心 API、请求参数、响应处理、JSON/文件 |
| 进阶 | 06–10 | Session、超时重试、代理 SSL、异常处理、httpx 简介 |
| 高级 | 11–15 | 异步请求、并发、HTTP/2、中间件、pytest 集成 |
| 生产 | 16–20 | 性能优化、API 客户端封装、安全、部署、实战项目 |

## 与其他课程的配合

- 与 [pytest](/zh/pytest/) 第 19 章（Web 服务测试）衔接；
- 与 [FastAPI](/zh/fastapi/) 第 20 章（测试）配合，形成完整的 Web 测试技能栈；
- 与 [Playwright](/zh/playwright/) 互补——Playwright 测浏览器，requests/httpx 测 API。


## 官方参考源

本课程严格对照以下权威文档编写：

| 来源 | 链接 |
|---|---|
| requests.readthedocs.io | [https://requests.readthedocs.io/en/latest/](https://requests.readthedocs.io/en/latest/) |
| www.python-httpx.org | [https://www.python-httpx.org/](https://www.python-httpx.org/) |

内容版本基准：**requests 2.34 + httpx 0.28**


## 学习前提

- Python 基础；了解 HTTP 基本概念（GET/POST、状态码、Header）即可；
- 建议先完成本站 [pytest 前 6 章](/zh/pytest/) 了解测试基础。

👉 从 [第 1 章](./ch01) 开始。
