import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"第 8 章 · Crewmate 委派：ship 任务与 scout 任务","description":"","frontmatter":{},"headers":[],"relativePath":"firstmate/ch08.md","filePath":"firstmate/ch08.md","lastUpdated":1787528977000}');
const __default__ = { name: "firstmate/ch08.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: "scout 任务的正式交付物是什么？",
        options: [
          "一个待合并的 PR 分支",
          "data/<id>/report.md 调查报告，且 scout 绝不 push",
          "直接提交到项目主分支的修复",
          "一封发给 captain 的邮件"
        ],
        answer: 1,
        explain: "架构文档明确 scout tasks leave standalone investigation reports at data/<id>/report.md and never push；报告在 teardown 后依然保留，供 captain 阅读与决策。"
      },
      {
        question: "根据 hard rule 3，scout 的 worktree 何时可以被丢弃？",
        options: [
          "crewmate 一停止工作就可以丢",
          "报告写完即可立即丢弃",
          "它是声明的 scratch 区，须待报告存在且共享的未决决策完成门通过后才可丢弃",
          "永远不能丢弃，必须永久归档"
        ],
        answer: 2,
        explain: "AGENTS.md 规定 scout worktree 被声明为 scratch，但其丢弃有两个前置条件：report 已存在，且 shared unresolved-decision completion gate 通过；这防止带着未决决策销毁调查现场。"
      },
      {
        question: "以下哪种情况应该派出一个 scout 任务？",
        options: [
          "任何用户提问都应该先派 scout 调研",
          "captain 明确要求单独的知识/设计交付物，或未决不确定性会实质改变要不要做、做什么",
          "已有文档能直接回答的信息性问题",
          "已经决定要修的一个小 bug"
        ],
        answer: 1,
        explain: "intake 契约只在两种情况下 warrant scout：captain 显式要求独立知识/设计交付物，或 unresolved uncertainty 会 materially change whether/what to build；既有证据能答的问题直接转达，明确的修复走 ship。"
      },
      {
        question: "fm-spawn.sh 的 base-freshness 门禁要求什么？",
        options: [
          "worktree 必须比主 checkout 更新",
          "每个新 ship/scout 的干净 worktree 必须匹配 origin 默认分支的已拉取 tip，否则拒绝启动",
          "crewmate 必须每天重新拉取代码",
          "所有任务必须基于 main 分支的第一个提交"
        ],
        answer: 1,
        explain: "fm-spawn.sh owns the base-freshness boundary：worker 启动前，干净任务 worktree 必须对齐 origin resolved default branch 的 fetched tip；unsafe 或 unverifiable 的基线会让 spawn 停止，确保并行工作不从过期代码出发。"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-8-章-·-crewmate-委派-ship-任务与-scout-任务" tabindex="-1">第 8 章 · Crewmate 委派：ship 任务与 scout 任务 <a class="header-anchor" href="#第-8-章-·-crewmate-委派-ship-任务与-scout-任务" aria-label="Permalink to &quot;第 8 章 · Crewmate 委派：ship 任务与 scout 任务&quot;">​</a></h1><blockquote><p>本章目标：理解 FirstMate 的两种任务形态——交付变更的 ship 任务与产出知识的 scout 任务，掌握 intake 阶段的任务分派契约与委派机制。</p></blockquote><h2 id="_8-1-两种任务形态的设计动机" tabindex="-1">8.1 两种任务形态的设计动机 <a class="header-anchor" href="#_8-1-两种任务形态的设计动机" aria-label="Permalink to &quot;8.1 两种任务形态的设计动机&quot;">​</a></h2><p>你向 firstmate 说&quot;修复这个 flaky 测试&quot;和&quot;调查一下登录接口为什么慢&quot;，是两种完全不同的请求：前者期望<strong>代码被改变并出货</strong>，后者期望<strong>得到一份可信的调查结论</strong>。把它们混在一种任务里会导致两种失败——该改代码的没改，不该改的乱改。</p><p>FirstMate 因此在任务层面内置了两种形态（官方称 &quot;Two task shapes&quot;）：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ship 任务   改变项目，按项目模式出货（no-mistakes / direct-PR / local-only）</span></span>
<span class="line"><span>scout 任务  产出独立调查报告，绝不 push</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>这个区分写在架构文档里，而&quot;什么时候派 scout&quot;的判断规则由 <code>AGENTS.md</code> 的 intake 与授权契约（intake and authority contract）拥有。本章我们逐一拆解。</p><h2 id="_8-2-ship-任务-交付被授权的变更" tabindex="-1">8.2 ship 任务：交付被授权的变更 <a class="header-anchor" href="#_8-2-ship-任务-交付被授权的变更" aria-label="Permalink to &quot;8.2 ship 任务：交付被授权的变更&quot;">​</a></h2><p>ship 任务的目标是<strong>被授权的项目变更</strong>，最终以 PR、经批准的本地合并或其他项目模式定义的方式交付。它的完整生命周期是：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>captain 请求 → firstmate intake（确定任务形态与交付模式）</span></span>
<span class="line"><span>           → fm-brief.sh 写任务简报</span></span>
<span class="line"><span>           → fm-spawn.sh 在干净 worktree 启动 crewmate</span></span>
<span class="line"><span>           → crewmate 实施 + 按模式验证</span></span>
<span class="line"><span>           → PR / approved local merge</span></span>
<span class="line"><span>           → teardown 清理 worktree</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>注意 hard rule 1 的分工：<strong>firstmate 自己不写项目代码</strong>——它只读 <code>projects/</code>，写受守卫的 backlog、简报和状态；真正动项目文件的是它 spawn 出来并监督的 crewmate。</p><h2 id="_8-3-scout-任务-产出知识而非变更" tabindex="-1">8.3 scout 任务：产出知识而非变更 <a class="header-anchor" href="#_8-3-scout-任务-产出知识而非变更" aria-label="Permalink to &quot;8.3 scout 任务：产出知识而非变更&quot;">​</a></h2><p>scout 任务适用于<strong>调查、诊断、规划、复现或审计</strong>类工作。它的交付物是一份独立报告：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>data/&lt;id&gt;/report.md     ← scout 的唯一正式交付物，teardown 后依然保留</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>报告完成后的收尾流程（对应架构图中的 scout 分支）：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>report.md 完成 → decision inventory（未决决策清单）→ relay findings（向 captain 转达发现）→ teardown</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>两个关键安全设计：</p><ol><li><strong>scout worktree 被声明为 scratch（草稿区）</strong>。根据 hard rule 3，它只有在报告存在且共享的未决决策完成门通过之后才允许丢弃；</li><li><strong>诊断结论不是改代码的授权</strong>。<code>AGENTS.md</code> 明确写道：&quot;A diagnostic request, report, recommendation, or implementation-ready finding is evidence, not authorization to change code.&quot;——scout 发现了 bug 不等于可以顺手修掉，修复必须走新的 ship 授权。</li></ol><h2 id="_8-4-intake-契约-何时该拆出-scout" tabindex="-1">8.4 intake 契约：何时该拆出 scout <a class="header-anchor" href="#_8-4-intake-契约-何时该拆出-scout" aria-label="Permalink to &quot;8.4 intake 契约：何时该拆出 scout&quot;">​</a></h2><p>不是所有问题都值得开一个 scout。<code>AGENTS.md</code> 给出的判断规则很克制：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>满足以下任一条件时才适合 scout：</span></span>
<span class="line"><span>① captain 明确要求单独的知识或设计交付物；</span></span>
<span class="line"><span>② 未决的不确定性会实质性地改变&quot;要不要做&quot;或&quot;做什么&quot;。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>同时有两条反浪费约束：</p><ul><li>如果既有证据已经能回答一个信息性问题，firstmate 应<strong>直接转达答案</strong>，而不是发起一个&quot;纯设计 scout&quot;（design-only scout）；</li><li>绝不允许一边给出一个&quot;大概率够用的方案&quot;，一边又并行启动一个并不预期改变该方案的设计调研——这是纯粹的 token 浪费。</li></ul><p>当实现意图不清楚时，正确姿势是先回答、必要时向 captain 提一个简洁的实现澄清问题，而不是派 speculative design 工作。</p><h2 id="_8-5-委派机制-worktree-门禁与并发规则" tabindex="-1">8.5 委派机制：worktree 门禁与并发规则 <a class="header-anchor" href="#_8-5-委派机制-worktree-门禁与并发规则" aria-label="Permalink to &quot;8.5 委派机制：worktree 门禁与并发规则&quot;">​</a></h2><p>spawn 不是随便启动一个进程。<code>fm-spawn.sh</code> 有两道硬门禁：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>门禁一：任务路径必须是真实的 git worktree root，</span></span>
<span class="line"><span>        且必须区别于项目主 checkout。</span></span>
<span class="line"><span>        否则拒绝启动。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>门禁二：base-freshness——每个新 ship/scout 启动前，</span></span>
<span class="line"><span>        干净的任务 worktree 必须先对齐 origin 默认分支的已拉取 tip。</span></span>
<span class="line"><span>        基线不安全或无法验证 → spawn 停止。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>第二道门禁保证了每个 crewmate 都从最新基线出发，避免并行工作建立在过期代码上。</p><p>关于<strong>并发</strong>，<code>AGENTS.md</code> 的规则同样明确：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>默认：只要每项变更可独立实施、可独立验证，</span></span>
<span class="line"><span>      且所选交付路径能调和普通的 rebase/冲突，</span></span>
<span class="line"><span>      就立即并行派发，没有并发上限。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>串行：仅当存在真正的语义依赖、共享可变外部状态、</span></span>
<span class="line"><span>      不兼容的并发迁移等具体不安全条件时才串行。</span></span>
<span class="line"><span>      ——仅仅&quot;会编辑同一个文件&quot;不足以成为等待理由。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>另外，ship 任务的<strong>交付模式和 yolo 合并姿态在 intake 时就定死</strong>：显式传给 brief、显式传给 spawn 和任何 scout promotion——每个命令都拒绝猜测自己消费的值（refuses to guess）。简报中记录的模式是一条固定的机器可读行，worker 收到的指令与记录的交付方式不可能 diverge。</p><h2 id="_8-6-升级原则-只升级真正的决策" tabindex="-1">8.6 升级原则：只升级真正的决策 <a class="header-anchor" href="#_8-6-升级原则-只升级真正的决策" aria-label="Permalink to &quot;8.6 升级原则：只升级真正的决策&quot;">​</a></h2><p>fleet 运转起来后，captain 最怕的是被海量例行通知淹没。FirstMate 的升级（escalation）原则是：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>firstmate 只把真正的决策升级给 captain；</span></span>
<span class="line"><span>例行通知由 bash watcher 自行处理（zero-token supervision，见第 11 章）。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>配合 crewmate 通信纪律（hard rule 4：crewmate 永远不直接对话 captain，所有通信流经 firstmate），形成一条干净的指挥链：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>captain ⇄ firstmate ⇄ 每个 crewmate（各自的 session endpoint）</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>如果 captain 直接在某个 crewmate 窗口插话，该干预被视为权威（authoritative），但会在下一次监督评审时被 reconcile——保证状态最终一致。</p><h2 id="本章小结" tabindex="-1">本章小结 <a class="header-anchor" href="#本章小结" aria-label="Permalink to &quot;本章小结&quot;">​</a></h2><ul><li>FirstMate 只有两种任务形态：ship 交付被授权变更，scout 交付 <code>data/&lt;id&gt;/report.md</code> 知识报告且绝不 push；</li><li>scout 报告在 teardown 后保留，其 worktree 是 scratch，须待报告存在且 decision inventory 完成后才可丢弃；</li><li>intake 契约克制使用 scout：仅当 captain 明确要求知识交付物、或未决不确定性会实质改变建什么时才派；已有证据直接回答；</li><li>spawn 有两道硬门禁：真实且异于主 checkout 的 worktree root + base-freshness 对齐 origin 默认分支 tip；</li><li>独立可实施的变更立即并行、无并发上限；仅真语义依赖才串行；交付模式在 intake 定死并显式传递，命令拒绝猜测。</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>把下列请求分类为 ship 或 scout，并用 8.4 的 intake 契约写出理由：（a）&quot;查一下 CI 为什么最近变慢&quot;；（b）&quot;给设置页加暗色模式&quot;；（c）&quot;评估 Redis 和 Memcached 哪个更适合我们的缓存层，结论会影响架构选型&quot;。其中哪一个是&quot;既有证据可直接回答、不应派 scout&quot;的反例候选？说明你的判断依据。</li><li>手动模拟 base-freshness 门禁：在一个测试仓库的主 checkout 里制造一个落后于 origin/main 的 worktree（或在本地用 <code>git update-ref</code> 模拟过期 tip），观察 <code>fm-spawn.sh</code> 的拒绝行为；然后把 worktree fetch 到最新再试一次，对比两次结果并记录元数据差异。</li><li>设计一个三任务并行的委派方案：同一仓库上同时进行&quot;修 flaky 测试&quot;、&quot;补 API 文档&quot;、&quot;升级依赖 minor 版本&quot;。按 8.5 的并发规则逐项检查这三个任务是否满足&quot;独立实施 + 独立验证 + 交付路径可调和冲突&quot;，若有任务必须串行，指出具体的不安全条件（注意&quot;同文件编辑&quot;本身不算理由）。</li></ol></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("firstmate/ch08.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
