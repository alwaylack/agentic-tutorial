import { resolveComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"第 28 章 · 自主等级与 Loop Ready 评分","description":"","frontmatter":{},"headers":[],"relativePath":"agent/ch28.md","filePath":"agent/ch28.md","lastUpdated":1787480284000}');
const _sfc_main = { name: "agent/ch28.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Quiz = resolveComponent("Quiz");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-28-章-·-自主等级与-loop-ready-评分" tabindex="-1">第 28 章 · 自主等级与 Loop Ready 评分 <a class="header-anchor" href="#第-28-章-·-自主等级与-loop-ready-评分" aria-label="Permalink to &quot;第 28 章 · 自主等级与 Loop Ready 评分&quot;">​</a></h1><blockquote><p>本章目标：掌握 L1/L2/L3 三级自主度的定义与升级条件，理解 Loop Ready Score 的审计维度，会用官方 CLI 工具链初始化、体检、审计和估算成本。</p></blockquote><h2 id="_21-1-三级自主度-l1-l2-l3" tabindex="-1">21.1 三级自主度：L1 / L2 / L3 <a class="header-anchor" href="#_21-1-三级自主度-l1-l2-l3" aria-label="Permalink to &quot;21.1 三级自主度：L1 / L2 / L3&quot;">​</a></h2><p>循环能自己动手到什么程度，必须显式分级管理。官方定义了三个自主等级：</p><table tabindex="0"><thead><tr><th>等级</th><th>名称</th><th>循环可以做什么</th><th>前提条件</th></tr></thead><tbody><tr><td><strong>L1</strong></td><td>Report（只报告）</td><td>扫描、分诊、写状态文件、通知人；<strong>不改任何代码</strong></td><td>有分诊技能 + 状态文件</td></tr><tr><td><strong>L2</strong></td><td>Assisted（辅助修复）</td><td>在 worktree 中起草最小修复、开 PR 供人审；连接器可更新工单</td><td>L1 稳定 1–2 周 + 独立验证者 + 尝试次数上限</td></tr><tr><td><strong>L3</strong></td><td>Unattended（无人值守）</td><td>自动合并白名单内的低风险变更、全自动闭环</td><td>黑名单 + 预算 + 运行日志 + 指标 + 人工门控全部就位</td></tr></tbody></table><p>升级是单向门控，不能跳级：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>L1 只报告 → 稳定运行 1–2 周（分诊准确率达标）</span></span>
<span class="line"><span>      ↓</span></span>
<span class="line"><span>L2 小修复 → 验证者 + worktree + 最大尝试次数（如 3 次）就位</span></span>
<span class="line"><span>      ↓</span></span>
<span class="line"><span>L2+ 连接器 → 循环可自动开 PR / 更新工单（最小权限 bot 身份）</span></span>
<span class="line"><span>      ↓</span></span>
<span class="line"><span>L3 无人值守 → 仅当 denylist、budget、metrics、human gates 全部存在</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><div class="danger custom-block"><p class="custom-block-title">最常见的翻车点</p><p>&quot;L3 before L1 quality&quot;——上线第一天就开自动修 + 自动合并。此时分诊规则还没校准，循环会拿着错误的信号去执行高权限动作，理解债（comprehension debt）瞬间爆炸。记住顺序：先证明它看得准，再允许它动得了手。</p></div><h2 id="_21-2-loop-ready-score-给循环打分的审计维度" tabindex="-1">21.2 Loop Ready Score：给循环打分的审计维度 <a class="header-anchor" href="#_21-2-loop-ready-score-给循环打分的审计维度" aria-label="Permalink to &quot;21.2 Loop Ready Score：给循环打分的审计维度&quot;">​</a></h2><p><code>loop-audit</code> 会扫描你的仓库并给出一个 0–100 的 <strong>Loop Ready Score</strong>，衡量这个循环是否具备生产就绪条件。审计维度包括：</p><table tabindex="0"><thead><tr><th>维度</th><th>检查内容</th></tr></thead><tbody><tr><td><strong>Skills</strong></td><td>是否存在格式紧凑的分诊技能；技能描述是否&quot;无聊而具体&quot;；构建/测试命令是否有文档</td></tr><tr><td><strong>State</strong></td><td>状态文件 schema 是否明确；每轮是否读旧写新、带时间戳、清理已解决条目</td></tr><tr><td><strong>Maker/Checker 分离</strong></td><td>实现者与验证者是否独立；验证者是否真的跑测试</td></tr><tr><td><strong>Budget</strong></td><td>是否有 <code>loop-budget.md</code> 定义每日 token 上限与超限动作</td></tr><tr><td><strong>Constraints</strong></td><td>路径黑名单、尝试次数上限等约束是否成文</td></tr><tr><td><strong>Governance / Run log</strong></td><td>是否有 <code>loop-run-log.md</code> 记录每次运行；LOOP.md 是否描述循环自身</td></tr><tr><td><strong>Harness Runtime</strong></td><td>得分较高时还会提示把循环固化为版本化 harness 栈</td></tr></tbody></table><p>分数的意义不在于数字本身，而在于<strong>维度清单就是设计清单</strong>——每一项都对应一个真实的失败模式。</p><h2 id="_21-3-cli-工具链实战" tabindex="-1">21.3 CLI 工具链实战 <a class="header-anchor" href="#_21-3-cli-工具链实战" aria-label="Permalink to &quot;21.3 CLI 工具链实战&quot;">​</a></h2><p>官方把所有能力收敛到一个统一入口 <code>@cobusgreyling/loop</code>：</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 1. 初始化：生成技能骨架、STATE.md、预算/运行日志文件，并打印 Loop Ready 分数</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">npx</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> @cobusgreyling/loop</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> init</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> .</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> --pattern</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> daily-triage</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> --tool</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> claude</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 2. 体检：audit + sync + 文件检查 → 输出 top 3 下一步行动</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">npx</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> @cobusgreyling/loop</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> doctor</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> .</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 3. 查看当前状态</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">npx</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> @cobusgreyling/loop</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> status</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> .</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 4. 审计并给出改进建议（--suggest 会告诉你差在哪几项）</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">npx</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> @cobusgreyling/loop</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> audit</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> .</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> --suggest</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 5. 生成本地徽章，展示 Loop Ready 分数</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">npx</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> @cobusgreyling/loop</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> badge</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> .</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 6. 观察分数爬升的演示脚本（空仓库 → L1 → L2）</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">bash</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> scripts/before-after-demo.sh</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>日常使用的心智模型：<strong><code>init</code> 一次，<code>doctor</code> 天天看</strong>——doctor 把审计、同步和文件检查压缩成前三条最该做的事，不需要你自己读冗长的报告。</p><h2 id="_21-4-预算与成本估算" tabindex="-1">21.4 预算与成本估算 <a class="header-anchor" href="#_21-4-预算与成本估算" aria-label="Permalink to &quot;21.4 预算与成本估算&quot;">​</a></h2><p>上高频循环前必须先算账。官方提供成本估算工具，规划因子有四个：</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 按 模式 × 节奏 × 自主等级 估算每日 token 消耗</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">npx</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> @cobusgreyling/loop-cost</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> --pattern</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> ci-sweeper</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> --cadence</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> 15m</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> --level</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> L1</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><table tabindex="0"><thead><tr><th>因子</th><th>对成本的影响</th></tr></thead><tbody><tr><td>节奏（cadence）</td><td>线性放大：5 分钟 vs 1 天 = 每天 288 倍运行次数</td></tr><tr><td>每轮子智能体数</td><td>每个子智能体都是完整的模型调用 + 工具往返</td></tr><tr><td>上下文大小</td><td>大仓库 + 完整 CI 日志让分诊本身变贵</td></tr><tr><td>验证者模型</td><td>无人值守场景下用更强模型当验证者——这钱值得花</td></tr></tbody></table><p>量级参考（轻分诊约 5 万 token/轮，含实现+验证约 20 万 token/轮）：Daily Triage 每天约 5 万；CI Sweeper 若每轮全链路则高达每天 500 万——这正是上一章强调&quot;空列表早退出&quot;的原因。</p><p>预算要落成文件并由机制执行，而不是口头约定：</p><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">&lt;!-- loop-budget.md --&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## Loop Budget — Project X</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> Max tokens/day: 2M</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> On exceed: 暂停调度器并通知人工</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> Max sub-agent spawns per run: 3</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="warning custom-block"><p class="custom-block-title">预算提升必须人工批准</p><p>智能体不能自行上调自己的预算上限。官方提供了 budget-negotiator 技能让 L3 循环在接近上限时&quot;申请&quot;追加额度，但修改 <code>loop-budget.md</code> 的手必须是人类的。</p></div><h2 id="_21-5-灰度推进策略" tabindex="-1">21.5 灰度推进策略 <a class="header-anchor" href="#_21-5-灰度推进策略" aria-label="Permalink to &quot;21.5 灰度推进策略&quot;">​</a></h2><p>把升级当作一次小型发布来管理：</p><ol><li><strong>每级都有退出指标</strong>：L1 看&quot;误报率 &lt;30% 且连续两周稳定&quot;；L2 看&quot;提议的修复被采纳率&quot;；L3 上线前逐项核对安全清单；</li><li><strong>降级永远可用</strong>：任何一级出问题，退回上一级而不是硬扛——把调度节奏调慢或改回 report-only 是几分钟的事；</li><li><strong>记录每一次人工覆盖</strong>：你推翻循环判断的案例是最宝贵的调参素材，写回分诊技能里；</li><li><strong>大版本周特殊规则</strong>：发版周暂停所有 auto-fix 循环，只保留报告模式，避免循环和热修打架。</li></ol><h2 id="本章小结" tabindex="-1">本章小结 <a class="header-anchor" href="#本章小结" aria-label="Permalink to &quot;本章小结&quot;">​</a></h2><ul><li>L1 报告 / L2 辅助 / L3 无人值守，升级必须逐级且满足前提，严禁跳级；</li><li>Loop Ready Score 的维度清单就是设计清单：Skills、State、Maker/Checker、Budget、Constraints、Governance；</li><li>CLI 心智模型：<code>init</code> 一次、<code>doctor</code> 天天看、<code>audit --suggest</code> 找差距、<code>cost</code> 先算账再上高频；</li><li>成本四因子：节奏线性放大最危险，验证者模型的钱最值得花；</li><li>预算写入 <code>loop-budget.md</code> 并由机制执行，智能体无权自我提额；</li><li>灰度推进 = 每级退出指标 + 随时可降级 + 记录人工覆盖。</li></ul>`);
  _push(ssrRenderComponent(_component_Quiz, { items: _ctx.quiz }, null, _parent));
  _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>在测试仓库跑通 <code>loop init</code> 与 <code>loop doctor .</code>，把 doctor 给出的 top 3 行动逐条完成，再看分数变化。</li><li>为你计划中的循环写一份 <code>loop-budget.md</code>，包含每日上限、超限动作和子智能体数量上限三项。</li><li>用 <code>loop-cost</code> 分别估算 daily-triage（1d/L1）与 ci-sweeper（15m/L2）的日消耗，把结果和你的直觉对比，写下偏差原因。</li></ol><blockquote><p>完成练习后，进入<a href="./ch29.html">下一章：循环安全与失败模式</a>。</p></blockquote><blockquote><p>完成后进入<a href="./ch29.html">下一章：循环安全与失败模式</a>。<script setup>
const quiz = [
{
question: &#39;从 L1 升级到 L2 的前提条件是？&#39;,
options: [
&#39;只要循环跑满一周就可以直接升&#39;,
&#39;L1 稳定运行 1–2 周、分诊准确率达标，且具备独立验证者与尝试次数上限&#39;,
&#39;购买更高级别的 API 套餐&#39;,
&#39;通过 loop badge 生成徽章即可&#39;
],
answer: 1,
explain: &#39;升级是逐级的质量门控：先用两周报告期证明看得准，再配齐 Maker/Checker 分离与尝试上限，才允许动手起草修复。&#39;
},
{
question: &#39;关于 Loop Ready Score，正确的理解是？&#39;,
options: [
&#39;分数越高说明循环 token 消耗越低&#39;,
&#39;它是营销用的排名指标，无实际用途&#39;,
&#39;它的审计维度本质上是一份设计清单，每项对应真实失败模式&#39;,
&#39;只有达到 100 分才允许运行任何循环&#39;
],
answer: 2,
explain: &#39;评分的价值在于维度：Skills/State/Maker-Checker/Budget/Constraints/Governance 各项都对应一类已知失败方式，缺一项就是在裸奔。&#39;
},
{
question: &#39;为什么智能体不能自行上调 loop-budget.md 中的预算？&#39;,
options: [
&#39;因为文件被设置为只读&#39;,
&#39;因为预算是治理边界——资源上限必须由人类掌控，否则失控循环会自我扩权&#39;,
&#39;因为上调需要重新计费签约&#39;,
&#39;其实可以自行上调，只是不建议&#39;
],
answer: 1,
explain: &#39;官方设计：L3 循环可用 budget-negotiator 技能&amp;quot;申请&amp;quot;额度，但编辑 loop-budget.md 必须是人——这是防止循环失控自我扩张的最后防线之一。&#39;
},
{
question: &#39;下列哪个成本因子的放大效应最危险，需要最先控制？&#39;,
options: [
&#39;验证者使用更强的模型&#39;,
&#39;调度节奏——从每天一次改成每 5 分钟一次意味着 288 倍运行次数&#39;,
&#39;仓库里有大量 README 文档&#39;,
&#39;状态文件写得比较长&#39;
],
answer: 1,
explain: &#39;节奏是线性乘数：CI Sweeper 从 1d 改成 5m 就是 288×/天，若每轮还跑全链路子智能体，日消耗可达 500 万 token 级别。&#39;
}
]
<\/script></p></blockquote></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("agent/ch28.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ch28 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  ch28 as default
};
