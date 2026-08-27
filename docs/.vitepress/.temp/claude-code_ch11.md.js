import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"第 11 章 · Skills 技能系统","description":"","frontmatter":{},"headers":[],"relativePath":"claude-code/ch11.md","filePath":"claude-code/ch11.md","lastUpdated":1787480284000}');
const __default__ = { name: "claude-code/ch11.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: 'Claude Code 技能的"渐进披露"是指什么？',
        options: [
          "技能文件分段加密，逐步解锁",
          "启动时只把名称和描述放入系统提示词，完整 SKILL.md 在任务匹配时才由 agent 用 read 加载",
          "技能功能随版本逐步开放",
          "先展示技能列表，用户确认后才安装"
        ],
        answer: 1,
        explain: "渐进披露是技能体系的核心设计：常驻上下文里只有 name+description，完整指令按需加载，因此装几十个技能也不会撑爆上下文。"
      },
      {
        question: "哪种技能会被 Claude Code 直接拒绝加载？",
        options: [
          "name 含大写字母的技能",
          "frontmatter 缺少 description 的技能",
          "description 超过 1024 字符",
          "技能名与目录名不一致"
        ],
        answer: 1,
        explain: '缺少 description 是唯一"不加载"级别的错误；其余问题（名称非法、超长等）只产生警告仍会加载。'
      },
      {
        question: "想让某个技能只能手动触发、不出现在系统提示词中，应该怎么配置？",
        options: [
          "在 name 前加下划线",
          "设置 disable-model-invocation: true",
          "把它移到 references/ 目录",
          '在 description 里写 "不要自动调用"'
        ],
        answer: 1,
        explain: "frontmatter 中设 `disable-model-invocation: true` 后，该技能从 system prompt 隐藏，用户必须通过 `/skill:name` 命令手动调用。"
      },
      {
        question: "SKILL.md 正文中引用技能目录下的 references/api.md，正确的写法是？",
        options: [
          "写绝对路径 /home/user/.claude/skills/x/references/api.md",
          "写相对技能目录的路径，如 references/api.md",
          "用 http://localhost 链接",
          "不能引用其他文件"
        ],
        answer: 1,
        explain: "官方规范要求用相对技能目录的路径引用资源文件，这样技能目录整体移动或分发到其他环境时依然有效。"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-11-章-·-skills-技能系统" tabindex="-1">第 11 章 · Skills 技能系统 <a class="header-anchor" href="#第-11-章-·-skills-技能系统" aria-label="Permalink to &quot;第 11 章 · Skills 技能系统&quot;">​</a></h1><blockquote><p>本章目标：理解 Claude Code 的 Skills 技能体系——SKILL.md 结构、发现机制与渐进披露设计，学会编写自定义技能并在团队内共享。</p></blockquote><h2 id="_11-1-什么是-skill" tabindex="-1">11.1 什么是 Skill <a class="header-anchor" href="#_11-1-什么是-skill" aria-label="Permalink to &quot;11.1 什么是 Skill&quot;">​</a></h2><p>Skill 是一个自包含的能力包：为特定任务提供专用指令、脚本和参考文档。Claude Code 实现了开放的 <strong>Agent Skills 标准</strong>（agentskills.io），与 Pi 等工具兼容。</p><p>核心设计是<strong>渐进披露（progressive disclosure）</strong>：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>启动时：扫描所有技能 → 只把「名称+描述」放进 system prompt</span></span>
<span class="line"><span>运行中：任务匹配某技能 → agent 用 read 工具加载完整 SKILL.md</span></span>
<span class="line"><span>执行时：按 SKILL.md 指令行事，用相对路径引用脚本/资源</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>这样即使装了几十个技能，常驻上下文成本也只有几十行描述。</p><h2 id="_11-2-发现位置与加载规则" tabindex="-1">11.2 发现位置与加载规则 <a class="header-anchor" href="#_11-2-发现位置与加载规则" aria-label="Permalink to &quot;11.2 发现位置与加载规则&quot;">​</a></h2><p>Claude Code 从以下位置加载技能：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>全局:  ~/.claude/skills/</span></span>
<span class="line"><span>项目:  .claude/skills/  （仅受信任的项目）</span></span>
<span class="line"><span>插件:  通过 plugin 安装的 skills/</span></span>
<span class="line"><span>设置:  settings.json 中 skills 数组显式指定</span></span>
<span class="line"><span>CLI:   --skill &lt;path&gt;（可重复，即使 --no-skills 也生效）</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>发现规则细节：</p><ul><li><code>~/.claude/skills/</code> 中<strong>根级散放的 <code>.md</code> 文件</strong>也被识别为独立技能；</li><li>所有位置中含 <code>SKILL.md</code> 的目录会被<strong>递归扫描</strong>；</li><li>项目 <code>.claude/skills/</code> 仅在项目通过 Project Trust 信任后加载。</li></ul><div class="danger custom-block"><p class="custom-block-title">先审查再使用</p><p>技能可以指示模型执行任意操作，还可能携带模型会调用的可执行代码。安装社区技能前务必阅读其内容。</p></div><h2 id="_11-3-skill-md-结构" tabindex="-1">11.3 SKILL.md 结构 <a class="header-anchor" href="#_11-3-skill-md-结构" aria-label="Permalink to &quot;11.3 SKILL.md 结构&quot;">​</a></h2><p>一个技能就是一个含 <code>SKILL.md</code> 的目录：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>my-skill/</span></span>
<span class="line"><span>├── SKILL.md              # 必需：frontmatter + 使用说明</span></span>
<span class="line"><span>├── scripts/              # 辅助脚本</span></span>
<span class="line"><span>│   └── process.sh</span></span>
<span class="line"><span>├── references/           # 按需加载的详细文档</span></span>
<span class="line"><span>│   └── api-reference.md</span></span>
<span class="line"><span>└── assets/</span></span>
<span class="line"><span>    └── template.json</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>frontmatter 字段：</p><table tabindex="0"><thead><tr><th>字段</th><th>必需</th><th>说明</th></tr></thead><tbody><tr><td><code>name</code></td><td>✅</td><td>≤64 字符，小写字母/数字/连字符</td></tr><tr><td><code>description</code></td><td>✅</td><td>≤1024 字符，决定 agent 何时加载</td></tr><tr><td><code>license</code></td><td>—</td><td>许可证</td></tr><tr><td><code>compatibility</code></td><td>—</td><td>环境要求（≤500 字符）</td></tr><tr><td><code>metadata</code></td><td>—</td><td>任意键值对</td></tr><tr><td><code>allowed-tools</code></td><td>—</td><td>预批准工具列表（实验性）</td></tr><tr><td><code>disable-model-invocation</code></td><td>—</td><td>设 true 则只能 <code>/skill:name</code> 手动调用</td></tr></tbody></table><p>校验硬规则：<strong>缺 <code>description</code> 的技能不加载</strong>；其余违规（名字超长等）只警告不阻断。</p><h2 id="_11-4-实战-写一个-code-review-技能" tabindex="-1">11.4 实战：写一个 code-review 技能 <a class="header-anchor" href="#_11-4-实战-写一个-code-review-技能" aria-label="Permalink to &quot;11.4 实战：写一个 code-review 技能&quot;">​</a></h2><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">mkdir</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> -p</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> ~/.claude/skills/code-review/references</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>创建 <code>~/.claude/skills/code-review/SKILL.md</code>：</p><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">---</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">name</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">code-review</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">description</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">Review recent changes for bugs, security issues, and style violations. Use when the user asks to review code or check a pull request.</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">---</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}"># Code Review</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## Steps</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">1.</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> Run </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">\`git diff HEAD~1\`</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> to see recent changes.</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">2.</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> Read each modified file in full context.</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">3.</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> Check for:</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">   -</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> Logic errors and edge cases</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">   -</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> Security vulnerabilities (injection, XSS, auth bypass)</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">   -</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> Performance regressions</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">   -</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> Style guide compliance</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">4.</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> Report findings by severity: Critical / Warning / Suggestion.</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## Rules</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> Do not modify any files unless explicitly asked.</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> Focus on the diff, not the entire codebase.</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> Cite file paths and line numbers for each finding.</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>使用方式：</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 手动触发</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">/skill:code-review</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 带参数</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">/skill:code-review</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> --staged</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 或直接说&quot;帮我 review 这段改动&quot;，agent 自动匹配 description 加载</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="_11-5-团队共享与生态" tabindex="-1">11.5 团队共享与生态 <a class="header-anchor" href="#_11-5-团队共享与生态" aria-label="Permalink to &quot;11.5 团队共享与生态&quot;">​</a></h2><p>团队共享有三种方式：</p><ol><li><strong>项目级目录</strong>：把技能放在项目的 <code>.claude/skills/</code> 中提交到 git，团队成员 clone 即可用；</li><li><strong>Claude Code Plugin</strong>：打包为插件发布到官方 marketplace，自动更新但只读；</li><li><strong>skills.sh</strong>：用 <code>npx skills add &lt;repo&gt;</code> 复制可编辑副本到本地。</li></ol><p>社区推荐仓库：</p><ul><li><a href="https://github.com/anthropics/skills" target="_blank" rel="noreferrer">anthropics/skills</a>——docx/pdf/pptx/xlsx 文档处理、Web 开发；</li><li><a href="https://github.com/mattpocock/skills" target="_blank" rel="noreferrer">mattpocock/skills</a>——精选工程技能，小而可改；</li><li><a href="https://github.com/obra/superpowers" target="_blank" rel="noreferrer">obra/superpowers</a>——完整方法论，技能自动触发。</li></ul><h2 id="本章小结" tabindex="-1">本章小结 <a class="header-anchor" href="#本章小结" aria-label="Permalink to &quot;本章小结&quot;">​</a></h2><ul><li>Skill = 含 SKILL.md 的目录，渐进披露让常驻上下文只有 name+description；</li><li>发现位置：<code>~/.claude/skills/</code>（全局）、<code>.claude/skills/</code>（项目，需信任）、plugin、settings；</li><li>缺 <code>description</code> 是唯一&quot;拒绝加载&quot;级错误，其余仅警告；</li><li>正文用相对路径引用 scripts/references/assets；<code>/skill:name</code> 手动触发。</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>创建一个 <code>commit-helper</code> 技能：读取 <code>git log --oneline -10</code> 和 staged changes，生成符合 Conventional Commits 格式的 commit message。</li><li>给你的技能加上 <code>disable-model-invocation: true</code>，验证它从系统提示词消失、只能手动 <code>/skill:name</code> 调用。</li><li>把 <a href="https://github.com/anthropics/skills" target="_blank" rel="noreferrer">anthropics/skills</a> 克隆到本地，通过 settings 引入并测试其中一个文档处理技能。</li></ol><blockquote><p>完成后进入<a href="./ch12.html">下一章：子代理与并行工作流</a>。</p></blockquote></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("claude-code/ch11.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
