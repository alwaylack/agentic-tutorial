import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"第 14 章 · Secondmate：持久第二副手与隔离章程","description":"","frontmatter":{},"headers":[],"relativePath":"firstmate/ch14.md","filePath":"firstmate/ch14.md","lastUpdated":1787528977000}');
const __default__ = { name: "firstmate/ch14.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: "按照官方定义，secondmate 最准确的描述是？",
        options: [
          "一种全新的舰队架构，与主架构并行运行",
          "一个拥有隔离 firstmate home 和章程的普通直接下属",
          "一个可以代替 captain 做合并决策的管理者",
          "一个 MCP server 形式的工具网关"
        ],
        answer: 1,
        explain: "AGENTS.md 原文：A secondmate is a crewmate with an isolated firstmate home and a charter, not a second architecture。它仍是 ordinary direct report，只是运行环境隔离。"
      },
      {
        question: "当 config/secondmate-harness 缺失或值为 default 时，PRIMARY 会如何选择启动 harness？",
        options: [
          "直接拒绝启动 secondmate",
          "随机挑选一款已验证的 harness",
          "先回落到 config/crew-harness，再回落到 firstmate 自己的 harness",
          "永远使用 tmux 内置的默认 shell"
        ],
        answer: 2,
        explain: `官方规定：absent or "default" harness falls back to config/crew-harness then firstmate's own。回落链是 secondmate-harness → crew-harness → firstmate 自身。`
      },
      {
        question: "关于 secondmate 的嵌套，正确的说法是？",
        options: [
          "secondmate 可以自由创建自己的 secondmate",
          "只要 captain 批准，secondmate 就能孵化下一代",
          "secondmate-harness 会被继承到子 home，因此天然支持多层",
          "secondmates do not spawn secondmates：舰队严格限制为两代"
        ],
        answer: 3,
        explain: "AGENTS.md 明确标注 secondmate-harness 为 NOT inherited into secondmate homes，并给出原因：secondmates do not spawn secondmates，主 home 也从不跨层监督子树。"
      },
      {
        question: "下列哪项符合 secondmate 的日常纪律？",
        options: [
          "把每个 secondmate 登记为主 backlog 中的一个工作项",
          "secondmate 应主动扫描 projects/ 寻找可做的工作",
          "secondmate 默认 idle，仅执行主 firstmate 路由的工作，路由按工作性质对照章程范围",
          "captain 可以直接进入 secondmate 的聊天窗口下达指令以提效"
        ],
        answer: 2,
        explain: "官方规定：A secondmate is idle by default and acts only on work routed by the main firstmate；路由按工作性质对照注册范围。同时 backlog 只记工作项不记 agent，且不应绕过 firstmate 直接干预下属会话。"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-14-章-·-secondmate-持久第二副手与隔离章程" tabindex="-1">第 14 章 · Secondmate：持久第二副手与隔离章程 <a class="header-anchor" href="#第-14-章-·-secondmate-持久第二副手与隔离章程" aria-label="Permalink to &quot;第 14 章 · Secondmate：持久第二副手与隔离章程&quot;">​</a></h1><blockquote><p>本章目标：理解 secondmate（第二副手）的定位与隔离模型，学会用 <code>config/secondmate-harness</code> 配置其启动方式，并掌握&quot;secondmate 不孵化 secondmate&quot;这条关键边界。</p></blockquote><h2 id="_14-1-为什么需要第二副手" tabindex="-1">14.1 为什么需要第二副手 <a class="header-anchor" href="#_14-1-为什么需要第二副手" aria-label="Permalink to &quot;14.1 为什么需要第二副手&quot;">​</a></h2><p>随着舰队规模扩大，一个常见问题浮现：所有 crewmate 都从主 home 派出，任务类型一多，主 firstmate 的监督面就越来越宽——前端修复、后端审计、文档巡检混在同一个 backlog 和同一套 state 里。</p><p>FirstMate 的解法不是引入新架构，而是<strong>复制现有架构</strong>：</p><blockquote><p>A secondmate is a crewmate with an isolated firstmate home and a charter, not a second architecture.</p></blockquote><p>也就是说，secondmate 本质上仍然是一个 ordinary direct report（普通直接下属）——它和普通 crewmate 一样接受主 firstmate 的路由与监督；区别在于它运行在一个<strong>隔离的、持久的 firstmate home</strong> 里，并携带一份 charter（章程）界定自己的职责域。</p><p>这种设计的收益：</p><ul><li><strong>职责域划分</strong>：每个 secondmate 只接自己章程范围内的工作，路由按工作性质而非克隆清单进行；</li><li><strong>状态隔离</strong>：各自的 backlog、state、projects 互不干扰；</li><li><strong>可长期存在</strong>：secondmate 是持久实体，空闲队列是健康态，不需要时也不必销毁。</li></ul><h2 id="_14-2-隔离的-fm-home-每个-secondmate-一个家" tabindex="-1">14.2 隔离的 FM_HOME：每个 secondmate 一个家 <a class="header-anchor" href="#_14-2-隔离的-fm-home-每个-secondmate-一个家" aria-label="Permalink to &quot;14.2 隔离的 FM_HOME：每个 secondmate 一个家&quot;">​</a></h2><p>AGENTS.md 对此有一条明确约定：</p><blockquote><p>Each secondmate has a persistent isolated <code>FM_HOME</code>, including its own state, backlog, projects, and session lock.</p></blockquote><p>回顾第 5 章的布局知识：<code>FM_HOME</code> 选定一个实例私有的 <code>data/</code>、<code>state/</code>、<code>config/</code>、<code>projects/</code>。对 secondmate 而言，这意味着：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>主 home（PRIMARY）</span></span>
<span class="line"><span>├── FM_HOME=~/firstmate-home-main</span></span>
<span class="line"><span>│   ├── data/backlog.md          # 主 backlog：只记工作项</span></span>
<span class="line"><span>│   ├── data/secondmates.md      # secondmate 路由表</span></span>
<span class="line"><span>│   ├── state/                   # 主 home 运行记录</span></span>
<span class="line"><span>│   └── projects/                # 主 home 的项目克隆</span></span>
<span class="line"><span>└── 注册的 secondmate</span></span>
<span class="line"><span>    └── FM_HOME=~/firstmate-home-infra   # 完全独立的第二个家</span></span>
<span class="line"><span>        ├── data/backlog.md      # 自己的积压队列</span></span>
<span class="line"><span>        ├── state/               # 自己的运行记录 + session lock</span></span>
<span class="line"><span>        ├── config/              # 自己的本地运营配置</span></span>
<span class="line"><span>        └── projects/            # 在自己家里克隆的项目</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>几个关键点值得展开：</p><ol><li><strong>session lock 独立</strong>：每个 home 有自己的会话锁，两个 home 的引导流程互不竞争；</li><li><strong>backlog 分账</strong>：路由给 secondmate 的工作记在该 secondmate home 自己的 backlog 里，而不是主 backlog；</li><li><strong>projects 各自克隆</strong>：secondmate home 需要哪些项目就在自己家克隆，主 home 的 <code>projects/</code> 对它是不可见的。</li></ol><p><code>data/secondmates.md</code> 是主 home 维护的 <strong>local and remote secondmate routing table</strong>（本地与远程 secondmate 路由表），由 secondmate seed 辅助脚本维护，记录每个已注册 secondmate 的位置信息。</p><h2 id="_14-3-charter-章程-职责域的书面边界" tabindex="-1">14.3 charter 章程：职责域的书面边界 <a class="header-anchor" href="#_14-3-charter-章程-职责域的书面边界" aria-label="Permalink to &quot;14.3 charter 章程：职责域的书面边界&quot;">​</a></h2><p>每个 secondmate 携带一份 charter brief。在 <code>data/</code> 布局中可以看到它的存放形式：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>data/</span></span>
<span class="line"><span>├── &lt;id&gt;/brief.md    # per-task crewmate brief，</span></span>
<span class="line"><span>│                    # 或 kind=secondmate 时的 per-secondmate charter brief</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>charter 回答的问题是：&quot;这个 secondmate 负责哪一类工作？&quot; 主 firstmate 路由时遵循的规则是：</p><blockquote><p>Route by the nature of the work against each registered secondmate scope.</p></blockquote><p>即按工作的<strong>性质</strong>对照各 secondmate 的注册范围来路由，而不是看某个仓库恰好登记在谁名下。若没有合适的 secondmate 范围能承接某项工作，就用主 home 处理，或者讨论创建一个新的 secondmate。</p><p>另外两条路由纪律值得记住：</p><ul><li>范围匹配的工作默认发给对应的 secondmate，除非它被阻塞或 captain 明确改道；</li><li>不要去翻 secondmate 的聊天窗口——标记路由的回复会通过 status 或文档指针返回。</li></ul><h2 id="_14-4-启动配置-config-secondmate-harness" tabindex="-1">14.4 启动配置：config/secondmate-harness <a class="header-anchor" href="#_14-4-启动配置-config-secondmate-harness" aria-label="Permalink to &quot;14.4 启动配置：config/secondmate-harness&quot;">​</a></h2><p>主 home 用 <code>config/secondmate-harness</code> 指定用哪个 harness 启动 secondmate agent：</p><div class="language-sh vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># config/secondmate-harness（LOCAL, gitignored）</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 格式：&lt;harness&gt; [&lt;model&gt;] [&lt;effort&gt;]，三段写在同一行</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 例：用 Claude Code 启动 secondmate</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">claude</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 例：指定模型与 effort</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">pi</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> sonnet</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> medium</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>回落顺序是本章的重点记忆点：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>config/secondmate-harness 存在且有效？</span></span>
<span class="line"><span> ├─ 是 → 用它启动 SECONDMATE</span></span>
<span class="line"><span> └─ 否（缺失或值为 default）</span></span>
<span class="line"><span>      └─ 回落到 config/crew-harness</span></span>
<span class="line"><span>           └─ 再回落到 firstmate 自己正在用的 harness</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>注意它与 <code>config/crew-harness</code> 的分工：</p><table tabindex="0"><thead><tr><th>文件</th><th>控制对象</th><th>继承行为</th></tr></thead><tbody><tr><td><code>config/crew-harness</code></td><td>本 home 派出的 crewmate</td><td>作为字面文件被继承：具体的 primary adapter 值也会控制 secondmate home 自己的 crewmate</td></tr><tr><td><code>config/crew-dispatch.json</code></td><td>每任务的 harness/model/effort 选择规则</td><td>Inherited by secondmate homes</td></tr><tr><td><code>config/secondmate-harness</code></td><td>PRIMARY 启动 SECONDMATE 的方式</td><td><strong>NOT inherited into secondmate homes</strong></td></tr></tbody></table><p><code>crew-harness</code> 的继承语义比较特殊——它是&quot;inherited as the literal file&quot;：如果主 home 写了 <code>claude</code>，那么 secondmate home 自己派 crewmate 时也用 <code>claude</code>。而 <code>secondmate-harness</code> 只属于 primary 一侧。</p><h2 id="_14-5-关键边界-secondmate-不孵化-secondmate" tabindex="-1">14.5 关键边界：secondmate 不孵化 secondmate <a class="header-anchor" href="#_14-5-关键边界-secondmate-不孵化-secondmate" aria-label="Permalink to &quot;14.5 关键边界：secondmate 不孵化 secondmate&quot;">​</a></h2><p>这是整个 secondmate 体系最重要的一条安全设计：</p><blockquote><p>The primary&#39;s own setting; NOT inherited into secondmate homes (<strong>secondmates do not spawn secondmates</strong>).</p></blockquote><p>为什么这样设计？因为一旦允许 secondmate 再创建自己的 secondmate，舰队就会形成任意深度的树状结构，带来三类问题：</p><ol><li><strong>监督链失控</strong>：主 firstmate 的恢复协议明确写着&quot;Do not reconstruct or supervise a secondmate&#39;s child tree from the main home&quot;——主 home 不跨层重建或监督子树。层级超过两层后，故障恢复的确定性无法保证；</li><li><strong>责任稀释</strong>：硬规则要求所有沟通经由 firstmate 汇报给 captain，中间层越多，信息保真度越差；</li><li><strong>资源不可控</strong>：嵌套孵化会让 agent 数量指数增长。</li></ol><p>所以 FirstMate 把层级严格限制为两代：captain → firstmate → {crewmate, secondmate}，而 secondmate 手下只能有普通 crewmate：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>you (the captain)</span></span>
<span class="line"><span> └── firstmate（主 home，PRIMARY）</span></span>
<span class="line"><span>      ├── crewmate × N        ← 由 config/crew-harness / crew-dispatch.json 决定</span></span>
<span class="line"><span>      └── secondmate × M      ← 由 config/secondmate-harness 决定</span></span>
<span class="line"><span>           └── 它自己的 crewmate × K（受继承的 crew-harness 控制）</span></span>
<span class="line"><span>                （到此为止，不能再有第三代 secondmate）</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="_14-6-secondmate-provisioning-供给流程概览" tabindex="-1">14.6 secondmate-provisioning：供给流程概览 <a class="header-anchor" href="#_14-6-secondmate-provisioning-供给流程概览" aria-label="Permalink to &quot;14.6 secondmate-provisioning：供给流程概览&quot;">​</a></h2><p>创建、供给、校验、启动、交接 backlog、恢复、推送继承材料、退役 secondmate home，以及编辑 <code>data/secondmates.md</code>——这些操作全部由内部技能 <code>secondmate-provisioning</code> 负责（第 13 章讲过 <code>.agents/skills/</code> 下的 agent-only 技能体系）。作为 captain，你只需要知道流程骨架：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1. 提出需求     &quot;我想为一个长期维护的基础设施项目设一个专职 secondmate&quot;</span></span>
<span class="line"><span>2. 加载技能     firstmate 加载 secondmate-provisioning</span></span>
<span class="line"><span>3. 创建 home    建立独立 FM_HOME，写入 charter brief</span></span>
<span class="line"><span>4. 注册路由     更新 data/secondmates.md 路由表</span></span>
<span class="line"><span>5. 继承材料     按 allowlist 同步继承配置（如 crew-harness、crew-dispatch.json）</span></span>
<span class="line"><span>6. 校验启动     校验通过后按 secondmate-harness 启动</span></span>
<span class="line"><span>7. 日常路由     范围内工作自动发往该 home；回复经 status/文档返回</span></span>
<span class="line"><span>8. 退役         仅在 captain 或主 firstmate 明确决定时执行，</span></span>
<span class="line"><span>               且该 home 必须无进行中的工作</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>两条补充纪律：</p><ul><li><strong>A secondmate is idle by default and acts only on work routed by the main firstmate.</strong> secondmate 默认闲置，只做主 firstmate 路由来的工作，不会自找活干；</li><li><strong>持久实体不进 backlog。</strong> AGENTS.md 明确写道：&quot;It tracks work items only, never agents; persistent secondmates never appear as backlog items.&quot; secondmate 记录在注册表与运行时状态里，绝不作为积压工作项管理。</li></ul><h2 id="_14-7-何时值得引入-secondmate" tabindex="-1">14.7 何时值得引入 secondmate <a class="header-anchor" href="#_14-7-何时值得引入-secondmate" aria-label="Permalink to &quot;14.7 何时值得引入 secondmate&quot;">​</a></h2><p>引入 secondmate 有成本（多一个 home 要维护、多一份章程要写），以下场景才划算：</p><ul><li><strong>职责域长期稳定</strong>：比如一个需要持续巡检的基础设施 monorepo，或一条固定的内容生产流水线；</li><li><strong>状态需要硬隔离</strong>：主 home 的 backlog 已混杂多个领域，希望各领域的任务队列、学习记录（learnings）、captain 偏好分开管理；</li><li><strong>并行规模超出单 home 舒适区</strong>：多个长期项目同时推进，各自需要独立的 session lock 与 projects 克隆。</li></ul><p>反之，偶发的并行需求用普通 crewmate 就够了——worktree 隔离（第 9 章）已经能保证互不冲突。</p><h2 id="本章小结" tabindex="-1">本章小结 <a class="header-anchor" href="#本章小结" aria-label="Permalink to &quot;本章小结&quot;">​</a></h2><ul><li>secondmate = 带隔离 firstmate home 和 charter 的普通直接下属，不是第二种架构；</li><li>每个 secondmate 拥有持久的独立 <code>FM_HOME</code>：自己的 state、backlog、projects 与 session lock；</li><li><code>config/secondmate-harness</code> 决定 PRIMARY 用哪个 harness 启动 SECONDMATE，缺省依次回落到 <code>crew-harness</code> 与 firstmate 自身；</li><li><code>crew-harness</code> 与 <code>crew-dispatch.json</code> 被 secondmate home 继承，<code>secondmate-harness</code> 不被继承——<strong>secondmates do not spawn secondmates</strong>，舰队严格限制为两代；</li><li>供给全流程由 <code>secondmate-provisioning</code> 技能负责；secondmate 默认 idle，是持久实体而非 backlog 工作项。</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>在纸上（或文本编辑器里）画出你的目标舰队拓扑图：标注主 home、计划中的 secondmate 数量、每个 secondmate 的章程职责域，以及每个 home 将使用的 harness。检查是否存在任何需要&quot;第三代 secondmate&quot;的场景，若有，重新划分职责域使其落在两代结构内。</li><li>在你的主 home 中创建 <code>config/secondmate-harness</code>，写入与你当前 harness 不同的另一款验证过的 harness（例如主会话用 <code>pi</code>，则写 <code>claude</code>），然后向 firstmate 提问&quot;你现在会用什么 harness 启动 secondmate？crewmate 又用什么？&quot;，核对回答是否体现了两者的回落与继承关系。</li><li>向 firstmate 发起一次真实供给对话：&quot;请为 &lt;某个你长期维护的项目&gt; 创建一个 secondmate，章程是……&quot;。观察它是否加载了 <code>secondmate-provisioning</code> 技能、是否建立了独立 FM_HOME 并更新了 <code>data/secondmates.md</code>；随后给它发一项范围外的工作，验证它是否会拒绝或转回主 home 处理。</li></ol></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("firstmate/ch14.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
