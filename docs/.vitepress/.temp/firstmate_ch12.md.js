import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"第 12 章 · 内置技能：/ahoy、/bearings、/afk、/stow、/updatefirstmate","description":"","frontmatter":{},"headers":[],"relativePath":"firstmate/ch12.md","filePath":"firstmate/ch12.md","lastUpdated":1787528977000}');
const __default__ = { name: "firstmate/ch12.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: "在 Codex 中调用离开模式技能的正确写法是？",
        options: [
          "/afk",
          "$afk",
          "!afk",
          "#afk"
        ],
        answer: 1,
        explain: "README 明确说明：Claude and grok use the slash form shown here; codex uses the same names with $, such as $afk。"
      },
      {
        question: "/ahoy 作为会话的第一条真实 captain 消息被调用时会发生什么？",
        options: [
          "报错退出",
          "退化为调用 Bearings 生成摘要",
          "重放全部历史会话",
          "立即进入 afk 模式"
        ],
        answer: 1,
        explain: "此时没有「上次消息以来的事件」可供回顾，因此按设计 fall back to Bearings，用四段式摘要代替事件回顾。"
      },
      {
        question: "关于 /bearings 的变体，正确的是？",
        options: [
          "file 变体会删除旧的 status-report 文件",
          "include PRs 变体会脱离聊天模式改为写文件",
          "file 变体将当天日期的报告文件重建并在摘要中链接，include PRs 保持仅聊天并加入实时富化，二者可组合",
          "两个变体互斥且都不能组合"
        ],
        answer: 2,
        explain: "官方示例列出四种组合：/bearings、/bearings include PRs、/bearings file、/bearings file include PRs——file 写入 data/status-report-<YYYY-MM-DD>.md，PRs 富化不影响 chat-only 模式。"
      },
      {
        question: "为什么官方建议在主动重置会话之前先运行 /stow？",
        options: [
          "为了让界面更清爽",
          "把可能只存在于对话中的持久知识落盘，使下一个会话能够 reconcile 并继续",
          "为了清理 tmux 死窗口",
          "因为 /stow 会顺便执行自更新"
        ],
        answer: 1,
        explain: "restart-proof 依赖磁盘状态；对话中未落盘的知识会随重置丢失，/stow 正是清扫这些知识的标准动作。"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-12-章-·-内置技能-ahoy、-bearings、-afk、-stow、-updatefirstmate" tabindex="-1">第 12 章 · 内置技能：/ahoy、/bearings、/afk、/stow、/updatefirstmate <a class="header-anchor" href="#第-12-章-·-内置技能-ahoy、-bearings、-afk、-stow、-updatefirstmate" aria-label="Permalink to &quot;第 12 章 · 内置技能：/ahoy、/bearings、/afk、/stow、/updatefirstmate&quot;">​</a></h1><blockquote><p>本章目标：掌握 FirstMate 自带的五个用户可调用技能——会话回顾、舰队摘要、离开模式、知识清扫与自更新，学会在日常运营中组合使用它们。</p></blockquote><h2 id="_12-1-技能调用方式总览" tabindex="-1">12.1 技能调用方式总览 <a class="header-anchor" href="#_12-1-技能调用方式总览" aria-label="Permalink to &quot;12.1 技能调用方式总览&quot;">​</a></h2><p>FirstMate 出厂自带五个面向船长的内置技能（user-invocable built-in skills）。不同 harness 的调用前缀略有差异：</p><div class="language-sh vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># Claude Code 与 Grok 使用斜杠形式</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">&gt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> /ahoy</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">&gt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> /bearings file include PRs</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># Codex 使用 $ 前缀，名称相同</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">&gt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> $afk</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">&gt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> $stow</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>五个技能的分工可以用一张表概括：</p><table tabindex="0"><thead><tr><th>技能</th><th>一句话定位</th></tr></thead><tbody><tr><td><code>/ahoy</code></td><td>回顾发生了什么 + 引导你处理未决事项</td></tr><tr><td><code>/bearings</code></td><td>生成当前舰队状态的四段式摘要</td></tr><tr><td><code>/afk</code></td><td>你离开时的自动值班模式</td></tr><tr><td><code>/stow</code></td><td>把对话中的持久知识清扫落盘</td></tr><tr><td><code>/updatefirstmate</code></td><td>安全地自我更新到最新版本</td></tr></tbody></table><p>这五个技能都以 <code>SKILL.md</code> 形式存放在 <code>.agents/skills/</code> 目录下（afk、ahoy、bearings、stow、updatefirstmate），由 firstmate 在对应触发点加载执行。</p><h2 id="_12-2-ahoy-回到驾驶舱的第一件事" tabindex="-1">12.2 /ahoy：回到驾驶舱的第一件事 <a class="header-anchor" href="#_12-2-ahoy-回到驾驶舱的第一件事" aria-label="Permalink to &quot;12.2 /ahoy：回到驾驶舱的第一件事&quot;">​</a></h2><p>当你回到终端，想知道「我离开的这段时间发生了什么、有什么需要我拍板的」，就敲 <code>/ahoy</code>。它做三件事：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1. RECAP    回顾自上一条真实 captain 消息以来的可见会话事件</span></span>
<span class="line"><span>2. DECISIONS 列出可见但未获回答的 captain 决策</span></span>
<span class="line"><span>3. GUIDE     按 agent 判断的影响顺序，一次一个地引导决策</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>第三个环节尤其贴心：不是把一堆问题甩到你脸上，而是<strong>逐个</strong>引导——先处理影响最大的，你答完一个再进入下一个。</p><p><code>/ahoy</code> 还有一个特殊分支：如果它是本次会话的<strong>第一条真实 captain 消息</strong>（比如刚启动会话就敲了 /ahoy），它会退化为调用 Bearings 生成摘要，因为此时没有「上次消息以来」的事件可以回顾。</p><h2 id="_12-3-bearings-舰队的四段式摘要" tabindex="-1">12.3 /bearings：舰队的四段式摘要 <a class="header-anchor" href="#_12-3-bearings-舰队的四段式摘要" aria-label="Permalink to &quot;12.3 /bearings：舰队的四段式摘要&quot;">​</a></h2><p><code>/bearings</code> 从本地舰队状态和已注册 secondmate 状态中生成一份简洁的四段式聊天摘要。它是纯只读操作，适合快速了解全局。</p><p>它支持两个可组合的变体：</p><div class="language-sh vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 基础形式：仅聊天输出摘要</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">&gt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> /bearings</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 变体一：附带实时 PR 富化（仍保持仅聊天）</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">&gt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> /bearings include PRs</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 变体二：写入当日报告文件并在摘要中链接</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">&gt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> /bearings file</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 组合：写入文件 + PR 富化</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">&gt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> /bearings file include PRs</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>使用 <code>file</code> 变体时，报告会被完整重建为当天的日期文件：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>data/</span></span>
<span class="line"><span>└── status-report-2026-08-23.md   # data/status-report-&lt;YYYY-MM-DD&gt;.md</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>底层支撑脚本是 <code>bin/fm-bearings-snapshot.sh</code>——它把结构化的舰队快照投影成紧凑的 bearings 视图，默认 local-only，只有显式传 <code>--include-prs</code> 才会发起对外的 PR 富化请求。还有一个交互式升级版 <code>/bearings lavish</code> 舰队面板，由 <code>bin/fm-bearings-board.sh</code> 构建并武装。</p><h2 id="_12-4-afk-离开模式的自动值班" tabindex="-1">12.4 /afk：离开模式的自动值班 <a class="header-anchor" href="#_12-4-afk-离开模式的自动值班" aria-label="Permalink to &quot;12.4 /afk：离开模式的自动值班&quot;">​</a></h2><p><code>/afk</code> 是最接近「自动驾驶」的技能。当你需要离开键盘（Away From Keyboard）时启用它，firstmate 会切换到分级处理的值班形态：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/afk 运行时的职责划分：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>例行通知 ──► sub-supervisor 用 bash 自行处理（不打扰你）</span></span>
<span class="line"><span>captain 相关事件 ──► 攒成批量摘要（batched digests）上报</span></span>
<span class="line"><span>交付卡死 ──► 主动告警（配合 wedge-alarm 活跃提醒）</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>三个关键行为：</p><ol><li><strong>sub-supervisor 自处理</strong>：routine notifications 由 bash 层的 sub-supervisor 直接消化，不消耗你的注意力也不消耗 token；</li><li><strong>批量上报</strong>：真正 captain 相关的事件不逐条轰炸，而是攒批后以 digest 形式呈现；</li><li><strong>卡死告警</strong>：如果交付（delivery）卡住得不到推进，系统会主动升级告警——这正是第 11 章 watcher 中 wedge 处理逻辑的用户侧入口。卡死告警的通知渠道可通过 <code>config/wedge-alarm</code> 配置，默认在 macOS 上使用通知中心（若可用）。</li></ol><p>配套脚本形成了完整的生命周期：<code>bin/fm-afk-launch.sh</code> 负责进入与回滚，<code>bin/fm-afk-start.sh</code> 提供前台守护入口，<code>bin/fm-afk-return.sh</code> 负责<strong>确定性返回</strong>——关闭值班态、整理补看证据，并在存在 firstmate 必须处理的阻塞项时设置闸门。</p><h2 id="_12-5-stow-与-updatefirstmate" tabindex="-1">12.5 /stow 与 /updatefirstmate <a class="header-anchor" href="#_12-5-stow-与-updatefirstmate" aria-label="Permalink to &quot;12.5 /stow 与 /updatefirstmate&quot;">​</a></h2><h3 id="stow-会话知识清扫" tabindex="-1">/stow：会话知识清扫 <a class="header-anchor" href="#stow-会话知识清扫" aria-label="Permalink to &quot;/stow：会话知识清扫&quot;">​</a></h3><p>长对话里积累了很多只存在于聊天记录中的持久知识：你随口说的工作偏好、项目事实、踩过的坑、达成的决定、未完成的下一步。<code>/stow</code> 负责把这些清扫落盘：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/stow 的五类清扫目标：</span></span>
<span class="line"><span>1. user preferences   你顺口提过但没写进配置的工作偏好</span></span>
<span class="line"><span>2. project facts      构建/测试/部署等任何人后续都需要的事实</span></span>
<span class="line"><span>3. operational gotchas 踩坑记录与非常规成因</span></span>
<span class="line"><span>4. standing decisions 本会话做出的应当延续的决定</span></span>
<span class="line"><span>5. undone next steps  尚未落到任何地方的待办</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>它的记忆管理哲学是「紧凑的运营地图，而非不断膨胀的日志」：条目分层（tiered）、跨 pass 衰减（decay），陈旧材料退入冷存档（cold archival）而非直接删除。每个 home 有 startup memory 预算约束（如默认物化为约 7,500 token），超出时会强制决策而不是静默突破。如果你有注册的 secondmates，清扫结果还会<strong>级联</strong>到它们那里。</p><p>最重要的使用时机：<strong>主动重置或长时间离开之前</strong>。官方明确建议 intentional reset 前 run /stow，确保下一个会话能 reconcile 并继续（见第 11.5 节）。公共安装版 <code>skills/stow</code> 还支持路由到外部系统（如 issue tracker），但必须经过显式指令规则授权。</p><h3 id="updatefirstmate-安全自更新" tabindex="-1">/updatefirstmate：安全自更新 <a class="header-anchor" href="#updatefirstmate-安全自更新" aria-label="Permalink to &quot;/updatefirstmate：安全自更新&quot;">​</a></h3><div class="language-sh vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">&gt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> /updatefirstmate</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 行为：fast-forward-only 拉取 origin 最新版本，</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">#       更新自身与 secondmates，然后重读指令并 nudge secondmates</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>底层是 <code>bin/fm-update.sh</code>：严格 fast-forward-only 的拉取策略保证本地不会被强推的历史覆盖；更新完成后 firstmate 重读自己的指令材料，并对本地或远程的 secondmate homes 发起提示同步。</p><h2 id="本章小结" tabindex="-1">本章小结 <a class="header-anchor" href="#本章小结" aria-label="Permalink to &quot;本章小结&quot;">​</a></h2><ul><li>五个内置技能覆盖日常运营闭环：<code>/ahoy</code> 回顾引导决策、<code>/bearings</code> 四段式全局摘要、<code>/afk</code> 离开值班、<code>/stow</code> 知识落盘、<code>/updatefirstmate</code> 快进式自更新。</li><li>Claude/Grok 用斜杠前缀，Codex 用 <code>$</code> 前缀，名称一致。</li><li><code>/bearings</code> 的 <code>file</code> 变体重建 <code>data/status-report-&lt;YYYY-MM-DD&gt;.md</code> 并链接，<code>include PRs</code> 变体增加实时富化；两者可组合。</li><li><code>/afk</code> 的分级处理：例行通知 bash 自消化、captain 事件批量上报、交付卡死主动告警；返回时由 <code>fm-afk-return.sh</code> 做确定性收尾。</li><li><code>/stow</code> 是重启与压缩前的保险动作：五类知识分类归档、衰减加冷存档、受预算约束并向 secondmates 级联。</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>启动你的 firstmate 会话后依次运行 <code>/ahoy</code> 和 <code>/bearings</code>，对照本章描述确认：/ahoy 是否逐个引导未决决策？/bearings 的摘要是否呈现四个段落？把两者的实际输出片段贴进笔记并标注差异。</li><li>使用 <code>/bearings file include PRs</code> 生成一份带 PR 富化的当日报告，打开 <code>data/status-report-YYYY-MM-DD.md</code> 检查内容结构；随后再跑一次不带参数的 <code>/bearings</code>，对比聊天输出与文件版本的异同。</li><li>设计一次离开演练：给舰队下达一个耗时数分钟的 scout 任务后立即 <code>/afk</code>，离开观察告警是否在任务完成后以 digest 形式出现；返回时执行确定性收尾流程，记录 sub-supervisor 自动处理了哪些事件、哪些被升级给了你。</li></ol></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("firstmate/ch12.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
