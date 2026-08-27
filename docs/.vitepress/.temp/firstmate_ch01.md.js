import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"第 1 章 · FirstMate 概述：Agent Distro 与舰队理念","description":"","frontmatter":{},"headers":[],"relativePath":"firstmate/ch01.md","filePath":"firstmate/ch01.md","lastUpdated":1787528977000}');
const __default__ = { name: "firstmate/ch01.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: "FirstMate 官方如何定位自身？",
        options: [
          "一个新的 LLM 模型",
          "一个 MCP server",
          "一个 agent distro：指令+技能+工具+策略+状态约定的可移植目录",
          "一个替代 Claude Code 的编码智能体 CLI"
        ],
        answer: 2,
        explain: "官方明确列出五个「不是」（model/harness/skill/MCP server/CLI），并定义自己是 agent distro——克隆下来的仓库本身就是发行版，无需安装任何 app。"
      },
      {
        question: "关于 captain 与 firstmate 的关系，正确的是？",
        options: [
          "firstmate 自主决定何时合并 PR",
          "用户只与 firstmate 对话，由它派发、监督并向船员传达决策",
          "用户需要分别指挥每个 crewmate",
          "firstmate 直接修改项目代码完成所有任务"
        ],
        answer: 1,
        explain: 'One liaison 特性：firstmate 是唯一联络人，负责派发任务、监督到完成、只升级真正的决策；合并必须得到 captain 明确同意（如 "alright merge it"）。'
      },
      {
        question: "crewmate 完成一个 ship 任务后，最终交付物通常是？",
        options: [
          "一段聊天记录摘要",
          "训练好的模型权重",
          "完成的 PR、批准的本地合并，或（scout 任务）调查报告",
          "一份新的 AGENTS.md"
        ],
        answer: 2,
        explain: "两种任务形态各有交付物：ship 任务交付授权过的代码变更（PR 或本地合并）；scout 任务交付 data/<id>/report.md 下的独立调查报告。"
      },
      {
        question: "为什么说 FirstMate 是 restart-proof（重启无恙）？",
        options: [
          "它会自动重启崩溃的电脑",
          "所有状态存于磁盘与活动会话后端，新会话会对账并继续",
          "它把对话历史上传到云端备份",
          "crewmate 不会崩溃"
        ],
        answer: 1,
        explain: "官方特性列表指出：all state lives on disk and in the active session backend，随时杀掉会话后，下一个会话会 reconcile（对账）并继续工作，包括确认已死的 secondmate。"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-1-章-·-firstmate-概述-agent-distro-与舰队理念" tabindex="-1">第 1 章 · FirstMate 概述：Agent Distro 与舰队理念 <a class="header-anchor" href="#第-1-章-·-firstmate-概述-agent-distro-与舰队理念" aria-label="Permalink to &quot;第 1 章 · FirstMate 概述：Agent Distro 与舰队理念&quot;">​</a></h1><blockquote><p>本章目标：理解 FirstMate 解决的核心痛点、它作为 Agent Distro 的独特定位，以及 captain/firstmate/crewmate/secondmate 四层角色体系与整体架构。</p></blockquote><h2 id="_1-1-单智能体的困境-tab-juggler-问题" tabindex="-1">1.1 单智能体的困境：tab-juggler 问题 <a class="header-anchor" href="#_1-1-单智能体的困境-tab-juggler-问题" aria-label="Permalink to &quot;1.1 单智能体的困境：tab-juggler 问题&quot;">​</a></h2><p>运行一个编码智能体（coding agent）很容易：打开终端，启动 Claude Code 或 Pi，交代任务，等待结果。</p><p>但当你想<strong>同时推进三个项目任务</strong>——修一个 bug、做一次代码审计、写一份技术方案——事情就变了味。官方 README 对此有一个精准的描述：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>you become a tab-juggler: babysitting sessions, copy-pasting context</span></span>
<span class="line"><span>between repos, forgetting which terminal had the failing test.</span></span>
<span class="line"><span>（你变成了一个标签页杂耍者：看管会话、在仓库之间复制粘贴上下文、</span></span>
<span class="line"><span>忘记哪个终端里有跑挂的测试。）</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>这就是 <strong>tab-juggler 问题</strong>：</p><ul><li>每个智能体会话都要人工看管（babysit）；</li><li>任务之间的上下文靠手工复制粘贴搬运；</li><li>多个终端窗口并行时，很快分不清哪个会话在做什么。</li></ul><p>传统解法是给每个任务开一个智能体窗口——但这只是把「管理代码」的问题换成了「管理智能体」的问题。</p><h2 id="_1-2-firstmate-的翻转-talk-to-one-agent-ship-with-a-crew" tabindex="-1">1.2 FirstMate 的翻转：Talk to one agent. Ship with a crew. <a class="header-anchor" href="#_1-2-firstmate-的翻转-talk-to-one-agent-ship-with-a-crew" aria-label="Permalink to &quot;1.2 FirstMate 的翻转：Talk to one agent. Ship with a crew.&quot;">​</a></h2><p>FirstMate 的口号一语道破它的模型翻转：<strong>Talk to one agent. Ship with a crew.</strong>（只跟一个智能体对话，却由一支船员队伍完成交付。）</p><p>你不再逐个指挥多个智能体，而是只对话一个固定的智能体——<strong>firstmate（第一副手）</strong>——由它替你调度整支船员队伍：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>你（captain）</span></span>
<span class="line"><span>    │ 只跟 firstmate 对话：提需求、做决策、&quot;merge it&quot;</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>firstmate（本仓库即发行版）</span></span>
<span class="line"><span>    │ 读 projects/ 并路由请求；写入受护栏的 backlog/briefs/state</span></span>
<span class="line"><span>    ├──────────────┬──────────────┐</span></span>
<span class="line"><span>    ▼              ▼              ▼</span></span>
<span class="line"><span>fm-task1        fm-task2   ...  fm-taskN     ← tmux 窗口等可见会话后端中</span></span>
<span class="line"><span>(crewmate)      (crewmate)      (crewmate)      各跑一个自主智能体</span></span>
<span class="line"><span>    └──────────────┴──────────────┘</span></span>
<span class="line"><span>                    ▼</span></span>
<span class="line"><span>        treehouse git worktree（每任务一个干净工作树）</span></span>
<span class="line"><span>            ├─ ship 任务：项目模式 ► PR/local merge ► teardown</span></span>
<span class="line"><span>            └─ scout 任务：data/&lt;id&gt;/report.md 调查报告 ► teardown</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>整个流程中：</p><ol><li>你用自然语言向 firstmate 提出请求；</li><li>firstmate 把每个请求路由到一个 crewmate（船员），每个船员在自己的会话端点（tmux 窗口等）和独立的 git worktree 中工作；</li><li>firstmate 用<strong>零 token 的事件驱动 watcher</strong> 监督整支舰队，只在需要你介入时才唤醒；</li><li>最后交到你手上的是<strong>完成的 PR、经批准的本地合并，或独立的调查报告</strong>。</li></ol><p>官方给出的真实对话体验是这样的：</p><div class="language-sh vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">&gt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> ahoy</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">!</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> look</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> at</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> my</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> github</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> project</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> xyz,</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> then</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> fix</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> the</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> flaky</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> login</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> test</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> and</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> add</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> dark</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> mode</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># firstmate 检查工具链（安装任何东西前都会先征求你的同意），</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 把项目克隆到 projects/ 下，并在当前后端里拉起两个隔立的 worker。</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 几分钟后：</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">  PR</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> ready</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> for</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> review,</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> captain:</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> https://github.com/you/xyz/pull/42</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">  (</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">fix</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> flaky</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> login</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> test</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> -</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> risk:</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> low</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> -</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> CI</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> green</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">)</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">&gt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> alright merge it</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>注意两个细节：firstmate 汇报时称呼你为 <strong>captain</strong>（船长）；你说一句 <code>alright merge it</code> 它才执行合并——合并权限始终在你手里。</p><h2 id="_1-3-firstmate-是什么-agent-distro" tabindex="-1">1.3 FirstMate 是什么：Agent Distro <a class="header-anchor" href="#_1-3-firstmate-是什么-agent-distro" aria-label="Permalink to &quot;1.3 FirstMate 是什么：Agent Distro&quot;">​</a></h2><p>FirstMate 官方文档用一连串「不是」来精确定位它自己：</p><blockquote><p>firstmate is not a model, not a harness, not a skill, not an MCP server, and not a CLI. firstmate is an <strong>agent distro</strong> for running a crew of agents.</p></blockquote><p>它不是模型（model）、不是运行框架（harness）、不是单个技能（skill）、不是 MCP server、也不是命令行工具（CLI）。它是一个 <strong>agent distro</strong>（智能体发行版）：</p><table tabindex="0"><thead><tr><th>概念</th><th>含义</th><th>类比</th></tr></thead><tbody><tr><td>model</td><td>底层 LLM，如 Claude、GPT</td><td>发动机</td></tr><tr><td>harness</td><td>承载模型的编码智能体 CLI，如 Claude Code、Pi</td><td>整车厂</td></tr><tr><td>skill</td><td>单项专家能力包</td><td>一个零件</td></tr><tr><td>MCP server</td><td>外部工具协议服务</td><td>外接设备</td></tr><tr><td><strong>agent distro</strong></td><td><strong>指令 + 技能 + 工具 + 策略 + 状态约定的可移植目录</strong></td><td><strong>整套改装方案</strong></td></tr></tbody></table><p>官方对 agent distro 的定义是：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>An agent distro is a portable directory of instructions, skills,</span></span>
<span class="line"><span>tooling, policies, and state conventions that turns a general-purpose</span></span>
<span class="line"><span>agent into a specialized one.</span></span>
<span class="line"><span>（agent distro 是一个可移植目录：指令、技能、工具、策略与状态约定，</span></span>
<span class="line"><span>把通用智能体改造成专用智能体。）</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>这意味着 <strong>There is no app to install: the cloned repo is the distro</strong>——没有应用要安装，克隆下来的仓库本身就是发行版。仓库里的三类东西构成了第一副手的全部：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>firstmate/</span></span>
<span class="line"><span>├── AGENTS.md          # 运营契约：always-loaded 的岗位说明书与路由索引</span></span>
<span class="line"><span>├── .agents/skills/    # firstmate 内部技能（agent 加载，带 metadata.internal=true）</span></span>
<span class="line"><span>├── skills/            # 面向公共安装者的独立技能</span></span>
<span class="line"><span>├── bin/               # fm-* 辅助脚本工具带（监督、派发、状态、控制……）</span></span>
<span class="line"><span>├── docs/              # 架构、配置、各后端设置指南</span></span>
<span class="line"><span>└── tests/             # 测试套件</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>任何终端编码智能体只要能读懂 <code>AGENTS.md</code>，在这个仓库目录里被启动，就被实例化成你的第一副手。</p><h2 id="_1-4-四层角色体系" tabindex="-1">1.4 四层角色体系 <a class="header-anchor" href="#_1-4-四层角色体系" aria-label="Permalink to &quot;1.4 四层角色体系&quot;">​</a></h2><p>FirstMate 用航海隐喻建立了一套严格的指挥链：</p><table tabindex="0"><thead><tr><th>角色</th><th>航海身份</th><th>职责</th></tr></thead><tbody><tr><td><strong>captain</strong></td><td>船长（你）</td><td>唯一的决策者：提需求、批合并、拍板所有真决策</td></tr><tr><td><strong>firstmate</strong></td><td>第一副手</td><td>唯一联络人：接收 captain 的一切指令，派发、监督、升级、汇报</td></tr><tr><td><strong>crewmate</strong></td><td>船员</td><td>被 firstmate 拉起的自主智能体，在独立 worktree 里干具体活</td></tr><tr><td><strong>secondmate</strong></td><td>第二副手（可选）</td><td>从自己隔离的 FM_HOME 出发运行的「持久船员」，本质仍是直接下属</td></tr></tbody></table><p>几条关键关系：</p><ul><li><strong>单向沟通</strong>：所有 crewmate 的通信都必须经过 firstmate 中转，船员永远不直接向 captain 汇报（这是硬规则 4，第 4 章详解）；</li><li><strong>secondmate 不是第二套架构</strong>：官方强调 &quot;A secondmate is a crewmate with an isolated firstmate home and a charter, not a second architecture&quot;——它是带隔离主目录和章程的船员，不是另一层 mini-firstmate 指挥链；</li><li><strong>规模弹性</strong>：单船员足够时就不需要 secondmate；舰队变大或需要跨机器时再启用。</li></ul><h2 id="_1-5-十大核心特性" tabindex="-1">1.5 十大核心特性 <a class="header-anchor" href="#_1-5-十大核心特性" aria-label="Permalink to &quot;1.5 十大核心特性&quot;">​</a></h2><p>官方 README 列出的特性清单，值得逐一认识（后续章节会分别展开）：</p><ol><li><strong>One liaison</strong>——只跟 firstmate 对话：它派发任务、监督到完成、只升级真正的决策、用平实的结果汇报；</li><li><strong>A visible crew</strong>——每个船员都在自己的 tmux 窗口（或 herdr/zellij 标签页、cmux 工作区、Orca 终端）里工作，你可以围观甚至直接插话，firstmate 负责调和；</li><li><strong>Disposable worktrees</strong>——每个任务在干净的 treehouse git worktree 中运行，同一仓库的并行工作互不冲突；</li><li><strong>Two task shapes</strong>——ship 任务交付被授权的变更；scout 任务产出独立的调查报告；</li><li><strong>Explicit project modes</strong>——每个项目以 <code>no-mistakes</code>、<code>direct-PR</code> 或 <code>local-only</code> 模式交付，可选 <code>+yolo</code> 合并自治标志；</li><li><strong>Optional secondmates</strong>——持久第二副手，从隔离的 firstmate home 运行，支持本地或 SSH 可达的远程主机；</li><li><strong>Event-driven, zero-token supervision</strong>——bash watcher 沉睡监视舰队，只在需要你时唤醒 firstmate；已验证的主 harness 还有 turn-end 兜底，防止「盲停」；</li><li><strong>Optional Relay</strong>——用一个本地 <code>.env</code> 配对令牌开启，让同一支舰队回答你在 X 和 Discord 上的公开提及；</li><li><strong>Strict project boundary</strong>——firstmate 对你的项目默认<strong>只读</strong>，一切项目改动都由 crewmate 在配置好的合并权限后面完成；</li><li><strong>Restart-proof</strong>——所有状态都在磁盘和活动会话后端上，随时杀掉会话，下一个会话自动对账继续。</li></ol><p>这十点可以归成三组：<strong>怎么干活</strong>（2/3/4）、<strong>怎么放权</strong>（5/6/9）、<strong>怎么放心</strong>（7/8/10）。第 1 条则是贯穿一切的交互原则。</p><h2 id="_1-6-与其他多智能体方案的区别" tabindex="-1">1.6 与其他多智能体方案的区别 <a class="header-anchor" href="#_1-6-与其他多智能体方案的区别" aria-label="Permalink to &quot;1.6 与其他多智能体方案的区别&quot;">​</a></h2><p>把 FirstMate 放进你已学过的框架坐标系里，能看清它的独特位置：</p><ul><li><strong>Agno / CrewAI / Mastra / Flue</strong> 是让你<strong>编写</strong>多智能体应用的代码框架——你写 Python/TypeScript 定义 Agent 和编排逻辑；</li><li><strong>Claude Code / Pi</strong> 是单智能体运行框架——一次跑一个会话；</li><li><strong>FirstMate</strong> 不写一行应用代码，而是用一份 <code>AGENTS.md</code> 契约加 shell 工具带，把你已有的编码智能体 CLI <strong>组织成一支有纪律的舰队</strong>。</li></ul><p>换句话说，前面学的框架解决「如何造智能体」，FirstMate 解决「如何指挥一群现成的智能体」。它的全部逻辑都发生在操作系统层面：git worktree、tmux 会话、磁盘状态文件、bash watcher——这也是为什么它的实现语言几乎全是 Shell。</p><h2 id="本章小结" tabindex="-1">本章小结 <a class="header-anchor" href="#本章小结" aria-label="Permalink to &quot;本章小结&quot;">​</a></h2><ul><li>FirstMate 解决 tab-juggler 问题：多个并行智能体任务的人工看管负担；</li><li>核心模型翻转：你是 captain，只与 firstmate 这一个联络人对话，由它指挥 crewmate 舰队交付 PR 或调查报告；</li><li>FirstMate 是 agent distro——指令、技能、工具、策略与状态约定的可移植目录，克隆仓库即完成「安装」；</li><li>四层角色体系：captain（决策）/ firstmate（联络与监督）/ crewmate（执行）/ secondmate（持久化隔离执行），通信严格单向；</li><li>十大特性覆盖任务形态（ship/scout）、安全边界（项目模式、硬规则）、放心机制（零 token 监督、restart-proof、Relay）。</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>打开 FirstMate 仓库 <a href="https://github.com/kunchenguid/firstmate" target="_blank" rel="noreferrer">https://github.com/kunchenguid/firstmate</a> ，通读 README 的 <em>What it is</em> 与 <em>How It Works</em> 两节，用自己的话（不超过 200 字）向同事解释「agent distro」与传统多智能体框架的区别。</li><li>画出本章 1.2 节架构图的变体：假设舰队中有 1 个 secondmate 和 3 个 crewmate，标注每条通信线谁发起、经过谁、终点是谁，并检查是否有任何一条线绕过了 firstmate。</li><li>对照十大特性清单，挑选你认为对「个人开发者独立开发」最重要的三条，写出理由；再挑选对「团队协作场景」最重要的三条，对比两组的差异。</li></ol></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("firstmate/ch01.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
