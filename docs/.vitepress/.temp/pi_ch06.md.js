import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"第 6 章 · 上下文压缩 Compaction 与 Context Files","description":"","frontmatter":{},"headers":[],"relativePath":"pi/ch06.md","filePath":"pi/ch06.md","lastUpdated":1787480284000}');
const __default__ = { name: "pi/ch06.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: "pi 自动压缩（auto-compaction）的触发条件是什么？",
        options: [
          "会话消息条数超过 100 条",
          "contextTokens > contextWindow - reserveTokens",
          "用户连续输入超过 10 次",
          "会话文件大小超过 10MB"
        ],
        answer: 1,
        explain: "官方文档明确：当前上下文 token 数超过「模型窗口 - 预留 token（默认 16384）」时触发自动压缩，目的是给模型回复留出空间。"
      },
      {
        question: "关于压缩的切点（cut point），下列说法正确的是？",
        options: [
          "可以在任意消息处切断以最大化利用空间",
          "优先在工具结果处切断，因为它们最长",
          "绝不会在工具结果处切断，且单条工具结果序列化时截断到 2000 字符",
          "只能从第一条消息开始总结"
        ],
        answer: 2,
        explain: "工具结果必须与其工具调用保持在一起，因此合法切点只有用户消息、助手消息等；同时序列化会把超长工具结果截断到 2000 字符以控制总结请求的成本。"
      },
      {
        question: "某目录同时存在 AGENTS.md 和 AGENTS.override.md，pi 会怎么做？",
        options: [
          "两个文件都加载并拼接",
          "只加载 AGENTS.override.md，忽略该目录的 AGENTS.md/CLAUDE.md",
          "随机加载其一",
          "报错要求删除其中一个"
        ],
        answer: 1,
        explain: "override 文件是该目录级别的整体替代：存在 AGENTS.override.md 时，该目录改用它而不再读取 AGENTS.md 或 CLAUDE.md，但其他目录的上下文文件仍正常拼接。"
      },
      {
        question: '想把"最近保留原文"的量从默认值提高到 40000 token，应该怎么配置？',
        options: [
          "环境变量 PI_KEEP_RECENT=40000",
          "settings.json 里 compaction.keepRecentTokens 设为 40000",
          "/compact 40000 命令永久生效",
          "修改模型 contextWindow 参数"
        ],
        answer: 1,
        explain: "keepRecentTokens 是 compaction 设置组的一员，写在 ~/.pi/agent/settings.json（全局）或 .pi/settings.json（项目），默认 20000。"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-6-章-·-上下文压缩-compaction-与-context-files" tabindex="-1">第 6 章 · 上下文压缩 Compaction 与 Context Files <a class="header-anchor" href="#第-6-章-·-上下文压缩-compaction-与-context-files" aria-label="Permalink to &quot;第 6 章 · 上下文压缩 Compaction 与 Context Files&quot;">​</a></h1><blockquote><p>本章目标：理解 pi 为什么需要上下文压缩、自动/手动 compaction 的触发与工作原理，掌握 Context Files（AGENTS.md）的加载层级与 system prompt 定制方法。</p></blockquote><h2 id="_6-1-为什么需要压缩" tabindex="-1">6.1 为什么需要压缩 <a class="header-anchor" href="#_6-1-为什么需要压缩" aria-label="Permalink to &quot;6.1 为什么需要压缩&quot;">​</a></h2><p>LLM 的上下文窗口是有限的，而编码会话天然&quot;吃&quot;上下文：每读一个文件、每跑一条命令，工具结果都会进入对话历史。一个持续重构半小时的会话，<code>read</code> 和 <code>bash</code> 的输出轻松占掉几十万 token。这带来两个问题：</p><ul><li><strong>硬限制</strong>：超过模型窗口后请求直接失败；</li><li><strong>软成本</strong>：即使没超限，冗长的历史也会推高每次请求的费用和延迟。</li></ul><p>pi 的解法是<strong>压缩（compaction）</strong>：把较早的对话总结成一份结构化摘要，只保留最近的消息原文。它还有一套配套机制——<strong>Context Files</strong>（如 <code>AGENTS.md</code>），让你用极小的固定成本注入项目级指令。</p><h2 id="_6-2-自动与手动触发" tabindex="-1">6.2 自动与手动触发 <a class="header-anchor" href="#_6-2-自动与手动触发" aria-label="Permalink to &quot;6.2 自动与手动触发&quot;">​</a></h2><p>自动压缩的触发条件是一条简单的不等式（来自官方文档 <code>compaction.md</code>）：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>contextTokens &gt; contextWindow - reserveTokens</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>即&quot;当前上下文 token 数超过 模型窗口 − 预留空间&quot;时立即压缩。<code>reserveTokens</code> 默认 <strong>16384</strong>，给模型的回复留出空间；你也可以在设置里调整（见下文）。此外，当一轮因超限而失败时，pi 会先压缩再重试（overflow recovery）。</p><p>手动触发则是在交互模式里输入 <code>/compact</code>，并可以附加指令来聚焦摘要重点：</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 交互模式下：</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">/compact</span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">                          # 按默认结构总结全部旧内容</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">/compact</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> 重点保留数据库迁移相关的决策和未完成的测试清单</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="warning custom-block"><p class="custom-block-title">关闭自动压缩</p><p>在 settings.json 中把 <code>compaction.enabled</code> 设为 <code>false</code> 可以关闭自动压缩，但 <code>/compact</code> 手动命令仍然可用。长会话中关掉它很容易撞上窗口上限，一般不建议。</p></div><h2 id="_6-3-压缩是怎么工作的" tabindex="-1">6.3 压缩是怎么工作的 <a class="header-anchor" href="#_6-3-压缩是怎么工作的" aria-label="Permalink to &quot;6.3 压缩是怎么工作的&quot;">​</a></h2><p>理解原理能帮你预判&quot;哪些信息会被丢掉&quot;。官方流程分五步：</p><ol><li><strong>找切点</strong>：从最新消息向前累计 token，直到达到 <code>keepRecentTokens</code>（默认 <strong>20000</strong>），这个位置就是切点；</li><li><strong>提取消息</strong>：切点之前（到上一次压缩边界为止）的消息全部进入待总结集合；</li><li><strong>生成摘要</strong>：调用 LLM 按<strong>固定结构化格式</strong>总结，若存在上一份摘要则作为迭代上下文传入；</li><li><strong>追加条目</strong>：把摘要和 <code>firstKeptEntryId</code> 写入会话的 <code>CompactionEntry</code>；</li><li><strong>重建上下文</strong>：下次请求时，LLM 看到的 = system prompt + 摘要 + 切点之后的原文消息。</li></ol><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>压缩前后 LLM 视角的变化：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>之前: [system] [msg1] [msg2] ... [msg8]        ← 全部原文</span></span>
<span class="line"><span>之后: [system] [summary] [msg7] [msg8]         ← 摘要替代了 msg1~6</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>两个值得注意的细节：</p><ul><li><strong>切点永远不会落在工具结果上</strong>——工具结果必须与它的工具调用待在一起，否则会出现&quot;有答案没问题&quot;的断裂上下文；</li><li><strong>序列化时会截断工具结果</strong>：单条工具结果最多保留 2000 字符，超出部分替换为截断标记，防止总结请求本身撑爆预算。</li></ul><h2 id="_6-4-信息损失的权衡与调参" tabindex="-1">6.4 信息损失的权衡与调参 <a class="header-anchor" href="#_6-4-信息损失的权衡与调参" aria-label="Permalink to &quot;6.4 信息损失的权衡与调参&quot;">​</a></h2><p>压缩本质是有损压缩。结构化摘要格式保证了关键信息不丢：</p><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## Goal          ← 用户要完成什么</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## Constraints &amp; Preferences</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## Progress      ← Done / In Progress / Blocked</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## Key Decisions ← 决策及理由</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## Next Steps</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## Critical Context</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&lt;read-files&gt;...&lt;/read-files&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&lt;modified-files&gt;...&lt;/modified-files&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>注意末尾的 <code>&lt;read-files&gt;</code> / <code>&lt;modified-files&gt;</code>：pi 会跨多次压缩<strong>累积追踪</strong>文件操作，所以即使读过某文件的记录被压缩掉了，&quot;这个文件被动过&quot;的事实仍会传递下去。</p><p>参数调优示例——小窗口模型或长任务可以保留更多近况：</p><div class="language-jsonc vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">jsonc</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">// ~/.pi/agent/settings.json 或 &lt;project&gt;/.pi/settings.json</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;compaction&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">    &quot;enabled&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">true</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">    &quot;reserveTokens&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">16384</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,   </span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">// 给回复预留的 token</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">    &quot;keepRecentTokens&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">40000</span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"> // 多留一些近期原文，减少信息损失</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">  }</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>权衡关系很直接：<code>keepRecentTokens</code> 越大，摘要需要覆盖的内容越少、损失越小，但每次请求携带的历史也越贵。另一个相关机制是 <code>/tree</code> 分支导航时的<strong>分支总结（branch summarization）</strong>：切换分支时 pi 会询问是否为被离开的分支生成摘要注入新分支，同样使用上述格式。</p><h2 id="_6-5-context-files-agents-md-的加载层级" tabindex="-1">6.5 Context Files：AGENTS.md 的加载层级 <a class="header-anchor" href="#_6-5-context-files-agents-md-的加载层级" aria-label="Permalink to &quot;6.5 Context Files：AGENTS.md 的加载层级&quot;">​</a></h2><p>如果说 compaction 是&quot;动态上下文的减法&quot;，Context Files 就是&quot;静态上下文的加法&quot;。pi 启动时按以下顺序加载并拼接 <code>AGENTS.md</code>（或 <code>CLAUDE.md</code>）：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>~/.pi/agent/AGENTS.md     ← 全局个人偏好</span></span>
<span class="line"><span>+ 父目录链上的 AGENTS.md   ← 从 cwd 一路向上走</span></span>
<span class="line"><span>+ 当前目录的 AGENTS.md     ← 项目约定</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">&lt;!-- ~/.pi/agent/AGENTS.md：全局，适合放个人习惯 --&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 回复使用中文</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 提交信息遵循 Conventional Commits</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">&lt;!-- ./AGENTS.md：项目根目录，适合放项目约定 --&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 包管理器用 pnpm，不要用 npm/yarn</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 测试命令：pnpm test；lint 命令：pnpm lint</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> src/legacy 下是即将废弃的代码，不要在其中新增功能</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>两个进阶用法：</p><ul><li><strong>目录级覆盖</strong>：某目录存在 <code>AGENTS.override.md</code> 时，pi 加载它而<strong>跳过</strong>该目录的 <code>AGENTS.md</code>/<code>CLAUDE.md</code>（其他目录照常拼接）——适合 monorepo 中个别子包有特殊规则的场景；</li><li><strong>禁用开关</strong>：<code>--no-context-files</code>（<code>-nc</code>）可完全关闭加载，做对比实验时有用。</li></ul><h2 id="_6-6-system-prompt-定制与-monorepo-实践" tabindex="-1">6.6 System Prompt 定制与 monorepo 实践 <a class="header-anchor" href="#_6-6-system-prompt-定制与-monorepo-实践" aria-label="Permalink to &quot;6.6 System Prompt 定制与 monorepo 实践&quot;">​</a></h2><p>默认 system prompt 也可以整体替换或追加：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.pi/SYSTEM.md            ← 项目级，整体替换默认系统提示词</span></span>
<span class="line"><span>~/.pi/agent/SYSTEM.md    ← 全局版</span></span>
<span class="line"><span>APPEND_SYSTEM.md         ← 同目录放置则只追加、不替换</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>大型 monorepo 的推荐组织方式是&quot;全局薄、项目厚、子包精准&quot;：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>my-monorepo/</span></span>
<span class="line"><span>├── AGENTS.md                  # 通用约定：语言、提交规范、顶层命令</span></span>
<span class="line"><span>├── apps/</span></span>
<span class="line"><span>│   └── web/</span></span>
<span class="line"><span>│       └── AGENTS.md          # 前端专属：组件规范、样式方案</span></span>
<span class="line"><span>├── packages/</span></span>
<span class="line"><span>│   └── core/</span></span>
<span class="line"><span>│       ├── AGENTS.md          # 核心库专属：公共 API 变更需评审</span></span>
<span class="line"><span>│       └── AGENTS.override.md # 若此包规则完全独立，覆盖而非叠加</span></span>
<span class="line"><span>└── .pi/</span></span>
<span class="line"><span>    ├── settings.json          # 项目级 pi 设置</span></span>
<span class="line"><span>    └── SYSTEM.md              # 可选：项目级系统提示词</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>配合第 6.4 节的压缩调参，长任务的工作流就完整了：Context Files 保证&quot;常驻知识&quot;永远在，compaction 保证&quot;历史过程&quot;不撑爆窗口。</p><h2 id="本章小结" tabindex="-1">本章小结 <a class="header-anchor" href="#本章小结" aria-label="Permalink to &quot;本章小结&quot;">​</a></h2><ul><li>自动压缩条件：<code>contextTokens &gt; contextWindow - reserveTokens</code>（默认预留 16384）；手动用 <code>/compact [instructions]</code>；</li><li>压缩保留最近 <code>keepRecentTokens</code>（默认 20000）token 的原文，更早内容总结为固定结构化摘要，文件读写记录跨压缩累积；</li><li>工具结果不会被单独切断，序列化时截断到 2000 字符/条；</li><li>Context Files 按 全局 → 父目录链 → 当前目录 顺序拼接 <code>AGENTS.md</code>，<code>AGENTS.override.md</code> 可覆盖所在目录；</li><li><code>.pi/SYSTEM.md</code> 替换系统提示词，<code>APPEND_SYSTEM.md</code> 只追加。</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>在一个测试项目中把 <code>keepRecentTokens</code> 调成 5000 并进行一次超长对话（让 pi 反复读大文件），观察压缩触发的时机与摘要内容。</li><li>为你的某个真实项目编写 <code>AGENTS.md</code>（至少包含构建/测试/lint 三条命令和两条代码约定），重启 pi 后验证 agent 是否遵守。</li><li>用 <code>/compact 聚焦保留 API 设计决策</code> 做一次带指令的手动压缩，对比有无指令时摘要的差异。</li></ol><blockquote><p>完成以上练习后，进入<a href="./ch07.html">下一章：Settings 设置与项目信任</a>。</p></blockquote></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pi/ch06.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
