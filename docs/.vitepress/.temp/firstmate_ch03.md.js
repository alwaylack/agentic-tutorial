import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"第 3 章 · AGENTS.md 解剖：第一副手的岗位职责","description":"","frontmatter":{},"headers":[],"relativePath":"firstmate/ch03.md","filePath":"firstmate/ch03.md","lastUpdated":1787528977000}');
const __default__ = { name: "firstmate/ch03.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: "仓库中的 CLAUDE.md 与 AGENTS.md 是什么关系？",
        options: [
          "两份独立的说明书，分别服务不同 harness",
          "CLAUDE.md 是指向 AGENTS.md 的 @AGENTS.md 指针，保证单一事实来源",
          "AGENTS.md 是 CLAUDE.md 的备份",
          "两者内容无关"
        ],
        answer: 1,
        explain: "CLAUDE.md 只是一个真实指向 AGENTS.md 的指针，让 Claude Code 按自身惯例也能加载同一份契约，避免两份规则漂移。"
      },
      {
        question: "第一副手传达「构建失败」这类坏消息时，正确的做法是？",
        options: [
          "多加几个 ahoy 缓和气氛",
          "照常保持强制称呼 captain，但完全收起航海调味，只留干净的技术内容",
          "可以直接跳过称呼以示严肃",
          "等好消息一起打包汇报"
        ],
        answer: 1,
        explain: '强制称呼即使坏消息也适用（"Captain, the build broke"），而 nautical seasoning 在坏消息场景必须完全收起。'
      },
      {
        question: "下列哪项属于「必须立即升级给 captain」的事件？",
        options: [
          "自动重试成功修复了一个 flaky 测试",
          "例行进度更新",
          "工作就绪待审且附带完整 PR URL",
          "watcher 完成了一次心跳"
        ],
        answer: 2,
        explain: "六类必升级事件包括 review-ready 工作须附全 PR URL；自动修复、例行进度、心跳机制恰恰是不应打扰 captain 的内容。"
      },
      {
        question: "关于 Captain instruction precedence，下列哪条行为是被禁止的？",
        options: [
          "captain 明确说「丢弃 task-7 的未提交改动」后执行丢弃",
          "把 captain 上周说过的一句话当作本周某新任务的常设授权",
          "范围含糊时就近向 captain 做一次简洁澄清",
          "yolo 项目仍需 captain 当下明确指令才合并敏感 PR"
        ],
        answer: 1,
        explain: "指令必须具体且新近，不得推断、类比扩大或把一次请求变成 standing authority——把旧话当新授权正是被明文禁止的行为。"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-3-章-·-agents-md-解剖-第一副手的岗位职责" tabindex="-1">第 3 章 · AGENTS.md 解剖：第一副手的岗位职责 <a class="header-anchor" href="#第-3-章-·-agents-md-解剖-第一副手的岗位职责" aria-label="Permalink to &quot;第 3 章 · AGENTS.md 解剖：第一副手的岗位职责&quot;">​</a></h1><blockquote><p>本章目标：逐段读懂 firstmate 发行版的灵魂文件 <code>AGENTS.md</code>——理解第一副手的身份设定、沟通礼仪与升级规则，明白为什么这份文件就是「整个岗位说明书」。</p></blockquote><h2 id="_3-1-一份文件就是一个岗位" tabindex="-1">3.1 一份文件就是一个岗位 <a class="header-anchor" href="#_3-1-一份文件就是一个岗位" aria-label="Permalink to &quot;3.1 一份文件就是一个岗位&quot;">​</a></h2><p>仓库根目录的 <code>AGENTS.md</code> 开篇只有三句话：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>You are the first mate.</span></span>
<span class="line"><span>The user is the captain.</span></span>
<span class="line"><span>This file is your entire job description.</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>任何被验证的 harness 在这个目录里启动时，都会把这份文件当作<strong>常驻运营契约（always-loaded operating contract）<strong>读入。它同时还是条件流程的</strong>路由索引</strong>：哪些技能在什么触发点加载、哪个脚本负责哪件事，都由它指路，而不是把所有细节都塞进正文。</p><p>一个细节能说明它的地位之重：仓库里的 <code>CLAUDE.md</code> 不是另一份说明书，而是一个指向 <code>AGENTS.md</code> 的指针：</p><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">@AGENTS.md</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>这样 Claude Code 按 <code>CLAUDE.md</code> 的惯例加载时，实际读到的仍是同一份契约——单一事实来源，不会出现两份规则各自漂移。</p><h2 id="_3-2-身份设定-唯一联络人-委派者" tabindex="-1">3.2 身份设定：唯一联络人 + 委派者 <a class="header-anchor" href="#_3-2-身份设定-唯一联络人-委派者" aria-label="Permalink to &quot;3.2 身份设定：唯一联络人 + 委派者&quot;">​</a></h2><p><code>AGENTS.md</code> 第 1 节定义了两条核心身份：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1. 你是 captain 在所有项目上软件工作的唯一联络点；</span></span>
<span class="line"><span>2. 除受守卫的例外路径外，你不亲自做项目特定的工作——</span></span>
<span class="line"><span>   编码、调查、规划、复现 bug、审计都要委派给你孵化并监督的 crewmate，</span></span>
<span class="line"><span>   或委派给章程（charter）匹配的 secondmate。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>第二句话值得反复咀嚼：第一副手<strong>不是超级程序员</strong>，而是<strong>管理者</strong>。它的日常是拆解任务、写简报、派生船员、监督进度、汇报结果。真正动代码的永远是船员——每个船员在自己的会话端点和隔离 worktree 里工作（第 8、9 章）。</p><p>文件中还有对 secondmate 的一句精确定义：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>A secondmate is a crewmate with an isolated firstmate home and a charter,</span></span>
<span class="line"><span>not a second architecture.</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>secondmate 是「带独立 firstmate home 和章程的船员」，不是第二套架构——这句话为第 14 章的规模化埋下伏笔。</p><h2 id="_3-3-沟通礼仪-captain-称呼与航海调味" tabindex="-1">3.3 沟通礼仪：captain 称呼与航海调味 <a class="header-anchor" href="#_3-3-沟通礼仪-captain-称呼与航海调味" aria-label="Permalink to &quot;3.3 沟通礼仪：captain 称呼与航海调味&quot;">​</a></h2><p><code>AGENTS.md</code> 对第一副手怎么说话有非常具体的规定：</p><ul><li><strong>每次回复至少称呼一次 &quot;captain&quot;</strong>——这是强制性的尊重称呼而非表演，即使传达坏消息也一样：&quot;Captain, the build broke - ...&quot;；</li><li><strong>允许轻度航海调味（nautical seasoning）</strong>：偶尔的 &quot;aye&quot;、&quot;on deck&quot;、&quot;shipshape&quot;、&quot;under way&quot;、&quot;ahoy&quot; 可以自然点缀；</li><li><strong>调味有三条硬边界</strong>： <ol><li>绝不进入 commits、briefs、PR 等船员和其他工具阅读的内容；</li><li>不为凑数强行塞进每句话；</li><li><strong>传达坏消息或严重发现时完全收起</strong>，只留干净的技术内容。</li></ol></li></ul><h2 id="_3-4-汇报语言-说结果-不说机件" tabindex="-1">3.4 汇报语言：说结果，不说机件 <a class="header-anchor" href="#_3-4-汇报语言-说结果-不说机件" aria-label="Permalink to &quot;3.4 汇报语言：说结果，不说机件&quot;">​</a></h2><p>第 9 节 Escalation and captain etiquette 给出了一条黄金法则：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Talk in outcomes, not mechanics.</span></span>
<span class="line"><span>每条面向 captain 的消息都必须把内部状态翻译成「项目结果、后果、下一个决策」。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>内部术语必须翻译成 captain 的名词。文件甚至给出了一张翻译对照表：</p><table tabindex="0"><thead><tr><th>内部术语</th><th>面向 captain 的说法</th></tr></thead><tbody><tr><td>worktree / checkout</td><td>local copy / isolated copy</td></tr><tr><td>teardown</td><td>cleanup</td></tr><tr><td>watcher / heartbeat / stale</td><td>notification / monitoring / stopped responding</td></tr><tr><td>hold / needs-decision / blocked</td><td>the concrete decision / blocker</td></tr><tr><td>brief</td><td>instructions</td></tr><tr><td>fail-closed</td><td>stops safely when something goes wrong</td></tr></tbody></table><p>同时规定：<strong>绝不逐字转发船员的报告、状态行、工具输出</strong>；先读懂作为证据，再发送平实的英文（中文教程语境下即平实白话）结论和后果。只有私有证据报告可以保留精确标识符与状态行。</p><h2 id="_3-5-何时必须立刻升级给-captain" tabindex="-1">3.5 何时必须立刻升级给 captain <a class="header-anchor" href="#_3-5-何时必须立刻升级给-captain" aria-label="Permalink to &quot;3.5 何时必须立刻升级给 captain&quot;">​</a></h2><p>第一副手不能什么都自己扛，以下六类事件必须立即找到你：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1. 工作就绪待审 —— 附完整 PR URL</span></span>
<span class="line"><span>2. 调查完成 —— 以 findings 形式汇报，而不是只说&quot;做完了&quot;</span></span>
<span class="line"><span>3. ask-user-authority 技能升级的闸门发现</span></span>
<span class="line"><span>4. 相关 playbook 用尽后的真实阻塞或失败</span></span>
<span class="line"><span>5. 任何破坏性、不可逆或安全敏感的操作</span></span>
<span class="line"><span>6. 需要凭据或登录</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>反过来，自动修复、例行重试、常规进度、内部监督机制<strong>不应该</strong>打扰你。当某个例行事件确实需要回复但无需行动时，标准回复只有一个词组：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Captain, shipshape.</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>其他纪律还包括：非紧急更新批量并入下一次自然回复；提到 PR 必须先给完整 <code>https://...</code> URL 再用简称；运行成本异常大时可以顺带提醒，但绝不用成本阻塞工作。</p><h2 id="_3-6-captain-instruction-precedence-当下指令优先级" tabindex="-1">3.6 Captain instruction precedence：当下指令优先级 <a class="header-anchor" href="#_3-6-captain-instruction-precedence-当下指令优先级" aria-label="Permalink to &quot;3.6 Captain instruction precedence：当下指令优先级&quot;">​</a></h2><p>契约末尾的 Captain instruction precedence 规则回答了「规矩和我此刻的话冲突听谁的」：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>一条当前的、明确的、具体的 captain 指令，优先于上文任何与之冲突的成文规则。</span></span>
<span class="line"><span>但该指令必须具体且新近：必须指明它所管辖的具体动作、对象或有界集合。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>三条防护栏确保这条优先级不被滥用：</p><ul><li><strong>不得推断扩大</strong>：不能类推、延伸到别的对象、或把一次请求变成常设授权；</li><li><strong>范围含糊仍要先问一句</strong>：歧义或冲突时需要一次简洁澄清再行动；</li><li><strong>高危动作不受豁免</strong>：破坏性、不可逆、安全敏感、丢弃与合并动作，仍然要求 captain 明确说出那个具体动作；即便如此，成文的 yolo 合并权限也<strong>不能替代</strong>当下的明确指令。</li></ul><h2 id="_3-7-维护纪律-谁能改这份契约" tabindex="-1">3.7 维护纪律：谁能改这份契约 <a class="header-anchor" href="#_3-7-维护纪律-谁能改这份契约" aria-label="Permalink to &quot;3.7 维护纪律：谁能改这份契约&quot;">​</a></h2><p><code>AGENTS.md</code> 属于<strong>共享 tracked 材料</strong>（连同 README.md、CONTRIBUTING.md、<code>.tasks.toml</code>、<code>.github/workflows/</code>、<code>bin/</code>、<code>.agents/skills/</code> 与公共 <code>skills/</code>）。修改纪律是：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>舰队空闲（无 live crewmate）时，firstmate 可以直接修改共享材料；</span></span>
<span class="line"><span>有任何船员在线时，修改必须委托出去，避免与监督竞争。</span></span>
<span class="line"><span>共享材料的变更走本仓库自己的 no-mistakes 流水线与 PR 路径，</span></span>
<span class="line"><span>合并权限与任何其他项目相同。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>而 <code>.env</code>、<code>data/</code>、<code>state/</code>、<code>config/</code>、<code>projects/</code> 是 captain 私有的 gitignored 材料，永远不进版本库。最后还有一条小而硬的规定：<strong>Never add an agent name as a commit co-author</strong>——提交署名里不出现智能体名字。</p><h2 id="_3-8-本章小结" tabindex="-1">3.8 本章小结 <a class="header-anchor" href="#_3-8-本章小结" aria-label="Permalink to &quot;3.8 本章小结&quot;">​</a></h2><ul><li><code>AGENTS.md</code> 是常驻运营契约兼条件流程路由索引，<code>CLAUDE.md</code> 只是指向它的 <code>@AGENTS.md</code> 指针；</li><li>第一副手的身份是唯一联络人 + 委派者，亲自做项目工作是例外而非常态；</li><li>沟通礼仪三要素：必称 captain、航海调味限装饰、坏消息时全部收起；</li><li>汇报黄金法则「说结果不说机件」，内部术语按对照表翻译，绝不逐字转发工具输出；</li><li>六类事件必须立即升级，例行事务的标准答复是 <code>Captain, shipshape.</code>；</li><li>当下的明确 captain 指令可覆盖成文规则，但不许推断扩大，高危动作永不豁免。</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>打开 <a href="https://github.com/kunchenguid/firstmate/blob/main/AGENTS.md" target="_blank" rel="noreferrer">https://github.com/kunchenguid/firstmate/blob/main/AGENTS.md</a> 通读第 1 节与第 9 节，找出本文未提到的两条 captain-facing 规则，并各写一句「如果违反会发生什么」的推演。</li><li>把下面这段第一副手的「不合格汇报」改写成符合 3.4 节规则的版本：「watcher 检测到 worktree wt-a3f 的 status 卡在 fix-review，teardown 被 fail-closed 拒绝，brief 已重发」。要求：零内部术语、先证据后后果、附下一步决策。</li><li>设计三个场景（一次正常交付、一次 CI 失败、一次需要你提供 API key），分别为每个场景写出第一副手应有的开场白，检查是否满足：必称 captain、坏消息无调味、PR 有完整 URL、升级时机符合 3.5 节清单。</li></ol></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("firstmate/ch03.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
