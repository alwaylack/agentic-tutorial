import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"第 14 章 · RAG 与检索增强提示","description":"","frontmatter":{},"headers":[],"relativePath":"agent/ch14.md","filePath":"agent/ch14.md","lastUpdated":1787480284000}');
const __default__ = { name: "agent/ch14.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: '"repo IS the spec"的核心含义是什么？',
        options: [
          "仓库里的 README.md 就是完整的项目规格说明书",
          "agent 能看见的只有仓库里的文件，不在仓库的信息对它等于不存在",
          "所有业务逻辑代码必须写在仓库根目录",
          "spec 文件应该用 YAML 格式存储在仓库里"
        ],
        answer: 1,
        explain: 'OpenAI 的"repo IS the spec"原则指：任何不在仓库文件中的信息（口头约定、聊天记录、Figma 设计稿）对 agent 而言都不存在。agent 能看见的只有仓库内容，所以所有必要上下文必须以结构化文件形式居住在仓库里。'
      },
      {
        question: "关于 AGENTS.md 的长度控制，以下哪项是正确的做法？",
        options: [
          "越长越好，把所有细节都写进去确保 agent 不遗漏",
          "控制在约 100 行以内，超出部分拆到 docs/ 目录由 agent 按需读取",
          '只写一行"遵循项目规范"，其他让 agent 自行探索',
          "不使用 markdown，改用纯文本避免格式干扰"
        ],
        answer: 1,
        explain: "OpenAI 的最佳实践是 AGENTS.md 控制在约 100 行，作为目录页给出方向和关键约束；超出部分拆到 docs/ 下按需读取。写太长会被 agent 当作背景噪音，关键信息被淹没。"
      },
      {
        question: "init.sh 的基线验证失败时，正确的处理原则是？",
        options: [
          "跳过基线验证，直接开始新功能开发",
          "报告错误后终止会话，等人工介入修复",
          "先修复基线，再继续新工作，不在破裂基线上叠加新功能",
          "尝试修改 init.sh 绕过失败的测试"
        ],
        answer: 2,
        explain: "基线失败时应该先修复基线再继续——在已破裂的基线上叠加新工作只会让问题累积加深。这是 init.sh 设计中的一个硬原则：保证每次会话从相同干净的起点开始。"
      },
      {
        question: "AGENTS.md 与 init.sh 的关系最准确的描述是？",
        options: [
          "两者完全等价，可以互相替代",
          "AGENTS.md 是动态执行脚本，init.sh 是静态说明文档",
          "AGENTS.md 提供静态说明（项目全貌 + 约束），init.sh 提供动态执行（环境初始化 + 基线验证），两者协同工作",
          "init.sh 只负责启动服务，AGENTS.md 只负责描述技术栈，两者无关联"
        ],
        answer: 2,
        explain: "AGENTS.md 是静态说明文档（agent 读），init.sh 是动态启动脚本（agent 执行）。两者互补：AGENTS.md 告诉 agent 项目是什么和有什么约束，init.sh 确保 agent 在干净可复现的环境中开始工作。协同构成最小可运行的 harness 基线。"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-14-章-·-rag-与检索增强提示" tabindex="-1">第 14 章 · RAG 与检索增强提示 <a class="header-anchor" href="#第-14-章-·-rag-与检索增强提示" aria-label="Permalink to &quot;第 14 章 · RAG 与检索增强提示&quot;">​</a></h1><blockquote><p>本章目标：理解&quot;仓库即规格（repo IS the spec）&quot;原则，掌握 AGENTS.md 作为目录页的设计方法，学会用 init.sh 建立标准化的启动流程。</p></blockquote><h2 id="_12-1-repo-is-the-spec" tabindex="-1">12.1 Repo IS the Spec <a class="header-anchor" href="#_12-1-repo-is-the-spec" aria-label="Permalink to &quot;12.1 Repo IS the Spec&quot;">​</a></h2><p>OpenAI 在 harness engineering 文章里提出了一个核心原则：<strong>repo IS the spec</strong>（仓库即规格）。</p><p>这句话的含义是：agent 能看见的只有仓库里的文件。任何不存在于仓库中的信息，对 agent 而言等于不存在。你脑子里的架构约定、Slack 里三个月前讨论的决策、Figma 设计稿上的交互细节——如果没写进仓库，agent 就不知道。</p><p>这与 Anthropic 的&quot;state persistence&quot;理念不谋而合：所有 agent 需要的上下文都应该在仓库中以结构化文件的形式存在，而不是靠对话历史或口头传达。</p><p>两个公司关注点不同，说的是同一件事：<strong>工程基础设施的所有必要信息必须居住在仓库里。</strong></p><h2 id="_12-2-agents-md-目录页而非百科全书" tabindex="-1">12.2 AGENTS.md：目录页而非百科全书 <a class="header-anchor" href="#_12-2-agents-md-目录页而非百科全书" aria-label="Permalink to &quot;12.2 AGENTS.md：目录页而非百科全书&quot;">​</a></h2><p>承接上一章，AGENTS.md 的定位是<strong>目录页</strong>——告诉 agent &quot;项目是什么、怎么用、哪里找更多信息&quot;，而不是把所有知识都塞进去。</p><h3 id="一份完整的-agents-md-结构" tabindex="-1">一份完整的 AGENTS.md 结构 <a class="header-anchor" href="#一份完整的-agents-md-结构" aria-label="Permalink to &quot;一份完整的 AGENTS.md 结构&quot;">​</a></h3><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">&lt;!-- project-root/AGENTS.md --&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}"># AGENTS.md — Working with this repository</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## What this project is</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">A FastAPI-based task management API with PostgreSQL backend.</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">Built for the Python Engineering team.</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## Tech Stack</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> Python 3.12 · FastAPI 0.141 · SQLAlchemy 2.0 (async)</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> PostgreSQL 16 · Redis 7 (caching) · Celery 5 (background tasks)</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> Testing: pytest + httpx TestClient</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> Linting: ruff + mypy --strict</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## First Run</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">\`\`\`bash</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">make</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> dev-up</span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">      # starts postgres + redis via docker-compose</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">uv</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> sync</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">uv</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> run</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> pytest</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> tests/</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> -q</span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">   # smoke test</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h2 id="hard-constraints" tabindex="-1">Hard Constraints <a class="header-anchor" href="#hard-constraints" aria-label="Permalink to &quot;Hard Constraints&quot;">​</a></h2><ul><li>All API routes must be under <code>/api/v2/...</code></li><li>No synchronous database calls — use <code>async with session()</code></li><li>All new endpoints require OpenAPI schema + request model</li></ul><h2 id="verification-commands" tabindex="-1">Verification Commands <a class="header-anchor" href="#verification-commands" aria-label="Permalink to &quot;Verification Commands&quot;">​</a></h2><ul><li>Tests: <code>pytest tests/ -x</code></li><li>Types: <code>mypy src/ --strict</code></li><li>Lint: <code>ruff check src/</code></li><li>Full: <code>make check</code></li></ul><h2 id="architecture" tabindex="-1">Architecture <a class="header-anchor" href="#architecture" aria-label="Permalink to &quot;Architecture&quot;">​</a></h2><p>See your project&#39;s architecture documentation</p><h2 id="api-spec" tabindex="-1">API Spec <a class="header-anchor" href="#api-spec" aria-label="Permalink to &quot;API Spec&quot;">​</a></h2><p>See your project&#39;s API specification</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>### 关键设计原则</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. **不超过 100 行**：太长会被 agent 当作&quot;背景噪音&quot;，关键信息被淹没。超出就拆。</span></span>
<span class="line"><span>2. **硬约束写在正文里**：不可协商的规则（技术栈版本、命名规范、鉴权方式）直接写在 AGENTS.md。</span></span>
<span class="line"><span>3. **详细文档放 docs/**：架构决策、API 规范、数据库 ER 图——这些 agent 只在需要时才会读，不要塞进 AGENTS.md。</span></span>
<span class="line"><span>4. **验证命令必须可执行**：每条命令都能直接复制粘贴到终端运行，不是文字描述。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 12.3 init.sh：独立的初始化阶段</span></span>
<span class="line"><span></span></span>
<span class="line"><span>第 10 章提到过五大失败模式之一：&quot;环境不全&quot;。agent 打开一个仓库，花 10 分钟排查环境、装依赖、建数据库——这些时间本应用于真正的工作。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>**初始化阶段的独立价值**：把环境探索成本从任务本身剥离出来，让每次会话开始时环境已经是确定可用的状态。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`init.sh\` 的职责：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`\`\`bash</span></span>
<span class="line"><span>#!/usr/bin/env bash</span></span>
<span class="line"><span>set -euo pipefail</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ROOT_DIR=&quot;$(cd &quot;$(dirname &quot;\${BASH_SOURCE[0]}&quot;)&quot; &amp;&amp; pwd)&quot;</span></span>
<span class="line"><span>cd &quot;$ROOT_DIR&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>INSTALL_CMD=(uv sync)</span></span>
<span class="line"><span>VERIFY_CMD=(pytest tests/ -q)</span></span>
<span class="line"><span>START_CMD=(uv run fastapi dev src/main.py)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &quot;==&gt; Working directory: $PWD&quot;</span></span>
<span class="line"><span>echo &quot;==&gt; Syncing dependencies&quot;</span></span>
<span class="line"><span>&quot;\${INSTALL_CMD[@]}&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &quot;==&gt; Running baseline verification&quot;</span></span>
<span class="line"><span>&quot;\${VERIFY_CMD[@]}&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &quot;==&gt; Startup command&quot;</span></span>
<span class="line"><span>printf &#39;    %q\\n&#39; &quot;\${START_CMD[@]}&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if [ &quot;\${RUN_START_COMMAND:-0}&quot; = &quot;1&quot; ]; then</span></span>
<span class="line"><span>    echo &quot;==&gt; Starting the app&quot;</span></span>
<span class="line"><span>    exec &quot;\${START_CMD[@]}&quot;</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span>echo &quot;Set RUN_START_COMMAND=1 to launch the app directly.&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br></div></div><h3 id="init-sh-的工作流设计" tabindex="-1">init.sh 的工作流设计 <a class="header-anchor" href="#init-sh-的工作流设计" aria-label="Permalink to &quot;init.sh 的工作流设计&quot;">​</a></h3><p>agent 每次启动时应该按照固定顺序执行：</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 1. 确认工作目录</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">pwd</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 2. 读取上次会话的进度记录</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">cat</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> PROGRESS.md</span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">   # 或 claude-progress.md</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 3. 读取功能列表，选择最高优先级的未完成项</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">cat</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> feature_list.json</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}"> |</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> jq</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> &#39;.features[] | select(.status == &quot;in_progress&quot;)&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 4. 查看最近提交，了解当前代码状态</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">git</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> log</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> --oneline</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> -5</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 5. 运行 init.sh 确保环境可用</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">./init.sh</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 6. 运行冒烟测试确认基线通过</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">pytest</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> tests/smoke/</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> -q</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><div class="warning custom-block"><p class="custom-block-title">基线失败的处理原则</p><p>如果 <code>init.sh</code> 或冒烟测试失败，<strong>先修复基线，再做新功能</strong>。不要在已破裂的基线上叠加新工作——这只会让问题更深。</p></div><h2 id="_12-4-agents-md-与-init-sh-的协同" tabindex="-1">12.4 AGENTS.md 与 init.sh 的协同 <a class="header-anchor" href="#_12-4-agents-md-与-init-sh-的协同" aria-label="Permalink to &quot;12.4 AGENTS.md 与 init.sh 的协同&quot;">​</a></h2><p>AGENTS.md 和 init.sh 是互补关系：</p><table tabindex="0"><thead><tr><th>维度</th><th>AGENTS.md</th><th>init.sh</th></tr></thead><tbody><tr><td><strong>角色</strong></td><td>静态说明书</td><td>动态启动脚本</td></tr><tr><td><strong>谁来读</strong></td><td>agent 读（每次会话开始）</td><td>agent 执行（每次会话开始）</td></tr><tr><td><strong>内容</strong></td><td>技术栈、约束、验证命令</td><td>依赖安装、基线验证、服务启动</td></tr><tr><td><strong>生命周期</strong></td><td>变更频率低（架构稳定后）</td><td>几乎不变（复制即用）</td></tr></tbody></table><p>典型协作流程：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>agent 启动</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>读 AGENTS.md（获取项目全貌 + 硬约束）</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>读 PROGRESS.md（获取上次会话断点）</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>读 feature_list.json（选择当前任务）</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>运行 ./init.sh（确保环境干净可用）</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>开始工作</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>这个流程保证了每次会话都在<strong>相同的环境起点</strong>上开始，不会因为某次手动干预改变了环境状态而导致后续会话行为不一致。</p><h2 id="_12-5-常见陷阱" tabindex="-1">12.5 常见陷阱 <a class="header-anchor" href="#_12-5-常见陷阱" aria-label="Permalink to &quot;12.5 常见陷阱&quot;">​</a></h2><p><strong>陷阱一：AGENTS.md 写成博客</strong></p><blockquote><p>写 500 行项目介绍、历史背景、团队故事……agent 不需要知道你的项目为什么诞生，它只需要知道&quot;怎么在这里工作&quot;。精简到 100 行以内。</p></blockquote><p><strong>陷阱二：验证命令写在 AGENTS.md 里但从未运行过</strong></p><blockquote><p>如果你写的 <code>make check</code> 在你的机器上跑不通，agent 也跑不通。AGENTS.md 里的每一条命令都应该在你自己的机器上实际验证过。</p></blockquote><p><strong>陷阱三：init.sh 假设环境已经配好</strong></p><blockquote><p><code>uv sync</code> 失败、docker-compose 启动不了、数据库连不上——这些都是 init.sh 应该处理的边界情况，不是 agent 该花时间排查的问题。</p></blockquote><p><strong>陷阱四：PROGRESS.md 从不更新</strong></p><blockquote><p>写了 PROGRESS.md 但不更新，等于没写。每次会话结束前必须更新进度记录，下次会话才有意义。</p></blockquote><h2 id="本章小结" tabindex="-1">本章小结 <a class="header-anchor" href="#本章小结" aria-label="Permalink to &quot;本章小结&quot;">​</a></h2><ul><li><strong>repo IS the spec</strong>：agent 只能看见仓库里的文件，不在仓库里的信息对它等于不存在</li><li>AGENTS.md 是目录页（~100 行），详细内容放 docs/ 按需读取</li><li>AGENTS.md 四要素：项目概述 / 技术栈与版本 / 硬约束 / 验证命令</li><li>init.sh 把环境初始化成本从任务本身剥离，保证每次会话从相同起点开始</li><li>init.sh 执行顺序：pwd → 读进度 → 选 feature → 查 git log → 跑 init.sh → 跑冒烟测试</li><li>AGENTS.md（静态说明）与 init.sh（动态执行）协同工作，构成最小可运行的 harness 基线</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>在你的项目根目录创建一份 AGENTS.md（不超过 100 行），包含四要素，并确保每条验证命令在你本地实际运行通过。</li><li>编写 <code>init.sh</code>，实现：安装依赖 → 运行基线测试 → 可选启动服务三个阶段，用 <code>set -euo pipefail</code> 保证错误可控。</li><li>创建 <code>PROGRESS.md</code>，模拟一个&quot;上次会话遗留的中断状态&quot;，让下一次启动的 agent 能从中断点无缝续接。</li></ol><blockquote><p>完成后进入<a href="./ch15.html">下一章：对抗攻击与防御</a>。</p></blockquote></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("agent/ch14.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
