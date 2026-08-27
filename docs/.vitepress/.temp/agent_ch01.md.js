import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"第 1 章 · 为什么强模型仍会失败","description":"","frontmatter":{},"headers":[],"relativePath":"agent/ch01.md","filePath":"agent/ch01.md","lastUpdated":1787480284000}');
const __default__ = { name: "agent/ch01.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: "根据 Anthropic 的对照实验，同模型同提示下，完整 harness 相比裸跑的主要优势是什么？",
        options: [
          "运行速度更快",
          "成本更低",
          '从"不可玩"变成"完全可玩"的定性飞跃',
          "需要更少的 token"
        ],
        answer: 2,
        explain: "实验显示：裸跑 20 分钟 $9，游戏核心功能无法工作；完整 harness 6 小时 $200，游戏完全可玩。模型没变，变的是 harness，结果是定性飞跃。"
      },
      {
        question: '"上下文焦虑" (context anxiety) 指的是什么现象？',
        options: [
          "智能体在上下文充足时过度思考",
          "智能体感知上下文接近限制时仓促收尾、跳过验证",
          "智能体拒绝处理长上下文",
          "用户焦虑地等待智能体响应"
        ],
        answer: 1,
        explain: 'Anthropic 观察到：当智能体感知上下文即将耗尽时，会表现出"仓促收尾"行为——匆忙结束工作、跳过验证步骤、选择简单方案而非最优方案。这是一种非理性的资源焦虑。'
      },
      {
        question: "以下哪项不是 OpenAI 提出的 Harness 核心工作？",
        options: [
          "设计环境",
          "表达意图",
          "构建反馈循环",
          "替换更强模型"
        ],
        answer: 3,
        explain: 'OpenAI 将工程师的核心工作归纳为三件事：设计环境、表达意图、构建反馈循环。替换更强模型不是 harness 工程的工作—— harness 工程的核心理念正是"不要先换模型"。'
      },
      {
        question: "Definition of Done 的核心特征是什么？",
        options: [
          "主观判断任务完成",
          "用自然语言描述期望结果",
          "可用命令验证的一组条件",
          "由智能体自行发明的完成标准"
        ],
        answer: 2,
        explain: "Definition of Done 必须是可用命令验证的条件集合——测试通过、lint 干净、类型检查通过等。没有显式的 DoD，智能体会发明自己的标准，通常与期望不符。"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-1-章-·-为什么强模型仍会失败" tabindex="-1">第 1 章 · 为什么强模型仍会失败 <a class="header-anchor" href="#第-1-章-·-为什么强模型仍会失败" aria-label="Permalink to &quot;第 1 章 · 为什么强模型仍会失败&quot;">​</a></h1><blockquote><p>本章目标：理解为什么 SWE-bench 上 50-60% 的通过率在真实任务中继续下滑，掌握 Harness Engineering 的核心定义和五大失败模式。</p></blockquote><h2 id="_1-1-benchmark-与现实之间的鸿沟" tabindex="-1">1.1 benchmark 与现实之间的鸿沟 <a class="header-anchor" href="#_1-1-benchmark-与现实之间的鸿沟" aria-label="Permalink to &quot;1.1  benchmark 与现实之间的鸿沟&quot;">​</a></h2><p>2025 年末，SWE-bench Verified 上最强的编码智能体平均通过率达到 50-60%。初看这个数字似乎不错——但请不要过早庆祝。这些任务经过精心挑选，Issue 描述清晰，测试用例现成。把任务换成你每天面对的真实需求：模糊的规格、没有测试、业务规则散落在代码库各处。真实任务的通过率会进一步下滑。</p><p>你满怀信心地交付一个任务，智能体运行 20 分钟后告诉你&quot;完成了&quot;，但你看到代码：功能加上了，测试却挂了；Bug 修了，新的问题又出现；更糟糕的是，它实现的根本不是你想要的。</p><p>这时大多数人的第一反应是&quot;模型不够好，换更贵的试试&quot;。但在掏钱之前，请考虑：<strong>问题可能根本不是模型。</strong></p><h2 id="_1-2-anthropic-的对照实验" tabindex="-1">1.2 Anthropic 的对照实验 <a class="header-anchor" href="#_1-2-anthropic-的对照实验" aria-label="Permalink to &quot;1.2 Anthropic 的对照实验&quot;">​</a></h2><p>Anthropic 做了一个控制实验，完美说明这一点。同样的提示词（&quot;构建一个 2D 复古游戏编辑器&quot;），同一个模型（Opus 4.5），两次运行。</p><p>第一次运行：裸跑，没有任何支持。20 分钟，$9，游戏核心功能根本无法工作。 第二次运行：完整 Harness——planner + generator + evaluator 三智能体架构。6 小时，$200，游戏完全可玩。</p><p>模型没变。Opus 4.5 还是那个 Opus 4.5。变的是 harness。</p><p>OpenAI 的 Harness Engineering 文章说得更直接：在一个配置良好的仓库中，Codex 可以从&quot;不可靠&quot;直接跃升到&quot;可靠&quot;。注意措辞——不是&quot;好一点&quot;，而是<strong>定性飞跃</strong>。这里的 Harness 指的是<strong>模型权重之外的一切工程基础设施</strong>。</p><h2 id="_1-3-五大失败模式" tabindex="-1">1.3 五大失败模式 <a class="header-anchor" href="#_1-3-五大失败模式" aria-label="Permalink to &quot;1.3 五大失败模式&quot;">​</a></h2><p>智能体的具体失败模式可以归结为五类：</p><h3 id="_1-3-1-模糊需求——智能体只能猜测" tabindex="-1">1.3.1 模糊需求——智能体只能猜测 <a class="header-anchor" href="#_1-3-1-模糊需求——智能体只能猜测" aria-label="Permalink to &quot;1.3.1 模糊需求——智能体只能猜测&quot;">​</a></h3><p>&quot;加一个搜索功能&quot;——这句话几乎什么都没说。搜索什么？全文检索还是结构化查询？结果要分页吗？要高亮吗？你没说清楚，智能体只能猜。猜对了是运气，猜错了意味着返工，成本可能是当初说清楚的数倍。</p><h3 id="_1-3-2-隐性规范未写入——智能体无从遵循" tabindex="-1">1.3.2 隐性规范未写入——智能体无从遵循 <a class="header-anchor" href="#_1-3-2-隐性规范未写入——智能体无从遵循" aria-label="Permalink to &quot;1.3.2 隐性规范未写入——智能体无从遵循&quot;">​</a></h3><p>你们团队都用 SQLAlchemy 2.0 语法，但智能体默认写 1.x 代码。所有 API 端点必须经过 OAuth 2.0 认证，但这条规则只存在于你的大脑和三个月前的一条 Slack 消息里。智能体不是不想遵守，它<strong>根本没见过这条规则</strong>。</p><h3 id="_1-3-3-环境不完整——智能体在修环境而不是干活" tabindex="-1">1.3.3 环境不完整——智能体在修环境而不是干活 <a class="header-anchor" href="#_1-3-3-环境不完整——智能体在修环境而不是干活" aria-label="Permalink to &quot;1.3.3 环境不完整——智能体在修环境而不是干活&quot;">​</a></h3><p>开发环境不完整、依赖缺失、工具版本错误——智能体宝贵的上下文窗口消耗在 <code>pip install</code> 报错和 Node 版本冲突上，而不是做你交给它的实际工作。</p><h3 id="_1-3-4-没有验证手段——智能体-感觉完成了-就宣布结束" tabindex="-1">1.3.4 没有验证手段——智能体&quot;感觉完成了&quot;就宣布结束 <a class="header-anchor" href="#_1-3-4-没有验证手段——智能体-感觉完成了-就宣布结束" aria-label="Permalink to &quot;1.3.4 没有验证手段——智能体&quot;感觉完成了&quot;就宣布结束&quot;">​</a></h3><p>没有测试，没有 lint，或者验证命令从未告诉智能体。智能体写完代码，看一眼，觉得还行，就宣布完成。Anthropic 还观察到一个有趣的现象：当智能体感觉到上下文即将耗尽时，会表现出&quot;仓促收尾&quot;行为——匆忙结束当前工作、跳过验证步骤、选择简单方案而非最优方案。Anthropic 称之为<strong>上下文焦虑（context anxiety）</strong>。</p><h3 id="_1-3-5-跨会话状态丢失——每次新会话从零开始" tabindex="-1">1.3.5 跨会话状态丢失——每次新会话从零开始 <a class="header-anchor" href="#_1-3-5-跨会话状态丢失——每次新会话从零开始" aria-label="Permalink to &quot;1.3.5 跨会话状态丢失——每次新会话从零开始&quot;">​</a></h3><p>上一次会话的所有发现都丢失了。每次新会话都要重新探索项目结构、重新理解代码组织。没有持久化状态的智能体在超过 30 分钟的任务上失败率急剧上升。</p><h2 id="_1-4-核心概念" tabindex="-1">1.4 核心概念 <a class="header-anchor" href="#_1-4-核心概念" aria-label="Permalink to &quot;1.4 核心概念&quot;">​</a></h2><table tabindex="0"><thead><tr><th>术语</th><th>含义</th></tr></thead><tbody><tr><td><strong>能力鸿沟 (Capability Gap)</strong></td><td>模型在 benchmark 上的表现与真实任务表现之间的巨大差距。SWE-bench 50-60% 的通过率意味着近一半真实问题未被解决</td></tr><tr><td><strong>Harness</strong></td><td>模型权重之外的一切：指令、工具、环境、状态管理、验证反馈。Anthropic 将 Claude Agent SDK 直接称为&quot;通用智能体 harness&quot;</td></tr><tr><td><strong>Harness 诱发失败</strong></td><td>模型能力足够，但执行环境存在结构性缺陷。Anthropic 的对照实验已证明这一点</td></tr><tr><td><strong>验证差距 (Verification Gap)</strong></td><td>智能体对自己输出的信心与实际正确性之间的差距。这是最常见的失败模式</td></tr><tr><td><strong>诊断循环 (Diagnostic Loop)</strong></td><td>执行 → 观察失败 → 归因到特定 harness 层 → 修复该层 → 重新执行</td></tr><tr><td><strong>完成定义 (Definition of Done)</strong></td><td>可用命令验证的一组条件——测试通过、lint 干净、类型检查通过</td></tr></tbody></table><h2 id="_1-5-失败时-先修-harness" tabindex="-1">1.5 失败时，先修 Harness <a class="header-anchor" href="#_1-5-失败时-先修-harness" aria-label="Permalink to &quot;1.5 失败时，先修 Harness&quot;">​</a></h2><p>只有一个核心原则：<strong>失败时，不要先换模型——先检查 harness。</strong> 如果同一个模型在结构良好的类似任务上能成功，就假设是 harness 问题。</p><p>实践中这意味着什么？把每次失败归因到具体层次。不要只说&quot;模型不够好&quot;。问自己：任务不清晰？上下文不足？没有验证手段？映射到五个防御层——任务规格、上下文提供、执行环境、验证反馈、状态管理。</p><p>然后，为每个任务写一个明确的完成定义：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>完成标准：</span></span>
<span class="line"><span>- 新端点 GET /api/search?q=xxx</span></span>
<span class="line"><span>- 支持分页，默认 20 条</span></span>
<span class="line"><span>- 结果包含高亮片段</span></span>
<span class="line"><span>- 所有新代码通过 pytest</span></span>
<span class="line"><span>- 类型检查通过 (mypy --strict)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>在仓库根目录放置一个 <code>AGENTS.md</code> 文件，告诉智能体项目的技术栈、架构规范和验证命令。这是 harness 工程的第一步，也是 ROI 最高的一步。一份 <code>AGENTS.md</code> 可能比升级更贵的模型更有效——这不是玩笑。</p><h2 id="_1-6-本章小结" tabindex="-1">1.6 本章小结 <a class="header-anchor" href="#_1-6-本章小结" aria-label="Permalink to &quot;1.6 本章小结&quot;">​</a></h2><ul><li>强模型 ≠ 可靠执行；SWE-bench 50-60% 是精心挑选的任务，真实任务通过率更低</li><li>Anthropic 对照实验：同模型同提示，有 harness vs 无 harness 结果天差地别</li><li>五大失败模式：模糊需求、隐性规范、环境不完整、无验证手段、跨会话状态丢失</li><li>核心原则：失败时先修 harness，不要先换模型</li><li>每个任务写明确的 Definition of Done，放置 AGENTS.md</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>找一个你参与过的项目，列出其中&quot;智能体无法看到的隐性规范&quot;——那些只存在于口头、Slack 或 senior 工程师头脑中的规则。</li><li>为这个项目写一个最小化的 AGENTS.md（100 行以内），包含技术栈、目录结构、验证命令。</li><li>尝试用 <code>/goal</code> 命令让 Claude Code 或 Codex 完成一个小任务，观察它在没有 AGENTS.md 时的表现。</li></ol><p><a href="./ch02.html">下一章：Harness 到底是什么</a></p></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("agent/ch01.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
