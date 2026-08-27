import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"第 7 章 · 多轮会话与上下文管理","description":"","frontmatter":{},"headers":[],"relativePath":"claude-code/ch07.md","filePath":"claude-code/ch07.md","lastUpdated":1787480284000}');
const __default__ = { name: "claude-code/ch07.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: "claude -c 和 claude --resume 的区别是什么？",
        options: [
          "没有区别，完全等价",
          "-c 恢复最近一次会话，--resume 显示会话列表供选择",
          "-c 创建新会话，--resume 恢复旧会话",
          "-c 只能用于同一目录，--resume 可以跨目录"
        ],
        answer: 1,
        explain: "-c 是 continue 的简写，直接恢复最近一次会话；--resume 不带参数时会列出所有历史会话供用户选择。"
      },
      {
        question: "什么是 compaction？",
        options: [
          "删除旧的对话记录以节省磁盘空间",
          "将早期对话压缩为结构化摘要以释放上下文空间",
          "把代码文件压缩成 zip 归档",
          "将长函数重构为短函数"
        ],
        answer: 1,
        explain: "compaction 是 Claude Code 在上下文接近上限时的自动策略——把早期消息摘要化、保留近期内容和当前任务状态，从而腾出空间继续工作。"
      },
      {
        question: "为什么推荐用 PROGRESS.md 外化任务状态而不是依赖对话记忆？",
        options: [
          "PROGRESS.md 可以分享给团队成员",
          "对话会被 compaction 压缩导致细节丢失，而文件内容始终可读",
          "Markdown 文件加载速度更快",
          "Claude 更喜欢读文件"
        ],
        answer: 1,
        explain: "compaction 只保留摘要，具体细节（如精确的接口签名、特定的配置值）可能被省略。写入磁盘的文件不受 compaction 影响。"
      },
      {
        question: "以下哪种做法最能降低长任务的上下文成本？",
        options: [
          "在一个会话里连续工作 8 小时不间断",
          "把大任务拆成多个小任务，每个用独立会话完成",
          "频繁使用 /compact 命令",
          "减少 CLAUDE.md 的长度"
        ],
        answer: 1,
        explain: "每个新会话从干净的上下文开始，只携带必要的 CLAUDE.md 信息。相比之下，一个持续数小时的单会话会不断累积 token 导致成本上升和性能下降。"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-7-章-·-多轮会话与上下文管理" tabindex="-1">第 7 章 · 多轮会话与上下文管理 <a class="header-anchor" href="#第-7-章-·-多轮会话与上下文管理" aria-label="Permalink to &quot;第 7 章 · 多轮会话与上下文管理&quot;">​</a></h1><blockquote><p>本章目标：掌握 Claude Code 的会话持久化机制，理解上下文窗口限制与 compaction 策略，学会用 --continue/--resume 恢复历史对话，并制定长任务的上下文管理策略。</p></blockquote><h2 id="_7-1-会话的生命周期" tabindex="-1">7.1 会话的生命周期 <a class="header-anchor" href="#_7-1-会话的生命周期" aria-label="Permalink to &quot;7.1 会话的生命周期&quot;">​</a></h2><p>Claude Code 中每次交互都是一个<strong>会话（session）</strong>。理解其生命周期是高效使用的前提：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>新会话启动</span></span>
<span class="line"><span>   │</span></span>
<span class="line"><span>   ├── 加载 CLAUDE.md → 注入项目上下文</span></span>
<span class="line"><span>   ├── 加载 settings.json → 应用权限规则</span></span>
<span class="line"><span>   ├── 扫描目录结构 → 建立代码地图</span></span>
<span class="line"><span>   │</span></span>
<span class="line"><span>   ▼</span></span>
<span class="line"><span>用户输入 ──→ Claude 思考 ──→ 工具调用 ──→ 结果反馈</span></span>
<span class="line"><span>   │                                          │</span></span>
<span class="line"><span>   │         （循环直到任务完成）                 │</span></span>
<span class="line"><span>   │                                          │</span></span>
<span class="line"><span>   ▼                                          ▼</span></span>
<span class="line"><span>用户继续对话                          会话结束（自动保存）</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>每个会话自动保存到本地 <code>~/.claude/projects/</code> 目录，即使终端关闭也能恢复。</p><h2 id="_7-2-continue-与-resume" tabindex="-1">7.2 --continue 与 --resume <a class="header-anchor" href="#_7-2-continue-与-resume" aria-label="Permalink to &quot;7.2 --continue 与 --resume&quot;">​</a></h2><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 方式一：--continue 继续最近一次会话</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">claude</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> --continue</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 简写 -c</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">claude</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> -c</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 在恢复的会话中追加新指令</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">claude</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> --continue</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> &quot;刚才那个 bug 修好了吗？&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 方式二：--resume 从列表中选择特定历史会话</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">claude</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> --resume</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 直接恢复指定会话 ID</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">claude</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> --resume</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}"> &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">session-i</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">d</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><table tabindex="0"><thead><tr><th>参数</th><th>行为</th></tr></thead><tbody><tr><td><code>-c</code> / <code>--continue</code></td><td>无参数时打开最近的会话</td></tr><tr><td><code>-c &quot;指令&quot;</code></td><td>打开最近会话并立即执行新指令</td></tr><tr><td><code>-r</code> / <code>--resume</code></td><td>显示会话列表供选择</td></tr><tr><td><code>-r &lt;id&gt;</code></td><td>恢复指定 ID 的会话</td></tr></tbody></table><div class="tip custom-block"><p class="custom-block-title">使用场景</p><ul><li><strong>跨天工作</strong>：昨天下班前做到一半，今天 <code>claude -c</code> 继续；</li><li><strong>多任务切换</strong>：用 <code>--resume</code> 在多个项目的会话间切换；</li><li><strong>代码审查回溯</strong>：<code>--resume</code> 找到之前的讨论记录。</li></ul></div><h2 id="_7-3-上下文窗口与-compaction" tabindex="-1">7.3 上下文窗口与 Compaction <a class="header-anchor" href="#_7-3-上下文窗口与-compaction" aria-label="Permalink to &quot;7.3 上下文窗口与 Compaction&quot;">​</a></h2><p>Claude 的上下文窗口有限（约 200K token）。长对话中，当接近上限时会触发 <strong>compaction（压缩）</strong>：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>上下文使用率</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>│ ████████████████████████░░░░░░░░░░ 75% ← 正常工作区</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>│ ██████████████████████████████░░░░ 90% ← 开始 compaction</span></span>
<span class="line"><span>│    ↑</span></span>
<span class="line"><span>│    Claude 自动将早期对话摘要化，</span></span>
<span class="line"><span>│    保留关键决策和当前状态，</span></span>
<span class="line"><span>│    释放空间给后续操作。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>Compaction 的行为：</p><ol><li>将早期消息压缩为<strong>结构化摘要</strong>；</li><li>保留最近的消息原文；</li><li>维护一个&quot;当前任务状态&quot;快照。</li></ol><h3 id="手动触发压缩" tabindex="-1">手动触发压缩 <a class="header-anchor" href="#手动触发压缩" aria-label="Permalink to &quot;手动触发压缩&quot;">​</a></h3><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 在交互模式中使用命令</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">&gt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> /compact</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 带自定义摘要重点</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">&gt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> /compact 重点保留：数据库 schema 变更、API 接口设计决策、未完成的 TODO 列表</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="_7-4-长对话策略" tabindex="-1">7.4 长对话策略 <a class="header-anchor" href="#_7-4-长对话策略" aria-label="Permalink to &quot;7.4 长对话策略&quot;">​</a></h2><p>对于跨越多天的复杂任务，单靠 compaction 不够。推荐以下策略：</p><h3 id="策略一-进度文件外化" tabindex="-1">策略一：进度文件外化 <a class="header-anchor" href="#策略一-进度文件外化" aria-label="Permalink to &quot;策略一：进度文件外化&quot;">​</a></h3><p>让 Claude 把关键信息写到磁盘文件，而非依赖对话记忆：</p><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">&lt;!-- PROGRESS.md --&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}"># 任务进度</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## 已完成</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> [</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-light-text-decoration": "underline", "--shiki-dark": "#DBEDFF", "--shiki-dark-text-decoration": "underline" })}">x</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">] 数据库 schema 设计（见 docs/schema.md）</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> [</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-light-text-decoration": "underline", "--shiki-dark": "#DBEDFF", "--shiki-dark-text-decoration": "underline" })}">x</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">] 用户认证模块（commit abc123）</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## 进行中</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> [ ] 订单 API：已完成 CRUD，待添加支付回调</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## 决策记录</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> ORM 选择 SQLAlchemy 2.0（团队投票）</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 不引入 Redis 缓存（当前流量不需要）</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>在 CLAUDE.md 中约定：</p><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## 工作流约定</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">每次会话开始时读取 PROGRESS.md 了解当前状态。</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">每次会话结束前更新 PROGRESS.md。</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">重要架构决策写入 DECISIONS.md 并附上理由。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="策略二-任务拆分与会话隔离" tabindex="-1">策略二：任务拆分与会话隔离 <a class="header-anchor" href="#策略二-任务拆分与会话隔离" aria-label="Permalink to &quot;策略二：任务拆分与会话隔离&quot;">​</a></h3><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 不要在一个会话里做所有事</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># ❌ claude &quot;重构整个项目&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># ✅ 拆成独立会话</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">claude</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> -p</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> &quot;分析 auth 模块的测试覆盖率&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">claude</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> -p</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> &quot;为 utils/date.py 编写单元测试&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">claude</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> -p</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> &quot;修复 issue #42 提到的内存泄漏&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>每个小任务一个会话，避免上下文膨胀导致的性能下降。</p><h3 id="策略三-利用-git-作为状态锚点" tabindex="-1">策略三：利用 Git 作为状态锚点 <a class="header-anchor" href="#策略三-利用-git-作为状态锚点" aria-label="Permalink to &quot;策略三：利用 Git 作为状态锚点&quot;">​</a></h3><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 让 Claude 在关键节点提交</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">&gt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 请 commit 当前进度，message 写 </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;WIP: 用户认证模块完成 80%&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Git commit 是最可靠的&quot;检查点&quot;——即使会话丢失，代码状态也不会丢。</p><h2 id="_7-5-诊断上下文问题" tabindex="-1">7.5 诊断上下文问题 <a class="header-anchor" href="#_7-5-诊断上下文问题" aria-label="Permalink to &quot;7.5 诊断上下文问题&quot;">​</a></h2><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 查看当前上下文使用量</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">&gt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> /cost</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 输出示例：</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># Total cost: $0.45</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># Context used: 45,230 / 200,000 tokens (22.6%)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>常见问题与对策：</p><table tabindex="0"><thead><tr><th>症状</th><th>原因</th><th>解决方案</th></tr></thead><tbody><tr><td>回复变慢</td><td>上下文过大</td><td><code>/compact</code> 或开新会话</td></tr><tr><td>忘记之前的决定</td><td>compaction 丢失细节</td><td>用进度文件外化</td></tr><tr><td>重复做已做的事</td><td>新会话无记忆</td><td>CLAUDE.md + PROGRESS.md</td></tr><tr><td>成本飙升</td><td>长对话累积 token</td><td>定期开新会话</td></tr></tbody></table><h2 id="本章小结" tabindex="-1">本章小结 <a class="header-anchor" href="#本章小结" aria-label="Permalink to &quot;本章小结&quot;">​</a></h2><ul><li><code>claude -c</code> 快速恢复上次对话，<code>--resume</code> 从列表选择；</li><li>Compaction 自动压缩早期对话，保留近期内容与任务快照；</li><li>复杂任务用 PROGRESS.md + DECISIONS.md 外化关键信息；</li><li>小任务拆成独立会话比一个超长对话更高效；</li><li>Git commit 是最可靠的进度锚点。</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>用 <code>claude -c</code> 恢复昨天的一次对话，让它总结上次做了什么。</li><li>创建一个 PROGRESS.md 文件，并在 CLAUDE.md 中约定读写规则，观察跨会话效果。</li><li>对同一个任务分别用单次长会话和三次短会话完成，对比 <code>/cost</code> 输出的费用差异。</li></ol><blockquote><p>完成练习后，进入<a href="./ch08.html">下一章：Git 集成与代码审查</a>。</p></blockquote></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("claude-code/ch07.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
