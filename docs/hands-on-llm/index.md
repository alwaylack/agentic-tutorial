# Hands-On Large Language Models · 课程导学

本课程共 **12 章 + 扩展阅读**，逐章对照 O'Reilly 图书《Hands-On Large Language Models》（Jay Alammar & Maarten Grootendorst 著）官方仓库的笔记本编写：**章节结构、代码、图片与仓库保持一致**，文字说明翻译为中文。

<a href="https://github.com/HandsOnLLM/Hands-On-Large-Language-Models"><img src="./images/book_cover.png" width="40%" align="right"></a>

## 你将学到什么

| 阶段 | 章节 | 内容 |
|---|---|---|
| 奠基 | 01–03 | 语言模型导论、Token 与 Token 嵌入、深入 LLM 内部 |
| 应用 | 04–06 | 文本分类、文本聚类与主题建模、提示工程 |
| 进阶 | 07–09 | 高级文本生成技术与工具、语义搜索、多模态大语言模型 |
| 训练 | 10–12 | 构建文本嵌入模型、微调 BERT、微调生成模型 |

每章对应仓库 `chapter01`–`chapter12` 目录下的官方笔记本（`.ipynb`），代码原样保留、可在 Colab 直接运行。

## 扩展阅读（Bonus Material）

作者围绕图书撰写的 8 篇视觉化深度指南，本站已全部收录并配图：

**How Transformer LLMs Work（DeepLearning.AI 课程）· 量化可视化指南 · Mamba 与状态空间模型 · 混合专家模型 MoE · 图解 Stable Diffusion · 推理 LLM 可视化指南 · 图解 DeepSeek-R1 · LLM Agent 可视化指南**

## 官方参考源

| 来源 | 链接 |
|---|---|
| GitHub 仓库 | [HandsOnLLM/Hands-On-Large-Language-Models](https://github.com/HandsOnLLM/Hands-On-Large-Language-Models) |
| 图书官网 | [huggingface.co/learn](https://huggingface.co/blog/hands-on-llms) |
| 环境 | 仓库根目录 `environment.yml` / `requirements.txt` |

内容版本基准：**仓库最新 main 分支**

## 学习建议

- **第 1–3 章是全书地基**：Tokenizer、嵌入与 Transformer 内部机制贯穿后续所有章节；
- **应用章节（4–8）可按需跳读**：分类/聚类/语义搜索相互独立；
- **训练三部曲（10–12）循序渐进**：先造嵌入模型，再微调 BERT，最后微调生成模型；
- 笔记本默认在 GPU 上运行（Colab 免费档即可满足绝大多数示例）。
