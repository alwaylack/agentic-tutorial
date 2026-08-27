import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"第 27 章 · 七大生产循环模式","description":"","frontmatter":{},"headers":[],"relativePath":"agent/ch27.md","filePath":"agent/ch27.md","lastUpdated":1787480284000}');
const __default__ = { name: "agent/ch27.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: "以下哪种循环模式的 token 成本最高？",
        options: [
          "Daily Triage",
          "Changelog Drafter",
          "CI Sweeper",
          "Post-Merge Cleanup"
        ],
        answer: 2,
        explain: "CI Sweeper 涉及代码生成 + 测试运行 + 多次重试，token 消耗极高；其他模式主要是读取和分类，成本较低。"
      },
      {
        question: "关于 CI Sweeper 的安全要求，以下哪项不是必须的？",
        options: [
          "有独立的验证者 sub-agent",
          "有尝试次数上限",
          "有路径黑名单",
          "使用最强的语言模型"
        ],
        answer: 3,
        explain: '安全要求包括验证者分离、尝试上限、路径黑名单、预算控制等，但不要求"最强模型"——合适而非最贵才是原则。'
      },
      {
        question: "Issue Triage 模式通常建议停留在哪个自主等级？",
        options: [
          "L3 无人值守",
          "L2 辅助修复",
          "L1 只报告",
          "不限等级"
        ],
        answer: 2,
        explain: "Issue 分类涉及人类判断，L1 只报告建议、不自动分配是最安全起点；自动分配可能导致标签错误或优先级误判。"
      },
      {
        question: "Daily Triage 的推荐节奏不包括以下哪个？",
        options: [
          "晨间 /loop 1d",
          "活跃冲刺期 /loop 2h",
          "GitHub Action cron 0 8 * * 1-5",
          "每分钟 /loop 1m"
        ],
        answer: 3,
        explain: "官方建议晨间、冲刺期、工作日 cron，但没有建议每分钟运行——频率过高会浪费 token 且产生噪音。"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-27-章-·-七大生产循环模式" tabindex="-1">第 27 章 · 七大生产循环模式 <a class="header-anchor" href="#第-27-章-·-七大生产循环模式" aria-label="Permalink to &quot;第 27 章 · 七大生产循环模式&quot;">​</a></h1><blockquote><p>本章目标：掌握 Loop Engineering 生态中最实用的七个生产循环模式，理解每种模式的节奏、所需技能和 token 成本，能在实际项目中选型。</p></blockquote><h2 id="_27-1-模式总览" tabindex="-1">27.1 模式总览 <a class="header-anchor" href="#_27-1-模式总览" aria-label="Permalink to &quot;27.1 模式总览&quot;">​</a></h2><p>官方认证的生产循环模式共七种，按复杂度与 token 成本递增排列：</p><table tabindex="0"><thead><tr><th>模式</th><th>节奏</th><th>自主等级</th><th>Token 成本</th></tr></thead><tbody><tr><td>Daily Triage</td><td>1 天 – 2 小时</td><td>L1</td><td>低</td></tr><tr><td>PR Babysitter</td><td>5 – 15 分钟</td><td>L1</td><td>高</td></tr><tr><td>CI Sweeper</td><td>5 – 15 分钟</td><td>L2（谨慎）</td><td>极高</td></tr><tr><td>Dependency Sweeper</td><td>6 小时 – 1 天</td><td>L2</td><td>中</td></tr><tr><td>Changelog Drafter</td><td>1 天 或 tag</td><td>L1</td><td>低</td></tr><tr><td>Post-Merge Cleanup</td><td>1 天 – 6 小时</td><td>L1</td><td>低</td></tr><tr><td>Issue Triage</td><td>2 小时 – 1 天</td><td>L1</td><td>低</td></tr></tbody></table><h2 id="_27-2-daily-triage-每日分诊" tabindex="-1">27.2 Daily Triage：每日分诊 <a class="header-anchor" href="#_27-2-daily-triage-每日分诊" aria-label="Permalink to &quot;27.2 Daily Triage：每日分诊&quot;">​</a></h2><h3 id="目标" tabindex="-1">目标 <a class="header-anchor" href="#目标" aria-label="Permalink to &quot;目标&quot;">​</a></h3><p>每天开始时自动生成一份优先级排序的问题清单，让团队知道今天该做什么。</p><h3 id="所需技能" tabindex="-1">所需技能 <a class="header-anchor" href="#所需技能" aria-label="Permalink to &quot;所需技能&quot;">​</a></h3><ul><li><code>loop-triage</code>：读取 CI、issues、commits、chat，产出优先级发现</li><li><code>minimal-fix</code>（可选，第二阶段）：为明显失败起草最小修复</li><li>Reviewer 子代理或技能（可选）：验证提出的修复</li></ul><h3 id="状态管理" tabindex="-1">状态管理 <a class="header-anchor" href="#状态管理" aria-label="Permalink to &quot;状态管理&quot;">​</a></h3><p>使用 <code>STATE.md</code> 作为记忆骨干：</p><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}"># Loop State — Project X</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">Last run: 2026-06-09 08:15 UTC</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## High Priority</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> [ ] #1241 — flaky test in auth flow (CI red on main)</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">  Loop action: Opened worktree. Fix proposed. Waiting for human PR review.</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## Watch List</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> PR #1238 open 4 days with no activity.</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h3 id="建议节奏" tabindex="-1">建议节奏 <a class="header-anchor" href="#建议节奏" aria-label="Permalink to &quot;建议节奏&quot;">​</a></h3><ul><li>晨间分诊：<code>/loop 1d</code></li><li>活跃冲刺期：<code>/loop 2h</code></li><li>团队无 TUI：GitHub Action cron <code>0 8 * * 1-5</code></li></ul><h2 id="_27-3-pr-babysitter-pr-守护" tabindex="-1">27.3 PR Babysitter：PR 守护 <a class="header-anchor" href="#_27-3-pr-babysitter-pr-守护" aria-label="Permalink to &quot;27.3 PR Babysitter：PR 守护&quot;">​</a></h2><h3 id="目标-1" tabindex="-1">目标 <a class="header-anchor" href="#目标-1" aria-label="Permalink to &quot;目标&quot;">​</a></h3><p>PR 打开后自动追踪，提醒久未处理的 PR，必要时自动评论或标记。</p><h3 id="节奏与成本" tabindex="-1">节奏与成本 <a class="header-anchor" href="#节奏与成本" aria-label="Permalink to &quot;节奏与成本&quot;">​</a></h3><ul><li>每 5–15 分钟检查一次</li><li>Token 成本高（频繁调用 LLM 判断状态）</li><li>建议 L1 仅观察，不自动操作</li></ul><h3 id="关键约束" tabindex="-1">关键约束 <a class="header-anchor" href="#关键约束" aria-label="Permalink to &quot;关键约束&quot;">​</a></h3><ul><li>不要自动关闭或合并 PR</li><li>不要替换人类 reviewer 的判断</li><li>只提醒、只标记、只总结</li></ul><h2 id="_27-4-ci-sweeper-ci-扫雷" tabindex="-1">27.4 CI Sweeper：CI 扫雷 <a class="header-anchor" href="#_27-4-ci-sweeper-ci-扫雷" aria-label="Permalink to &quot;27.4 CI Sweeper：CI 扫雷&quot;">​</a></h2><h3 id="目标-2" tabindex="-1">目标 <a class="header-anchor" href="#目标-2" aria-label="Permalink to &quot;目标&quot;">​</a></h3><p>CI 失败时自动诊断原因、尝试修复、开新 PR。</p><h3 id="风险与约束" tabindex="-1">风险与约束 <a class="header-anchor" href="#风险与约束" aria-label="Permalink to &quot;风险与约束&quot;">​</a></h3><ul><li>Token 成本极高（涉及代码生成 + 测试运行）</li><li>必须 L2 起步：先有稳定的 L1 分诊记录 1–2 周</li><li>必须有独立验证者（verification sub-agent）</li><li>必须有尝试次数上限（如 3 次）</li></ul><h3 id="安全边界" tabindex="-1">安全边界 <a class="header-anchor" href="#安全边界" aria-label="Permalink to &quot;安全边界&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># loop-budget.md</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">max_tokens_per_run</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">50000</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">max_attempts</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">3</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">denylist_paths</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">:</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">  - </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;config/prod-secret*&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">  - </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;.env&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="_27-5-dependency-sweeper-依赖扫描" tabindex="-1">27.5 Dependency Sweeper：依赖扫描 <a class="header-anchor" href="#_27-5-dependency-sweeper-依赖扫描" aria-label="Permalink to &quot;27.5 Dependency Sweeper：依赖扫描&quot;">​</a></h2><h3 id="目标-3" tabindex="-1">目标 <a class="header-anchor" href="#目标-3" aria-label="Permalink to &quot;目标&quot;">​</a></h3><p>定期检查依赖安全漏洞与过期包，自动开 PR 升级。</p><h3 id="节奏" tabindex="-1">节奏 <a class="header-anchor" href="#节奏" aria-label="Permalink to &quot;节奏&quot;">​</a></h3><ul><li>每 6 小时至 1 天一次</li><li>Token 成本中等</li></ul><h3 id="模式特点" tabindex="-1">模式特点 <a class="header-anchor" href="#模式特点" aria-label="Permalink to &quot;模式特点&quot;">​</a></h3><ul><li>适合 L2：可自动升级非破坏性依赖</li><li>破坏性升级需人工确认</li></ul><h2 id="_27-6-changelog-drafter-变更日志起草" tabindex="-1">27.6 Changelog Drafter：变更日志起草 <a class="header-anchor" href="#_27-6-changelog-drafter-变更日志起草" aria-label="Permalink to &quot;27.6 Changelog Drafter：变更日志起草&quot;">​</a></h2><h3 id="目标-4" tabindex="-1">目标 <a class="header-anchor" href="#目标-4" aria-label="Permalink to &quot;目标&quot;">​</a></h3><p>根据 git commits 自动生成 CHANGELOG.md 草稿。</p><h3 id="节奏-1" tabindex="-1">节奏 <a class="header-anchor" href="#节奏-1" aria-label="Permalink to &quot;节奏&quot;">​</a></h3><ul><li>手动触发（tag 时）或每日一次</li></ul><h3 id="特点" tabindex="-1">特点 <a class="header-anchor" href="#特点" aria-label="Permalink to &quot;特点&quot;">​</a></h3><ul><li>Token 成本低</li><li>L1 即可：只起草，不改 CHANGELOG</li><li>人类最终审批</li></ul><h2 id="_27-7-post-merge-cleanup-合并后清理" tabindex="-1">27.7 Post-Merge Cleanup：合并后清理 <a class="header-anchor" href="#_27-7-post-merge-cleanup-合并后清理" aria-label="Permalink to &quot;27.7 Post-Merge Cleanup：合并后清理&quot;">​</a></h2><h3 id="目标-5" tabindex="-1">目标 <a class="header-anchor" href="#目标-5" aria-label="Permalink to &quot;目标&quot;">​</a></h3><p>PR 合并后自动清理分支、删除临时文件、更新文档。</p><h3 id="节奏-2" tabindex="-1">节奏 <a class="header-anchor" href="#节奏-2" aria-label="Permalink to &quot;节奏&quot;">​</a></h3><ul><li>1 天 – 6 小时一次</li></ul><h3 id="特点-1" tabindex="-1">特点 <a class="header-anchor" href="#特点-1" aria-label="Permalink to &quot;特点&quot;">​</a></h3><ul><li>Token 成本低</li><li>L1：只做清理，不动业务代码</li></ul><h2 id="_27-8-issue-triage-issue-分诊" tabindex="-1">27.8 Issue Triage：Issue 分诊 <a class="header-anchor" href="#_27-8-issue-triage-issue-分诊" aria-label="Permalink to &quot;27.8 Issue Triage：Issue 分诊&quot;">​</a></h2><h3 id="目标-6" tabindex="-1">目标 <a class="header-anchor" href="#目标-6" aria-label="Permalink to &quot;目标&quot;">​</a></h3><p>新 Issue 进来时自动分类、标记优先级、分配标签。</p><h3 id="节奏-3" tabindex="-1">节奏 <a class="header-anchor" href="#节奏-3" aria-label="Permalink to &quot;节奏&quot;">​</a></h3><ul><li>2 小时 – 1 天一次</li></ul><h3 id="特点-2" tabindex="-1">特点 <a class="header-anchor" href="#特点-2" aria-label="Permalink to &quot;特点&quot;">​</a></h3><ul><li>L1：只建议，不自动分配</li><li>可结合项目历史 issue 学习分类规律</li></ul><h2 id="_27-9-模式选型速查表" tabindex="-1">27.9 模式选型速查表 <a class="header-anchor" href="#_27-9-模式选型速查表" aria-label="Permalink to &quot;27.9 模式选型速查表&quot;">​</a></h2><table tabindex="0"><thead><tr><th>你的场景</th><th>推荐模式</th></tr></thead><tbody><tr><td>团队每天不知道该干什么</td><td>Daily Triage</td></tr><tr><td>PR 经常石沉大海</td><td>PR Babysitter</td></tr><tr><td>CI 经常挂且没人修</td><td>CI Sweeper（L2+）</td></tr><tr><td>依赖漏洞堆积</td><td>Dependency Sweeper</td></tr><tr><td>CHANGELOG 从不更新</td><td>Changelog Drafter</td></tr><tr><td>合并后分支乱七八糟</td><td>Post-Merge Cleanup</td></tr><tr><td>Issue 标签混乱</td><td>Issue Triage</td></tr></tbody></table><h2 id="本章小结" tabindex="-1">本章小结 <a class="header-anchor" href="#本章小结" aria-label="Permalink to &quot;本章小结&quot;">​</a></h2><ul><li>七个模式各有定位，从 L1 到 L2 不等；</li><li>Token 成本从低到极高，选型需权衡价值与成本；</li><li>安全原则：先 L1 证明看得准，再考虑 L2 允许动手；</li><li>可用交互式选择器（pattern picker）辅助决策。</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>用 <code>npx @cobusgreyling/loop init . --pattern daily-triage --tool claude</code> 初始化一个 Daily Triage 循环，观察生成的文件结构。</li><li>为一个简单的 GitHub Actions CI 失败场景设计一个 CI Sweeper 循环（仅 L1 报告阶段），写出你的 STATE.md 模板。</li><li>对比 Changelog Drafter 和 Issue Triage 两种模式的 token 成本差异，解释为什么前者更低。</li></ol><blockquote><p>完成练习后，进入<a href="./ch28.html">下一章：自主等级与 Loop Ready 评分</a>。</p></blockquote></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("agent/ch27.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
