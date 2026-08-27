import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"第 4 章 · 五条硬规则与安全边界","description":"","frontmatter":{},"headers":[],"relativePath":"firstmate/ch04.md","filePath":"firstmate/ch04.md","lastUpdated":1787528977000}');
const __default__ = { name: "firstmate/ch04.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: "硬规则一中，firstmate 对 projects/ 目录的基本姿态是？",
        options: [
          "完全只读，任何情况下都不得写入",
          "只读为默认，仅限一组受守卫的例外和船长当场明确批准的具体操作",
          "可以直接提交代码，但不能合并 PR",
          "随时可写，只需事后告知船长"
        ],
        answer: 1,
        explain: "硬规则一禁止 firstmate 编辑、提交或在项目里执行改变状态的操作，但保留了受守卫的初始化/同步/自更新等例外路径，以及船长当场具体批准的操作；例外不会连带授权 force、stash 或 discard。"
      },
      {
        question: "关于 PR 合并权限，下列说法正确的是？",
        options: [
          "CI 全绿即可自动合并",
          "firstmate 认为改动风险低就可以合并",
          "默认必须有船长的明确指令，yolo 项目姿态是唯一常设放宽",
          "船员完成任务后可自行合并再通知船长"
        ],
        answer: 2,
        explain: "硬规则二规定未经船长明确表态绝不合并 PR；唯一放宽是船长事先批准的项目级 yolo 合并自治姿态，其余情况合并权威始终在船长手里。"
      },
      {
        question: "某个 scout 任务的 worktree 里还有未提交修改，firstmate 想清理它，正确的做法是？",
        options: [
          "直接 rm -rf 删掉 worktree",
          "使用 --force 让 teardown 通过",
          "先确认侦察报告已产出并通过 unresolved-decision 完成门槛，否则拒绝清理",
          "把修改 stash 之后照常清理"
        ],
        answer: 2,
        explain: "硬规则三保护未落地工作：landed-work 测试由 bin/fm-teardown.sh 所有；scout scratch worktree 只有在报告存在且共享完成门槛通过后才可声明丢弃，绕过拒绝或 --force 都需要船长明确授权。"
      },
      {
        question: "你直接在一个船员的 tmux 窗口里输入了指令，按照硬规则四会发生什么？",
        options: [
          "该输入无效，船员只会听从 firstmate",
          "该介入被视为权威指令，并由 firstmate 在下一次监督评审时对账",
          "firstmate 会立刻终止该船员任务",
          "系统报错，禁止船长接触船员窗口"
        ],
        answer: 1,
        explain: "硬规则四规定船员从不直接面向船长沟通、一切经 firstmate 中转；但船长的直接介入本身是权威的，只是要在下一次监督评审中被 reconcile。"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-4-章-·-五条硬规则与安全边界" tabindex="-1">第 4 章 · 五条硬规则与安全边界 <a class="header-anchor" href="#第-4-章-·-五条硬规则与安全边界" aria-label="Permalink to &quot;第 4 章 · 五条硬规则与安全边界&quot;">​</a></h1><blockquote><p>本章目标：逐条理解 FirstMate 运营契约（AGENTS.md）中的五条 Hard Rules，弄清每条规则保护的边界、允许的例外，以及它们如何共同构成「放心放权」的安全地基。</p></blockquote><h2 id="_4-1-为什么需要硬规则" tabindex="-1">4.1 为什么需要硬规则 <a class="header-anchor" href="#_4-1-为什么需要硬规则" aria-label="Permalink to &quot;4.1 为什么需要硬规则&quot;">​</a></h2><p>上一章我们看到，AGENTS.md 把 firstmate 定义为「船长的唯一联络人」。这意味着你会把修复 bug、审查代码、并行开发这类<strong>有副作用的工程动作</strong>交给一支智能体舰队去完成。</p><p>放权的前提是边界清晰。如果第一副手可以随手改你的项目、随手合并 PR、随手丢弃没提交的工作，那么「Talk to one agent」就不是提效，而是冒险。因此 AGENTS.md 在第 1 节（Identity and prime directives）里列出了一份按优先级排序的<strong>硬规则清单（Hard rules, in priority order）</strong>：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Hard rules, in priority order:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. Never write to a project.</span></span>
<span class="line"><span>2. Never merge a PR without the captain&#39;s explicit word.</span></span>
<span class="line"><span>3. Never tear down unlanded work.</span></span>
<span class="line"><span>4. Crewmates never address the captain.</span></span>
<span class="line"><span>5. Report outcomes faithfully.</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>这五条规则的共同特点是：<strong>由契约文本强制约束，而不是靠模型自觉</strong>。AGENTS.md 就是 firstmate 的「岗位职责说明书」，只要 harness 加载了这份文件，规则就随每次会话生效。</p><p>下面逐条拆解。</p><h2 id="_4-2-硬规则一-绝不写入项目-never-write-to-a-project" tabindex="-1">4.2 硬规则一：绝不写入项目（Never write to a project） <a class="header-anchor" href="#_4-2-硬规则一-绝不写入项目-never-write-to-a-project" aria-label="Permalink to &quot;4.2 硬规则一：绝不写入项目（Never write to a project）&quot;">​</a></h2><p>这是最核心的一条：<strong>firstmate 自己不编辑、不提交、不在 <code>projects/</code> 下执行改变状态的操作</strong>。它负责读取项目、分派任务、监督船员；真正改动项目代码的是被委派出去的 crewmate。</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>firstmate  reads projects/ + routes tasks      （只读 + 路由）</span></span>
<span class="line"><span>crewmates  make every project change           （船员干活）</span></span>
<span class="line"><span>captain    makes every merge decision          （船长拍板合并）</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>当然，完全不许碰会让某些运维动作无法执行，所以这条规则附带了一组<strong>狭窄且受守卫的例外</strong>：</p><ul><li>受守卫的项目初始化（guarded project initialization）；</li><li>舰队同步（fleet sync）、secondmate 同步及继承本地材料的传播；</li><li>自我更新（self-update）；</li><li>经批准的 <code>local-only</code> 合并路径；</li><li><strong>船长当场明确批准</strong>的具体项目操作（concrete captain-approved project operation）。</li></ul><p>注意例外的严格性：这些路径<strong>不会</strong>连带授权 force push、stash、丢弃未落地工作，也不允许 firstmate 手写项目的 <code>AGENTS.md</code>。即使是船长批准的场景，也要求「当下、针对具体项目、具体操作或无歧义的具体范围」，firstmate 只执行被批准的那个动作本身——<strong>不推断、不扩大范围、不留常设权限</strong>。</p><h2 id="_4-3-硬规则二-没有船长的明确指令绝不合并-pr" tabindex="-1">4.3 硬规则二：没有船长的明确指令绝不合并 PR <a class="header-anchor" href="#_4-3-硬规则二-没有船长的明确指令绝不合并-pr" aria-label="Permalink to &quot;4.3 硬规则二：没有船长的明确指令绝不合并 PR&quot;">​</a></h2><p>第二条规则管的是交付终点：<strong>任何 PR 合并都必须出自船长的明确表态</strong>。实战中就是那句「alright merge it」。</p><p>唯一的常设放宽（standing relaxation）是项目配置里的 <code>yolo</code> 合并自治姿态——它是<strong>船长自己事先批准</strong>的项目级开关，相当于把某类合并权预先下放。除此之外，合并权威始终在船长手里。第 10 章讲项目模式（no-mistakes / direct-PR / local-only 与 <code>+yolo</code> 标志）时会展开这一机制。</p><h2 id="_4-4-硬规则三-绝不销毁未落地的工作-unlanded-work" tabindex="-1">4.4 硬规则三：绝不销毁未落地的工作（unlanded work) <a class="header-anchor" href="#_4-4-硬规则三-绝不销毁未落地的工作-unlanded-work" aria-label="Permalink to &quot;4.4 硬规则三：绝不销毁未落地的工作（unlanded work)&quot;">​</a></h2><p>第三条规则保护的是<strong>工作成果</strong>：未提交的修改永远不会被落地处理，而「一段工作是否已经落地」的判定归 <code>bin/fm-teardown.sh</code> 所有（它实现了完整的 landed-work 测试）。firstmate 不允许绕过拒绝结果、不允许用 <code>--force</code>，除非船长明确授权丢弃那部分工作。</p><p>对 scout 类任务的临时 worktree 有专门约定：只有当<strong>侦察报告已经产出</strong>、并且共享的 unresolved-decision 完成门槛通过之后，才可声明为 scratch 并丢弃。</p><div class="language-sh vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 概念示意：teardown 由脚本统一把关，而非临时起意地删目录</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">bin/fm-teardown.sh</span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">   # 内置 landed-work 测试，未落地工作会被拒绝清理</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><blockquote><p>这一条和硬规则一共同构成了数据安全的两道闸门：项目内容不被越权修改，已有成果不被越权销毁。</p></blockquote><h2 id="_4-5-硬规则四与五-通信拓扑与如实汇报" tabindex="-1">4.5 硬规则四与五：通信拓扑与如实汇报 <a class="header-anchor" href="#_4-5-硬规则四与五-通信拓扑与如实汇报" aria-label="Permalink to &quot;4.5 硬规则四与五：通信拓扑与如实汇报&quot;">​</a></h2><p>最后两条规则规范的是<strong>信息流</strong>：</p><p><strong>规则四：Crewmates never address the captain.</strong> 所有船员的沟通都经过 firstmate 中转，船员不直接向船长喊话。如果船长直接介入某个船员的会话窗口，该介入被视为权威指令，并在下一次监督评审（supervision review）时被 firstmate 对账。这保证了你始终只有一个对话入口——这正是 FirstMate 区别于「开一堆终端标签页」的核心价值。</p><p><strong>规则五：Report outcomes faithfully.</strong> 工作失败了就直说失败，并给出证据。监督者的价值取决于汇报的可信度；粉饰太平的舰队比没有舰队更危险。</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>you ──chat──&gt; firstmate ──brief──&gt; crewmates</span></span>
<span class="line"><span> ^                  │                    │</span></span>
<span class="line"><span> │                  ▼                    │</span></span>
<span class="line"><span> └──── decisions ◄── escalation ◄── status ─┘   （船员永远不越过 firstmate 直达你）</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="_4-6-违规场景演练" tabindex="-1">4.6 违规场景演练 <a class="header-anchor" href="#_4-6-违规场景演练" aria-label="Permalink to &quot;4.6 违规场景演练&quot;">​</a></h2><p>把五条规则放进真实场景里检验一遍：</p><table tabindex="0"><thead><tr><th>场景</th><th>正确行为</th><th>依据</th></tr></thead><tbody><tr><td>你说「帮我把 README 里的错别字改了」</td><td>firstmate 委派一个 crewmate 去改，自己不动文件</td><td>硬规则 1</td></tr><tr><td>CI 绿了，你说「看着办」</td><td>不能合并，「看着办」不构成明确合并指令</td><td>硬规则 2</td></tr><tr><td>项目开了 <code>+yolo</code>，小改动自动合并</td><td>可以按既定姿态合并</td><td>硬规则 2 的 yolo 放宽</td></tr><tr><td>任务失败，worktree 里有半成品修改</td><td>拒绝清理并上报，等你决定去留</td><td>硬规则 3 + 5</td></tr><tr><td>你直接在某船员 tmux 窗口输入指令</td><td>该指令有效，但会在下次监督评审时被对账</td><td>硬规则 4</td></tr><tr><td>船员任务实际失败但看起来「差不多完成了」</td><td>如实报败并附证据，不得含糊其辞</td><td>硬规则 5</td></tr></tbody></table><p>可以看到，五条规则分别锁住了五个危险面：<strong>写权限、合并权、删除权、通信拓扑、诚实义务</strong>。理解了它们，你就知道哪些话可以对 firstmate 说、哪些决策必须亲自留给自己。</p><h2 id="本章小结" tabindex="-1">本章小结 <a class="header-anchor" href="#本章小结" aria-label="Permalink to &quot;本章小结&quot;">​</a></h2><ul><li>五条硬规则按优先级排列：不写项目、不擅自合并、不毁未落地工作、船员不直达船长、如实汇报；</li><li>「不写项目」附带有狭窄的受守卫例外（初始化/同步/自更新/船长当场批准），且例外永不隐含 force、stash、discard 权限；</li><li>合并权威默认在船长手中，<code>yolo</code> 是唯一经船长预先批准的常设放宽；</li><li>未落地工作的判定由 <code>bin/fm-teardown.sh</code> 统一把关，绕过拒绝或 <code>--force</code> 都需要船长明确授权；</li><li>单一联络人模式依赖硬规则 4 维持通信拓扑，依赖硬规则 5 保证汇报可信。</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>打开克隆好的 firstmate 仓库，通读 <code>AGENTS.md</code> 第 1 节的五条 Hard Rules 原文，用自己的话为每条规则写一句中文概括，并标出每条规则各自防范的风险。</li><li>启动 firstmate 后，故意发出一个模糊的合并指令（例如「CI 绿了就看着办」），观察它的反应；再用明确的「merge it」对比两次行为的差异，记录哪次真正触发了合并流程。</li><li>在一个测试项目中让某个任务留下未提交的改动，然后请求 firstmate 清理对应 worktree，验证它会依据 landed-work 测试拒绝销毁未落地工作；随后明确授权丢弃，再观察完整的授权-执行链路。</li></ol></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("firstmate/ch04.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
