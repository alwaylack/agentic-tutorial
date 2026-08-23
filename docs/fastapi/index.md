# FastAPI 教程 · 课程导学

本课程基于 **FastAPI 0.14x 官方文档**编写，共 **22 章**，从零基础到生产部署。

## 你将学到什么

| 阶段 | 章节 | 内容 |
|---|---|---|
| 入门 | 01–06 | 环境搭建、路由、路径/查询/请求体参数、Pydantic 校验、响应模型 |
| 进阶 | 07–13 | 表单文件、错误处理、依赖注入体系、中间件、数据库集成 |
| 高级 | 14–20 | OAuth2/JWT 安全、异步并发、WebSocket、模板、大型项目结构、测试 |
| 生产实践 | 21–22 | 配置管理（Pydantic Settings）、lifespan、Docker 与部署 |


## 官方参考源

本课程严格对照以下权威文档编写：

| 来源 | 链接 |
|---|---|
| fastapi.tiangolo.com | [https://fastapi.tiangolo.com/](https://fastapi.tiangolo.com/) |
| github.com | [https://github.com/fastapi/fastapi/tree/master/docs/en/docs](https://github.com/fastapi/fastapi/tree/master/docs/en/docs) |

内容版本基准：**FastAPI 0.141+**


## 学习前提

- Python 基础 + 了解类型注解（`def f(x: int) -> str`）；
- 建议先完成本站 [pytest 教程](/pytest/) 的前 10 章，第 20 章会用到。

## 版本说明

教程使用当前最新的 FastAPI（0.141+）与 Pydantic v2 语法：统一采用官方推荐的 `Annotated` 依赖写法、`lifespan` 生命周期管理、`fastapi dev` CLI。

👉 从 [第 1 章](./ch01) 开始。
