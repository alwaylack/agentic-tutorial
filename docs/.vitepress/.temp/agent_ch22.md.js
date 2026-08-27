import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"第 22 章 · Agent Skills 标准与 SKILL.md","description":"","frontmatter":{},"headers":[],"relativePath":"agent/ch22.md","filePath":"agent/ch22.md","lastUpdated":1787480284000}');
const __default__ = { name: "agent/ch22.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: "Agent Skills 标准中，哪个 frontmatter 字段缺失会导致技能被拒绝加载？",
        options: [
          "name",
          "description",
          "license",
          "compatibility"
        ],
        answer: 1,
        explain: "官方规范明确：description 是唯一的硬拦截项，缺了就不会加载；其他字段缺失仅警告或不影响。"
      },
      {
        question: "以下哪个 name 值是符合规范的？",
        options: [
          "Code-Review",
          "pdf--merge",
          "data_analysis",
          "changelog-check"
        ],
        answer: 3,
        explain: "name 必须是小写字母/数字/连字符，不能大写、不能连字符开头结尾、不能有连续连字符；下划线也不允许。"
      },
      {
        question: "渐进披露的核心目的是什么？",
        options: [
          "减少技能文件的磁盘占用",
          "让模型启动更快",
          "把常驻上下文成本控制在少量描述，完整指令按需加载",
          "防止技能被恶意篡改"
        ],
        answer: 2,
        explain: "渐进披露确保几十个技能的 description（约 50–200 行）常驻，而完整指令只在匹配时才 read 加载，避免上下文爆炸。"
      },
      {
        question: "关于 name 与目录名的关系，以下说法正确的是？",
        options: [
          "标准强制要求 name 必须与目录名完全一致",
          "pi 允许两者不一致，这是它对标准的宽容扩展",
          "name 可以是任意字符串，不需要校验",
          "目录名会被忽略，只有 name 起作用"
        ],
        answer: 1,
        explain: "Agent Skills 标准原本要求 name 匹配目录名，但 pi 认为这对共享目录不友好，做了宽容扩展：允许 name 与目录名不同。"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-22-章-·-agent-skills-标准与-skill-md" tabindex="-1">第 22 章 · Agent Skills 标准与 SKILL.md <a class="header-anchor" href="#第-22-章-·-agent-skills-标准与-skill-md" aria-label="Permalink to &quot;第 22 章 · Agent Skills 标准与 SKILL.md&quot;">​</a></h1><blockquote><p>本章目标：理解 Agent Skills 开放标准的核心理念，掌握 SKILL.md 的 frontmatter 字段规范，知道技能如何在不撑爆上下文的前提下按需加载。</p></blockquote><h2 id="_22-1-什么是-agent-skills-标准" tabindex="-1">22.1 什么是 Agent Skills 标准 <a class="header-anchor" href="#_22-1-什么是-agent-skills-标准" aria-label="Permalink to &quot;22.1 什么是 Agent Skills 标准&quot;">​</a></h2><p>Agent Skills 是一个<strong>开放标准</strong>（specification），定义了 AI 编码智能体如何以统一格式分发能力包。它的核心贡献是：</p><ul><li><strong>统一接口</strong>：无论使用 Claude Code、Codex、Cursor 还是 Pi，技能的加载方式一致；</li><li><strong>渐进披露</strong>：启动时只有 <code>name</code> + <code>description</code> 进入系统提示，完整指令按需加载；</li><li><strong>自包含</strong>：技能目录可携带脚本、资源文件、参考文档，整体可迁移。</li></ul><p>标准由 <a href="https://agentskills.io" target="_blank" rel="noreferrer">agentskills.io</a> 发布，核心要求只有一条：<strong>技能的根目录必须有一个 <code>SKILL.md</code> 文件</strong>。</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>my-skill/</span></span>
<span class="line"><span>├── SKILL.md              # 必需：frontmatter + 正文指令</span></span>
<span class="line"><span>├── scripts/</span></span>
<span class="line"><span>│   └── helper.py         # 可选：辅助脚本</span></span>
<span class="line"><span>└── references/</span></span>
<span class="line"><span>    └── api-reference.md  # 可选：按需加载的详细文档</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>这个目录结构可以被任何遵守标准的工具发现并加载——这就是&quot;开放&quot;二字的意义。</p><h2 id="_22-2-skill-md-frontmatter-字段详解" tabindex="-1">22.2 SKILL.md Frontmatter 字段详解 <a class="header-anchor" href="#_22-2-skill-md-frontmatter-字段详解" aria-label="Permalink to &quot;22.2 SKILL.md Frontmatter 字段详解&quot;">​</a></h2><p><code>SKILL.md</code> 的第一部分必须是 YAML frontmatter，用于给 agent 提供元数据。官方规范定义了以下字段：</p><table tabindex="0"><thead><tr><th>字段</th><th>必需</th><th>限制</th><th>说明</th></tr></thead><tbody><tr><td><code>name</code></td><td>✅</td><td>≤64 字符，小写 + 数字 + 连字符</td><td>技能的唯一标识；<strong>不要求与目录名相同</strong>（这是 pi 对标准的宽容扩展）</td></tr><tr><td><code>description</code></td><td>✅</td><td>≤1024 字符</td><td><strong>最关键的一行</strong>——决定 agent 何时触发加载；写得具体才有高命中率</td></tr><tr><td><code>license</code></td><td>—</td><td>—</td><td>许可证名称或路径</td></tr><tr><td><code>compatibility</code></td><td>—</td><td>≤500 字符</td><td>运行环境要求（如 Python ≥3.10）</td></tr><tr><td><code>metadata</code></td><td>—</td><td>任意键值</td><td>供工具扩展用的自定义字段</td></tr><tr><td><code>allowed-tools</code></td><td>—</td><td>实验性</td><td>预批准工具列表，避免运行时权限询问</td></tr><tr><td><code>disable-model-invocation</code></td><td>—</td><td>布尔值</td><td>为 true 时技能从系统提示隐藏，只能通过 <code>/skill:name</code> 手动调用</td></tr></tbody></table><h3 id="name-校验规则" tabindex="-1">Name 校验规则 <a class="header-anchor" href="#name-校验规则" aria-label="Permalink to &quot;Name 校验规则&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>有效：changelog-check, pdf-merge, code-review</span></span>
<span class="line"><span>无效：Changelog-Check（大写）、-pdf（连字符开头）、data--analysis（连续连字符）</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="description-的设计原则" tabindex="-1">Description 的设计原则 <a class="header-anchor" href="#description-的设计原则" aria-label="Permalink to &quot;Description 的设计原则&quot;">​</a></h3><p>description 是<strong>触发器</strong>，不是功能说明书。好的 description 应该包含<strong>触发词</strong>和<strong>适用场景</strong>：</p><div class="language-yaml vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 好：具体、包含触发词</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">description</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">  Verify CHANGELOG.md covers all notable changes since the last git tag.</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">  Use when preparing releases or the user mentions changelog.</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 差：模糊，agent 无法判断</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">description</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">Helps with PDFs.</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><div class="tip custom-block"><p class="custom-block-title">官方原话</p><p><em>&quot;The description determines when the agent loads the skill. Be specific.&quot;</em></p></div><h2 id="_22-3-渐进披露机制" tabindex="-1">22.3 渐进披露机制 <a class="header-anchor" href="#_22-3-渐进披露机制" aria-label="Permalink to &quot;22.3 渐进披露机制&quot;">​</a></h2><p>技能的&quot;渐进披露（progressive disclosure）&quot;是它区别于一次性 prompt 的核心设计：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>启动时：</span></span>
<span class="line"><span>  扫描所有技能 → 只把「name + description」注入 system prompt</span></span>
<span class="line"><span>  （约 50–200 行，不撑爆上下文）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>运行中：</span></span>
<span class="line"><span>  agent 判断任务匹配某技能 → 用 read 工具加载完整 SKILL.md</span></span>
<span class="line"><span>  （按需读取，而非全量加载）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>执行时：</span></span>
<span class="line"><span>  按 SKILL.md 中的指令行事，引用相对路径下的 scripts/references</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>这意味着：<strong>你可以安装几十个技能，但常驻上下文的成本只有几十个描述</strong>。</p><h2 id="_22-4-与-mcp-agents-md-的分工差异" tabindex="-1">22.4 与 MCP / AGENTS.md 的分工差异 <a class="header-anchor" href="#_22-4-与-mcp-agents-md-的分工差异" aria-label="Permalink to &quot;22.4 与 MCP / AGENTS.md 的分工差异&quot;">​</a></h2><p>很多读者会问：Skill 和 MCP 工具、AGENTS.md 有什么不同？三者的定位如下：</p><table tabindex="0"><thead><tr><th>维度</th><th>Agent Skill</th><th>MCP Tool</th><th>AGENTS.md</th></tr></thead><tbody><tr><td><strong>形态</strong></td><td>Markdown 指令包</td><td>远程可调用函数</td><td>项目级说明文件</td></tr><tr><td><strong>加载时机</strong></td><td>按需 read</td><td>持续注册到工具列表</td><td>启动时加载</td></tr><tr><td><strong>作用范围</strong></td><td>特定任务工作流</td><td>通用能力（搜索/数据库等）</td><td>整个项目的上下文</td></tr><tr><td><strong>动态性</strong></td><td>可替换/可组合</td><td>独立服务</td><td>静态</td></tr><tr><td><strong>典型场景</strong></td><td>&quot;发版前检查 changelog&quot;</td><td>&quot;搜索 GitHub issues&quot;</td><td>&quot;本项目技术栈是 FastAPI+SQLModel&quot;</td></tr></tbody></table><p>三者互补：AGENTS.md 给全局背景，MCP 提供跨项目通用的基础能力，Skills 封装针对特定任务的最佳实践。</p><h2 id="_22-5-校验规则速查" tabindex="-1">22.5 校验规则速查 <a class="header-anchor" href="#_22-5-校验规则速查" aria-label="Permalink to &quot;22.5 校验规则速查&quot;">​</a></h2><table tabindex="0"><thead><tr><th>问题</th><th>行为</th></tr></thead><tbody><tr><td>缺少 <code>description</code></td><td>❌ 不加载（唯一硬拦截）</td></tr><tr><td><code>name</code> 超长或含非法字符</td><td>⚠️ 警告，仍加载</td></tr><tr><td><code>name</code> 与目录名不一致</td><td>✅ 允许（pi 的扩展）</td></tr><tr><td>同名冲突（多处发现）</td><td>⚠️ 警告，保留先发现者</td></tr><tr><td>未知 frontmatter 字段</td><td>✅ 忽略，不影响加载</td></tr></tbody></table><h2 id="本章小结" tabindex="-1">本章小结 <a class="header-anchor" href="#本章小结" aria-label="Permalink to &quot;本章小结&quot;">​</a></h2><ul><li>Agent Skills 是开放标准，核心是 <code>SKILL.md</code> 文件；</li><li><code>description</code> 决定触发时机，必须具体化；</li><li>渐进披露让上下文成本控制在几十个描述；</li><li>与 MCP/AGENTS.md 分工不同，三者可叠加使用；</li><li>缺 <code>description</code> 是唯一硬拦截，其他问题仅警告。</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>在 <code>~/.pi/agent/skills/test-skill/SKILL.md</code> 创建一个名字为 <code>test-skill</code> 的技能，description 写明&quot;当用户提到单元测试或 test coverage 时使用&quot;。</li><li>故意写一个缺 <code>description</code> 的技能，观察 agent 是否忽略它。</li><li>在 description 中分别测试&quot;模糊版&quot;和&quot;具体版&quot;，对比 agent 触发率。</li></ol><blockquote><p>完成练习后，进入<a href="./ch23.html">下一章：编写高质量技能</a>。</p></blockquote></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("agent/ch22.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
