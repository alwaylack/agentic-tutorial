import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"第 25 章 · 三大技能仓库对比","description":"","frontmatter":{},"headers":[],"relativePath":"agent/ch25.md","filePath":"agent/ch25.md","lastUpdated":1787480284000}');
const __default__ = { name: "agent/ch25.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: "mattpocock/skills 的两套安装方式的核心理念差异是什么？",
        options: [
          "一套支持 Claude Code，另一套只支持 Codex",
          "订阅更新（插件）vs 复制可编辑副本（skills.sh），后者允许改技能内容",
          "前者适合个人，后者只适合团队",
          "两种方式完全等价，只是名字不同"
        ],
        answer: 1,
        explain: '官方强调两种哲学的区别：插件是"订阅稳定版本不自己改"，skills.sh 是"复制到项目里随便魔改"。这正对应 Matt 的反框架理念——技能应该可改、可拥有，而不是黑盒。'
      },
      {
        question: "Superpowers 的六步工作流中，哪一步负责强制 RED-GREEN-REFACTOR？",
        options: [
          "writing-plans",
          "subagent-driven-development",
          "test-driven-development",
          "requesting-code-review"
        ],
        answer: 2,
        explain: 'test-driven-development 技能明确强制"先写失败测试、再写最小实现、再重构"的 TDD 循环；其他步骤分别负责头脑风暴、计划拆分、子代理执行与代码审查。'
      },
      {
        question: "OpenSpec 的核心设计哲学不包括以下哪项？",
        options: [
          "fluid not rigid（灵活而非僵化）",
          "iterative not waterfall（迭代而非瀑布）",
          "specification-first, not skill-first（规格优先于技能）",
          "easy not complex（简单而非复杂）"
        ],
        answer: 2,
        explain: '官方文档列出的三条哲学是 fluid/iterative/easy，并不包含"spec-first vs skill-first"这一对立表述。OpenSpec 不反对 skills，只是以变更工件为中心组织流程。'
      },
      {
        question: "在 Brownfield 项目中，最适合优先引入的组件是哪个？",
        options: [
          "mattpocock/skills 的 commit-helper",
          "OpenSpec 的 /opsx:propose + /opsx:apply",
          "Superpowers 的 brainstorming 技能",
          "三者应该完全排除"
        ],
        answer: 1,
        explain: 'OpenSpec 的定位就是"专为 brownfield 设计"，通过 /opsx:propose 记录变更意图、/opsx:apply 安全落地；brainstorming 更适合绿野项目从零开始。'
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-25-章-·-三大技能仓库对比" tabindex="-1">第 25 章 · 三大技能仓库对比 <a class="header-anchor" href="#第-25-章-·-三大技能仓库对比" aria-label="Permalink to &quot;第 25 章 · 三大技能仓库对比&quot;">​</a></h1><blockquote><p>本章目标：把 mattpocock/skills、obra/superpowers、Fission-AI/OpenSpec 三个仓库并列对照，理解它们各自的工程哲学与适用场景，能在实际项目中做出选型判断。</p></blockquote><h2 id="_25-1-三个仓库的定位差异" tabindex="-1">25.1 三个仓库的定位差异 <a class="header-anchor" href="#_25-1-三个仓库的定位差异" aria-label="Permalink to &quot;25.1 三个仓库的定位差异&quot;">​</a></h2><table tabindex="0"><thead><tr><th>维度</th><th>mattpocock/skills</th><th>obra/superpowers</th><th>Fission-AI/OpenSpec</th></tr></thead><tbody><tr><td><strong>哲学</strong></td><td>&quot;小而可改，反框架接管&quot;</td><td>&quot;技能自动触发，端到端跑通&quot;</td><td>&quot;规格即工件，fluid not rigid&quot;</td></tr><tr><td><strong>核心主张</strong></td><td>技能保持小、可替换、可魔改</td><td>提供完整开发方法论，技能按需激活</td><td>变更即文档，spec-driven 推动开发</td></tr><tr><td><strong>安装方式</strong></td><td>Claude Code 插件 或 skills.sh</td><td><code>pip install superpowers</code></td><td><code>@fission-ai/openspec</code> CLI</td></tr><tr><td><strong>典型场景</strong></td><td>给现有项目注入一组高质量技能</td><td>从零到交付一个功能（含 TDD）</td><td>在 brownfield 项目中推动变更</td></tr><tr><td><strong>与标准关系</strong></td><td>遵循 Agent Skills 规范</td><td>遵循规范，技能自动触发</td><td>独立路线，<code>/opsx</code> 命令流</td></tr></tbody></table><h2 id="_25-2-mattpocock-skills-给工程师的真实技能" tabindex="-1">25.2 mattpocock/skills：给工程师的真实技能 <a class="header-anchor" href="#_25-2-mattpocock-skills-给工程师的真实技能" aria-label="Permalink to &quot;25.2 mattpocock/skills：给工程师的真实技能&quot;">​</a></h2><h3 id="理念" tabindex="-1">理念 <a class="header-anchor" href="#理念" aria-label="Permalink to &quot;理念&quot;">​</a></h3><p>Matt Pocock（Total TypeScript 作者）明确反对 GSD、BMAD、Spec-Kit 这类&quot;接管开发流程&quot;的框架：</p><blockquote><p>&quot;Approaches like GSD, BMAD, and Spec-Kit try to help by owning the process. But while doing so, they take away your control and make bugs in the process hard to resolve.&quot;</p></blockquote><p>他的方案是：<strong>技能保持小、可替换、可魔改</strong>。</p><h3 id="两种安装哲学" tabindex="-1">两种安装哲学 <a class="header-anchor" href="#两种安装哲学" aria-label="Permalink to &quot;两种安装哲学&quot;">​</a></h3><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 方式一：Claude Code 官方插件（订阅制，只读）</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">claude</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> plugins</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> install</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> mattpocock-skills</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 方式二：skills.sh 复制可编辑副本</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">npx</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> skills@latest</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> add</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> mattpocock/skills</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 交互式挑选你想要的技能</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>前者适合&quot;用最新稳定版&quot;；后者适合&quot;我要改技能内容适应我的项目&quot;。</p><h3 id="选型建议" tabindex="-1">选型建议 <a class="header-anchor" href="#选型建议" aria-label="Permalink to &quot;选型建议&quot;">​</a></h3><ul><li>✅ 适合：想要即插即用的高质量技能、不想维护一整套方法论</li><li>⚠️ 局限：需要你自行决定什么时候、用哪些技能；没有强制流程</li></ul><h2 id="_25-3-obra-superpowers-端到端方法论" tabindex="-1">25.3 obra/superpowers：端到端方法论 <a class="header-anchor" href="#_25-3-obra-superpowers-端到端方法论" aria-label="Permalink to &quot;25.3 obra/superpowers：端到端方法论&quot;">​</a></h2><h3 id="理念-1" tabindex="-1">理念 <a class="header-anchor" href="#理念-1" aria-label="Permalink to &quot;理念&quot;">​</a></h3><p>Superpowers 宣称是 <strong>&quot;complete software development methodology for your coding agents&quot;</strong>。核心卖点：<strong>技能自动触发，端到端跑通</strong>。</p><h3 id="六步工作流" tabindex="-1">六步工作流 <a class="header-anchor" href="#六步工作流" aria-label="Permalink to &quot;六步工作流&quot;">​</a></h3><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>brainstorming → using-git-worktrees → writing-plans</span></span>
<span class="line"><span>     → subagent-driven-development / executing-plans</span></span>
<span class="line"><span>     → test-driven-development → requesting-code-review</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>每一步都是一个技能，按序触发：</p><ol><li><strong>Brainstorming</strong>：先不写代码，让 agent 通过问答打磨想法，输出设计文档；</li><li><strong>Using Git Worktrees</strong>：为每个任务创建隔离的 worktree，主分支保持稳定；</li><li><strong>Writing Plans</strong>：把设计拆成 2–5 分钟能完成的子任务，每步带精确文件路径和验证步骤；</li><li><strong>Subagent-Driven Development</strong>：每个子任务派一个独立 subagent 执行，经过两阶段审查；</li><li><strong>Test-Driven Development</strong>：强制 RED-GREEN-REFACTOR；</li><li><strong>Requesting Code Review</strong>：任务间插入 review 环节，阻塞性 bug 阻止下一步。</li></ol><h3 id="选型建议-1" tabindex="-1">选型建议 <a class="header-anchor" href="#选型建议-1" aria-label="Permalink to &quot;选型建议&quot;">​</a></h3><ul><li>✅ 适合：希望&quot;零配置跑通完整开发流程&quot;的团队，有复杂功能需要系统化拆解</li><li>⚠️ 局限：引入较多约束（worktree/TDD/review），不适合快速原型或探索性实验</li></ul><h2 id="_25-4-fission-ai-openspec-规格驱动开发" tabindex="-1">25.4 Fission-AI/OpenSpec：规格驱动开发 <a class="header-anchor" href="#_25-4-fission-ai-openspec-规格驱动开发" aria-label="Permalink to &quot;25.4 Fission-AI/OpenSpec：规格驱动开发&quot;">​</a></h2><h3 id="理念-2" tabindex="-1">理念 <a class="header-anchor" href="#理念-2" aria-label="Permalink to &quot;理念&quot;">​</a></h3><p>OpenSpec 的核心哲学：<strong>&quot;→ fluid not rigid, → iterative not waterfall, → easy not complex&quot;</strong>。它不把技能当作重点，而是把&quot;规格&quot;（spec）作为驱动开发的第一公民。</p><h3 id="opsx-命令流" tabindex="-1"><code>/opsx</code> 命令流 <a class="header-anchor" href="#opsx-命令流" aria-label="Permalink to &quot;\`/opsx\` 命令流&quot;">​</a></h3><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 探索需求</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">/opsx:explore</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> &quot;我想给项目加一个暗色主题&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 提出正式变更</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">/opsx:propose</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> add-dark-mode</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 应用变更</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">/opsx:apply</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> add-dark-mode</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 完成后归档</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">/opsx:archive</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> add-dark-mode</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>每次 propose 会在 <code>openspec/changes/&lt;name&gt;/</code> 下生成 proposal.md：</p><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}"># Proposal: Add Dark Mode</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## Why</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">用户反馈夜间使用疲劳，提升可读性。</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## What Changes</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 新增 CSS 变量 </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">\`--bg-color\`</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> / </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">\`--text-color\`</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 添加系统偏好检测（prefers-color-scheme）</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 提供手动切换按钮</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## Impact</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 涉及：src/theme.ts、styles.css</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 不影响：业务逻辑层</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h3 id="选型建议-2" tabindex="-1">选型建议 <a class="header-anchor" href="#选型建议-2" aria-label="Permalink to &quot;选型建议&quot;">​</a></h3><ul><li>✅ 适合：有稳定产品、需要严格变更追踪的大型团队；brownfield 项目改造</li><li>⚠️ 局限：<code>/opsx</code> 命令依赖特定的 agent 集成；对绿色项目可能显得重</li></ul><h2 id="_25-5-三者的协同组合" tabindex="-1">25.5 三者的协同组合 <a class="header-anchor" href="#_25-5-三者的协同组合" aria-label="Permalink to &quot;25.5 三者的协同组合&quot;">​</a></h2><p>实际工程中，这三个工具往往不是单选而是组合：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[OpenSpec] ← 管&quot;做什么&quot;（规格与决策记录）</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>[Superpowers] ← 管&quot;怎么做&quot;（完整工作流驱动）</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>[mattpocock/skills] ← 管&quot;细节优化&quot;（日常编码辅助）</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>一个典型组合场景：</p><ol><li>用 OpenSpec 发起变更提案，产出 <code>proposal.md</code>；</li><li>用 Superpowers 跑 brainstorm → plan → TDD 的完整循环；</li><li>在每日编码时，用 mattpocock 的技能做代码审查、commit helper 等日常辅助。</li></ol><p>三条路线都尊重 Agent Skills 规范的发现与加载机制，可以共享在同一个 <code>.pi/skills/</code> 目录中协同工作。</p><h2 id="本章小结" tabindex="-1">本章小结 <a class="header-anchor" href="#本章小结" aria-label="Permalink to &quot;本章小结&quot;">​</a></h2><ul><li><strong>mattpocock/skills</strong>：小而可改的技能集合，反框架哲学，两种安装方式</li><li><strong>obra/superpowers</strong>：完整开发方法论，技能自动触发，六步工作流涵盖 brainstorm 到 review</li><li><strong>Fission-AI/OpenSpec</strong>：规格驱动，<code>/opsx</code> 命令流，变更即工件，专为 brownfield 设计</li><li>三者不互斥，可按场景组合使用；都遵循 Agent Skills 规范的渐进披露精神</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>任选 mattpocock/skills 中的一个技能（如 <code>commit-helper</code>），用 <code>npx skills@latest add</code> 安装到自己的项目，观察触发时机。</li><li>用 <code>pip install superpowers</code> 安装 Superpowers，跑一次 brainstorming 流程，记录输出。</li><li>在一个已有仓库里运行 <code>/opsx:explore</code> 和 <code>/opsx:propose</code>，理解 proposal.md 的生成结构。</li></ol><blockquote><p>完成练习后，进入<a href="./ch26.html">下一章：Loop Engineering：从提示到循环</a>。</p></blockquote></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("agent/ch25.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
