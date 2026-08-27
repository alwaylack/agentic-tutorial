import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"第 10 章 · 项目模式与合并权限：no-mistakes / direct-PR / local-only","description":"","frontmatter":{},"headers":[],"relativePath":"firstmate/ch10.md","filePath":"firstmate/ch10.md","lastUpdated":1787528977000}');
const __default__ = { name: "firstmate/ch10.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: "三种项目模式中，哪一种会运行完整验证管线（full validation pipeline）？",
        options: ["direct-PR", "local-only", "no-mistakes", "三者都不运行"],
        answer: 2,
        explain: "官方定义：no-mistakes 任务跑完整验证管线；direct-PR 跳过管线直接开 PR；local-only 则完全留在本地等待批准后的 fast-forward 合并。"
      },
      {
        question: "关于 hard rule 2（未经船长明确指示绝不合并 PR），正确的说法是？",
        options: [
          "任何情况下都绝对不能自动合并",
          "船长为项目批准的 yolo 姿态是合并权限唯一的常设放宽",
          "CI 变绿即可自动合并，无需船长参与",
          "scout 任务可以自行合并自己的报告"
        ],
        answer: 1,
        explain: "规则原文指出：A projects captain-approved yolo posture is the only standing relaxation for merge authority——yolo 是唯一的常设放宽通道，其余情况都需要船长明确发话。"
      },
      {
        question: "fm-pr-merge.sh 在执行合并前如何对待记录在案的元数据（如 pr=、pr_head=）？",
        options: [
          "直接信任记录的元数据，只要存在就合并",
          "元数据只作参考，合并条件必须经一次实时读取确认，并把合并绑定到已验证的 head",
          "用元数据跳过所有检查以加快速度",
          "每次合并前删除旧元数据重新生成"
        ],
        answer: 1,
        explain: "官方强调 recorded metadata is never the authority——一次 rebase 就会让记录过期，因此五项条件（open/mergeable/conflict-free/discussions resolved/pipeline 绿）必须实时确认并绑定当前 head。"
      },
      {
        question: "local-only 项目的落地方式是什么？",
        options: [
          "推送到远程后自动开 PR",
          "留在本地，直到 firstmate 执行经过批准的 fast-forward merge",
          "永远不落地，只保留 worktree",
          "交给 fleet sync 强制推送"
        ],
        answer: 1,
        explain: "local-only tasks stay local until firstmate performs an approved fast-forward merge。因为没有远程 PR 路径，这类项目始终留在主第一副手处管理，fleet sync 会将其视为良性跳过。"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-10-章-·-项目模式与合并权限-no-mistakes-direct-pr-local-only" tabindex="-1">第 10 章 · 项目模式与合并权限：no-mistakes / direct-PR / local-only <a class="header-anchor" href="#第-10-章-·-项目模式与合并权限-no-mistakes-direct-pr-local-only" aria-label="Permalink to &quot;第 10 章 · 项目模式与合并权限：no-mistakes / direct-PR / local-only&quot;">​</a></h1><blockquote><p>本章目标：掌握三种显式项目交付模式（no-mistakes / direct-PR / local-only）的语义与适用场景，理解 <code>+yolo</code> 合并自治标志与 hard rule 2 的关系，学会为不同风险等级的项目选择合适的交付路径。</p></blockquote><h2 id="_10-1-为什么交付方式必须「显式」" tabindex="-1">10.1 为什么交付方式必须「显式」 <a class="header-anchor" href="#_10-1-为什么交付方式必须「显式」" aria-label="Permalink to &quot;10.1 为什么交付方式必须「显式」&quot;">​</a></h2><p>第 8 章我们知道了任务的两种形态：ship 改项目、scout 出报告。但 ship 任务改完代码之后，<strong>成果以什么方式落地</strong>，同样是一个必须事先说清的问题——是走完整验证管线再开 PR？是直接开 PR？还是只在本地合并？</p><p>如果这个决策留给临场发挥，就会出现两类事故：低风险改动被迫走重流程拖慢节奏；高风险改动却悄悄绕过了验证直接上线。所以 FirstMate 规定：<strong>每个任务在 intake（受理）时就确定交付模式与合并姿态，且模式一旦写进 brief 就不可漂移</strong>。</p><p>架构文档的原话是：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Delivery modes are explicit per task:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>no-mistakes tasks run the full validation pipeline,</span></span>
<span class="line"><span>direct-PR tasks open PRs without that pipeline,</span></span>
<span class="line"><span>local-only tasks stay local until firstmate performs</span></span>
<span class="line"><span>an approved fast-forward merge.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Each task&#39;s mode and yolo merge posture are</span></span>
<span class="line"><span>firstmate&#39;s decision at intake.</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="_10-2-三种项目模式逐一拆解" tabindex="-1">10.2 三种项目模式逐一拆解 <a class="header-anchor" href="#_10-2-三种项目模式逐一拆解" aria-label="Permalink to &quot;10.2 三种项目模式逐一拆解&quot;">​</a></h2><p><strong>模式一：no-mistakes（完整验证管线）</strong></p><p>这是最重的交付路径。ship 任务跑完完整的验证管线后才允许进入合并流程。它适合核心业务仓库、生产相关代码、CI 纪律要求高的团队仓库。两个值得注意的工程细节：</p><ul><li>管线在仓库里留存的验证证据会发布到一个 <strong>orphan evidence branch</strong>——一个与代码分支完全不共享历史的孤儿分支，因此证据永远不会混进 crew 分支或默认分支；</li><li><code>.no-mistakes/</code> 目录属于本地状态、保持 gitignore，若被误提交会被 CI 拒绝；<code>.no-mistakes.yaml</code> 中设置的 <code>disable_project_settings: true</code> 只从受信任的默认分支副本生效，防止某条被推送的分支在验证期间偷偷启用自己的项目指令。</li></ul><p><strong>模式二：direct-PR（直接开 PR）</strong></p><p>跳过 no-mistakes 管线，任务完成后直接开出 PR。适合有自己 CI 的开源风格仓库——GitHub/GitLab 的检查机制本身就是一道闸门。日常功能开发、文档改进多走这条路。</p><p><strong>模式三：local-only（仅本地落地）</strong></p><p>任务留在本地，直到 firstmate 执行一次<strong>经过批准的 fast-forward merge</strong> 才算落地。它不走远程 PR 路径，因此这类项目始终留在主第一副手身边管理；fleet sync 同步舰队时也会把 local-only 项目视为良性跳过（benign skip）。适合个人实验项目、还没有远程仓库的克隆。</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>三种模式的落地路径对比：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ship 任务完成</span></span>
<span class="line"><span>   │</span></span>
<span class="line"><span>   ├─ no-mistakes ──→ 完整验证管线 → 孤儿证据分支留存证据 → PR 路径合并</span></span>
<span class="line"><span>   │</span></span>
<span class="line"><span>   ├─ direct-PR ────→ 直接开 PR（依赖仓库自身 CI 把关）</span></span>
<span class="line"><span>   │</span></span>
<span class="line"><span>   └─ local-only ───→ 留在本地 → captain 批准后 fast-forward 合并进主本地检出</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="_10-3-模式如何流转-brief-固定-spawn-校验" tabindex="-1">10.3 模式如何流转：brief 固定，spawn 校验 <a class="header-anchor" href="#_10-3-模式如何流转-brief-固定-spawn-校验" aria-label="Permalink to &quot;10.3 模式如何流转：brief 固定，spawn 校验&quot;">​</a></h2><p>模式不是一句口头约定。它的流转链路是刻意设计成「防漂移」的：</p><ol><li>每个项目的<strong>常设姿态</strong>（standing posture）和可选的 <code>+yolo</code> 标志记录在 <code>data/projects.md</code> 注册表里，作为船长的默认决定及其上下文，还包括条件性的 <code>no-mistakes-prod-only</code> 策略；</li><li>受理任务时，firstmate 决定本任务的模式与 yolo 姿态；</li><li>模式被<strong>显式传给</strong> <code>bin/fm-brief.sh</code>，模式与姿态两者都被显式传给 <code>bin/fm-spawn.sh</code> 和 <code>bin/fm-promote.sh</code>——这几个命令都<strong>拒绝猜测</strong>自己消费的值；</li><li>ship brief 把模式写成一行固定的机器可读记录，spawn 若发现要启动的模式与记录不一致会拒绝启动，保证「给工人的指令」和「记录在案的交付方式」永不分叉。</li></ol><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>data/projects.md 注册表示意（结构示意，非逐字格式）：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>project: github.com/captain/payments-core</span></span>
<span class="line"><span>posture: no-mistakes          ← 常设姿态</span></span>
<span class="line"><span>merge:   captain-approval     ← 未加 yolo，默认须船长发话</span></span>
<span class="line"><span></span></span>
<span class="line"><span>project: github.com/captain/blog</span></span>
<span class="line"><span>posture: direct-PR</span></span>
<span class="line"><span>merge:   +yolo                ← 常设合并自治标志</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>另外有一道「降级告警」保护：如果某次 ship spawn 的实际严谨度低于注册表中登记的水准（例如注册的是 no-mistakes 却试图按更轻的模式交付），系统会打印一条 deviation notice（偏差通知）然后继续——让你知情，但不擅自中断。</p><p>而 <code>bin/fm-project-mode.sh</code> 是注册表的唯一解析器，服务于那些「手头没有具体任务」的机械消费者：fleet sync 对 local-only 的跳过判定、home seeding 的拒绝与 no-mistakes 初始化等。</p><h2 id="_10-4-hard-rule-2-没有船长的明确指示绝不合并-pr" tabindex="-1">10.4 Hard Rule 2：没有船长的明确指示绝不合并 PR <a class="header-anchor" href="#_10-4-hard-rule-2-没有船长的明确指示绝不合并-pr" aria-label="Permalink to &quot;10.4 Hard Rule 2：没有船长的明确指示绝不合并 PR&quot;">​</a></h2><p>第 4 章学过五条硬规则中的第二条：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Hard rule 2 — Never merge a PR without the captain&#39;s explicit word.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>A project&#39;s captain-approved yolo posture is the only standing relaxation</span></span>
<span class="line"><span>for merge authority; section 7 owns delivery and merge defaults, while the</span></span>
<span class="line"><span>captain-instruction precedence rule below owns when a current explicit</span></span>
<span class="line"><span>captain instruction overrides a conflicting Firstmate-written standing rule</span></span>
<span class="line"><span>within its exact scope.</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>三个层次要分清：</p><ol><li><strong>默认态</strong>：合并 PR 必须等船长明确发话（&quot;merge it&quot;）；</li><li><strong>常设放宽</strong>：只有船长为某个项目批准的 <code>+yolo</code> 姿态可以常设地放宽合并权限——这是唯一的例外通道；</li><li><strong>指令优先级</strong>：AGENTS.md 第 7 节拥有交付与合并的默认值；而当船长当下的明确指示与 firstmate 写下的常设规则冲突时，「当下指示在其确切范围内优先」由专门的 precedence 规则裁定。</li></ol><p>也就是说，即使你给项目开了 <code>+yolo</code>，你随时仍可以当场下达相反的明确指示收回这一次的决定权；反过来，没有 <code>+yolo</code> 时，任何「顺手合了」都是违规。</p><h2 id="_10-5-合并动作的技术保障-fm-pr-merge-sh" tabindex="-1">10.5 合并动作的技术保障：fm-pr-merge.sh <a class="header-anchor" href="#_10-5-合并动作的技术保障-fm-pr-merge-sh" aria-label="Permalink to &quot;10.5 合并动作的技术保障：fm-pr-merge.sh&quot;">​</a></h2><p>真正执行 PR 合并的是 <code>bin/fm-pr-merge.sh</code>，它在调用 forge CLI 之前通过 <code>bin/fm-pr-check.sh</code> 记录 <code>pr=</code> 与可用的 <code>pr_head=</code>。几条硬性约束：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fm-pr-merge.sh 的输入与校验：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>输入要求：</span></span>
<span class="line"><span>- 必须是完整规范 URL，拒绝畸形 URL 与 repo override 标志</span></span>
<span class="line"><span></span></span>
<span class="line"><span>URL 分派：</span></span>
<span class="line"><span>- https://github.com/&lt;owner&gt;/&lt;repo&gt;/pull/&lt;n&gt;</span></span>
<span class="line"><span>    → gh-axi pr merge &lt;n&gt; --repo &lt;owner&gt;/&lt;repo&gt;（默认 --squash，</span></span>
<span class="line"><span>      保留显式的 merge-method 标志）</span></span>
<span class="line"><span>- https://&lt;host&gt;/&lt;path&gt;/-/merge_requests/&lt;n&gt;（GitLab MR）</span></span>
<span class="line"><span>    → glab mr merge &lt;n&gt; -R https://&lt;host&gt;/&lt;path&gt;</span></span>
<span class="line"><span>      （不加 merge-method 标志，沿用项目自身的合并方式）</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>更重要的是合并前的<strong>实时校验</strong>。合并只在这五项条件经一次实时读取确认后才执行：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>合并前置条件（live read，实时读取，不信缓存元数据）：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. MR 处于 open 状态</span></span>
<span class="line"><span>2. 可合并（mergeable）</span></span>
<span class="line"><span>3. 无冲突（conflict-free）</span></span>
<span class="line"><span>4. blocking discussions 已全部解决</span></span>
<span class="line"><span>5. 当前 head 上 pipeline 成功</span></span>
<span class="line"><span></span></span>
<span class="line"><span>满足后把这次合并绑定到该已验证 head。</span></span>
<span class="line"><span>记录在案的元数据永远不作为这些条件的依据——</span></span>
<span class="line"><span>因为一次 rebase 就会让它们过期失效。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>这套设计把「船长说了 merge it」翻译成了一组机器可验证的安全前提，避免人肉确认造成的遗漏。</p><h2 id="_10-6-如何为项目选择模式" tabindex="-1">10.6 如何为项目选择模式 <a class="header-anchor" href="#_10-6-如何为项目选择模式" aria-label="Permalink to &quot;10.6 如何为项目选择模式&quot;">​</a></h2><p>给出一张决策参考表：</p><table tabindex="0"><thead><tr><th>项目特征</th><th>推荐模式</th><th>理由</th></tr></thead><tbody><tr><td>生产相关、核心业务库</td><td>no-mistakes</td><td>完整管线 + 证据留存，出错代价最高</td></tr><tr><td>有自身 CI 的常规开发仓库</td><td>direct-PR</td><td>平台检查即闸门，流程轻快</td></tr><tr><td>个人实验 / 无远程的项目</td><td>local-only</td><td>无 PR 路径可用，fast-forward 即可</td></tr><tr><td>高频琐碎改动 + 你完全信任</td><td>任一模式 + <code>+yolo</code></td><td>免去每次口头批准</td></tr></tbody></table><p>选择时的三条经验法则：</p><ol><li><strong>看出错代价而不是改动频率</strong>：改动频繁但出错了很难回滚的（如支付、鉴权），宁可重流程；</li><li><strong>CI 成熟度决定 direct-PR 是否安全</strong>：仓库本身没有可靠 CI 时，direct-PR 等于裸奔；</li><li><strong><code>+yolo</code> 是渐进授权</strong>：先观察一段时间某项目 firstmate 的交付质量，再考虑授予，且随时可以用当面的明确指令覆盖单次行为。</li></ol><p>一次典型的人机合并对话是这样的：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>captain&gt; alright, merge it        # CI 绿了之后，船长发话</span></span>
<span class="line"><span>firstmate&gt; Aye, captain.</span></span>
<span class="line"><span>           Verifying PR #42 is still open, mergeable, conflict-free,</span></span>
<span class="line"><span>           with resolved discussions and a green pipeline at HEAD...</span></span>
<span class="line"><span>           Merged (squash). Teardown queued for the task worktree.</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="本章小结" tabindex="-1">本章小结 <a class="header-anchor" href="#本章小结" aria-label="Permalink to &quot;本章小结&quot;">​</a></h2><ul><li>三种交付模式语义分明：no-mistakes 跑完整验证管线、direct-PR 直接开 PR、local-only 留在本地等待批准后的 fast-forward 合并；模式与 yolo 姿态都在 intake 时确定。</li><li>模式经 brief 固化为机器可读行，<code>fm-brief.sh</code> / <code>fm-spawn.sh</code> / <code>fm-promote.sh</code> 全部拒绝猜测值；spawn 发现模式不符即拒绝启动，杜绝「指令与记录分叉」。</li><li><code>data/projects.md</code> 登记各项目常设姿态与可选 <code>+yolo</code>；严谨度降级时打印 deviation notice 继续；<code>fm-project-mode.sh</code> 是机械消费者的唯一注册表解析器。</li><li>Hard rule 2 默认要求船长明确发话才可合并；<code>+yolo</code> 是唯一的常设放宽通道，且当下明确指示可在其范围内覆盖常设规则。</li><li><code>fm-pr-merge.sh</code> 要求完整规范 URL，按 GitHub/GitLab 分派 CLI，并在实时读取确认 open / mergeable / conflict-free / discussions resolved / pipeline 绿五项后绑定到已验证 head 再合并。</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>为你手头的三个真实项目分别选定交付模式（no-mistakes / direct-PR / local-only），参照本章 10.3 的示意结构写出各自的注册表条目，并用一句话说明每个选择的理由（对照 10.6 的三条经验法则）。</li><li>阅读 FirstMate 仓库中 <code>bin/fm-brief.sh</code> 与 <code>bin/fm-spawn.sh</code> 的头部注释，找出「模式固定行」与「拒绝猜测」的具体实现位置，整理成一份笔记说明这条防漂移链路。</li><li>在一个测试仓库上演练合并决策流：开一个 PR 并等 CI 变绿后对 firstmate 说 &quot;merge it&quot;，观察 fm-pr-merge.sh 报告的五项实时校验结果；随后再对比一个带 <code>+yolo</code> 姿态的小项目，体会两种合并权限的差异。</li></ol></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("firstmate/ch10.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
