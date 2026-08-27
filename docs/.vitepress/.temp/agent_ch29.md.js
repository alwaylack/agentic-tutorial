import { resolveComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"第 29 章 · 循环安全与失败模式","description":"","frontmatter":{},"headers":[],"relativePath":"agent/ch29.md","filePath":"agent/ch29.md","lastUpdated":1787480284000}');
const _sfc_main = { name: "agent/ch29.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Quiz = resolveComponent("Quiz");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-29-章-·-循环安全与失败模式" tabindex="-1">第 29 章 · 循环安全与失败模式 <a class="header-anchor" href="#第-29-章-·-循环安全与失败模式" aria-label="Permalink to &quot;第 29 章 · 循环安全与失败模式&quot;">​</a></h1><blockquote><p>本章目标：掌握循环的五大安全机制，精读官方失败模式目录与设计反模式，理解理解债/意图债等运营概念，最终能用生产上线检查单验收一个循环。</p></blockquote><h2 id="_22-1-五大安全机制" tabindex="-1">22.1 五大安全机制 <a class="header-anchor" href="#_22-1-五大安全机制" aria-label="Permalink to &quot;22.1 五大安全机制&quot;">​</a></h2><p>循环会以机器的执行力放大你植入的判断，因此安全机制是生产循环的<strong>最低配置</strong>而非可选项：</p><h3 id="_1-路径黑名单-path-denylist" tabindex="-1">1. 路径黑名单（Path Denylist） <a class="header-anchor" href="#_1-路径黑名单-path-denylist" aria-label="Permalink to &quot;1. 路径黑名单（Path Denylist）&quot;">​</a></h3><p>以下路径<strong>永远不允许循环自动修改</strong>，命中必须升级给人：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.env / .env.*</span></span>
<span class="line"><span>**/secrets/**  **/credentials/**  **/*_key*  **/*_secret*</span></span>
<span class="line"><span>.terraform/**  k8s/production/**</span></span>
<span class="line"><span>**/migrations/**          # 除非是专门的迁移循环</span></span>
<span class="line"><span>auth/**  payments/**  billing/**</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>关键设计：黑名单不靠&quot;提示词里写一句请勿修改&quot;来执行，而是用 <code>loop-gate</code> 工具<strong>机械化执行</strong>——<code>loop-gate check --action &lt;type&gt; --paths &lt;files&gt;</code> 命中黑名单时以退出码 2 强制升级，控制脚本可以链式判断。</p><h3 id="_2-自动合并白名单-auto-merge-allowlist" tabindex="-1">2. 自动合并白名单（Auto-Merge Allowlist） <a class="header-anchor" href="#_2-自动合并白名单-auto-merge-allowlist" aria-label="Permalink to &quot;2. 自动合并白名单（Auto-Merge Allowlist）&quot;">​</a></h3><p>默认策略：<strong>禁止自动合并</strong>。确有把握的琐碎变更才进白名单：</p><table tabindex="0"><thead><tr><th>允许自动合并</th><th>绝不允许</th></tr></thead><tbody><tr><td>注释/文档错别字</td><td>一切行为变更</td></tr><tr><td>仅测试文件内的 lint 自动修复</td><td>依赖版本升级</td></tr><tr><td>import 排序</td><td>锁文件变更</td></tr><tr><td>白名单 <code>docs/</code> 路径内的配置</td><td>任何黑名单路径</td></tr></tbody></table><h3 id="_3-人工门控-human-gates" tabindex="-1">3. 人工门控（Human Gates） <a class="header-anchor" href="#_3-人工门控-human-gates" aria-label="Permalink to &quot;3. 人工门控（Human Gates）&quot;">​</a></h3><p>以下场景无条件等人：安全/认证/授权相关、支付与 PII、基础设施（Terraform/K8s 生产）、依赖升级、单次变更超过 N 个文件（建议 N=10）、同一事项第三次尝试仍失败、以及预算追加请求。</p><h3 id="_4-mcp-最小权限" tabindex="-1">4. MCP 最小权限 <a class="header-anchor" href="#_4-mcp-最小权限" aria-label="Permalink to &quot;4. MCP 最小权限&quot;">​</a></h3><table tabindex="0"><thead><tr><th>连接器</th><th>允许读</th><th>允许写</th></tr></thead><tbody><tr><td>GitHub</td><td>issues、PR、checks</td><td>评论、打标签（<strong>默认不给 merge</strong>）</td></tr><tr><td>Linear</td><td>团队 issue</td><td>评论、改状态（不给删除）</td></tr><tr><td>Slack</td><td>频道历史</td><td>只发到 <code>#loop-escalations</code></td></tr><tr><td>数据库</td><td>—</td><td><strong>禁止生产库写入</strong></td></tr></tbody></table><p>用独立的 bot 账号和最小 scope 的 token，让每次循环动作都可追溯到 bot 身份。</p><h3 id="_5-worktree-隔离" tabindex="-1">5. Worktree 隔离 <a class="header-anchor" href="#_5-worktree-隔离" aria-label="Permalink to &quot;5. Worktree 隔离&quot;">​</a></h3><p>所有写代码的动作都发生在独立 git worktree 中：失败即丢弃，成功才走 PR 流程；配合 <code>loop-worktree</code> 做到&quot;一次尝试一个 worktree、拒绝即清扫&quot;。</p><h2 id="_22-2-官方失败模式目录精读" tabindex="-1">22.2 官方失败模式目录精读 <a class="header-anchor" href="#_22-2-官方失败模式目录精读" aria-label="Permalink to &quot;22.2 官方失败模式目录精读&quot;">​</a></h2><p>官方按严重度把失败分为 S1（烦人）/ S2（有害）/ S3（严重）三级。五个最经典的形态：</p><table tabindex="0"><thead><tr><th>失败模式</th><th>症状</th><th>根因</th><th>缓解手段</th></tr></thead><tbody><tr><td><strong>Infinite Fix Loop</strong></td><td>同一 PR 被自动修 5+ 次仍不过</td><td>验证者太弱或与实现者同会话；只治症状</td><td>尝试硬上限（3 次）→ 升级；独立验证者；flaky 测试隔离而非改代码</td></tr><tr><td><strong>State Rot</strong></td><td>状态文件引用已合并的 PR、已关闭的工单</td><td>每轮结束不清理；多循环乱写同一文件</td><td>每轮修剪；校验 ID 是否仍存活；每个模式一个状态文件</td></tr><tr><td><strong>Verifier Theater</strong></td><td>验证者&quot;通过&quot;但 CI 明明是红的</td><td>验证提示词太模糊（&quot;看起来不错&quot;）；根本没跑测试</td><td>验证者必须运行测试并贴输出；指令改为&quot;找出拒绝的理由&quot;</td></tr><tr><td><strong>Notification Fatigue</strong></td><td>Slack 每 5 分钟响一次，团队把 bot 静音了</td><td>每次运行都通知，而不是每次&quot;可行动发现&quot;才通知</td><td>只在需要人决策时通知；报告类用摘要模式</td></tr><tr><td><strong>Token Burn</strong></td><td>账单飙升</td><td>空分诊也跑全链路子智能体</td><td>空观察列表 &lt;5k token 退出；预算文件 + 熔断器</td></tr></tbody></table><div class="tip custom-block"><p class="custom-block-title">使用方式</p><p>这份目录的正确打开方式是<strong>当调试手册用</strong>：循环行为异常时，先按症状对号入座，再按缓解手段逐项排查——绝大多数事故都能在其中找到原型。</p></div><h2 id="_22-3-设计反模式-上线前就要杜绝" tabindex="-1">22.3 设计反模式：上线前就要杜绝 <a class="header-anchor" href="#_22-3-设计反模式-上线前就要杜绝" aria-label="Permalink to &quot;22.3 设计反模式：上线前就要杜绝&quot;">​</a></h2><p>失败模式是&quot;运行时事故&quot;，反模式则是&quot;设计期错误&quot;。官方列出七条，每条都有明确的&quot;应该这样做&quot;：</p><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">1.</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 同一智能体既实现又验证   → 拆出独立验证者，默认立场 REJECT</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">2.</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 没有尝试次数上限         → 硬上限 3 次 → 带上下文升级</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">3.</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 分诊输出是叙事段落       → 结构化 markdown，一行一条 + 明确建议动作</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">4.</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> L1 质量没验证就上 L3     → 先 report-only 一周，用数据说话</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">5.</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 共享状态没有 schema      → 每模式一个状态文件，或清晰分区 + 修剪规则</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">6.</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> MCP 一上来就全写权限     → L1 只读连接器，赢得信任再扩权</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">7.</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 没有终止开关             → LOOP.md 写明暂停/终止条件 + 预算文件</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="_22-4-理解债、意图债与认知放弃" tabindex="-1">22.4 理解债、意图债与认知放弃 <a class="header-anchor" href="#_22-4-理解债、意图债与认知放弃" aria-label="Permalink to &quot;22.4 理解债、意图债与认知放弃&quot;">​</a></h2><p>Loop Engineering 提供了一组&quot;运营词汇&quot;，帮你命名那些说不清的失控感：</p><ul><li><strong>意图债（Intent Debt）</strong>：智能体每轮冷启动，缺失的项目意图会被&quot;自信的猜测&quot;填补。技能是还债方式——约定写一次，每轮都读；</li><li><strong>理解债（Comprehension Debt）</strong>：仓库里存在的东西与你实际理解的东西之间的差距。循环跑得越快，&quot;不是你写的代码&quot;堆积越快——<strong>除非你坚持读循环产出的东西</strong>；</li><li><strong>认知放弃（Cognitive Surrender）</strong>：最危险的陷阱——让循环跑着，而你停止持有观点。设计循环需要判断力，用循环逃避思考则是加速剂：同一个动作，相反的结局；</li><li><strong>编排税（Orchestration Tax）</strong>：并行智能体的协调人力成本——审查带宽、合并冲突、上下文切换。worktree 解决机械冲突，但<strong>你能消化的并行循环数量上限始终是你自己</strong>。</li></ul><h2 id="_22-5-运营要点-降速、暂停与终止" tabindex="-1">22.5 运营要点：降速、暂停与终止 <a class="header-anchor" href="#_22-5-运营要点-降速、暂停与终止" aria-label="Permalink to &quot;22.5 运营要点：降速、暂停与终止&quot;">​</a></h2><h3 id="什么时候降速-暂停" tabindex="-1">什么时候降速 / 暂停 <a class="header-anchor" href="#什么时候降速-暂停" aria-label="Permalink to &quot;什么时候降速 / 暂停&quot;">​</a></h3><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>降速信号：token 预算周中已用 &gt;80% | 分诊误报率 &gt;30% | 同一事项 48h 内被升级 2+ 次</span></span>
<span class="line"><span>暂停信号：生产事故进行中（循环可能干扰热修） | 破坏性 schema 迁移中 | 关键审查者休假且开了自动合并</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="什么时候终止循环" tabindex="-1">什么时候终止循环 <a class="header-anchor" href="#什么时候终止循环" aria-label="Permalink to &quot;什么时候终止循环&quot;">​</a></h3><p>出现以下任一情况就该认真考虑杀掉循环：连续出现 S2 级失败、成本连续两周高于价值、团队把它的通知全部静音、模式已被事件驱动方案（如纯 CI Action）取代。</p><p>终止清单三步走：</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 1. 停调度：删除定时器 / 禁用 Automation / 移除 GitHub Action</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 2. 归档状态：状态文件标记 retired</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">mv</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> STATE.md</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> STATE.retired-2026-06.md</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 3. 复盘（可选但强烈建议）：把这段经历写成故事，供下次设计参考</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="_22-6-生产上线检查单" tabindex="-1">22.6 生产上线检查单 <a class="header-anchor" href="#_22-6-生产上线检查单" aria-label="Permalink to &quot;22.6 生产上线检查单&quot;">​</a></h2><p>把前几章的内容收敛成一张验收单，全部打勾才允许上生产：</p><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## 循环上线检查单</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> [ ] 单一清晰目标 + 明确的非目标（不做什么）</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> [ ] 分诊技能输出结构化、描述&quot;无聊而具体&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> [ ] 实现者/验证者分离，验证者真的跑测试</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> [ ] 状态文件有 schema、每轮读写、每轮修剪</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> [ ] 路径黑名单由 loop-gate 机械化执行</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> [ ] 自动合并默认关闭；白名单最小化</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> [ ] MCP 连接器最小权限 + 独立 bot 身份</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> [ ] loop-budget.md 有每日上限与超限动作</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> [ ] loop-run-log.md 每轮追加运行记录</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> [ ] 升级触发条件成文（次数上限/风险路径/歧义）</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> [ ] 已完成 L1 报告期校准，误报率 &lt;30%</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> [ ] 终止条件写进 LOOP.md，随时可一键降级</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h2 id="本章小结" tabindex="-1">本章小结 <a class="header-anchor" href="#本章小结" aria-label="Permalink to &quot;本章小结&quot;">​</a></h2><ul><li>五大安全机制：黑名单机械化执行、自动合并默认关、人工门控无条件触发、MCP 最小权限、worktree 隔离；</li><li>失败模式按 S1/S2/S3 分级，五经典形态各有对症缓解，可当调试手册用；</li><li>七条设计反模式在上线前杜绝，核心是：验证分离、次数上限、结构化输出、循序渐进；</li><li>理解债与认知放弃是长期运营的最大敌人——坚持读循环的产出，保持自己的观点；</li><li>降速/暂停/终止都有明确信号与清单，终止不是失败，及时止损是运营能力。</li></ul>`);
  _push(ssrRenderComponent(_component_Quiz, { items: _ctx.quiz }, null, _parent));
  _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>把本章上线检查单复制到你的仓库，逐项核对你在第 20 章初始化的 Daily Triage，列出未达标项与补齐计划。</li><li>为你的循环写一份 <code>gate.yaml</code>：定义 3 条路径黑名单与 1 条自动合并白名单，并用 <code>loop-gate check</code> 验证命中行为。</li><li>设计一次&quot;预演终止&quot;：写下你的循环在什么信号出现时降级、暂停、终止，以及每步的具体命令。</li></ol><blockquote><p>全部章节到此结束。回到 <a href="./index.html">课程导学</a> 复盘，或继续探索本站其他课程。</p></blockquote><blockquote><p>完成后进入<a href="./ch30.html">下一章：AGENTS.md 标准：给智能体的 README</a>。<script setup>
const quiz = [
{
question: &#39;路径黑名单的正确执行方式是？&#39;,
options: [
&#39;在循环的系统提示词里写一句&amp;quot;请不要修改这些文件&amp;quot;&#39;,
&#39;用 loop-gate 等工具机械化执行，命中即以退出码强制升级&#39;,
&#39;靠代码评审时人工发现&#39;,
&#39;只在 L3 等级才需要考虑黑名单&#39;
],
answer: 1,
explain: &#39;官方强调黑名单不能依赖循环&amp;quot;自觉遵守提示词&amp;quot;，必须用 gate 工具从 gate.yaml 机械化执行——退出码 2 强制升级、0 放行，控制脚本可链式处理。&#39;
},
{
question: &#39;&amp;quot;Verifier Theater&amp;quot;（验证者表演）的典型症状与根因是？&#39;,
options: [
&#39;验证者拒绝一切，循环卡死&#39;,
&#39;验证者显示&amp;quot;通过&amp;quot;但 CI 实际是红的——提示词太模糊、没真正跑测试、与实现者同会话&#39;,
&#39;验证者消耗了过多 token&#39;,
&#39;验证者把测试全部禁用了&#39;
],
answer: 1,
explain: &#39;对症下药：验证者必须运行测试并报告输出；指令立场改为&amp;quot;找出拒绝的理由&amp;quot;；无人值守场景给验证者配更强的模型。&#39;
},
{
question: &#39;关于&amp;quot;理解债（Comprehension Debt）&amp;quot;，正确的说法是？&#39;,
options: [
&#39;指智能体对项目意图的猜测累积&#39;,
&#39;指仓库中存在的内容与你真正理解的内容之间的差距，循环越快堆积越快，解药是坚持阅读循环产出&#39;,
&#39;指团队成员对循环机制理解不一致&#39;,
&#39;指文档和代码不同步&#39;
],
answer: 1,
explain: &#39;循环高效生产&amp;quot;不是你写的代码&amp;quot;，若你不读它们，理解债复利增长；意图债则是另一回事——智能体缺失项目意图靠猜，用技能来偿还。&#39;
},
{
question: &#39;下列哪个信号出现时，官方建议&amp;quot;暂停&amp;quot;循环？&#39;,
options: [
&#39;token 预算周中用到 60%&#39;,
&#39;分诊误报率升到 25%&#39;,
&#39;生产事故进行中——循环可能干扰热修复&#39;,
&#39;有新的 issue 被创建&#39;
],
answer: 2,
explain: &#39;生产事故进行中必须暂停（循环可能和热修冲突）；前两项属于&amp;quot;降速&amp;quot;信号，还没到暂停级别；新 issue 创建是正常输入。&#39;
}
]
<\/script></p></blockquote></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("agent/ch29.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ch29 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  ch29 as default
};
