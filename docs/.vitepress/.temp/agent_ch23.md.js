import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"第 23 章 · 编写高质量技能","description":"","frontmatter":{},"headers":[],"relativePath":"agent/ch23.md","filePath":"agent/ch23.md","lastUpdated":1787480284000}');
const __default__ = { name: "agent/ch23.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: "关于 SKILL.md 的 description 字段，以下哪种写法最符合官方建议？",
        options: [
          'description: "A skill for checking code quality."',
          'description: "Checks code quality. Use when reviewing code."',
          `description: "Validates code against project style guidelines and common anti-patterns. Use when the user asks for a code review or says 'review this'. "`,
          'description: "This skill helps you write better code by checking for issues."'
        ],
        answer: 2,
        explain: '官方强调 description 要"具体化触发词"：说明适用场景、包含触发短语（如 "review this"），让 agent 能准确判断何时加载。'
      },
      {
        question: "技能正文中引用外部资源文件时，正确的做法是？",
        options: [
          "使用绝对路径如 /home/user/.pi/skills/x/reference.md",
          "使用相对于技能目录的路径如 references/api.md",
          "在 SKILL.md 中内联所有引用内容",
          "用 http://localhost 链接指向本地文件"
        ],
        answer: 1,
        explain: "官方规范明确要求使用相对技能目录的路径，这样技能目录整体移动或分发时引用依然有效。"
      },
      {
        question: "以下哪个字段缺失会导致技能被拒绝加载？",
        options: [
          "license",
          "compatibility",
          "description",
          "metadata"
        ],
        answer: 2,
        explain: "description 是唯一的硬拦截字段——缺了 description 技能不会加载；其他字段缺失仅产生警告。"
      },
      {
        question: 'Skills 的"渐进披露"机制是指什么？',
        options: [
          "技能功能随版本逐步开放",
          "启动时只有 name+description 进上下文，完整指令按需加载",
          "技能文件分段加密，逐步解锁",
          "先展示技能列表，用户确认后才安装"
        ],
        answer: 1,
        explain: "渐进披露确保常驻上下文只有几十个描述（约 50–200 行），完整 SKILL.md 只在任务匹配时由 agent 用 read 工具加载。"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-23-章-·-编写高质量技能" tabindex="-1">第 23 章 · 编写高质量技能 <a class="header-anchor" href="#第-23-章-·-编写高质量技能" aria-label="Permalink to &quot;第 23 章 · 编写高质量技能&quot;">​</a></h1><blockquote><p>本章目标：掌握 SKILL.md 正文结构惯例、description 写作技巧、资源引用规则，能独立编写一个可直接使用的生产级技能。</p></blockquote><h2 id="_23-1-description-的-好坏对比" tabindex="-1">23.1 Description 的&quot;好坏对比&quot; <a class="header-anchor" href="#_23-1-description-的-好坏对比" aria-label="Permalink to &quot;23.1 Description 的&quot;好坏对比&quot;&quot;">​</a></h2><p>description 是整个技能最关键的字段——它直接决定 agent 是否会在正确时机加载你。官方给出的对比示例：</p><div class="language-yaml vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 差：模糊，agent 无法判断适用时机</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">description</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">Helps with PDFs.</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 好：具体、包含触发词</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">description</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">  Extracts text and tables from PDF files, fills PDF forms, and merges</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">  multiple PDFs. Use when working with PDF documents or the user mentions</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">  PDF extraction, form filling, or merging.</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>另一个常见错误是写成功能说明书而非触发条件：</p><div class="language-yaml vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 错误：描述功能</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">description</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">This skill parses changelog entries and validates them against git commits.</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 正确：描述触发场景</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">description</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">  Verify CHANGELOG.md entries match git commits since the last tag.</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">  Use when the user says &quot;check changelog&quot;, &quot;validate release notes&quot;,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">  or is preparing a release.</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><div class="tip custom-block"><p class="custom-block-title">记忆口诀</p><p><strong>写&quot;什么时候用我&quot;，不要写&quot;我能做什么&quot;。</strong></p></div><h2 id="_23-2-正文结构惯例" tabindex="-1">23.2 正文结构惯例 <a class="header-anchor" href="#_23-2-正文结构惯例" aria-label="Permalink to &quot;23.2 正文结构惯例&quot;">​</a></h2><p>SKILL.md 正文没有强制格式，但社区形成了四个常用小节：</p><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">---</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">name</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">my-skill</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">description</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">  Trigger phrase here.</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">---</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}"># My Skill Name</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## Setup</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">一次性的初始化步骤（如安装依赖、配置密钥）。</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## Steps</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">按序执行的步骤清单，每步带具体命令或路径。</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## Rules</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">行为约束：什么不能做、什么必须遵守。</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## Examples</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">1–2 个典型输入输出示例，帮助 agent 理解期望行为。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h3 id="setup-节的作用" tabindex="-1">Setup 节的作用 <a class="header-anchor" href="#setup-节的作用" aria-label="Permalink to &quot;Setup 节的作用&quot;">​</a></h3><p>Setup 用于<strong>一次性配置</strong>，不该每次运行都执行：</p><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## Setup</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">1.</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> Install dependencies: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">\`pip install -r requirements.txt\`</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">2.</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> Set API key: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">\`export MY_API_KEY=sk-xxx\`</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="steps-节的写法" tabindex="-1">Steps 节的写法 <a class="header-anchor" href="#steps-节的写法" aria-label="Permalink to &quot;Steps 节的写法&quot;">​</a></h3><p>Steps 要<strong>具体到可执行</strong>，避免&quot;分析代码&quot;这种模糊指令：</p><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## Steps</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">1.</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 找到上一个发布 tag：</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">   \`\`\`bash</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">   git describe --tags --abbrev</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">0</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><ol start="2"><li>列出该 tag 之后的提交（<code>git log &lt;tag&gt;..HEAD --oneline</code>）， 归类为 Added / Changed / Fixed。</li><li>读取 CHANGELOG.md，检查每条已归类提交是否出现在未发布区块。</li><li>汇报：缺失条目以列表输出；全部覆盖则打印 &quot;OK&quot;。</li></ol><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>## 23.3 资源引用规则</span></span>
<span class="line"><span></span></span>
<span class="line"><span>技能正文中引用外部资源时，**必须使用相对于技能目录的路径**：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`\`\`markdown</span></span>
<span class="line"><span># 正确：相对路径</span></span>
<span class="line"><span>See [the reference guide](references/REFERENCE.md) for details.</span></span>
<span class="line"><span>Run \`./scripts/process.sh &lt;input&gt;\` to execute.</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 错误：绝对路径（迁移后失效）</span></span>
<span class="line"><span>See [/home/user/.pi/skills/my-skill/references/...](...)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>官方规范要求：</p><blockquote><p><em>&quot;Use relative paths from the skill directory.&quot;</em></p></blockquote><p>这意味着技能的整个目录可以整体移动或分发，引用依然有效。</p><h2 id="_23-4-完整示例-changelog-check-技能" tabindex="-1">23.4 完整示例：changelog-check 技能 <a class="header-anchor" href="#_23-4-完整示例-changelog-check-技能" aria-label="Permalink to &quot;23.4 完整示例：changelog-check 技能&quot;">​</a></h2><p>下面是一个可直接使用的完整技能：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>~/.pi/agent/skills/changelog-check/</span></span>
<span class="line"><span>├── SKILL.md</span></span>
<span class="line"><span>└── references/</span></span>
<span class="line"><span>    └── format.md      # Keep-a-Changelog 格式说明</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><code>SKILL.md</code> 内容：</p><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">---</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">name</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">changelog-check</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">description</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">  Verify CHANGELOG.md covers all notable changes since the last git tag.</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">  Use when preparing releases or the user mentions changelog.</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">---</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}"># Changelog Check</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## Steps</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">1.</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> Find the previous release tag:</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">   \`\`\`bash</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">   git describe --tags --abbrev</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">0</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><ol start="2"><li>List commits since that tag and classify into Added / Changed / Fixed.</li><li>Read CHANGELOG.md and check every classified commit appears in the unreleased section.</li><li>Report: missing entries as a list; if complete, print &quot;OK&quot;.</li></ol><h2 id="rules" tabindex="-1">Rules <a class="header-anchor" href="#rules" aria-label="Permalink to &quot;Rules&quot;">​</a></h2><ul><li>Do not modify CHANGELOG.md unless explicitly asked.</li><li>Ignore merge commits and <code>chore:</code> commits with no user impact.</li></ul><h2 id="references" tabindex="-1">References <a class="header-anchor" href="#references" aria-label="Permalink to &quot;References&quot;">​</a></h2><p>See <code>references/format.md</code> for the expected Keep-a-Changelog format details.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>## 23.5 验证与调试方法</span></span>
<span class="line"><span></span></span>
<span class="line"><span>编写技能后，如何确认它工作正常？</span></span>
<span class="line"><span></span></span>
<span class="line"><span>### 方法一：手动触发测试</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`\`\`bash</span></span>
<span class="line"><span># 强制加载技能并执行</span></span>
<span class="line"><span>/skill:changelog-check v2.1.0</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h3 id="方法二-观察-system-prompt" tabindex="-1">方法二：观察 system prompt <a class="header-anchor" href="#方法二-观察-system-prompt" aria-label="Permalink to &quot;方法二：观察 system prompt&quot;">​</a></h3><p>在 agent 启动时检查 system prompt 中是否出现了你的技能 description：</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># Claude Code 可打开系统提示查看</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 或在会话中输入 /help 查看可用技能列表</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="方法三-检查加载日志" tabindex="-1">方法三：检查加载日志 <a class="header-anchor" href="#方法三-检查加载日志" aria-label="Permalink to &quot;方法三：检查加载日志&quot;">​</a></h3><p>大多数工具会在加载技能时输出日志，包含：</p><ul><li>技能名称</li><li>是否匹配触发条件</li><li>加载耗时</li></ul><div class="warning custom-block"><p class="custom-block-title">常见坑</p><p>技能描述写得太宽泛（如 &quot;Helps with code&quot;）会导致<strong>误触发</strong>——agent 在无关任务时也加载你的技能，浪费上下文。描述越具体，触发越精准。</p></div><h2 id="本章小结" tabindex="-1">本章小结 <a class="header-anchor" href="#本章小结" aria-label="Permalink to &quot;本章小结&quot;">​</a></h2><ul><li>description 决定触发，要写&quot;什么时候用我&quot;而非&quot;我能做什么&quot;；</li><li>正文建议分 Setup / Steps / Rules / Examples 四节；</li><li>资源引用必须用相对技能目录的路径；</li><li>用 <code>/skill:name</code> 手动测试，观察 system prompt 验证加载。</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>为本站的 pytest 教程编写一个 <code>pytest-review</code> 技能：当用户说&quot;审查测试&quot;时，检查测试文件是否遵循最佳实践（断言丰富、fixture 命名规范等）。</li><li>故意写一个模糊的 description（如 &quot;Helps with testing&quot;），观察它是否会在无关任务中被误触发。</li><li>在技能正文中添加一个 <code>references/api.md</code> 引用，验证相对路径加载是否正常工作。</li></ol><blockquote><p>完成练习后，进入<a href="./ch24.html">下一章：技能生态与团队治理</a>。</p></blockquote></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("agent/ch23.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
