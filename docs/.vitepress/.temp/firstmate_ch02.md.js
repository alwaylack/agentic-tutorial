import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"第 2 章 · 环境搭建与首次启航","description":"","frontmatter":{},"headers":[],"relativePath":"firstmate/ch02.md","filePath":"firstmate/ch02.md","lastUpdated":1787528977000}');
const __default__ = { name: "firstmate/ch02.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: "FirstMate 官方支持的参考会话后端是哪个？",
        options: [
          "herdr",
          "tmux",
          "zellij",
          "cmux"
        ],
        answer: 1,
        explain: "tmux 是 verified reference backend（硬默认），herdr/zellij/Orca/cmux 都是实验性后端，初学应从 tmux 开始。"
      },
      {
        question: "关于三个 co-primary harness（Claude Code、Grok、Pi），下列说法正确的是？",
        options: [
          "Claude Code 是唯一官方推荐的，其他只是兼容",
          "三者平级，主要差异是监督接入机制（Stop hook / background-notify / watcher extension）",
          "只有 Pi 支持 turn-end guard",
          "Grok 不需要任何信任设置"
        ],
        answer: 1,
        explain: "三者是 equal co-primary recommendations，按订阅任选；差异仅在 watcher 再武装与唤醒方式，turn-end guard 三者都有。Grok 需要 --trust 授权项目 hooks。"
      },
      {
        question: "会话启动摘要中 Bootstrap 区块的安装策略是？",
        options: [
          "发现缺失工具立即自动安装",
          "只做检测，安装前必须获得 captain 在当前会话中的同意",
          "从不检测也从不安装",
          "由 tmux 决定是否安装"
        ],
        answer: 1,
        explain: "Bootstrap detects first, asks for consent, and installs only after the captain approves——检测先行，征得同意才装，这是安全边界的一部分。"
      },
      {
        question: "首次对话「fix the flaky login test and add dark mode」中，第一副手会如何处理这两个改动？",
        options: [
          "自己依次串行完成两个改动",
          "拆成两个 ship 任务，各派一名船员在独立 worktree 并行工作",
          "要求 captain 手动开两个终端分别处理",
          "只做其中一个，另一个记入 backlog 永不再提"
        ],
        answer: 1,
        explain: "这正是 firstmate 翻转模型的价值：一次自然语言请求路由为并行船员任务，各自隔离 worktree 互不冲突，最后统一向你回传 PR。"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-2-章-·-环境搭建与首次启航" tabindex="-1">第 2 章 · 环境搭建与首次启航 <a class="header-anchor" href="#第-2-章-·-环境搭建与首次启航" aria-label="Permalink to &quot;第 2 章 · 环境搭建与首次启航&quot;">​</a></h1><blockquote><p>本章目标：从零准备运行 FirstMate 所需的全部工具链，完成克隆与首次启动，并跑通第一条「下达请求 → 船员干活 → PR 回传」的最小闭环。</p></blockquote><h2 id="_2-1-平台与前置要求" tabindex="-1">2.1 平台与前置要求 <a class="header-anchor" href="#_2-1-平台与前置要求" aria-label="Permalink to &quot;2.1 平台与前置要求&quot;">​</a></h2><p>FirstMate 是一个纯 Shell 组织的 <strong>agent distro</strong>（智能体发行版），官方支持的平台是：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>macOS / Linux（不支持原生 Windows，可在 WSL2 中尝试但无官方保证）</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>启动前需要备齐三类工具，缺一不可：</p><table tabindex="0"><thead><tr><th>类别</th><th>工具</th><th>用途</th></tr></thead><tbody><tr><td>认证</td><td>GitHub CLI (<code>gh</code>)</td><td>克隆仓库、创建 PR、读取 CI 状态</td></tr><tr><td>版本控制</td><td><code>git</code></td><td>项目克隆、worktree 隔离</td></tr><tr><td>会话后端</td><td><code>tmux</code></td><td>参考后端，承载每个船员的可见会话</td></tr><tr><td>主 harness</td><td>Claude Code / Grok / Pi 等</td><td>运行第一副手本人的智能体运行时</td></tr></tbody></table><p>其中 <strong>tmux 是参考后端</strong>（reference backend）：文档中的所有监督行为都以它为基准验证过；herdr、zellij、Orca、cmux 属于实验性后端（第 7 章详述）。初学请先用 tmux。</p><h2 id="_2-2-选择主-harness" tabindex="-1">2.2 选择主 harness <a class="header-anchor" href="#_2-2-选择主-harness" aria-label="Permalink to &quot;2.2 选择主 harness&quot;">​</a></h2><p>主 harness（primary harness）就是承载第一副手会话的那个终端编码智能体。FirstMate 官方验证过的 harness 有：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Claude Code   grok   pi   pi-signed   Codex   OpenCode   Cursor Agent CLI</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>其中 <strong>Claude Code、Grok、Pi 是平级的三个联合主推（co-primary）</strong>，任选其一即可，差别只在监督接入机制：</p><table tabindex="0"><thead><tr><th>Harness</th><th>监督接入方式</th></tr></thead><tbody><tr><td>Claude Code</td><td>tracked Stop hook，tokenless 地重新武装 watcher 并在需要时唤醒</td></tr><tr><td>Grok</td><td>background-notify 唤醒循环</td></tr><tr><td>Pi</td><td>tracked primary watcher extension</td></tr></tbody></table><p>三者都有经过验证的 turn-end guard 路径（第 11 章详解）。Codex 和 OpenCode 也受支持，但分别依赖有界前台检查点与 TUI 插件，监督取舍更多。Cursor Agent CLI 使用项目级 <code>.cursor/hooks.json</code> 的 stop hook，形态上最接近 Claude Code。</p><blockquote><p>选型建议：跟着你的订阅走——手头有哪家的订阅就用哪家，FirstMate 对三者一视同仁。</p></blockquote><h2 id="_2-3-安装与克隆" tabindex="-1">2.3 安装与克隆 <a class="header-anchor" href="#_2-3-安装与克隆" aria-label="Permalink to &quot;2.3 安装与克隆&quot;">​</a></h2><p>先完成 GitHub CLI 认证，再克隆发行版本体：</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 1. 登录 GitHub（按提示走浏览器授权流程）</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">gh</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> auth</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> login</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 2. 确认认证状态</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">gh</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> auth</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> status</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 3. 克隆 firstmate 发行版并进入目录</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">git</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> clone</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> https://github.com/kunchenguid/firstmate</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">cd</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> firstmate</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>没有 app 要安装、没有全局命令要注册——<strong>克隆下来的仓库本身就是发行版</strong>：<code>AGENTS.md</code> 是运营契约，<code>.agents/skills/</code> 是内置技能，<code>bin/</code> 是脚本工具带。</p><h2 id="_2-4-首次启动" tabindex="-1">2.4 首次启动 <a class="header-anchor" href="#_2-4-首次启动" aria-label="Permalink to &quot;2.4 首次启动&quot;">​</a></h2><p>在 <code>firstmate</code> 目录内直接启动你选定的 harness，<code>AGENTS.md</code> 会自动接管成为第一副手的岗位职责：</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># Claude Code</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">claude</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># Grok（--trust 每个克隆只需一次，让项目 hooks 与 turn-end guard 加载）</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">grok</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> --trust</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># Pi（首次启动批准一次项目信任提示，让 .pi/extensions/*.ts 自动加载）</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">pi</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 或使用签名包装器</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">FM_PI_HARNESS</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">pi-signed</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> pi-signed</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>Pi 还提供 <code>/calm</code> 开关：隐藏部分转写界面噪音（包括被规范分类的 Firstmate 操作行），活动运行期间用 Calm 动画小船替代普通输出，且不改变任何模型上下文与会话数据；再执行一次 <code>/calm</code> 即可恢复普通渲染。</p><h2 id="_2-5-启动时发生了什么-会话启动摘要" tabindex="-1">2.5 启动时发生了什么：会话启动摘要 <a class="header-anchor" href="#_2-5-启动时发生了什么-会话启动摘要" aria-label="Permalink to &quot;2.5 启动时发生了什么：会话启动摘要&quot;">​</a></h2><p>每次会话开始，第一副手都会运行一次 <code>bin/fm-session-start.sh</code>，产出一份<strong>启动摘要（digest）</strong>。它的固定顺序是：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1. Lock              先获取本 home 的会话锁，锁失败则全程只读</span></span>
<span class="line"><span>2. Bootstrap         只读探测工具/版本问题；安装必须经你当场同意</span></span>
<span class="line"><span>3. Wake queue        呈现持久唤醒队列（上次遗留的工作通知）</span></span>
<span class="line"><span>4. Supervision       输出与你当前 harness 匹配的监督操作指令块</span></span>
<span class="line"><span>5. Fleet-state       快速盘点每个任务的存活状态（只查&quot;在不在&quot;，不深读）</span></span>
<span class="line"><span>6. Network checks    GitHub 认证、secondmate 存活等网络检查的并发结果</span></span>
<span class="line"><span>7. Context digest    projects/secondmates/captain/learnings 各档案全文</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>两个对新手最重要的规则：</p><ul><li><strong>Bootstrap 只检测不安装</strong>：发现缺工具时会列出清单征求你的同意，你说可以它才装；</li><li><strong>锁被拒即只读</strong>：如果另一个活跃会话持有锁，本次会话不会派生、合并或修改任何舰队状态，只报告诊断信息。</li></ul><p>摘要里出现 <code>ABSENT</code> 标记是正常的——例如 <code>data/captain.md</code> 不存在表示「使用内置默认偏好」，而不是出错。</p><h2 id="_2-6-第一次对话-跑通最小闭环" tabindex="-1">2.6 第一次对话：跑通最小闭环 <a class="header-anchor" href="#_2-6-第一次对话-跑通最小闭环" aria-label="Permalink to &quot;2.6 第一次对话：跑通最小闭环&quot;">​</a></h2><p>启动完成后，直接用自然语言下达任务。官方示例：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; ahoy! look at my github project xyz, then fix the flaky login test and add dark mode</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>这条消息包含两个任务，第一副手会自动拆解路由：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>任务1（ship）: 修复 flaky login test      → 船员 A 在独立 worktree 中工作</span></span>
<span class="line"><span>任务2（ship）: 新增 dark mode             → 船员 B 在另一个独立 worktree 中工作</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>几分钟后你会收到类似这样的汇报：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>PR ready for review, captain: https://github.com/you/xyz/pull/42</span></span>
<span class="line"><span>(fix flaky login test - risk: low - CI green)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&gt; alright merge it</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>注意这次对话里的三个要点：</p><ol><li><strong>你只跟第一副手说话</strong>，从不直接指挥任何船员；</li><li><strong>合并需要你明确点头</strong>——「alright merge it」就是那句 captain 的 explicit word（第 4 章 hard rule 2）;</li><li>汇报以<strong>结果</strong>开头（PR 就绪、风险低、CI 绿），而不是中间过程细节。</li></ol><h2 id="_2-7-常见故障排查" tabindex="-1">2.7 常见故障排查 <a class="header-anchor" href="#_2-7-常见故障排查" aria-label="Permalink to &quot;2.7 常见故障排查&quot;">​</a></h2><table tabindex="0"><thead><tr><th>现象</th><th>原因与处理</th></tr></thead><tbody><tr><td>启动后没有任何 hooks 加载</td><td>Grok 忘了 <code>--trust</code>；或在会话内执行 <code>/hooks-trust</code> 补授权</td></tr><tr><td>Pi 没有加载 watcher extension</td><td>首次信任提示被拒绝过；重新批准项目信任即可</td></tr><tr><td>提示 tmux 未安装</td><td><code>brew install tmux</code>（macOS）或 <code>apt install tmux</code>（Debian/Ubuntu）</td></tr><tr><td>提示 GitHub 认证失败</td><td>重跑 <code>gh auth login</code>，确认 <code>gh auth status</code> 通过</td></tr><tr><td>会话启动摘要显示锁被拒</td><td>已有另一会话在管理舰队；关闭旧会话或等它释放锁</td></tr></tbody></table><h2 id="_2-8-本章小结" tabindex="-1">2.8 本章小结 <a class="header-anchor" href="#_2-8-本章小结" aria-label="Permalink to &quot;2.8 本章小结&quot;">​</a></h2><ul><li>FirstMate 支持 macOS/Linux，依赖 <code>gh</code> + <code>git</code> + tmux 参考后端 + 一个已验证的主 harness；</li><li>Claude Code / Grok / Pi 是三个平级 co-primary，差异只在监督接入机制；</li><li>克隆即安装：仓库本身就是 agent distro，无需额外 app；</li><li>会话启动摘要按 Lock → Bootstrap → Wake queue → Supervision → Fleet-state → Network checks → Context digest 固定顺序产出；</li><li>Bootstrap 只探测不安装，一切安装需你当场同意；最小闭环 = 自然语言下单 → 双 worktree 并行 → PR 回传 → 你口头授权合并。</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>在自己的机器上完整走一遍 2.3–2.4 节流程：认证 <code>gh</code>、克隆 firstmate、启动一个你有订阅的 co-primary harness，并把启动摘要的七个区块逐一抄录下来对照本文核对。</li><li>故意在未安装 tmux 的环境（或临时改名 tmux 二进制）中启动第一副手，观察 Bootstrap 如何报告缺失工具以及它给出的安装建议流程，记录「同意前」与「同意后」的差异。</li><li>找一个自己的练手仓库，用 2.6 节的双任务句式下达一条包含两个改动的自然语言请求，观察第一副手如何拆分任务、开出几个 tmux 窗口，以及最终汇报里是否包含 PR 完整 URL、risk 标注与 CI 状态三要素。</li></ol></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("firstmate/ch02.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
