import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"第 12 章 · 子代理与并行工作流","description":"","frontmatter":{},"headers":[],"relativePath":"claude-code/ch12.md","filePath":"claude-code/ch12.md","lastUpdated":1787480284000}');
const __default__ = { name: "claude-code/ch12.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: "子代理的核心优势是什么？",
        options: [
          "速度比主代理快",
          "成本更低",
          "独立的上下文窗口，不占用主对话空间",
          "可以使用更多工具"
        ],
        answer: 2,
        explain: "子代理的核心价值是上下文隔离：大量的中间探索结果留在子代理内部，主代理只收到精炼结论，从而保持主对话的上下文清洁。"
      },
      {
        question: "Maker-Checker 模式中，Checker 子代理应该被限制哪些工具？",
        options: [
          "所有工具都开放",
          "只能使用 Read 和 Grep（不能写文件）",
          "只能使用 Bash",
          "不需要任何工具"
        ],
        answer: 1,
        explain: "Checker 只需要读取代码和搜索信息的能力，不应该有写入权限。这确保审查者无法意外修改被审查的代码。"
      },
      {
        question: "什么时候应该使用 git worktree 隔离子代理的工作？",
        options: [
          "任何简单的 bug 修复",
          "只是读代码不做修改时",
          "可能产生破坏性修改的长任务",
          "只在团队协作时"
        ],
        answer: 2,
        explain: "worktree 为长任务提供物理级隔离：即使子代理产生错误修改，主分支依然干净。简单任务直接在主仓库操作即可。"
      },
      {
        question: "两个子代理分别要修改同一个文件的同一区域，Claude Code 会怎么处理？",
        options: [
          "让它们同时写，最后写入的生效",
          "报错终止",
          "自动检测冲突并串行执行",
          "随机选一个执行"
        ],
        answer: 2,
        explain: "Claude Code 能识别文件冲突风险，将本想并行的子代理改为串行执行或合并为单个子代理，避免覆盖问题。"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-12-章-·-子代理与并行工作流" tabindex="-1">第 12 章 · 子代理与并行工作流 <a class="header-anchor" href="#第-12-章-·-子代理与并行工作流" aria-label="Permalink to &quot;第 12 章 · 子代理与并行工作流&quot;">​</a></h1><blockquote><p>本章目标：掌握 Claude Code 的子代理（subagent）派发机制，学会用并行编辑、maker-checker 模式和 git worktree 隔离来构建高效的多代理工作流。</p></blockquote><h2 id="_12-1-什么是子代理" tabindex="-1">12.1 什么是子代理 <a class="header-anchor" href="#_12-1-什么是子代理" aria-label="Permalink to &quot;12.1 什么是子代理&quot;">​</a></h2><p>Claude Code 的 Agent tool 允许主代理派发独立的&quot;子任务执行者&quot;。每个子代理拥有：</p><ul><li><strong>独立的上下文窗口</strong>——不会占用主对话的空间；</li><li><strong>专属的工具集</strong>——可以限制其能力范围；</li><li><strong>明确的任务目标</strong>——完成后只返回结果摘要给主代理。</li></ul><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>主代理（协调者）</span></span>
<span class="line"><span>├── 子代理 A：搜索代码库中的所有 API 端点</span></span>
<span class="line"><span>├── 子代理 B：阅读测试文件了解测试模式</span></span>
<span class="line"><span>└── 子代理 C：检查 package.json 的依赖版本</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>这种设计的核心价值是<strong>上下文隔离</strong>：大量中间探索结果留在子代理内部，主代理只收到精炼的结论。</p><h2 id="_12-2-派发子代理" tabindex="-1">12.2 派发子代理 <a class="header-anchor" href="#_12-2-派发子代理" aria-label="Permalink to &quot;12.2 派发子代理&quot;">​</a></h2><p>在对话中，Claude Code 会自动判断何时需要派发子代理。你也可以显式要求：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; 用一个子代理去搜索项目中所有使用 deprecated API 的地方，</span></span>
<span class="line"><span>  另一个子代理检查测试覆盖率，同时进行。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Claude Code 内部通过 Agent tool 调用实现：</p><div class="language-json vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;tool&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;Agent&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;parameters&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">    &quot;description&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;Search deprecated APIs&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">    &quot;prompt&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;Search the codebase for uses of deprecated APIs...&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">    &quot;tools&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: [</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;Read&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">, </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;Grep&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">, </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;Glob&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">]</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">  }</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h2 id="_12-3-并行文件编辑" tabindex="-1">12.3 并行文件编辑 <a class="header-anchor" href="#_12-3-并行文件编辑" aria-label="Permalink to &quot;12.3 并行文件编辑&quot;">​</a></h2><p>当需要修改多个互不依赖的文件时，可以让多个子代理并行工作：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; 同时做以下三件事：</span></span>
<span class="line"><span>1. 给 src/api/users.ts 添加分页参数支持</span></span>
<span class="line"><span>2. 给 src/api/orders.ts 添加排序功能</span></span>
<span class="line"><span>3. 更新 src/types/api.ts 中对应的类型定义</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>Claude Code 会评估这些修改是否有冲突：</p><ul><li><strong>无冲突</strong> → 派发多个子代理并行执行；</li><li><strong>有冲突</strong>（如共享同一文件）→ 串行执行或合并为一个子代理。</li></ul><div class="tip custom-block"><p class="custom-block-title">并行的前提</p><p>并行子代理各自操作不同文件时最安全。如果两个子代理都要改同一个文件，后完成的会覆盖先完成的修改。Claude Code 通常能识别这种情况并自动串行化。</p></div><h2 id="_12-4-maker-checker-模式" tabindex="-1">12.4 Maker-Checker 模式 <a class="header-anchor" href="#_12-4-maker-checker-模式" aria-label="Permalink to &quot;12.4 Maker-Checker 模式&quot;">​</a></h2><p>Anthropic 官方推荐的高可靠性模式：<strong>让一个子代理写代码，另一个独立子代理审查</strong>。</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>主代理</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── Maker 子代理：实现用户认证模块</span></span>
<span class="line"><span>│   └── 输出：auth.ts, auth.test.ts</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>└── Checker 子代理：审查 auth.ts 的安全性与正确性</span></span>
<span class="line"><span>    ├── 输入：diff + 原始需求描述</span></span>
<span class="line"><span>    ├── 工具限制：只有 Read/Grep（不能写文件）</span></span>
<span class="line"><span>    └── 返回：PASS 或 FAIL + 具体问题列表</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>为什么不让同一个代理自己检查自己？Anthropic 研究发现：模型评价自己的工作时存在系统性正向偏差——即使质量不达标也倾向于给出积极评估。<strong>分离&quot;做事的人&quot;和&quot;验收的人&quot;</strong> 是解决方案。</p><p>在 Anthropic 的受控实验中，同样的 Opus 4.5 模型和提示：</p><ul><li>单代理裸跑：20 分钟 / $9 / 核心功能不可用；</li><li>三代理架构（planner + generator + evaluator）：6 小时 / $200 / 游戏完全可玩。</li></ul><h2 id="_12-5-worktree-隔离" tabindex="-1">12.5 Worktree 隔离 <a class="header-anchor" href="#_12-5-worktree-隔离" aria-label="Permalink to &quot;12.5 Worktree 隔离&quot;">​</a></h2><p>对于可能产生破坏性修改的长任务，用 <code>git worktree</code> 创建隔离工作区：</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 主仓库不受影响</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">git</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> worktree</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> add</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> ../feature-auth</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> -b</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> feature/auth</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 在隔离环境中运行 Claude Code</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">cd</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> ../feature-auth</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">claude</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>~/my-project/           ← 主仓库（main 分支）</span></span>
<span class="line"><span>~/feature-auth/         ← worktree（feature/auth 分支）</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>实验完成后合并回主分支：</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">cd</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> ~/my-project</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">git</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> merge</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> feature/auth</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">git</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> worktree</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> remove</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> ../feature-auth</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>这保证了即使子代理产生了错误修改，主分支依然干净。</p><h2 id="本章小结" tabindex="-1">本章小结 <a class="header-anchor" href="#本章小结" aria-label="Permalink to &quot;本章小结&quot;">​</a></h2><ul><li>子代理拥有独立上下文和工具集，完成后只返回摘要；</li><li>无冲突的文件修改可以并行派发，有冲突则自动串行；</li><li>Maker-Checker 模式分离创建者和审查者，克服自我评估偏差；</li><li>Git worktree 提供物理级隔离，适合高风险长任务。</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>让 Claude Code 用两个并行子代理分别为你项目中的两个不同模块添加 JSDoc 注释，观察执行过程。</li><li>实现 Maker-Checker 流程：让一个子代理写一个函数，另一个子代理审查它，把审查意见反馈给第一个修正。</li><li>用 <code>git worktree</code> 创建隔离环境，在里面让 Claude Code 做一次大范围重构，对比主分支是否受到影响。</li></ol><blockquote><p>完成后进入<a href="./ch13.html">下一章：Hooks 自动化钩子</a>。</p></blockquote></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("claude-code/ch12.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
