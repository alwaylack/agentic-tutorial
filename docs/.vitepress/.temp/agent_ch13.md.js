import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"第 13 章 · 高级技术：ToT 与 Prompt Chaining","description":"","frontmatter":{},"headers":[],"relativePath":"agent/ch13.md","filePath":"agent/ch13.md","lastUpdated":1787480284000}');
const __default__ = { name: "agent/ch13.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: "Anthropic 对照实验中，同一模型 Opus 4.5 裸跑 20 分钟花费 $9 的结果是什么？",
        options: ["游戏完全可玩，零 bug", "核心功能无法正常使用", "中途因超时而终止", "成功运行但需要大量人工修正"],
        answer: 1,
        explain: "裸跑（bare run）没有 planner / generator / evaluator 三 agent 架构和验证循环，agent 仓促完成任务但质量很差，核心功能无法正常运作。加上完整 harness 后，同样的模型才能产出可玩的游戏。"
      },
      {
        question: '"Definition of Done"的核心特征是什么？',
        options: [
          "由开发人员主观判断完成度",
          "每个条件都可以被一条可执行命令验证",
          "列出所有需要实现的功能点清单",
          "由 AI 模型自己决定什么时候算完成"
        ],
        answer: 1,
        explain: 'DoD 的关键在于"可被执行命令验证"——每条条件都能对应一条命令（pytest、mypy、make check 等），而不是主观判断。这消除了 agent 自我评估时系统性偏乐观的问题。'
      },
      {
        question: "当 agent 感知到上下文即将耗尽时，Anthropic 观察到的现象叫什么？",
        options: ["上下文过载（context overload）", "完成焦虑（completion panic）", "上下文焦虑（context anxiety）", "仓促决策（rushed decision）"],
        answer: 2,
        explain: 'Anthropic 将此现象命名为"context anxiety"：agent 感知上下文接近上限时，会跳过验证步骤、选择简单方案、仓促宣布完成，以避免进一步的信息丢失风险。'
      },
      {
        question: '以下哪项是"诊断循环"的正确执行顺序？',
        options: [
          "观察失败 → 归因 → 修模型 → 重跑",
          "观察失败 → 归因到层 → 修复该层 → 重新执行",
          "归因 → 观察失败 → 直接升级模型 → 重跑",
          "重新执行 → 观察失败 → 归因 → 修该层"
        ],
        answer: 1,
        explain: '诊断循环的正确顺序是"执行 → 观察失败 → 归因到具体层 → 修复该层 → 重新执行"。关键是先定位到五层之一（需求/上下文/环境/验证/状态），而非笼统归因于"模型不强"；修完再重跑验证效果。'
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-13-章-·-高级技术-tot-与-prompt-chaining" tabindex="-1">第 13 章 · 高级技术：ToT 与 Prompt Chaining <a class="header-anchor" href="#第-13-章-·-高级技术-tot-与-prompt-chaining" aria-label="Permalink to &quot;第 13 章 · 高级技术：ToT 与 Prompt Chaining&quot;">​</a></h1><blockquote><p>本章目标：理解&quot;模型很强但执行不可靠&quot;的根源——能力鸿沟（capability gap）与 harness-induced failure，学会用诊断循环定位问题层，为后续 harness 工程打下认知基础。</p></blockquote><h2 id="_10-1-swe-bench-的真相-50-–60-意味着什么" tabindex="-1">10.1 SWE-bench 的真相：50%–60% 意味着什么 <a class="header-anchor" href="#_10-1-swe-bench-的真相-50-–60-意味着什么" aria-label="Permalink to &quot;10.1 SWE-bench 的真相：50%–60% 意味着什么&quot;">​</a></h2><p>2025 年底，SWE-bench Verified 基准上最强的编码智能体通过率达到约 50%–60%。这个数字乍看不错——但别急着庆祝。</p><p>这个基准集有几个隐藏前提：</p><ul><li>题目是经过挑选的 GitHub issue，描述清晰；</li><li>配套测试用例已经写好，验证标准明确；</li><li>仓库上下文相对干净，没有十年历史的技术债。</li></ul><p>换成真实工作场景——模糊的需求文档、散落在代码库里的隐式约定、没有测试覆盖的代码——通过率会掉得更低。Anthropic 和 OpenAI 都报告过：在工程团队的实际项目中，即使是最强模型在未加 harness 的情况下，成功率经常低于 20%。</p><p>这就是<strong>能力鸿沟（Capability Gap）</strong>——模型在基准上的表现与实际任务表现之间的巨大落差。</p><div class="tip custom-block"><p class="custom-block-title">核心论断</p><p><strong>模型不强不是问题；harness 不完整才是。</strong> 同一模型，换不同的执行环境，结果可以天差地别。</p></div><h2 id="_10-2-同一个模型-两种命运" tabindex="-1">10.2 同一个模型，两种命运 <a class="header-anchor" href="#_10-2-同一个模型-两种命运" aria-label="Permalink to &quot;10.2 同一个模型，两种命运&quot;">​</a></h2><p>Anthropic 做了一个对照实验，把同一句话（&quot;做一个 2D 复古游戏编辑器&quot;）和同一模型（Opus 4.5）跑了两遍：</p><table tabindex="0"><thead><tr><th>运行</th><th>用时</th><th>花费</th><th>结果</th></tr></thead><tbody><tr><td>裸跑（bare run）</td><td>20 分钟</td><td>$9</td><td>核心功能无法使用</td></tr><tr><td>全 harness（规划器 + 生成器 + 评估器）</td><td>6 小时</td><td>$200</td><td>游戏完全可玩</td></tr></tbody></table><p>模型没变，提示词没变，变的是 <strong>tack</strong>——也就是围绕模型的工程基础设施。</p><p>OpenAI 2025 年的 harness engineering 文章用了一个更直接的词：Codex 在一个有完整 harness 的仓库里，表现不是&quot;a bit better&quot;，而是从 <strong>&quot;unreliable&quot;直接跳到&quot;reliable&quot;</strong>，这是质变。</p><h2 id="_10-3-五大失败模式" tabindex="-1">10.3 五大失败模式 <a class="header-anchor" href="#_10-3-五大失败模式" aria-label="Permalink to &quot;10.3 五大失败模式&quot;">​</a></h2><p>当 agent 说&quot;完成了&quot;但结果不可用时，问题通常落在以下五层之一。记住这张清单，每次失败先定位层，再想怎么修：</p><p><strong>① 需求模糊（Task Specification）</strong></p><blockquote><p>&quot;添加搜索功能&quot;——搜索什么？全文还是结构化查询？结果要分页吗？高亮吗？agent 只能猜，猜对了是运气，猜错了返工成本是明确写出来的好几倍。</p></blockquote><p><strong>② 隐含约定未记录（Context Provision）</strong></p><blockquote><p>团队统一用 SQLAlchemy 2.0 语法，但 agent 默认写 1.x；所有 API 必须走 OAuth 2.0 鉴权，但这条规则只存在于你们团队的 Slack 历史消息里。agent 不是不想遵守，它根本没看见这条规则。</p></blockquote><p><strong>③ 环境不全（Execution Environment）</strong></p><blockquote><p>依赖没装完、Node 版本不对、测试命令路径写错——agent 把宝贵上下文预算花在 <code>pip install</code> 报错和版本冲突上，而不是真正的工作。</p></blockquote><p><strong>④ 无验证方式（Verification Feedback）</strong></p><blockquote><p>没有测试，没有 lint，或者验证命令根本没有告诉 agent。agent 写完代码，扫一眼觉得&quot;差不多&quot;，就宣布完成。Anthropic 观察到一个有趣的现象：当 agent 感知到上下文快用完时，会表现出&quot;焦虑式收尾&quot;（context anxiety）——跳过验证步骤、选简单的方案、仓促结束。</p></blockquote><p><strong>⑤ 跨会话状态丢失（State Management）</strong></p><blockquote><p>每个新会话从头开始。上一轮的分析、决策理由、已修改的文件全部丢失。没有持久化状态记录时，超过 30 分钟的长任务失败率会急剧上升。</p></blockquote><h2 id="_10-4-关键术语-definition-of-done" tabindex="-1">10.4 关键术语：Definition of Done <a class="header-anchor" href="#_10-4-关键术语-definition-of-done" aria-label="Permalink to &quot;10.4 关键术语：Definition of Done&quot;">​</a></h2><p>五个失败模式对应的 remedy 是一个新概念：<strong>Definition of Done（完成定义）</strong>。</p><p>DoD 是一组可以被命令行验证的条件，不是主观判断。比如：</p><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## Definition of Done</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> [ ] 新增接口 </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">\`GET /api/search?q=xxx\`</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 返回 JSON</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> [ ] 支持分页，默认每页 20 条</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> [ ] 搜索结果中高亮关键词</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> [ ] 所有新增代码通过 </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">\`pytest tests/\`</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 测试</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> [ ] 类型检查通过 </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">\`mypy src/ --strict\`</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>注意这些条件全是<strong>可执行的</strong>——每个条件都能对应一条命令。没有 DoD 的 agent 会自己发明一套&quot;我觉得做完了&quot;的标准，那套标准几乎总是过于乐观。</p><h2 id="_10-5-诊断循环-每次失败都是改进机会" tabindex="-1">10.5 诊断循环：每次失败都是改进机会 <a class="header-anchor" href="#_10-5-诊断循环-每次失败都是改进机会" aria-label="Permalink to &quot;10.5 诊断循环：每次失败都是改进机会&quot;">​</a></h2><p>harness engineering 的核心方法论是一个闭环——<strong>诊断循环（Diagnostic Loop）</strong>：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>执行 → 观察失败 → 归因到具体层 → 修复该层 → 重新执行</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>不要只看&quot;模型不够强&quot;这一个结论。每遇到一次失败，问自己：</p><ol><li>是任务不清晰？→ 补充 AGENTS.md 里的需求描述</li><li>是上下文不足？→ 补充技术栈版本、架构约束、相关文档链接</li><li>是环境不可复现？→ 用 pyproject.toml / .nvmrc / Docker 锁定</li><li>是验证反馈缺失？→ 在 AGENTS.md 里写明 <code>make check</code> 命令</li><li>是状态丢失？→ 引入 PROGRESS.md 或类似的状态持久化文件</li></ol><p>每次归因后修一条，再跑一次。几轮之后，你会清楚地看到瓶颈在哪一层，然后把精力集中在那里。</p><p>记录越简单越好——只需记下每任务的&quot;成功/失败&quot;和&quot;失败在哪一层&quot;，数据积累下来瓶颈自然浮现。</p><h2 id="本章小结" tabindex="-1">本章小结 <a class="header-anchor" href="#本章小结" aria-label="Permalink to &quot;本章小结&quot;">​</a></h2><ul><li>SWE-bench 50%–60% 是精心挑选的基准；真实场景中裸跑成功率往往低于 20%；</li><li>同一模型不同 harness 实验：裸跑 20min/$9 vs 全 harness 6h/$200，结果天差地别；</li><li>五大失败模式：需求模糊、隐含约定未记录、环境不全、无验证方式、跨会话状态丢失；</li><li>Definition of Done 必须可被执行命令验证，不是主观感受；</li><li>诊断循环是核心方法论：失败 → 归因到层 → 修复 → 重跑，循环迭代。</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>找一个你熟悉的项目（或创建一个小项目），在它没有任何 AGENTS.md 的情况下让 Claude Code / Codex 完成一个任务，记录失败现象，然后补上 AGENTS.md 并再次运行，对比两次成功率。</li><li>为你的项目手写一份 Definition of Done，要求至少包含 5 条可被命令验证的条件（测试、类型检查、lint、构建等）。</li><li>回顾最近一次 agent 失败的经历，用五大失败模式清单逐条归因，写出具体应该补哪一层。</li></ol><blockquote><p>完成后进入<a href="./ch08.html">下一章：Harness 到底是什么</a>。</p></blockquote></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("agent/ch13.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
