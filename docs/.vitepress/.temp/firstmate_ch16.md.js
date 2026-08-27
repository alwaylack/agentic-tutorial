import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"第 16 章 · 实战一：搭建个人开发舰队","description":"","frontmatter":{},"headers":[],"relativePath":"firstmate/ch16.md","filePath":"firstmate/ch16.md","lastUpdated":1787528977000}');
const __default__ = { name: "firstmate/ch16.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: "首次启动 firstmate 时，下列哪组是官方并列推荐（co-primary）的 primary harness？",
        options: [
          "Claude Code、Grok、Pi",
          "Codex、Cursor、OpenCode",
          "tmux、herdr、zellij",
          "Claude Code、ChatGPT、Copilot"
        ],
        answer: 0,
        explain: "README 明确 Claude Code、Grok、Pi 为 equal co-primary recommendations；Codex/OpenCode 已验证但有更多取舍，tmux/herdr/zellij 是会话后端而非 harness。"
      },
      {
        question: "关于 scout 任务，下列说法正确的是？",
        options: [
          "scout 任务会直接向默认分支 push 提交",
          "scout 任务不产生代码变更、绝不 push，产出独立调研报告",
          "scout 任务必须先开 PR 再写报告",
          "scout 任务只能在远程主机上执行"
        ],
        answer: 1,
        explain: "官方定义：scout tasks leave standalone investigation reports（落在 data/<id>/report.md）and never push——它是零副作用的调研形态。"
      },
      {
        question: "firstmate 回报「PR ready for review, captain: ...(risk: low - CI green)」之后，合并何时会发生？",
        options: [
          "CI 变绿后自动合并",
          "risk 标注为 low 时自动合并",
          "只有 captain 明确说出合并授权后才会合并",
          "下一个任务开始前顺带合并"
        ],
        answer: 2,
        explain: "hard rule 2：Never merge a PR without the captain's explicit word。自动合并不存在，+yolo 也是需要 captain 预先批准的项目级姿态。"
      },
      {
        question: "teardown 时发现某个 worktree 还有未提交（unlanded）的改动，firstmate 会怎么做？",
        options: [
          "直接丢弃改动以保证环境干净",
          "把改动自动 commit 到默认分支",
          "拒绝拆除此 worktree，除非 captain 明确授权丢弃",
          "把改动转移到下一个任务的 worktree"
        ],
        answer: 2,
        explain: "hard rule 3 保护未落地工作：uncommitted changes are never landed，teardown 拒绝清理，绕过或 --force 必须有 captain 的明确授权。"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-16-章-·-实战一-搭建个人开发舰队" tabindex="-1">第 16 章 · 实战一：搭建个人开发舰队 <a class="header-anchor" href="#第-16-章-·-实战一-搭建个人开发舰队" aria-label="Permalink to &quot;第 16 章 · 实战一：搭建个人开发舰队&quot;">​</a></h1><blockquote><p>本章目标：从零搭建并跑通第一条完整的 FirstMate 舰队链路——安装前置、启动第一副手、完成一次 scout 调研任务和一次 ship 交付任务，亲手体验「只对一个 agent 说话，却带着一支船员交付」的工作方式。</p></blockquote><h2 id="_16-1-实战蓝图与验收标准" tabindex="-1">16.1 实战蓝图与验收标准 <a class="header-anchor" href="#_16-1-实战蓝图与验收标准" aria-label="Permalink to &quot;16.1 实战蓝图与验收标准&quot;">​</a></h2><p>本章是一条<strong>端到端的最小闭环</strong>：你（captain）只与 firstmate 对话，由它派生船员（crewmate）在隔离的 git worktree 中干活，最终把 PR 或调研报告交回给你。</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>你下达请求</span></span>
<span class="line"><span>   │</span></span>
<span class="line"><span>   ▼</span></span>
<span class="line"><span>firstmate（唯一联络人）</span></span>
<span class="line"><span>   │  检查工具链 → 克隆项目到 projects/ → 派生 crewmate</span></span>
<span class="line"><span>   ▼</span></span>
<span class="line"><span>crewmate（tmux 窗口中的自主 agent）</span></span>
<span class="line"><span>   │  在 treehouse worktree 中工作</span></span>
<span class="line"><span>   ├── scout：产出 data/&lt;id&gt;/report.md 调研报告</span></span>
<span class="line"><span>   └── ship ：推送分支 → 开 PR → 等待你授权合并</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>完成本章后，你应该能够勾掉这份验收清单：</p><ul><li>[ ] firstmate 在受支持的 harness 中加载了 <code>AGENTS.md</code> 并以 captain 称呼你；</li><li>[ ] 一个 scout 任务产出了落盘的调研报告；</li><li>[ ] 一个 ship 任务产出了真实 PR；</li><li>[ ] 合并只在你明确说出口之后发生。</li></ul><h2 id="_16-2-安装前置-四件套检查" tabindex="-1">16.2 安装前置：四件套检查 <a class="header-anchor" href="#_16-2-安装前置-四件套检查" aria-label="Permalink to &quot;16.2 安装前置：四件套检查&quot;">​</a></h2><p>按官方 Quick Start，运行 firstmate 需要三类前置。逐项在终端确认：</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 1) Git 与 GitHub CLI，并完成 GitHub 认证</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">git</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> --version</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">gh</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> --version</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">gh</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> auth</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> status</span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">        # 未认证则执行 gh auth login 按向导走完</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 2) 会话后端：tmux 是参考默认后端</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">tmux</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> -V</span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">               # 报错则安装：brew install tmux 或 sudo apt install tmux</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 3) 任一 co-primary harness（三选一即可）</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">claude</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> --version</span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">      # Claude Code</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">pi</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> --version</span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">          # Pi</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">grok</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> --version</span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">        # Grok CLI</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>三点官方说明需要记住：</p><ol><li><strong>co-primary 三选一</strong>：Claude Code、Grok、Pi 是并列推荐的 primary harness；Codex 与 OpenCode 也已验证可用，但监督机制各有更多 harness 相关的取舍。</li><li><strong><code>--trust</code> 只需每克隆一次</strong>：Grok 需要 <code>--trust</code> 才会加载项目 hooks 与 turn-end guard（也可以在会话内用 <code>/hooks-trust</code> 授权）；Pi 首次启动时批准项目信任提示，让 <code>.pi/extensions/*.ts</code> 自动加载。</li><li><strong>缺什么先问再装</strong>：firstmate 启动后会自检工具链，缺工具时会<strong>征得你的同意才安装</strong>——它不会自作主张动你的机器。</li></ol><h2 id="_16-3-克隆仓库并启航" tabindex="-1">16.3 克隆仓库并启航 <a class="header-anchor" href="#_16-3-克隆仓库并启航" aria-label="Permalink to &quot;16.3 克隆仓库并启航&quot;">​</a></h2><p>FirstMate 没有 App 可装：<strong>克隆下来的仓库本身就是 distro</strong>。进入目录后启动任一 co-primary harness，<code>AGENTS.md</code> 就会接管：</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">gh</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> auth</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> login</span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">                                   # 若上一步还没做</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">git</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> clone</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> https://github.com/kunchenguid/firstmate</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">cd</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> firstmate</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">claude</span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">        # 或 pi，或 grok --trust</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>启动后的第一条消息建议就用官方示例的问候语，顺便验证身份是否加载成功：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; ahoy! are you the first mate?</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><strong>你应该看到什么</strong>：回复中出现对 captain 的称呼（这是 <code>AGENTS.md</code> 的强制要求），语气带一点航海调味但技术内容清晰。如果它自称别的角色或没有称呼 captain，说明项目指令没有被加载——最常见原因是你在错误的目录启动了 harness。</p><h2 id="_16-4-准备一个练手项目" tabindex="-1">16.4 准备一个练手项目 <a class="header-anchor" href="#_16-4-准备一个练手项目" aria-label="Permalink to &quot;16.4 准备一个练手项目&quot;">​</a></h2><p>ship/scout 任务都需要一个真实的 GitHub 项目作为靶子。准备一个你自己拥有的小仓库（或 fork 一个开源小工具），要求很低：</p><ul><li>至少有一个可复现的小 bug 或一个明确的待办 issue；</li><li>是你拥有的仓库（这样 PR 流程可以完整走通）。</li></ul><p>不需要提前克隆到本地——firstmate 会把项目克隆到自己的 <code>projects/</code> 目录下并保持对该目录<strong>只读</strong>，真正的修改全部发生在船员的隔离 worktree 里。这条边界来自硬规则 1（Never write to a project）：firstmate 自己不写你的项目，改动由船员完成。</p><h2 id="_16-5-第一个-scout-任务-只读调研" tabindex="-1">16.5 第一个 scout 任务：只读调研 <a class="header-anchor" href="#_16-5-第一个-scout-任务-只读调研" aria-label="Permalink to &quot;16.5 第一个 scout 任务：只读调研&quot;">​</a></h2><p>scout 任务<strong>不产生任何代码变更、绝不 push</strong>，产出是一份落盘的独立调研报告。用自然语言下达：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; 派一个 scout 去调研 myname/tiny-api 这个仓库：</span></span>
<span class="line"><span>&gt; 列出目录结构、入口文件、测试组织方式，</span></span>
<span class="line"><span>&gt; 并指出哪里的错误处理最薄弱。只要报告，不要改任何东西。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><strong>你应该看到什么</strong>：</p><ol><li>firstmate 复述任务要点并派生一个船员（新 tmux 窗口出现）；</li><li>船员完成后，报告落在 <code>data/&lt;task-id&gt;/report.md</code>，同时给出一份 decision inventory（供你决策的事项清单）；</li><li>firstmate 向你转述结论摘要，而不是让你自己去读原始输出。</li></ol><p>你可以直接验证产物确实落盘：</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">ls</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> data/</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">*</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">/report.md</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}"> |</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> tail</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> -3</span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">     # 最近的任务报告</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="_16-6-第一个-ship-任务-从-issue-到-pr" tabindex="-1">16.6 第一个 ship 任务：从 issue 到 PR <a class="header-anchor" href="#_16-6-第一个-ship-任务-从-issue-到-pr" aria-label="Permalink to &quot;16.6 第一个 ship 任务：从 issue 到 PR&quot;">​</a></h2><p>现在下达第一个 ship 任务。继续用官方 Quick Start 的对话风格：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; look at my github project myname/tiny-api,</span></span>
<span class="line"><span>&gt; then fix the flaky login test.</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>firstmate 的动作序列与官方描述一致：检查工具链（缺工具先征求同意）→ 把项目克隆到 <code>projects/</code> → 在活跃后端中派生一个隔离船员 → 船员在干净的 treehouse worktree 中修复 → 监督至完成。几分钟后你会收到类似这样的汇报：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>PR ready for review, captain: https://github.com/you/tiny-api/pull/42</span></span>
<span class="line"><span>(fix flaky login test - risk: low - CI green)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>注意汇报的结构：<strong>链接 + 一句话变更说明 + risk 标注 + CI 状态</strong>。这就是第 11 章 watcher 监督机制的出口形态——过程不用你盯，结果以决策友好的格式送达。</p><h2 id="_16-7-合并与复盘-体验-hard-rule-2-与-bearings" tabindex="-1">16.7 合并与复盘：体验 hard rule 2 与 /bearings <a class="header-anchor" href="#_16-7-合并与复盘-体验-hard-rule-2-与-bearings" aria-label="Permalink to &quot;16.7 合并与复盘：体验 hard rule 2 与 /bearings&quot;">​</a></h2><p>PR 到手后，先亲自 review，再决定是否合并：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; alright, merge it.</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>只有你说出这句明确授权，firstmate 才会让合并发生——这是硬规则 2（Never merge a PR without the captain&#39;s explicit word）。反过来试一下也很有教育意义：不置可否地问「这个 PR 怎么样？」，firstmate 只会给分析意见而不会动手合并。</p><p>随后用 <code>/bearings</code> 做一次舰队状态盘点：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; /bearings</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>它会基于本地舰队状态生成一份四段式聊天摘要；加上参数还有两个变体：<code>/bearings file</code> 会同时把今天的日期版报告写入 <code>data/</code>，<code>/bearings include PRs</code> 则附加实时 PR 信息。三个变体可以组合使用。</p><h2 id="_16-8-收尾-teardown-与常见故障排查" tabindex="-1">16.8 收尾：teardown 与常见故障排查 <a class="header-anchor" href="#_16-8-收尾-teardown-与常见故障排查" aria-label="Permalink to &quot;16.8 收尾：teardown 与常见故障排查&quot;">​</a></h2><p>任务结束后 firstmate 会执行 teardown 清理船员会话与 worktree。teardown 有安全闸：<strong>未落地（unlanded）的工作绝不会被拆除</strong>——有未提交改动的 worktree 会拒绝清理，除非你明确授权丢弃。所以放心让它自动收尾即可。</p><p>新手最常见的三类故障：</p><table tabindex="0"><thead><tr><th>现象</th><th>原因</th><th>处理</th></tr></thead><tbody><tr><td>项目 hooks/guard 没加载</td><td>Grok 未加 <code>--trust</code>，或 Pi 首次信任提示被拒</td><td>在该克隆里重新授权</td></tr><tr><td>船员窗口没出现</td><td>tmux 未安装或版本过旧</td><td>安装 tmux 后重试</td></tr><tr><td>无法感知 GitHub 状态</td><td><code>gh</code> 未认证或 token 过期</td><td>重跑 <code>gh auth login</code></td></tr></tbody></table><h2 id="_16-9-本章小结" tabindex="-1">16.9 本章小结 <a class="header-anchor" href="#_16-9-本章小结" aria-label="Permalink to &quot;16.9 本章小结&quot;">​</a></h2><ul><li>FirstMate 的最小闭环 = 你下达自然语言请求 → firstmate 路由 → 船员在隔离 worktree 干活 → PR/报告回传 → 你做决策；</li><li>scout 任务零副作用：只出 <code>data/&lt;id&gt;/report.md</code> 报告，绝不 push；ship 任务才触碰代码；</li><li>合并权在你手里：没有 captain 的明确指令就没有 merge（hard rule 2）；</li><li><code>/bearings</code> 是低成本的状态仪表盘，<code>file</code> / <code>include PRs</code> 参数按需叠加；</li><li>teardown 自带 unlanded-work 保护，正常收尾无需人工干预。</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>完成 16.2–16.3 的环境搭建，在你的练手仓库所在目录之外启动 firstmate，并用「are you the first mate?」验证 captain 称呼与航海语气出现；若失败，按 16.8 的排查表定位原因。</li><li>给同一个练手仓库先后下达一个 scout 任务和一个 ship 任务，分别记录两次任务的 tmux 窗口数量变化，并在 <code>data/</code> 下找到 scout 报告文件的完整路径。</li><li>在收到 ship 任务 PR 后，故意先不授权合并，而是追问「这个 PR 的风险点在哪？」，观察 firstmate 是否只给分析不动手；然后再用 <code>/bearings file include PRs</code> 生成一份带 PR 信息的日报并核对 <code>data/status-report-*.md</code> 文件确实生成。</li></ol></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("firstmate/ch16.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
