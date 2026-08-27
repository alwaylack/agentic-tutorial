import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"第 26 章 · Loop Engineering：从提示到循环","description":"","frontmatter":{},"headers":[],"relativePath":"agent/ch26.md","filePath":"agent/ch26.md","lastUpdated":1787480284000}');
const __default__ = { name: "agent/ch26.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: "Loop Engineering 的核心理念可以用哪句话概括？",
        options: [
          '"写更好的 prompt"',
          '"停止提示，设计循环"',
          '"让模型更聪明"',
          '"减少 token 消耗"'
        ],
        answer: 1,
        explain: '官方口号是 "Stop prompting. Design the loop. Get a score."——杠杆点从 craft prompt 转移到 design 控制循环。'
      },
      {
        question: "以下哪个不是 Loop Engineering 的五大积木之一？",
        options: [
          "Automations / Scheduling",
          "Worktrees",
          "Database Sharding",
          "Sub-agents"
        ],
        answer: 2,
        explain: "五大积木是 Automations、Worktrees、Skills、Plugins&Connectors、Sub-agents，外加贯穿的 Memory。Database Sharding 属于分布式系统概念，不在其中。"
      },
      {
        question: "/goal 和 /loop 的核心区别是什么？",
        options: [
          "/goal 用于小任务，/loop 用于大任务",
          "/goal 是一次性大任务直到完成，/loop 是周期重复的小动作",
          "/goal 需要人工干预，/loop 完全自动",
          "两者没有区别，只是名字不同"
        ],
        answer: 1,
        explain: '/goal 是"马拉松"——一个目标跑到终点；/loop 是"闹钟"——周期触发独立执行。前者有累积进度，后者每轮独立。'
      },
      {
        question: "Loop Ready Score 低于 60 时，官方建议的做法是？",
        options: [
          "直接升级到 L3 无人值守模式",
          "先解决分数最低的维度，逐步提升至 L1 稳定运行",
          "更换更强的模型",
          "放弃循环，改用单次提示"
        ],
        answer: 1,
        explain: "官方强调 phased rollout：L1 只报告 → 稳定 1-2 周 → L2 辅助修复 → L3 无人值守。分数低说明某些维度未就绪，应先补齐短板。"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-26-章-·-loop-engineering-从提示到循环" tabindex="-1">第 26 章 · Loop Engineering：从提示到循环 <a class="header-anchor" href="#第-26-章-·-loop-engineering-从提示到循环" aria-label="Permalink to &quot;第 26 章 · Loop Engineering：从提示到循环&quot;">​</a></h1><blockquote><p>本章目标：理解&quot;停止提示，设计循环&quot;的核心理念，掌握五大积木 + Memory 架构，能用 Loop Ready Score 评估自己的循环是否生产就绪。</p></blockquote><h2 id="_26-1-核心理念-从提示到循环" tabindex="-1">26.1 核心理念：从提示到循环 <a class="header-anchor" href="#_26-1-核心理念-从提示到循环" aria-label="Permalink to &quot;26.1 核心理念：从提示到循环&quot;">​</a></h2><p>Peter Steinberger 说过一句被广泛引用的话：</p><blockquote><p>&quot;You shouldn&#39;t be prompting coding agents anymore. You should be designing loops that prompt your agents.&quot;</p></blockquote><p>Boris Cherny（Claude Code 负责人）也表达了类似观点：</p><blockquote><p>&quot;I don&#39;t prompt Claude anymore. I have loops running that prompt Claude and figuring out what to do. My job is to write loops.&quot;</p></blockquote><p>这句话点出了<strong>杠杆点的转移</strong>：从&quot;craft 单个 prompt&quot;到&quot;design 控制循环&quot;。</p><h3 id="单次提示-vs-循环的差别" tabindex="-1">单次提示 vs 循环的差别 <a class="header-anchor" href="#单次提示-vs-循环的差别" aria-label="Permalink to &quot;单次提示 vs 循环的差别&quot;">​</a></h3><table tabindex="0"><thead><tr><th>维度</th><th>单次提示</th><th>循环</th></tr></thead><tbody><tr><td>你提供的</td><td>&quot;下一步做什么&quot;</td><td>&quot;最终状态长什么样&quot;</td></tr><tr><td>agent 做的</td><td>执行一次</td><td>循环直到达成目标</td></tr><tr><td>谁判断完成</td><td>你</td><td>可验证的停止条件</td></tr><tr><td>你能走开吗</td><td>不能</td><td>输入 <code>/goal</code> 后即可离开</td></tr></tbody></table><h2 id="_26-2-五大积木-memory" tabindex="-1">26.2 五大积木 + Memory <a class="header-anchor" href="#_26-2-五大积木-memory" aria-label="Permalink to &quot;26.2 五大积木 + Memory&quot;">​</a></h2><p>Loop Engineering 把所有循环拆解为五个基础积木，外加一个贯穿始终的 Memory 层：</p><table tabindex="0"><thead><tr><th>积木</th><th>职责</th><th>典型实现</th></tr></thead><tbody><tr><td><strong>Automations / Scheduling</strong></td><td>定时发现 + 分诊</td><td>cron、GitHub Actions、<code>/loop</code> 命令</td></tr><tr><td><strong>Worktrees</strong></td><td>安全并行执行</td><td><code>git worktree add</code>、<code>loop-worktree</code> 工具</td></tr><tr><td><strong>Skills</strong></td><td>持久化项目知识</td><td>SKILL.md、技能目录</td></tr><tr><td><strong>Plugins &amp; Connectors</strong></td><td>连接真实工具</td><td>MCP server、GitHub API、Slack bot</td></tr><tr><td><strong>Sub-agents</strong></td><td>maker/checker 分离</td><td>独立子代理执行 + 验证</td></tr><tr><td><strong>+ Memory / State</strong></td><td>跨会话持久化</td><td>STATE.md、PROGRESS.md、git commits</td></tr></tbody></table><h3 id="循环解剖图" tabindex="-1">循环解剖图 <a class="header-anchor" href="#循环解剖图" aria-label="Permalink to &quot;循环解剖图&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">flowchart LR</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">    A[Schedule / Automation] --&gt; B[Triage Skill]</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">    B --&gt; C[Read + Write STATE / Memory]</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">    C --&gt; D[Isolated Worktree]</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">    D --&gt; E[Implementer Sub-agent]</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">    E --&gt; F[Verifier Sub-agent&lt;br/&gt;tests + gates]</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">    F --&gt; G[MCP / Git / Tickets]</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">    G --&gt; H{Human Gate?}</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">    H --&gt;|safe / allowlisted| I[Commit / PR / Action]</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">    H --&gt;|risky / ambiguous| J[Escalate to human&lt;br/&gt;with full context]</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">    I --&gt; A</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">    J --&gt; A</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h2 id="_26-3-四种循环类型" tabindex="-1">26.3 四种循环类型 <a class="header-anchor" href="#_26-3-四种循环类型" aria-label="Permalink to &quot;26.3 四种循环类型&quot;">​</a></h2><table tabindex="0"><thead><tr><th>类型</th><th>触发方式</th><th>停止条件</th><th>典型场景</th></tr></thead><tbody><tr><td><strong>Turn-based</strong></td><td>手动输入每条提示</td><td>agent 认为完成 或 你打断</td><td>小任务、探索性工作</td></tr><tr><td><strong>Goal-based</strong></td><td>给定一个目标</td><td>独立评估器确认完成 或 达到上限</td><td><code>/goal</code> 复杂任务</td></tr><tr><td><strong>Time-based</strong></td><td>定时调度</td><td>手动停止 或 任务自然退出</td><td><code>/loop</code> 监控、周期性检查</td></tr><tr><td><strong>Event-driven</strong></td><td>外部事件（PR 打开、CI 失败）</td><td>处理后退出 或 达到重试上限</td><td>CI/CD 集成、响应式工作流</td></tr></tbody></table><div class="tip custom-block"><p class="custom-block-title">区分 /goal 与 /loop</p><p>两者都带&quot;loop&quot;但解决不同问题：</p><ul><li><code>/goal</code>：一个大任务，循环直到完成（马拉松）</li><li><code>/loop</code>：一个小动作，周期重复执行（闹钟）</li></ul></div><h2 id="_26-4-loop-ready-score" tabindex="-1">26.4 Loop Ready Score <a class="header-anchor" href="#_26-4-loop-ready-score" aria-label="Permalink to &quot;26.4 Loop Ready Score&quot;">​</a></h2><p>官方 CLI 提供 <code>loop audit</code> 命令，扫描仓库并给出 <strong>0–100 的 Loop Ready Score</strong>，衡量循环是否具备生产就绪条件。审计维度包括：</p><table tabindex="0"><thead><tr><th>维度</th><th>检查内容</th></tr></thead><tbody><tr><td><strong>Skills</strong></td><td>是否存在格式紧凑的分诊技能；技能描述是否&quot;无聊而具体&quot;</td></tr><tr><td><strong>State</strong></td><td>状态文件 schema 是否明确；每轮是否读旧写新</td></tr><tr><td><strong>Maker/Checker 分离</strong></td><td>实现者与验证者是否独立</td></tr><tr><td><strong>Budget</strong></td><td>是否有预算定义与超限动作</td></tr><tr><td><strong>Constraints</strong></td><td>路径黑名单、尝试次数上限等约束是否成文</td></tr><tr><td><strong>Governance / Run log</strong></td><td>是否有运行日志与 LOOP.md 自描述</td></tr></tbody></table><h2 id="本章小结" tabindex="-1">本章小结 <a class="header-anchor" href="#本章小结" aria-label="Permalink to &quot;本章小结&quot;">​</a></h2><ul><li>Loop Engineering 的核心是&quot;设计循环而不是写提示&quot;；</li><li>五大积木（Automations/Worktrees/Skills/Plugins&amp;Connectors/Sub-agents）+ Memory 构成完整架构；</li><li>四种循环类型对应不同触发与停止场景；</li><li>Loop Ready Score 提供生产就绪的量化评估。</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>用 <code>npx @cobusgreyling/loop init . --pattern daily-triage --tool claude</code> 初始化一个 Daily Triage 循环，运行 <code>loop doctor</code> 查看健康状态。</li><li>为一个简单任务设计一个 <code>/goal</code> 循环，明确目标、验证方法和停止条件。</li><li>阅读 <code>loop-audit</code> 的输出，理解每个审计维度的含义，并针对最低分维度改进你的循环。</li></ol><blockquote><p>完成练习后，进入<a href="./ch27.html">下一章：七大生产循环模式</a>。</p></blockquote></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("agent/ch26.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
