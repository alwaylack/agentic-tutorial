import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"第 5 章 · 控制机制：防止越界与过早胜利","description":"","frontmatter":{},"headers":[],"relativePath":"agent/ch05.md","filePath":"agent/ch05.md","lastUpdated":1787480284000}');
const __default__ = { name: "agent/ch05.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: "过早完成声明的核心原因是什么？",
        options: [
          "模型能力不足",
          "缺乏外部化、基于执行的终止判断",
          "提示词不够长",
          "token 限制太严格"
        ],
        answer: 1,
        explain: '核心问题是智能体基于本地、代码级自信做判断，而系统级正确性需要全局验证。harness 必须用外部化、可执行的终止条件替代智能体的"感觉"。'
      },
      {
        question: '验证-校验双闸中，"校验"层检查的是什么？',
        options: [
          "代码语法是否正确",
          "系统级行为是否符合端到端要求",
          "变量命名是否规范",
          "注释是否完整"
        ],
        answer: 1,
        explain: "第一闸（验证）检查代码是否正确实现指定行为；第二闸（校验）检查系统级行为是否符合端到端要求。两闸都通过才算完成。"
      },
      {
        question: "Anthropic 实验中，三智能体架构相比单智能体裸跑的主要优势是？",
        options: [
          "运行速度更快",
          "成本更低",
          "分离生成者和评估者，避免自我评估偏差",
          "使用更强大的模型"
        ],
        answer: 2,
        explain: "实验显示同一模型同一提示，三智能体架构（规划器+生成器+评估器）产出完全可玩的游戏，而单智能体裸跑核心功能无法工作。关键区别是分离了生成和评估角色。"
      },
      {
        question: "Feature List 的主要作用是？",
        options: [
          "记录代码提交历史",
          "控制智能体范围，一次只做一个 feature",
          "管理数据库备份",
          "监控服务器性能"
        ],
        answer: 1,
        explain: "Feature List 是范围控制工具：一次只做一个 feature，不标记完成除非验证通过，不在当前 feature 范围外修改代码（除非 blocker 迫使窄支持修复）。"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-5-章-·-控制机制-防止越界与过早胜利" tabindex="-1">第 5 章 · 控制机制：防止越界与过早胜利 <a class="header-anchor" href="#第-5-章-·-控制机制-防止越界与过早胜利" aria-label="Permalink to &quot;第 5 章 · 控制机制：防止越界与过早胜利&quot;">​</a></h1><blockquote><p>本章目标：掌握防止智能体越界执行和过早宣布完成的控制机制，理解三层终止检查和验证-校验双闸。</p></blockquote><h2 id="_5-1-过早胜利的陷阱" tabindex="-1">5.1 过早胜利的陷阱 <a class="header-anchor" href="#_5-1-过早胜利的陷阱" aria-label="Permalink to &quot;5.1 过早胜利的陷阱&quot;">​</a></h2><p>你让智能体实现一个&quot;密码重置&quot;功能。它修改了数据库 schema、写了 API 端点、添加了邮件模板、跑了单元测试（全绿），然后自信地告诉你&quot;完成了&quot;。但你实际运行时发现：邮件服务配置缺失导致链接发不出去；数据库迁移中途失败留下不一致的 schema；端到端流程一次都没跑过。</p><p>这不是孤立事件。2017 年 ICML 经典论文证明：<strong>现代神经网络系统性地过度自信</strong>——模型报告的置信度显著高于实际准确率。AI 编码智能体也不例外。它们&quot;感觉&quot;完成了，但实际离完成还很远。你的 harness 必须用外部化、基于执行的验证替代智能体的&quot;感觉&quot;。</p><h2 id="_5-2-滑坡效应" tabindex="-1">5.2 滑坡效应 <a class="header-anchor" href="#_5-2-滑坡效应" aria-label="Permalink to &quot;5.2 滑坡效应&quot;">​</a></h2><p>过早完成声明几乎总遵循相同剧本：代码看起来没问题——语法正确、逻辑似乎合理、静态分析无明显错误。但 harness 没有强制全面执行验证，智能体跳过实际运行或只跑部分测试。跑单元测试但不跑集成测试；跑测试但不检查覆盖率。最终，&quot;代码看起来 fine&quot;被当作&quot;功能已完成&quot;的证据。</p><p>信息在每个环节都有损耗。从任务规格到代码实现到运行时行为，每次转换都可能引入偏差，每次跳过的验证都放大信息不对称。</p><h2 id="_5-3-三层终止检查" tabindex="-1">5.3 三层终止检查 <a class="header-anchor" href="#_5-3-三层终止检查" aria-label="Permalink to &quot;5.3 三层终止检查&quot;">​</a></h2><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>智能体说：完成了</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>第一层：首次运行 lint / typecheck</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>第二层：然后运行测试和启动检查</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>第三层：最后运行完整用户流程</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>通过全部三层才算完成</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>代码写完 + 单元测试绿</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>但应用没真正启动 + 完整流程没跑</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>配置、DB、外部服务问题全部隐藏</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>所以智能体过早宣布胜利</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="_5-4-单元测试绿-任务完成" tabindex="-1">5.4 单元测试绿 ≠ 任务完成 <a class="header-anchor" href="#_5-4-单元测试绿-任务完成" aria-label="Permalink to &quot;5.4 单元测试绿 ≠ 任务完成&quot;">​</a></h2><p>这是最常见的陷阱，也是最危险的。智能体写完代码、跑单元测试、看到全绿，就说&quot;完成&quot;。但单元测试的设计哲学——隔离被测单元、mock 依赖——恰恰让它们无法检测跨组件问题：</p><p><strong>接口不匹配</strong>：渲染器向 preload 脚本传相对路径，preload 脚本期望绝对路径。各自的单元测试都用 mock 所以都通过。问题只在端到端测试时暴露。</p><p><strong>状态传播错误</strong>：数据库迁移改变表 schema，但 ORM 缓存层仍持有旧 schema 的缓存条目。单元测试每次都在新 mock 环境运行，这种跨层状态不一致永远不会暴露。</p><p><strong>环境依赖</strong>：代码在测试环境（一切都 mock）表现正确，但在真实环境因配置差异、网络延迟或服务不可用而失败。</p><h3 id="顺便重构-是对完成判断的毒药" tabindex="-1">&quot;顺便重构&quot;是对完成判断的毒药 <a class="header-anchor" href="#顺便重构-是对完成判断的毒药" aria-label="Permalink to &quot;&quot;顺便重构&quot;是对完成判断的毒药&quot;">​</a></h3><p>Claude Code 有一个常见行为模式：在核心功能通过验证前就开始重构代码、优化性能、改善风格。Knuth 的名言&quot;premature optimization is the root of all evil&quot;在智能体场景中有了新的含义——重构移动了已验证和未验证代码的边界，可能破坏之前隐式正确的代码路径。</p><h3 id="自我评估的系统性偏差" tabindex="-1">自我评估的系统性偏差 <a class="header-anchor" href="#自我评估的系统性偏差" aria-label="Permalink to &quot;自我评估的系统性偏差&quot;">​</a></h3><p>Anthropic 在 2026 年研究中发现了更深层的失败模式：<strong>当被要求评估自己的工作時，智能体系统性给出过度积极的评估</strong>——即使人类观察者会判断质量明显不达标。</p><p>这个问题在主观任务（如设计美学）上尤其严重。&quot;布局是否精致&quot;是判断性问题，智能体可靠地偏向正面。即使在有可验证结果的任务上，智能体的判断力差也会降低其表现。</p><p>解决方案不是让智能体&quot;更客观&quot;。同一个模型既生成又评估，天生倾向于对自己宽容。<strong>解决方案是分离&quot;干活的人&quot;和&quot;检查的人&quot;。</strong></p><p>独立评估智能体，专门调优为&quot;挑剔&quot;，比让生成智能体自我评估有效得多。Anthropic 的实验数据：</p><table tabindex="0"><thead><tr><th>架构</th><th>运行时间</th><th>成本</th><th>核心功能可用？</th></tr></thead><tbody><tr><td>单智能体（裸跑）</td><td>20 分钟</td><td>$9</td><td>否（游戏实体无响应）</td></tr><tr><td>三智能体（规划器+生成器+评估器）</td><td>6 小时</td><td>$200</td><td>是（游戏完全可玩）</td></tr></tbody></table><p>完全相同的模型（Opus 4.5）和完全相同的提示词（&quot;build a 2D retro game editor&quot;）。唯一的区别是 harness：从&quot;裸跑&quot;变为&quot;规划器展开需求 → 生成器逐功能实现 → 评估器用 Playwright 实际点击测试&quot;。</p><h2 id="_5-5-如何防止过早完成声明" tabindex="-1">5.5 如何防止过早完成声明 <a class="header-anchor" href="#_5-5-如何防止过早完成声明" aria-label="Permalink to &quot;5.5 如何防止过早完成声明&quot;">​</a></h2><h3 id="_1-外部化终止判断" tabindex="-1">1. 外部化终止判断 <a class="header-anchor" href="#_1-外部化终止判断" aria-label="Permalink to &quot;1. 外部化终止判断&quot;">​</a></h3><p>在 harness 中明确定义终止条件。智能体必须满足所有条件才能宣布完成。&quot;完成&quot;从主观判断变为客观判定。</p><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## 终止条件</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> [ ] 所有单元测试通过 (pytest tests/ -x)</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> [ ] 类型检查通过 (mypy src/ --strict)</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> [ ] Lint 干净 (ruff check src/)</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> [ ] 端到端测试通过 (playwright test e2e/)</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> [ ] 性能基准未降级 (benchmark.sh)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="_2-验证-校验双闸" tabindex="-1">2. 验证-校验双闸 <a class="header-anchor" href="#_2-验证-校验双闸" aria-label="Permalink to &quot;2. 验证-校验双闸&quot;">​</a></h3><p>第一闸（验证）：检查代码是否正确实现了指定行为。 第二闸（校验）：检查系统级行为是否符合端到端要求。 两闸都通过才算完成。</p><h3 id="_3-运行时反馈信号" tabindex="-1">3. 运行时反馈信号 <a class="header-anchor" href="#_3-运行时反馈信号" aria-label="Permalink to &quot;3. 运行时反馈信号&quot;">​</a></h3><p>程序执行的日志、进程状态、健康检查——这些形成 harness 判断完成质量的客观基础。</p><h3 id="_4-完成优先级约束" tabindex="-1">4. 完成优先级约束 <a class="header-anchor" href="#_4-完成优先级约束" aria-label="Permalink to &quot;4. 完成优先级约束&quot;">​</a></h3><p>先验证功能正确性，再处理性能，最后处理风格。核心功能未验证前不允许重构。</p><h2 id="_5-6-feature-list-作为范围控制" tabindex="-1">5.6 Feature List 作为范围控制 <a class="header-anchor" href="#_5-6-feature-list-作为范围控制" aria-label="Permalink to &quot;5.6 Feature List 作为范围控制&quot;">​</a></h2><p>Feature List（功能清单）是控制智能体范围的有效工具：</p><div class="language-json vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;project&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;my-app&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;features&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: [</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">    {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">      &quot;id&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;auth-001&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">      &quot;priority&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">1</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">      &quot;title&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;用户登录&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">      &quot;status&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;passing&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">      &quot;verification&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: [</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;POST /api/login returns 200&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">, </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;JWT returned&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">]</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">    },</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">    {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">      &quot;id&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;auth-002&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">, </span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">      &quot;priority&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">2</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">      &quot;title&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;用户注册&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">      &quot;status&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;in_progress&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">      &quot;verification&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: [</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;POST /api/register creates user&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">, </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;Email sent&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">]</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">    }</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">  ]</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>规则：</p><ul><li>一次只做一个 feature</li><li>不标记 feature 完成除非验证通过</li><li>不在当前 feature 范围外修改代码（除非 blocker 迫使窄支持修复）</li></ul><h2 id="_5-7-本章小结" tabindex="-1">5.7 本章小结 <a class="header-anchor" href="#_5-7-本章小结" aria-label="Permalink to &quot;5.7 本章小结&quot;">​</a></h2><ul><li>智能体系统性过度自信，需外部验证替代&quot;感觉&quot;</li><li>三层终止检查：lint/typecheck → 测试 → 端到端流程</li><li>单元测试绿不等于任务完成，需验证-校验双闸</li><li>分离&quot;生成者&quot;和&quot;评估者&quot;是应对自我评估偏差的关键</li><li>Feature List 控制范围，一次只做一个 feature</li><li>完成优先级：功能正确性 &gt; 性能 &gt; 风格</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>为一个简单功能写完整的终止条件清单，包含至少三层验证。</li><li>实现验证-校验双闸：第一闸跑单元测试，第二闸跑端到端测试。</li><li>创建一个 Feature List JSON，跟踪 3 个 feature 的状态和验证证据。</li></ol><p><a href="./ch06.html">下一章：可观测性与会话清理</a></p></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("agent/ch05.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
