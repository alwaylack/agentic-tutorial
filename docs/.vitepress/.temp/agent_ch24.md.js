import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"第 24 章 · 技能生态与团队治理","description":"","frontmatter":{},"headers":[],"relativePath":"agent/ch24.md","filePath":"agent/ch24.md","lastUpdated":1787480284000}');
const __default__ = { name: "agent/ch24.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: "以下哪个工具目前不原生支持 Agent Skills 标准？",
        options: [
          "Claude Code",
          "OpenAI Codex",
          "PyCharm 内置 AI 助手",
          "Pi"
        ],
        answer: 2,
        explain: "截至 2025 年中，PyCharm 内置 AI 助手尚未原生支持 Agent Skills 标准；Claude Code、Codex、Pi、Cursor 等均兼容。"
      },
      {
        question: '团队共享技能时，哪种方式可以实现"订阅即更新"？',
        options: [
          "直接复制 SKILL.md 到本地目录",
          "通过 git submodule 引用远程仓库",
          "使用 npm 包或 git 仓库 URL 配置到 settings",
          "将技能打包成可执行二进制"
        ],
        answer: 2,
        explain: "settings 中配置 git 仓库或 npm 包后，工具可自动拉取最新技能；直接复制不会自动更新。"
      },
      {
        question: "关于第三方技能的安全评审，以下哪项不是必须的？",
        options: [
          "阅读 SKILL.md 全部内容",
          "检查是否有危险 shell 命令",
          "在沙箱中运行技能验证功能",
          "确认资源引用路径在可控范围内"
        ],
        answer: 2,
        explain: "官方安全建议包括阅读内容、检查命令、确认资源路径，但未强制要求在沙箱中运行——不过对于高危技能，沙箱测试是加分项。"
      },
      {
        question: "以下哪种场景最适合使用 disable-model-invocation: true？",
        options: [
          "日常开发辅助技能",
          "涉及生产环境部署的高权限技能",
          "代码格式化工具",
          "文档生成技能"
        ],
        answer: 1,
        explain: "高权限技能（如生产部署）应设为手动触发，避免 agent 在无关任务中意外执行危险操作。"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-24-章-·-技能生态与团队治理" tabindex="-1">第 24 章 · 技能生态与团队治理 <a class="header-anchor" href="#第-24-章-·-技能生态与团队治理" aria-label="Permalink to &quot;第 24 章 · 技能生态与团队治理&quot;">​</a></h1><blockquote><p>本章目标：了解 Anthropic 官方技能仓库、主流工具的兼容情况，掌握团队共享技能的安全评审清单。</p></blockquote><h2 id="_24-1-官方与社区技能仓库" tabindex="-1">24.1 官方与社区技能仓库 <a class="header-anchor" href="#_24-1-官方与社区技能仓库" aria-label="Permalink to &quot;24.1 官方与社区技能仓库&quot;">​</a></h2><h3 id="anthropic-skills-仓库" tabindex="-1">Anthropic Skills 仓库 <a class="header-anchor" href="#anthropic-skills-仓库" aria-label="Permalink to &quot;Anthropic Skills 仓库&quot;">​</a></h3><p>Anthropic 维护了一个官方技能集合：<a href="https://github.com/anthropics/skills" target="_blank" rel="noreferrer">anthropics/skills</a>。其中包含：</p><ul><li><strong>文档处理技能</strong>：PDF 提取、Word 转换、PPT 解析；</li><li><strong>Web 开发技能</strong>：前端构建、API 设计、部署流水线；</li><li><strong>代码质量技能</strong>：安全扫描、性能分析、重构建议。</li></ul><p>这些技能遵循 Agent Skills 标准，可直接被任何兼容工具加载。</p><h3 id="其他知名技能源" tabindex="-1">其他知名技能源 <a class="header-anchor" href="#其他知名技能源" aria-label="Permalink to &quot;其他知名技能源&quot;">​</a></h3><table tabindex="0"><thead><tr><th>来源</th><th>特点</th></tr></thead><tbody><tr><td><a href="https://github.com/mattpocock/skills" target="_blank" rel="noreferrer">mattpocock/skills</a></td><td>TypeScript 生态精选技能，强调&quot;小而可改&quot;</td></tr><tr><td><a href="https://github.com/obra/superpowers" target="_blank" rel="noreferrer">obra/superpowers</a></td><td>完整开发方法论，技能自动触发</td></tr><tr><td><a href="https://github.com/Fission-AI/OpenSpec" target="_blank" rel="noreferrer">Fission-AI/OpenSpec</a></td><td>规格驱动开发，变更即工件</td></tr></tbody></table><h2 id="_24-2-跨工具兼容性" tabindex="-1">24.2 跨工具兼容性 <a class="header-anchor" href="#_24-2-跨工具兼容性" aria-label="Permalink to &quot;24.2 跨工具兼容性&quot;">​</a></h2><p>Agent Skills 标准的设计目标之一就是<strong>跨工具兼容</strong>。目前主流工具都已支持：</p><div class="language-json vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">// ~/.pi/agent/settings.json</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;skills&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: [</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">    &quot;~/.claude/skills&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,       </span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">// Claude Code 技能目录</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">    &quot;~/.codex/skills&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,        </span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">// OpenAI Codex 技能目录</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">    &quot;~/.pi/agent/skills&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,     </span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">// Pi 全局技能</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">    &quot;./.pi/skills&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">            // 项目级技能（需信任项目）</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">  ]</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>兼容工具清单（截至 2025 年中）：</p><ul><li><strong>Claude Code</strong>（Anthropic）</li><li><strong>Codex</strong>（OpenAI）</li><li><strong>Cursor</strong> / <strong>Windsurf</strong> / <strong>VS Code Copilot</strong></li><li><strong>Gemini CLI</strong>（Google）</li><li><strong>Pi</strong>（本教程平台）</li><li><strong>Devin</strong>、<strong>Aider</strong>、<strong>Opencode</strong> 等</li></ul><div class="tip custom-block"><p class="custom-block-title">提示</p><p>不同工具对标准的实现程度可能略有差异，建议查阅具体工具的文档确认。</p></div><h2 id="_24-3-团队共享方式" tabindex="-1">24.3 团队共享方式 <a class="header-anchor" href="#_24-3-团队共享方式" aria-label="Permalink to &quot;24.3 团队共享方式&quot;">​</a></h2><h3 id="方式一-git-仓库-settings-引用" tabindex="-1">方式一：Git 仓库 + settings 引用 <a class="header-anchor" href="#方式一-git-仓库-settings-引用" aria-label="Permalink to &quot;方式一：Git 仓库 + settings 引用&quot;">​</a></h3><div class="language-json vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;skills&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: [</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;https://github.com/myteam/project-skills&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">]</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="方式二-内部-npm-包" tabindex="-1">方式二：内部 npm 包 <a class="header-anchor" href="#方式二-内部-npm-包" aria-label="Permalink to &quot;方式二：内部 npm 包&quot;">​</a></h3><p>将技能打包为 npm 包，团队成员 <code>npm install</code> 后引用：</p><div class="language-json vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;skills&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: [</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;@myorg/team-skills&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">]</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="方式三-monorepo-中的-shared-skills-目录" tabindex="-1">方式三：monorepo 中的 shared/skills 目录 <a class="header-anchor" href="#方式三-monorepo-中的-shared-skills-目录" aria-label="Permalink to &quot;方式三：monorepo 中的 shared/skills 目录&quot;">​</a></h3><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>monorepo/</span></span>
<span class="line"><span>├── packages/</span></span>
<span class="line"><span>│   ├── frontend/</span></span>
<span class="line"><span>│   └── backend/</span></span>
<span class="line"><span>└── skills/                    # 共享技能</span></span>
<span class="line"><span>    ├── code-review/</span></span>
<span class="line"><span>    │   └── SKILL.md</span></span>
<span class="line"><span>    └── deploy-check/</span></span>
<span class="line"><span>        └── SKILL.md</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>在根目录 <code>settings.json</code> 中引用：</p><div class="language-json vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;skills&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: [</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;./skills&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">]</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="_24-4-安全评审清单" tabindex="-1">24.4 安全评审清单 <a class="header-anchor" href="#_24-4-安全评审清单" aria-label="Permalink to &quot;24.4 安全评审清单&quot;">​</a></h2><p>引入第三方技能前，务必完成以下检查：</p><table tabindex="0"><thead><tr><th>检查项</th><th>说明</th></tr></thead><tbody><tr><td><strong>源码可读</strong></td><td>能看懂 SKILL.md 的全部内容</td></tr><tr><td><strong>无恶意命令</strong></td><td>检查 steps 中是否有危险 shell 命令</td></tr><tr><td><strong>资源隔离</strong></td><td>确认引用的 scripts/references 在可控范围内</td></tr><tr><td><strong>权限最小化</strong></td><td>技能是否请求了超出需要的工具权限</td></tr><tr><td><strong>更新机制</strong></td><td>订阅源是否可信，更新是否自动且可回滚</td></tr></tbody></table><div class="danger custom-block"><p class="custom-block-title">安全警告</p><p>技能可以指示模型执行任意操作，还可能携带可执行代码。安装社区技能前务必阅读其内容。</p></div><h2 id="_24-5-团队治理建议" tabindex="-1">24.5 团队治理建议 <a class="header-anchor" href="#_24-5-团队治理建议" aria-label="Permalink to &quot;24.5 团队治理建议&quot;">​</a></h2><ol><li><strong>建立技能审核流程</strong>：新增技能需经 tech lead review；</li><li><strong>版本化管理</strong>：使用 git tags 标记技能版本，避免静默更新；</li><li><strong>禁用自动触发敏感技能</strong>：对涉及生产环境操作的技能设置 <code>disable-model-invocation: true</code>；</li><li><strong>定期清理</strong>：移除不再使用的技能，减少上下文噪音。</li></ol><h2 id="本章小结" tabindex="-1">本章小结 <a class="header-anchor" href="#本章小结" aria-label="Permalink to &quot;本章小结&quot;">​</a></h2><ul><li>Anthropic 官方仓库提供文档处理、Web 开发等精选技能；</li><li>主流工具（Claude Code/Codex/Pi/Cursor 等）均已兼容 Agent Skills 标准；</li><li>团队共享可通过 git 仓库、npm 包或 monorepo 实现；</li><li>安全评审必查：源码可读性、无恶意命令、权限最小化。</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>克隆 <a href="https://github.com/anthropics/skills" target="_blank" rel="noreferrer">anthropics/skills</a> 仓库，选择一个文档处理技能阅读其 SKILL.md，分析其 description 设计。</li><li>在团队 monorepo 中创建 <code>skills/</code> 目录，添加一个自定义技能并通过 settings 引入。</li><li>对一个引入的外部技能执行安全评审，填写评审清单并记录发现。</li></ol><blockquote><p>完成练习后，进入<a href="./ch25.html">下一章：三大技能仓库对比</a>。</p></blockquote></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("agent/ch24.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
