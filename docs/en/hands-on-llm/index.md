# Hands-On Large Language Models · Course Overview

This course has **12 chapters + bonus readings**, written chapter-by-chapter alongside the official notebooks from the O'Reilly book *Hands-On Large Language Models* by Jay Alammar & Maarten Grootendorst: **chapter structure, code, images, and the repository are kept identical**; only the explanatory text is translated into Chinese.

## What You Will Learn

| Stage | Chapters | Content |
|---|---|---|
| Foundations | 01–03 | Language model intro, tokens & embeddings, inside the LLM |
| Applications | 04–06 | Text classification, clustering & topic modeling, prompt engineering |
| Advanced | 07–09 | Advanced text generation techniques & tools, semantic search, multimodal LLMs |
| Training | 10–12 | Building text embedding models, fine-tuning BERT, fine-tuning generative models |
| Extensions | Bonus | Agent, diffusion models, MoE, Mamba/SSM, quantization & inference — extended readings on frontier topics |

Each chapter corresponds to the official notebook in the repository's `chapter01`–`chapter12` directories (`.ipynb`). Code is preserved as-is and can be run directly in Colab.

## Bonus Material

The author has written 8 visual deep-dive guides alongside the book; all are included here with illustrations:

**How Transformer LLMs Work (DeepLearning.AI course) · A Visual Guide to Quantization · Mamba and State Space Models · Mixture of Experts (MoE) · The Illustrated Stable Diffusion · A Visual Guide to Reasoning LLMs · The Illustrated DeepSeek-R1 · A Visual Guide to LLM Agents**

## Official Reference Sources

| Source | Link |
|---|---|
| GitHub repository | [HandsOnLLM/Hands-On-Large-Language-Models](https://github.com/HandsOnLLM/Hands-On-Large-Language-Models) |
| Book website | [huggingface.co/learn](https://huggingface.co/blog/hands-on-llms) |
| Environment | Repository root `environment.yml` / `requirements.txt` |

Content version baseline: **latest main branch of the repository**.

## Learning Suggestions

- **Chapters 1–3 are the foundation of the entire book**: tokenizers, embeddings, and the internal Transformer mechanism run through all subsequent chapters;
- **Application chapters (4–8) can be read selectively**: classification/clustering/semantic search are independent of each other;
- **The training trilogy (10–12) builds progressively**: build an embedding model first, then fine-tune BERT, and finally fine-tune a generative model;
- Notebooks default to running on GPU (Colab's free tier is sufficient for the vast majority of examples).
