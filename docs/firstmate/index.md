# FirstMate · 课程导学

本课程共 **18 章**，基于 **FirstMate 官方仓库与文档**（AGENTS.md / docs/architecture.md 等），掌握「Talk to one agent. Ship with a crew.」的多智能体舰队编排方法。

## 你将学到什么

| 阶段 | 章节 | 内容 |
|---|---|---|
| 入门 | 01–05 | Agent Distro 理念、环境搭建、AGENTS.md 解剖、五条硬规则、FM_HOME 布局 |
| 进阶 | 06–10 | tmux 参考后端、实验性后端、ship/scout 任务、worktree 隔离、项目模式 |
| 高级 | 11–15 | 零 token 监督 watcher、内置技能、两层技能体系、Secondmate、远程舰队与 Relay |
| 生产 | 16–18 | 三章贯穿式实战：个人舰队 → 并行交付流水线 → Secondmate 规模化运营 |

## 官方参考源

本课程严格对照以下权威文档编写：

| 来源 | 链接 |
|---|---|
| GitHub 仓库 | [kunchenguid/firstmate](https://github.com/kunchenguid/firstmate) |
| 运营契约 AGENTS.md | [AGENTS.md](https://github.com/kunchenguid/firstmate/blob/main/AGENTS.md) |
| 架构总览 | [docs/architecture.md](https://github.com/kunchenguid/firstmate/blob/main/docs/architecture.md) |
| 配置手册 | [docs/configuration.md](https://github.com/kunchenguid/firstmate/blob/main/docs/configuration.md) |
| 脚本工具带 | [docs/scripts.md](https://github.com/kunchenguid/firstmate/blob/main/docs/scripts.md) |

内容版本基准：**firstmate 最新 main 分支**

## 学习建议

- **先读第 1–4 章**再动手：五条硬规则是整个体系的根基，不理解边界就无法安全放权；
- **tmux 后端优先**（第 6 章）：它是参考实现，其他后端都是实验性的；
- **实战章节按顺序完成**：三章构成一个从单人舰队到远程规模化的完整成长路径。
