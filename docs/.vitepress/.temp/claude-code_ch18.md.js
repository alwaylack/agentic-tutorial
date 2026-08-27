import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"第 18 章 · 高级技巧与最佳实践","description":"","frontmatter":{},"headers":[],"relativePath":"claude-code/ch18.md","filePath":"claude-code/ch18.md","lastUpdated":1787480284000}');
const __default__ = { name: "claude-code/ch18.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: '以下哪条指令最符合"精确指令"原则？',
        options: [
          '"帮我修一下登录的问题"',
          '"src/auth/login.ts 的 handleLogin 函数在密码含特殊字符时会抛异常，请复现并修复，完成后运行 auth 相关测试"',
          '"改进一下认证模块"',
          '"这个项目有什么 bug？"'
        ],
        answer: 1,
        explain: "精确指令包含三个要素：目标文件路径（login.ts）、问题描述（特殊字符抛异常）、验证方式（运行 auth 测试）。其他选项要么范围过大要么缺少可验证的目标。"
      },
      {
        question: "Plan Mode（Shift+Tab）的核心价值是什么？",
        options: [
          "加快代码生成速度",
          "强制模型在只读模式下先完成全局分析，避免未规划的盲目修改",
          "自动生成单元测试",
          "切换到更便宜的模型节省成本"
        ],
        answer: 1,
        explain: "Plan Mode 下 Claude 只能读不能写，这迫使它先理解全貌再提方案。确认后再切回正常模式执行，大幅降低复杂任务中途跑偏的风险。"
      },
      {
        question: "防止 Claude Code 幻觉的最可靠方法是？",
        options: [
          '每次都在提示里加"请不要编造"',
          "要求它展示运行测试或命令的输出作为证据",
          "只用 Opus 模型就不会有幻觉",
          "把 temperature 设为 0"
        ],
        answer: 1,
        explain: '外部化的执行验证（跑测试、运行命令、展示 diff）比任何提示语都可靠。"声明完成"和"实际正确"之间的差距只有通过客观证据才能弥合。'
      },
      {
        question: '为什么推荐在 CLAUDE.md 中写"详细文档见 docs/architecture.md"？',
        options: [
          "因为 CLAUDE.md 有行数硬限制",
          "保持常驻上下文精简以节省 token，同时让 agent 能按需读取详细信息",
          "因为 markdown 链接会提升 SEO",
          "这样可以让多个项目共享同一个架构文档"
        ],
        answer: 1,
        explain: "CLAUDE.md 每轮对话都会消耗 token。把低频的长篇内容外链到 docs/ 目录，agent 在需要时才读取，是上下文管理的核心策略。"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-18-章-·-高级技巧与最佳实践" tabindex="-1">第 18 章 · 高级技巧与最佳实践 <a class="header-anchor" href="#第-18-章-·-高级技巧与最佳实践" aria-label="Permalink to &quot;第 18 章 · 高级技巧与最佳实践&quot;">​</a></h1><blockquote><p>本章目标：掌握让 Claude Code 输出质量翻倍的提示技巧——精确指令、任务拆解、上下文优化与幻觉验证，形成个人高效工作流。</p></blockquote><h2 id="_18-1-精确指令-模糊是万恶之源" tabindex="-1">18.1 精确指令：模糊是万恶之源 <a class="header-anchor" href="#_18-1-精确指令-模糊是万恶之源" aria-label="Permalink to &quot;18.1 精确指令：模糊是万恶之源&quot;">​</a></h2><p>&quot;给搜索功能加个分页&quot;——这句话对人类同事来说也许够用，但对 agent 来说充满歧义：游标分页还是偏移量？每页多少条？要不要高亮？</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>❌ 模糊指令：</span></span>
<span class="line"><span>&gt; 修复这个 bug</span></span>
<span class="line"><span></span></span>
<span class="line"><span>✅ 精确指令：</span></span>
<span class="line"><span>&gt; tests/auth.test.ts 中 test_expired_token_refresh 失败了。</span></span>
<span class="line"><span>&gt; 错误信息是 &quot;JWT expired before verification&quot;。</span></span>
<span class="line"><span>&gt; 问题可能出在 src/auth/token.ts 的 verifyToken 函数没有处理</span></span>
<span class="line"><span>&gt; clock skew。请先运行 npm test -- auth 确认失败，再定位并修复。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>精确指令的三要素：<strong>目标文件、期望行为、验证方式</strong>。三者齐备时 Claude 一次通过率显著提升。</p><h2 id="_18-2-任务拆解-plan-mode-与渐进交付" tabindex="-1">18.2 任务拆解：Plan Mode 与渐进交付 <a class="header-anchor" href="#_18-2-任务拆解-plan-mode-与渐进交付" aria-label="Permalink to &quot;18.2 任务拆解：Plan Mode 与渐进交付&quot;">​</a></h2><p>面对复杂任务，直接让 Claude &quot;一口气做完&quot;往往中途跑偏。更好的做法是<strong>两阶段工作流</strong>：</p><h3 id="阶段一-只读规划" tabindex="-1">阶段一：只读规划 <a class="header-anchor" href="#阶段一-只读规划" aria-label="Permalink to &quot;阶段一：只读规划&quot;">​</a></h3><p>按 <code>Shift+Tab</code> 切换到 <strong>Plan Mode</strong>（或用 <code>/model</code> 选 opus 提升规划质量）。此模式下 Claude 只能读取文件和搜索，不能写入：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; 我想把 src/utils.js 拆分成多个模块文件。</span></span>
<span class="line"><span>&gt; 先分析当前结构，提出拆分方案，不要动任何代码。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>（Claude 输出方案：建议拆成 format.ts / validate.ts / api.ts ...）</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="阶段二-逐步执行" tabindex="-1">阶段二：逐步执行 <a class="header-anchor" href="#阶段二-逐步执行" aria-label="Permalink to &quot;阶段二：逐步执行&quot;">​</a></h3><p>确认方案后退出 Plan Mode，按计划逐条执行：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; 方案不错。先做第一步：把 formatDate 和 parseDate 移到 date.ts，</span></span>
<span class="line"><span>&gt; 更新所有 import，然后运行 npm test 确认没有破坏。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="tip custom-block"><p class="custom-block-title">为什么有效</p><p>Plan Mode 强制模型在动手前完成全局思考；逐步执行让你在每个检查点纠偏。两者结合将大型重构的失败率从&quot;听天由命&quot;降到&quot;可控迭代&quot;。</p></div><h2 id="_18-3-上下文优化技巧" tabindex="-1">18.3 上下文优化技巧 <a class="header-anchor" href="#_18-3-上下文优化技巧" aria-label="Permalink to &quot;18.3 上下文优化技巧&quot;">​</a></h2><h3 id="保持-claude-md-精简" tabindex="-1">保持 CLAUDE.md 精简 <a class="header-anchor" href="#保持-claude-md-精简" aria-label="Permalink to &quot;保持 CLAUDE.md 精简&quot;">​</a></h3><p>CLAUDE.md 是常驻上下文，每一行都消耗 token。最佳实践：</p><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}"># CLAUDE.md — 控制在 ~100 行以内</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## 技术栈</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> Node 20 + TypeScript strict</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 测试: vitest, 运行 </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">\`npm test\`</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> Lint: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">\`npm run lint\`</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> (ESLint + Prettier)</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## 硬性约束</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 不引入新依赖除非明确讨论过</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> API 响应格式必须用 Zod schema 校验</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 所有公开函数必须有 JSDoc 注释</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## 常见命令</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 构建: npm run build</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 单测: npx vitest run &lt;file&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>详细文档放 <code>docs/</code> 目录，在 CLAUDE.md 里写一句&quot;架构细节见 docs/architecture.md&quot;，让 agent 按需读取。</p><h3 id="及时清理上下文" tabindex="-1">及时清理上下文 <a class="header-anchor" href="#及时清理上下文" aria-label="Permalink to &quot;及时清理上下文&quot;">​</a></h3><p>切换到不相关的新任务时，执行 <code>/clear</code> 而不是继续堆积历史。旧任务的上下文不仅浪费 token，还会污染新任务的输出（模型可能混淆两个任务的需求）。</p><h3 id="定向引用而非泛泛而谈" tabindex="-1">定向引用而非泛泛而谈 <a class="header-anchor" href="#定向引用而非泛泛而谈" aria-label="Permalink to &quot;定向引用而非泛泛而谈&quot;">​</a></h3><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>❌ &quot;项目里有个处理用户认证的模块，帮我看看&quot;</span></span>
<span class="line"><span>✅ &quot;看 src/auth/middleware.ts 第 40 行附近的 verifySession 函数&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>精确引用让 agent 直接命中目标文件，省去探索时间。</p><h2 id="_18-4-幻觉识别与验证方法" tabindex="-1">18.4 幻觉识别与验证方法 <a class="header-anchor" href="#_18-4-幻觉识别与验证方法" aria-label="Permalink to &quot;18.4 幻觉识别与验证方法&quot;">​</a></h2><p>LLM 天生倾向于&quot;给出一个听起来合理的答案&quot;。Claude Code 也不例外——它可能调用不存在的 API、编造配置项名称、或者声称测试已通过但实际上根本没跑。</p><h3 id="验证三板斧" tabindex="-1">验证三板斧 <a class="header-anchor" href="#验证三板斧" aria-label="Permalink to &quot;验证三板斧&quot;">​</a></h3><p><strong>第一板斧：让它跑命令</strong></p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; 你说已经修复了 bug。运行 npm test -- auth 并贴出完整输出。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>如果 Claude 声称修改了代码，要求它展示 diff 或运行测试来证明。<strong>永远不要仅凭口头声明就接受&quot;已完成&quot;</strong>。</p><p><strong>第二板斧：交叉验证 API 引用</strong></p><p>当 Claude 使用你不熟悉的库 API 时，让它展示来源：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; 你用了 zod.string().cuid2() 这个方法。请打开 node_modules/zod</span></span>
<span class="line"><span>&gt; 的类型定义确认这个方法存在。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>或者自己花 10 秒查一下官方文档——这比调试幻觉代码省一小时。</p><p><strong>第三板斧：TDD 防护网</strong></p><p>先写测试再让 Claude 实现，是最可靠的防幻觉手段：</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 你自己写好测试（定义&quot;正确&quot;的标准）</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">npx</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> vitest</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> generate</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> src/utils/date.test.ts</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 让 Claude 实现直到全部通过</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">claude</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> &quot;实现 src/utils/date.ts 使所有 vitest 用例通过。不许修改测试文件。&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>如果 Claude 偷偷改测试来&quot;通过&quot;，diff 一眼就能看出来。</p><h2 id="_18-5-个人工作流模板" tabindex="-1">18.5 个人工作流模板 <a class="header-anchor" href="#_18-5-个人工作流模板" aria-label="Permalink to &quot;18.5 个人工作流模板&quot;">​</a></h2><p>综合以上技巧，一个高效的日常循环：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1. /clear                          ← 干净起点</span></span>
<span class="line"><span>2. 精确描述任务（含文件路径+验证方式）</span></span>
<span class="line"><span>3. Shift+Tab 进入 Plan Mode        ← 大任务先规划</span></span>
<span class="line"><span>4. 确认方案 → 逐条执行             ← 每步带验证命令</span></span>
<span class="line"><span>5. 要求运行测试并展示输出           ← 幻觉防护</span></span>
<span class="line"><span>6. git diff 审查变更               ← 最终把关</span></span>
<span class="line"><span>7. /compact 或 /clear              ← 释放上下文</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="本章小结" tabindex="-1">本章小结 <a class="header-anchor" href="#本章小结" aria-label="Permalink to &quot;本章小结&quot;">​</a></h2><ul><li>精确指令三要素：目标文件、期望行为、验证方式；</li><li>Plan Mode 先规划后执行的&quot;两阶段&quot;模式大幅降低大任务跑偏率；</li><li>CLAUDE.md 保持精简，详细内容外链让 agent 按需加载；</li><li>幻觉验证三板斧：跑命令证伪、交叉验证 API、TDD 防护网；</li><li>任务切换时 <code>/clear</code> 是最被低估的好习惯。</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>找一个你最近让 Claude 做的任务，重写为包含&quot;目标文件+期望行为+验证方式&quot;三要素的精确指令，对比一次通过率的差异。</li><li>对一个中型重构任务使用 Plan Mode 两阶段流程，记录规划阶段的方案与最终实际执行的偏差。</li><li>故意问 Claude 一个不存在的 API 方法（如&quot;用 lodash 的 deepFreezeAll 函数…&quot;），观察它是否会编造用法，然后练习用交叉验证法纠正它。</li></ol><p><a href="./ch19.html">下一章：团队协作规范</a></p></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("claude-code/ch18.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
