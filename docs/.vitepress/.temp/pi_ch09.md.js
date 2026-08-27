import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"第 9 章 · Skills 技能体系","description":"","frontmatter":{},"headers":[],"relativePath":"pi/ch09.md","filePath":"pi/ch09.md","lastUpdated":1787480284000}');
const __default__ = { name: "pi/ch09.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: "pi 技能的“渐进披露”是指什么？",
        options: [
          "技能文件分段加密，逐步解锁",
          "启动时只把技能名称和描述放入系统提示词，完整 SKILL.md 在任务匹配时才由 agent 用 read 加载",
          "技能功能随 pi 版本逐步开放",
          "先展示技能列表，用户确认后才安装"
        ],
        answer: 1,
        explain: "渐进披露是技能体系的核心设计：常驻上下文里只有 name+description，完整指令按需加载，因此装几十个技能也不会撑爆上下文。"
      },
      {
        question: "哪个技能会被 pi 直接拒绝加载？",
        options: [
          "name 含大写字母的技能",
          "frontmatter 缺少 description 的技能",
          "description 超过 1024 字符",
          "技能名与目录名不一致"
        ],
        answer: 1,
        explain: "官方明确的硬性例外：缺少 description 的技能不加载；其余问题（名称非法、超长等）大多只产生警告仍会加载，名字与目录不同 pi 也允许。"
      },
      {
        question: "项目里的 .agents/skills/ 目录中的技能，什么时候可用？",
        options: [
          "任何时候都自动加载",
          "仅在项目通过 Project Trust 信任之后加载",
          "需要 root 权限",
          "只有在 RPC 模式下可用"
        ],
        answer: 1,
        explain: "项目位置的技能（.pi/skills/ 与 .agents/skills/）受项目信任机制门控：信任该项目后才加载其技能、扩展与设置，防止恶意仓库借技能执行代码。"
      },
      {
        question: "SKILL.md 正文中想引用技能目录下的 references/api.md，正确的写法是？",
        options: [
          "写绝对路径 /home/user/.pi/agent/skills/x/references/api.md",
          "写相对技能目录的路径，如 references/api.md",
          "用 http://localhost 链接",
          "不能引用其他文件，必须全部写在 SKILL.md 里"
        ],
        answer: 1,
        explain: "官方规范要求用相对技能目录的路径引用脚本与资源（如 ./scripts/run.sh、references/api.md），这样技能目录整体移动或分发时依然有效。"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-9-章-·-skills-技能体系" tabindex="-1">第 9 章 · Skills 技能体系 <a class="header-anchor" href="#第-9-章-·-skills-技能体系" aria-label="Permalink to &quot;第 9 章 · Skills 技能体系&quot;">​</a></h1><blockquote><p>本章目标：理解技能（Skill）的渐进披露工作原理，掌握 SKILL.md 的结构与 frontmatter 字段，动手编写一个带脚本资源的可复用技能。</p></blockquote><h2 id="_9-1-技能是什么-按需加载的能力包" tabindex="-1">9.1 技能是什么：按需加载的能力包 <a class="header-anchor" href="#_9-1-技能是什么-按需加载的能力包" aria-label="Permalink to &quot;9.1 技能是什么：按需加载的能力包&quot;">​</a></h2><p>技能是自包含的能力包：为特定任务提供专用工作流、安装说明、辅助脚本和参考文档。pi 实现了开放的 <a href="https://agentskills.io" target="_blank" rel="noreferrer">Agent Skills 标准</a>（对标准的小偏差是宽容的，比如允许技能名与目录名不同）。</p><p>核心设计是<strong>渐进披露（progressive disclosure）</strong>：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>启动时：扫描所有技能 → 只把「名称+描述」放进 system prompt</span></span>
<span class="line"><span>运行中：任务匹配某技能 → agent 用 read 工具加载完整 SKILL.md</span></span>
<span class="line"><span>执行时：按 SKILL.md 指令行事，用相对路径引用脚本/资源</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>这样即使装了几十个技能，常驻上下文成本也只有几十行描述；完整指令只在真正需要时进入对话。</p><h2 id="_9-2-发现位置与安全前提" tabindex="-1">9.2 发现位置与安全前提 <a class="header-anchor" href="#_9-2-发现位置与安全前提" aria-label="Permalink to &quot;9.2 发现位置与安全前提&quot;">​</a></h2><p>pi 从以下位置加载技能（<code>--no-skills</code> 可禁用发现，显式 <code>--skill &lt;path&gt;</code> 仍生效）：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>全局:  ~/.pi/agent/skills/    ~/.agents/skills/</span></span>
<span class="line"><span>项目:  .pi/skills/            .agents/skills/（cwd 向上到 git 根）</span></span>
<span class="line"><span>                      ↑ 项目位置仅在项目受信任后加载（见第 7 章）</span></span>
<span class="line"><span>包:    skills/ 目录或 package.json 的 pi.skills 声明</span></span>
<span class="line"><span>设置:  skills 数组显式指定文件或目录</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>发现规则细节：<code>~/.pi/agent/skills/</code> 与 <code>.pi/skills/</code> 中<strong>根级散放的 <code>.md</code> 文件</strong>也会被识别为独立技能；但 <code>~/.agents/skills/</code> 和项目 <code>.agents/skills/</code> 中根级 <code>.md</code> 被忽略——只有含 <code>SKILL.md</code> 的目录才算技能，且目录递归扫描。</p><div class="danger custom-block"><p class="custom-block-title">先审查再使用</p><p>官方在文档中反复强调：技能可以指示模型执行任意操作，还可能携带模型会调用的可执行代码。安装社区技能前务必阅读其内容。</p></div><p>复用其他工具的技能只需加路径——Claude Code / Codex 的技能库直接兼容：</p><div class="language-jsonc vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">jsonc</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">// ~/.pi/agent/settings.json</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;skills&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: [</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;~/.claude/skills&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">, </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;~/.codex/skills&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">]</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="_9-3-skill-md-结构与-frontmatter" tabindex="-1">9.3 SKILL.md 结构与 frontmatter <a class="header-anchor" href="#_9-3-skill-md-结构与-frontmatter" aria-label="Permalink to &quot;9.3 SKILL.md 结构与 frontmatter&quot;">​</a></h2><p>一个技能就是一个含 <code>SKILL.md</code> 的目录，其余内容自由发挥：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>pdf-tools/</span></span>
<span class="line"><span>├── SKILL.md              # 必需：frontmatter + 使用说明</span></span>
<span class="line"><span>├── scripts/              # 辅助脚本</span></span>
<span class="line"><span>│   └── merge.sh</span></span>
<span class="line"><span>├── references/           # 按需加载的详细文档</span></span>
<span class="line"><span>│   └── api-reference.md</span></span>
<span class="line"><span>└── assets/</span></span>
<span class="line"><span>    └── template.json</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>frontmatter 字段（依据 Agent Skills 规范）：</p><table tabindex="0"><thead><tr><th>字段</th><th>必需</th><th>说明</th></tr></thead><tbody><tr><td><code>name</code></td><td>✅</td><td>≤64 字符，小写字母/数字/连字符，不可连字符开头结尾或连续</td></tr><tr><td><code>description</code></td><td>✅</td><td>≤1024 字符，<strong>决定 agent 何时加载它</strong></td></tr><tr><td><code>license</code></td><td>—</td><td>许可证</td></tr><tr><td><code>compatibility</code></td><td>—</td><td>环境要求（≤500 字符）</td></tr><tr><td><code>metadata</code></td><td>—</td><td>任意键值对</td></tr><tr><td><code>allowed-tools</code></td><td>—</td><td>预批准工具列表（实验性）</td></tr><tr><td><code>disable-model-invocation</code></td><td>—</td><td>设 true 则从 system prompt 隐藏，只能 <code>/skill:name</code> 手动调用</td></tr></tbody></table><p>校验规则要记两条硬线：<strong>缺 description 的技能不加载</strong>；其余违规（名字超长、非法字符等）只警告不阻断。同名冲突时保留先发现的并警告。</p><p><code>description</code> 是整个技能最关键的一行字——它就是&quot;何时用我&quot;的判断依据。对比官方给的示例：</p><div class="language-yaml vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 好：具体、包含触发词</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">description</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">Extracts text and tables from PDF files, fills PDF forms, and merges multiple PDFs. Use when working with PDF documents.</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 差：模糊，agent 无法判断适用时机</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">description</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">Helps with PDFs.</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="_9-4-实战-写一个-changelog-check-技能" tabindex="-1">9.4 实战：写一个 changelog-check 技能 <a class="header-anchor" href="#_9-4-实战-写一个-changelog-check-技能" aria-label="Permalink to &quot;9.4 实战：写一个 changelog-check 技能&quot;">​</a></h2><p>下面是一个完整、可直接使用的技能：发布前检查 CHANGELOG 是否覆盖了本版变更。</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">mkdir</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> -p</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> ~/.pi/agent/skills/changelog-check/scripts</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">&lt;!-- ~/.pi/agent/skills/changelog-check/SKILL.md --&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">---</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">name: changelog-check</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">description: 发布前检查 CHANGELOG.md 是否覆盖了自上一个 git tag 以来的全部重要变更。当用户准备发版或提到 changelog 时使用。</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">---</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}"># Changelog Check</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## 步骤</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">1.</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 找到上一个发布 tag：</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">   \`\`\`bash</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">   git describe --tags --abbrev</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">0</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><ol start="2"><li>列出该 tag 之后的提交（<code>git log &lt;tag&gt;..HEAD --oneline</code>）， 归类为 新增 / 变更 / 修复。</li><li>读取 CHANGELOG.md，检查每条已归类提交是否出现在未发布区块。</li><li>汇报：缺失条目以列表形式输出；全部覆盖则打印 &quot;OK&quot;。</li></ol><h2 id="规则" tabindex="-1">规则 <a class="header-anchor" href="#规则" aria-label="Permalink to &quot;规则&quot;">​</a></h2><ul><li>除非用户明确要求，不要修改 CHANGELOG.md。</li><li>忽略 merge 提交以及对用户无影响的 <code>chore:</code> 提交。</li></ul><p>Keep-a-Changelog 的格式细节见 <code>references/format.md</code>。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>::: warning 关于示例的语言与格式</span></span>
<span class="line"><span>上面是**一个完整文件的原始内容**（所以没有教程式的小节编号）。技能正文是给模型读的自然语言指令，用中文或英文都可以——英文便于跨团队共享，团队内部使用时直接写中文完全没问题（模型两种语言都能理解）。\`name\` 字段例外：必须是小写字母/数字/连字符，不能用中文。</span></span>
<span class="line"><span>:::</span></span>
<span class="line"><span></span></span>
<span class="line"><span>使用方式有两种：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`\`\`bash</span></span>
<span class="line"><span>/skill:changelog-check          # 手动强制加载执行</span></span>
<span class="line"><span>/skill:changelog-check v2.1     # 参数会以 User: &lt;args&gt; 追加到技能内容后</span></span>
<span class="line"><span># 或者直接说&quot;准备发版吧&quot;，agent 匹配到描述后自动 read 加载</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><div class="tip custom-block"><p class="custom-block-title">正文结构是自由的</p><p>上面的 <code>## Steps</code>、<code>## Rules</code> 只是给模型看的普通 markdown 约定——pi 只解析 frontmatter（<code>name</code>/<code>description</code> 等），正文怎么分节完全由你决定（官方示例惯用 <code>## Setup</code>/<code>## Usage</code>）。真正被“执行”的是模型读到的自然语言指令。</p></div><p>要点回顾：正文里引用资源必须用<strong>相对技能目录的路径</strong>（如上例的 <code>references/format.md</code>）；<code>enableSkillCommands</code> 设置（默认开启）控制是否注册 <code>/skill:name</code> 命令。</p><h2 id="_9-5-从社区获取技能" tabindex="-1">9.5 从社区获取技能 <a class="header-anchor" href="#_9-5-从社区获取技能" aria-label="Permalink to &quot;9.5 从社区获取技能&quot;">​</a></h2><p>两个官方推荐的技能仓库：</p><ul><li><a href="https://github.com/anthropics/skills" target="_blank" rel="noreferrer">Anthropic Skills</a>——docx/pdf/pptx/xlsx 文档处理、Web 开发；</li><li><a href="https://github.com/badlogic/pi-skills" target="_blank" rel="noreferrer">Pi Skills</a>——网页搜索、浏览器自动化、Google API、转写。</li></ul><p>克隆后把路径加进 settings 的 <code>skills</code> 数组即可（配合第 13 章的包机制还能做到版本化管理）。也可以直接让 pi 帮你写一个——官方文档原话是 &quot;ask pi to build one for your use case&quot;（让 pi 为你的用例现场写一个技能）。</p><h2 id="本章小结" tabindex="-1">本章小结 <a class="header-anchor" href="#本章小结" aria-label="Permalink to &quot;本章小结&quot;">​</a></h2><ul><li>技能 = 含 <code>SKILL.md</code> 的目录，渐进披露：平时只有 name+description 进上下文；</li><li>项目技能目录（<code>.pi/skills/</code>、<code>.agents/skills/</code>）受 Project Trust 门控；</li><li>frontmatter 硬规则：<code>name</code> 小写连字符 ≤64 字符，<code>description</code> 缺失则不加载，其余违规仅警告；</li><li><code>description</code> 写得具体与否直接决定自动触发的可靠性；</li><li>正文用相对路径引用 scripts/references/assets；<code>/skill:name [args]</code> 手动触发。</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>完整实现本章的 changelog-check 技能（补上 <code>references/format.md</code>），在一个有真实 tag 的仓库里验证。</li><li>把 Anthropic Skills 仓库克隆到本地并通过 settings 引入，测试其中一个文档处理技能。</li><li>给你的技能加上 <code>disable-model-invocation: true</code>，验证它从系统提示词消失、只能手动 <code>/skill:name</code> 调用。</li></ol><blockquote><p>完成练习后，进入<a href="./ch10.html">下一章：Extensions 入门</a>。</p></blockquote></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pi/ch09.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
