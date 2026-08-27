import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"第 9 章 · Worktree 隔离与并行交付","description":"","frontmatter":{},"headers":[],"relativePath":"firstmate/ch09.md","filePath":"firstmate/ch09.md","lastUpdated":1787528977000}');
const __default__ = { name: "firstmate/ch09.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: "FirstMate 架构中，crewmate 与项目主检出（primary checkout）的关系是？",
        options: [
          "crewmate 直接在主检出里工作，方便共享依赖",
          "crewmate 从不有意触碰主检出，每个任务在自己的干净 worktree 中进行",
          "crewmate 先在主检出试改，成功后再迁移到 worktree",
          "crewmate 通过网络文件系统挂载主检出"
        ],
        answer: 1,
        explain: "官方架构明确 Crewmates never intentionally touch your project clone。所有 ship/scout 工作都在独立的 task worktree 中完成，这是并行不冲突的根基。"
      },
      {
        question: "关于 tmux、herdr、zellij、cmux 四个后端与 worktree 的关系，正确的是？",
        options: [
          "各自实现一套私有的 worktree 机制",
          "都不使用 worktree，直接改主检出",
          "均由 treehouse 池提供干净 worktree，仅 orca 后端自建工作树",
          "只有 tmux 使用 worktree，其余使用容器"
        ],
        answer: 2,
        explain: "Treehouse 为 tmux、herdr、zellij、cmux 任务集中提供干净 worktree；Orca 后端则自己创建并管理 worktree，经常规 teardown 检查通过后用 orca worktree rm 移除。"
      },
      {
        question: "fm-spawn.sh 的 base-freshness 边界要求什么？",
        options: [
          "worktree 创建时间不能超过 24 小时",
          "全新任务的干净 worktree 必须先匹配 origin 默认分支的最新 fetched tip，任何不安全或无法验证的基线都会停止 spawn",
          "worker 必须每天 fetch 一次远程",
          "只要求本地 main 分支存在即可"
        ],
        answer: 1,
        explain: "官方原文：no worker starts until its clean task worktree matches the fetched tip of origins resolved default branch。从源头避免船员基于过时代码开发。"
      },
      {
        question: "一个 scout worktree 满足什么条件才可以被声明为 scratch 并丢弃？",
        options: [
          "任务超时即自动丢弃",
          "只要 crewmate 说自己做完了就可以丢",
          "报告已存在于 data/<id>/report.md 且 shared unresolved-decision 完成闸门通过",
          "worktree 超过一定大小就必须丢弃"
        ],
        answer: 2,
        explain: "hard rule 3 规定 scout worktree 只有在其报告存在、且共享的 unresolved-decision 完成闸门通过之后才可声明为 scratch 丢弃，确保调查结论不会随清理丢失。"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-9-章-·-worktree-隔离与并行交付" tabindex="-1">第 9 章 · Worktree 隔离与并行交付 <a class="header-anchor" href="#第-9-章-·-worktree-隔离与并行交付" aria-label="Permalink to &quot;第 9 章 · Worktree 隔离与并行交付&quot;">​</a></h1><blockquote><p>本章目标：理解 FirstMate 为什么坚持「每个任务一个干净 git worktree」的隔离模型，掌握 treehouse worktree 池、base-freshness 新鲜度边界与 fail-closed teardown 的完整生命周期。</p></blockquote><h2 id="_9-1-为什么需要-worktree-隔离" tabindex="-1">9.1 为什么需要 Worktree 隔离 <a class="header-anchor" href="#_9-1-为什么需要-worktree-隔离" aria-label="Permalink to &quot;9.1 为什么需要 Worktree 隔离&quot;">​</a></h2><p>想象一下没有隔离的场景：你让第一副手同时派三个船员去改同一个仓库——修登录 bug、加暗色模式、重构工具函数。如果他们都在你的项目目录里直接工作，会发生什么？</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>无隔离的并行：</span></span>
<span class="line"><span>projects/myapp/          ← 所有船员共用同一份工作区</span></span>
<span class="line"><span>├── src/login.ts         船员 A 正在修改（半成品）</span></span>
<span class="line"><span>├── src/theme.css        船员 B 也在这里改（互相踩踏）</span></span>
<span class="line"><span>├── src/utils.ts         船员 C 重构到一半，A 的测试跑不起来</span></span>
<span class="line"><span>└── ???                  谁改了什么？git diff 一团糟</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>未提交的改动混在一起，无法拆分、无法回滚、甚至无法编译。<strong>并行的收益瞬间变成并行的事故。</strong></p><p>Git 其实早就给出了答案：<code>git worktree</code>。它允许同一个仓库在磁盘上同时检出多个工作区，每个工作区有独立的文件和独立的 HEAD，但共享同一份 <code>.git</code> 对象库——既隔离又省空间：</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 原生 git worktree 演示：同一仓库两个独立工作区</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">cd</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> myapp</span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">                          # 主检出留在 main 分支</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">git</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> worktree</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> add</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> ../myapp-fix</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> -b</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> fix/login-bug</span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">   # 新工作区 + 新分支</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">git</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> worktree</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> add</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> ../myapp-dark</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> -b</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> feat/dark-mode</span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"> # 再来一个</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">git</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> worktree</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> list</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># /Users/captain/code/myapp        abc1234 [main]</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># /Users/captain/code/myapp-fix    def5678 [fix/login-bug]</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># /Users/captain/code/myapp-dark   9abc123 [feat/dark-mode]</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">cd</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> ../myapp-fix</span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">    # 这里随便折腾，完全不影响其他工作区</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>FirstMate 把这个机制制度化：<strong>crewmate 从不故意触碰你的项目主检出（primary checkout），每个任务都在自己的干净 worktree 里完成</strong>。这就是架构文档里「Worktrees, not branches in your checkout」的含义。</p><h2 id="_9-2-treehouse-worktree-池" tabindex="-1">9.2 Treehouse：Worktree 池 <a class="header-anchor" href="#_9-2-treehouse-worktree-池" aria-label="Permalink to &quot;9.2 Treehouse：Worktree 池&quot;">​</a></h2><p>为每个任务手动 <code>git worktree add</code> 太繁琐，而且要处理清理、复用、新鲜度等问题。FirstMate 配套使用 treehouse 来<strong>集中管理一批干净的 task worktree</strong>：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>任务与 worktree 的对应关系：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>projects/myapp/            ← 你的项目克隆（firstmate 只读；crewmate 不在此工作）</span></span>
<span class="line"><span>     │  fm-spawn.sh</span></span>
<span class="line"><span>     ├── treehouse worktree #1 ──→ fm-task1（ship：修登录 bug）</span></span>
<span class="line"><span>     ├── treehouse worktree #2 ──→ fm-task2（scout：调查性能回归）</span></span>
<span class="line"><span>     └── treehouse worktree #3 ──→ fm-task3（ship：暗色模式）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>各后端的 worktree 提供方：</span></span>
<span class="line"><span>tmux / herdr / zellij / cmux  →  treehouse 统一供给</span></span>
<span class="line"><span>orca                          →  Orca 自建 worktree（记录 orca_worktree_id=，</span></span>
<span class="line"><span>                                  经常规 teardown 检查后用 orca worktree rm 移除）</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>要点有三：</p><ol><li><strong>池化供给</strong>：tmux、herdr、zellij、cmux 四种会话后端都由 treehouse 提供 worktree；只有实验性的 Orca 后端自己管理工作树生命周期。</li><li><strong>一任务一树</strong>：每个 crewmate 会话绑定一个专属 worktree，互不可见、互不污染。</li><li><strong>用完归还</strong>：任务结束经 teardown 流程把 worktree 归还池子，供后续任务复用。</li></ol><h2 id="_9-3-启动闸门-fm-spawn-sh-的两道检查" tabindex="-1">9.3 启动闸门：fm-spawn.sh 的两道检查 <a class="header-anchor" href="#_9-3-启动闸门-fm-spawn-sh-的两道检查" aria-label="Permalink to &quot;9.3 启动闸门：fm-spawn.sh 的两道检查&quot;">​</a></h2><p>隔离不是靠自觉，而是靠脚本强制。<code>bin/fm-spawn.sh</code> 在派出任何 ship 或 scout 任务前有两道硬性检查。</p><p><strong>第一道：真实且独立的 worktree 根</strong>。除非解析出的任务路径是一个真实的 git worktree 根、并且<strong>不同于项目主检出</strong>，否则拒绝启动。</p><p><strong>第二道：base-freshness 新鲜度边界</strong>。每个全新的 ship/scout 任务，其干净 worktree 必须<strong>先对齐 origin 解析出的默认分支的最新 fetched tip</strong>，任何不安全或无法验证的基础都会阻止启动：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>base-freshness 流程（由 fm-spawn.sh 负责）：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. fetch origin，解析默认分支（origin/HEAD）</span></span>
<span class="line"><span>2. 将任务 worktree 的基础对齐到该 fetched tip</span></span>
<span class="line"><span>3. 对齐成功       → worker 才允许启动</span></span>
<span class="line"><span>4. 不安全/无法验证 → spawn 停止，绝不带病开工</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>为什么这么严？因为过时的基线意味着船员基于旧代码开发，PR 一开就是一堆无谓冲突甚至逻辑错误。「先保鲜、再开工」把这类事故扼杀在起点。精确的拒绝机制由脚本头注释拥有，回归覆盖见仓库中的 <code>tests/fm-spawn-pool-base-freshen.test.sh</code>。</p><h2 id="_9-4-worktree-tangle-唯一的健康判据是分支状态" tabindex="-1">9.4 Worktree Tangle：唯一的健康判据是分支状态 <a class="header-anchor" href="#_9-4-worktree-tangle-唯一的健康判据是分支状态" aria-label="Permalink to &quot;9.4 Worktree Tangle：唯一的健康判据是分支状态&quot;">​</a></h2><p>有一个特殊情况值得单独讲：firstmate 仓库自己也可能被派活（船队可以调度船员维护 firstmate 本身）。这时 <code>FM_ROOT</code>（firstmate 自己的运营检出）和船员的临时 worktree 都是<strong>同一个仓库的 linked worktree</strong>，「是否 linked」不再能区分健康与否。</p><p>架构文档给出的判别标准是<strong>分支状态</strong>：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>健康的拓扑：</span></span>
<span class="line"><span>FM_ROOT（主检出）                  → 停留在默认分支        ✅ 健康</span></span>
<span class="line"><span>linked worktree / secondmate home → 处于 detached HEAD    ✅ 健康</span></span>
<span class="line"><span></span></span>
<span class="line"><span>唯一病态（worktree tangle）：</span></span>
<span class="line"><span>FM_ROOT                           → 检出了命名的非默认分支 ❌ tangle</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>一旦出现 tangle，两处都会报警：</p><ul><li><code>bin/fm-session-start.sh</code> 通过 bootstrap 在会话启动时报告一行 <code>TANGLE:</code> 信息；</li><li><code>bin/fm-guard.sh</code> 在下一次「可变更舰队动作」时打印修复命令。</li></ul><p>若另一个活跃会话正持有舰队锁，两处都会保留告警但切换为只读措辞、不给修复命令。分类逻辑由 <code>fm-tangle-lib.sh</code> 完成：先从 <code>origin/HEAD</code> 解析默认分支，再依次回退到本地 <code>main</code> 或 <code>master</code>。此外，ship brief 还会让船员自己在创建 <code>fm/&lt;id&gt;</code> 前验证当前路径与工作区根，若发现自己落在了主检出里就立即以 blocked 状态停止：</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># ship brief 要求船员开工前的自检（防止误入主检出）</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">pwd</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> -P</span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">                         # 当前物理路径</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">git</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> rev-parse</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> --show-toplevel</span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">  # 当前仓库工作区根</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 若结果指向 primary checkout → 以 blocked 状态停止，绝不继续</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="_9-5-fail-closed-teardown-未落地的工作不许动" tabindex="-1">9.5 Fail-Closed Teardown：未落地的工作不许动 <a class="header-anchor" href="#_9-5-fail-closed-teardown-未落地的工作不许动" aria-label="Permalink to &quot;9.5 Fail-Closed Teardown：未落地的工作不许动&quot;">​</a></h2><p>任务收尾（teardown）是隔离生命周期的最后一环，也是 hard rule 3（Never tear down unlanded work）的主战场。规则原文非常明确：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Hard rule 3 — Never tear down unlanded work:</span></span>
<span class="line"><span>- Uncommitted changes are never landed,</span></span>
<span class="line"><span>  and bin/fm-teardown.sh owns the complete landed-work test.</span></span>
<span class="line"><span>- Never bypass a refusal or use --force unless the captain</span></span>
<span class="line"><span>  explicitly authorized discarding that work.</span></span>
<span class="line"><span>- A scout worktree is declared scratch and may be discarded only after</span></span>
<span class="line"><span>  its report exists and the shared unresolved-decision completion gate passes.</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>落到执行层面，teardown 是 <strong>fail-closed（失败即关闭）</strong> 的：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ship worktree 的 teardown 判定链：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>脏 worktree（有 uncommitted changes）→ 拒绝 teardown</span></span>
<span class="line"><span>已提交但尚未 landing 的工作          → 拒绝归还，必须先落地</span></span>
<span class="line"><span>已落地（landed）的工作               → 归还 worktree 入池</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>也就是说：<strong>脏的不许碰，没落地的不许删</strong>。架构文档指出 bin/fm-teardown.sh 的头部注释拥有完整的 landed-work 判定证据、PR 发现回退逻辑和陈旧锁恢复流程。只有船长明确授权丢弃该工作时，才允许绕过拒绝使用 <code>--force</code>——而且这个授权必须针对「这一份工作」，不能泛化成常设许可。</p><p>scout worktree 更特殊一点：它的产出是一份调查报告而不是代码变更。只有当报告已经存在（<code>data/&lt;id&gt;/report.md</code>）、且共享的 unresolved-decision 完成闸门通过之后，它才能被声明为 scratch 并丢弃。这保证了调查结论不会随着 worktree 清理而凭空消失：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>scout worktree 丢弃前置条件：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>data/&lt;id&gt;/report.md 存在？         ──否──→ 不能丢弃</span></span>
<span class="line"><span>        │是</span></span>
<span class="line"><span>unresolved-decision 完成闸门通过？ ──否──→ 不能丢弃</span></span>
<span class="line"><span>        │是</span></span>
<span class="line"><span>声明为 scratch，安全丢弃 ✅</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="本章小结" tabindex="-1">本章小结 <a class="header-anchor" href="#本章小结" aria-label="Permalink to &quot;本章小结&quot;">​</a></h2><ul><li>并行改动同一份工作区必然互踩；FirstMate 制度化了 git worktree：crewmate 从不触碰项目主检出，每任务一个干净 worktree。</li><li>tmux/herdr/zellij/cmux 由 treehouse 池统一供给 worktree；Orca 后端自建并以 <code>orca worktree rm</code> 管理。</li><li><code>fm-spawn.sh</code> 设两道闸门：任务路径必须是独立于主检出的真实 worktree 根；基线必须对齐 origin 默认分支最新 fetched tip（base-freshness），不安全即停止。</li><li>健康判据是分支状态而非是否 linked worktree：<code>FM_ROOT</code> 停在默认分支、worktree 处于 detached HEAD 即健康；主检出处检出非默认分支即为 tangle，session-start 报 <code>TANGLE:</code> 行、fm-guard 打印修复命令。</li><li>teardown 遵循 fail-closed：脏 worktree 拒绝、未落地工作拒绝归还；绕过需要船长针对该工作的明确授权；scout worktree 须报告存在且决策闸门通过后方可按 scratch 丢弃。</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>在你自己的任意仓库上练习原生 git worktree：创建两个 worktree 分别修改不同的文件，用 <code>git worktree list</code> 观察结构，然后在其中一个提交并合并回主分支，体会「同一仓库、多份独立工作区」的隔离效果。</li><li>阅读 FirstMate 仓库中 <code>bin/fm-teardown.sh</code> 的头部注释，梳理它判定 landed-work 的证据清单与 PR 发现回退逻辑；对照本章 9.5 的 fail-closed 链路，列出哪些状态会被拒绝归还 worktree。</li><li>在测试环境人为制造一次 worktree tangle：在 firstmate 运营检出（FM_ROOT）上检出一个命名非默认分支，重新启动会话并观察 bootstrap 阶段的 <code>TANGLE:</code> 报告内容，最后切回默认分支消除告警。</li></ol></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("firstmate/ch09.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
