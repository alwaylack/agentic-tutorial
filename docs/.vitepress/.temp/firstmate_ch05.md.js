import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"第 5 章 · 运行时布局：FM_HOME 与目录约定","description":"","frontmatter":{},"headers":[],"relativePath":"firstmate/ch05.md","filePath":"firstmate/ch05.md","lastUpdated":1787528977000}');
const __default__ = { name: "firstmate/ch05.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: "当 FM_HOME 被显式设置后，脚本的运行方式是？",
        options: [
          "脚本从 $FM_HOME/bin/ 运行，所有状态也在那里",
          "脚本仍从 firstmate 仓库的 bin/ 运行，但 state/、data/、config/、projects/ 来自 $FM_HOME",
          "只有 projects/ 来自 $FM_HOME，其余仍在仓库内",
          "FM_HOME 只影响日志输出位置"
        ],
        answer: 1,
        explain: "官方文档明确：设置了 FM_HOME 后脚本继续来自 tracked 代码根的 bin/，而 state/、data/、config/、projects/ 这四个私有运营目录改从 $FM_HOME 取。"
      },
      {
        question: "下列哪个内容属于 data/ 目录而不是 state/ 目录？",
        options: [
          "append-only 的任务状态事件",
          "watcher 与唤醒队列的协调文件",
          "项目注册表与 scout 侦察报告",
          "inactive terminal-outcome 回执"
        ],
        answer: 2,
        explain: "data/ 存放持久的舰队档案：项目和 secondmate 注册表、船长偏好、learnings、backlog、briefs、scout 报告；状态事件、唤醒队列、terminal-outcomes 回执都属于运行时的 state/。"
      },
      {
        question: "为什么 bin/fm-send.sh 要求显式设置 FM_HOME？",
        options: [
          "为了节省磁盘空间",
          "为了让 steer 永远不会静默解析到错误的家（fails closed）",
          "因为 tmux 后端的硬性要求",
          "为了强制每次都重新登录"
        ],
        answer: 1,
        explain: "多实例并存时最大风险是指令落到错误的家；fm-send.sh 刻意比一般脚本严格，缺少显式 FM_HOME 时直接失败而非回退到仓库根目录。"
      },
      {
        question: "下列哪一组全部属于船长私有的 gitignored 材料？",
        options: [
          "AGENTS.md、README.md、bin/",
          ".env、data/、state/、config/、projects/",
          ".agents/skills/、skills/、.github/workflows/",
          ".tasks.toml、CONTRIBUTING.md、LICENSE"
        ],
        answer: 1,
        explain: ".env、data/、state/、config/、projects/ 以及 .no-mistakes/ 都是 gitignored 的私有材料；其余选项中的文件都是随发行版提交的共享 tracked 材料。"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-5-章-·-运行时布局-fm-home-与目录约定" tabindex="-1">第 5 章 · 运行时布局：FM_HOME 与目录约定 <a class="header-anchor" href="#第-5-章-·-运行时布局-fm-home-与目录约定" aria-label="Permalink to &quot;第 5 章 · 运行时布局：FM_HOME 与目录约定&quot;">​</a></h1><blockquote><p>本章目标：掌握 FM_HOME 机制与 <code>data/</code>、<code>state/</code>、<code>config/</code>、<code>projects/</code> 四大私有目录的职责分工，理解 tracked 共享材料与 gitignored 私有材料的边界，学会安全地运行多个 firstmate 实例。</p></blockquote><h2 id="_5-1-一个实例一个家-fm-home-是什么" tabindex="-1">5.1 一个实例一个家：FM_HOME 是什么 <a class="header-anchor" href="#_5-1-一个实例一个家-fm-home-是什么" aria-label="Permalink to &quot;5.1 一个实例一个家：FM_HOME 是什么&quot;">​</a></h2><p>FirstMate 的代码仓库本身是「发行版（distro）」，但每个运行中的 firstmate 实例都需要自己的**运营之家（operational home）**来存放私有状态。<code>FM_HOME</code> 环境变量就是这个家的地址：</p><ul><li><strong>未设置时</strong>：大多数脚本直接把仓库根目录当作 home；</li><li><strong>设置后</strong>：脚本仍然从本仓库的 <code>bin/</code> 运行，但 <code>state/</code>、<code>data/</code>、<code>config/</code>、<code>projects/</code> 全部改从 <code>$FM_HOME</code> 读取。</li></ul><p>这个设计让「代码」和「状态」彻底分离：你可以随时 <code>git pull</code> 更新发行版，而不会碰任何一个实例的舰队记录。</p><div class="language-sh vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 未设置：仓库根目录就是家</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">cd</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> firstmate</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> &amp;&amp; </span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">claude</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 设置后：状态全部落在 ~/fm-homes/main，代码仍在原地</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">FM_HOME</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">~/fm-homes/main</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> claude</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>此外还有两个配套变量：<code>FM_ROOT_OVERRIDE</code> 可以替换脚本使用的 firstmate 仓库根目录；<code>FM_STATE_OVERRIDE</code>、<code>FM_DATA_OVERRIDE</code>、<code>FM_PROJECTS_OVERRIDE</code>、<code>FM_CONFIG_OVERRIDE</code> 则可以单独覆盖某一个运营目录——主要用于测试和特殊 harness 环境。</p><h2 id="_5-2-四大私有目录的职责分工" tabindex="-1">5.2 四大私有目录的职责分工 <a class="header-anchor" href="#_5-2-四大私有目录的职责分工" aria-label="Permalink to &quot;5.2 四大私有目录的职责分工&quot;">​</a></h2><p>configuration.md 是顶层布局的唯一权威定义。四个目录各司其职：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$FM_HOME/</span></span>
<span class="line"><span>├── data/       持久舰队档案：项目与 secondmate 注册表、船长偏好、learnings、</span></span>
<span class="line"><span>│               backlog、任务简报、scout 报告</span></span>
<span class="line"><span>├── state/      运行时记录：任务元数据、append-only 状态事件、endpoint 信号、</span></span>
<span class="line"><span>│               watcher 与唤醒队列协调、terminal-outcomes 回执、away-mode 状态、</span></span>
<span class="line"><span>│               Relay 生成的工件、secondmate 待回复记录等</span></span>
<span class="line"><span>├── config/     本地运营选择（gitignored）：后端选择、harness 覆盖等</span></span>
<span class="line"><span>└── projects/   本地项目克隆；firstmate 只读，</span></span>
<span class="line"><span>                改动只通过硬规则一的受守卫例外发生</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>记忆方法是<strong>按生命周期分层</strong>：<code>data/</code> 是要长期保留的「档案室」，<code>state/</code> 是随时在变的「值班日志」，<code>config/</code> 是你的「操作偏好面板」，<code>projects/</code> 则是借来阅读的「项目书架」。</p><p>scout 任务的产出就落在 data 下，例如某次侦察的报告位于 <code>data/&lt;id&gt;/report.md</code>——这解释了为什么 scout 不产 PR 却依然可追溯。</p><h2 id="_5-3-tracked-共享材料-vs-gitignored-私有材料" tabindex="-1">5.3 tracked 共享材料 vs gitignored 私有材料 <a class="header-anchor" href="#_5-3-tracked-共享材料-vs-gitignored-私有材料" aria-label="Permalink to &quot;5.3 tracked 共享材料 vs gitignored 私有材料&quot;">​</a></h2><p>AGENTS.md 把仓库内容划成泾渭分明的两类。<strong>共享 tracked 材料</strong>是发行版的一部分，随 git 提交与更新：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>AGENTS.md / README.md / CONTRIBUTING.md   运营契约与文档</span></span>
<span class="line"><span>.tasks.toml                               默认 backlog 后端配置</span></span>
<span class="line"><span>.github/workflows/                        共享 CI 与 PR 强制</span></span>
<span class="line"><span>bin/                                      助手脚本工具带</span></span>
<span class="line"><span>.agents/skills/                           firstmate 内部技能</span></span>
<span class="line"><span>skills/                                   面向公共安装者的独立技能</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>而以下路径属于<strong>船长私有的 gitignored 材料</strong>，永远不会进入版本控制：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.env          可选的 Relay 配对 token（LOCAL）</span></span>
<span class="line"><span>data/         持久舰队档案</span></span>
<span class="line"><span>state/        运行时记录</span></span>
<span class="line"><span>config/       本地运营选择</span></span>
<span class="line"><span>projects/     本地项目克隆</span></span>
<span class="line"><span>.no-mistakes/ no-mistakes 流水线本地数据</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>firstmate 对这两类的写权限也不同：它可以维护本仓库的私有运营状态；对共享 tracked 材料的修改要走本仓库自己的 no-mistakes 流水线和 PR 路径——<strong>它对自己也要遵守同样的合并权威</strong>。</p><h2 id="_5-4-fails-closed-fm-send-sh-的显式-fm-home-要求" tabindex="-1">5.4 fails closed：fm-send.sh 的显式 FM_HOME 要求 <a class="header-anchor" href="#_5-4-fails-closed-fm-send-sh-的显式-fm-home-要求" aria-label="Permalink to &quot;5.4 fails closed：fm-send.sh 的显式 FM_HOME 要求&quot;">​</a></h2><p>多实例并存的场景里最大的风险是「指令发错了家」。为此，<code>bin/fm-send.sh</code> 刻意比一般脚本更严格：<strong>它要求 <code>FM_HOME</code> 必须显式设置才会解析目标</strong>，否则直接失败（fails closed），绝不静默回退到仓库根目录——这样一次 steer 永远不会悄悄落到错误的 home 里。</p><div class="language-sh vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 正确：显式指定 home 再发 steer</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">FM_HOME</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">~/fm-homes/main</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> bin/fm-send.sh</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}"> &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">i</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">d</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">&gt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> &#39;请补充回归测试&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 错误示范：未设置 FM_HOME，fm-send.sh 会拒绝执行而不是猜测</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">bin/fm-send.sh</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}"> &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">i</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">d</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">&gt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> &#39;hello&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">    # fails closed</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>另一个安全细节：<code>fm-brief.sh</code>、<code>fm-spawn.sh</code>、<code>fm-afk-launch.sh</code> 在持久化路径或把它传给其他进程之前，会把相对形式的 <code>FM_HOME</code> 和 override 目录解析为绝对路径；无法解析的相对目录会被拒绝，并在报错中点名是哪个变量出了问题。</p><h2 id="_5-5-实操-搭建并验证一个独立的-home" tabindex="-1">5.5 实操：搭建并验证一个独立的 home <a class="header-anchor" href="#_5-5-实操-搭建并验证一个独立的-home" aria-label="Permalink to &quot;5.5 实操：搭建并验证一个独立的 home&quot;">​</a></h2><p>下面用最小步骤创建一个脱离仓库根目录的运营之家，并确认目录骨架：</p><div class="language-sh vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 1. 创建家目录（首次启动后各子目录会按需生成）</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">mkdir</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> -p</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> ~/fm-homes/main</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 2. 从 firstmate 仓库根目录启动 primary harness，并指向该 home</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">cd</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> /path/to/firstmate</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">FM_HOME</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">~/fm-homes/main</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> claude</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 3. 让 firstmate 执行一个小任务后，检查家目录里出现了什么</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">ls</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> ~/fm-homes/main</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># data/  state/  config/  projects/</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>如果你需要多个并行实例（比如一个私人项目、一个工作项目），给它们各自独立的 <code>FM_HOME</code> 即可，互不干扰：</p><div class="language-sh vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">FM_HOME</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">~/fm-homes/personal</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> claude</span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">   # 终端 A</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">FM_HOME</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">~/fm-homes/work</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> claude</span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">       # 终端 B</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>注意：每个 secondmate 也拥有自己持久隔离的 <code>FM_HOME</code>（含独立的 state、backlog、projects 和 session lock）——这是第 14 章 Secondmate 机制的物理基础。</p><h2 id="本章小结" tabindex="-1">本章小结 <a class="header-anchor" href="#本章小结" aria-label="Permalink to &quot;本章小结&quot;">​</a></h2><ul><li><code>FM_HOME</code> 选择一个 firstmate 实例的运营之家；未设置时使用仓库根目录，设置后 <code>state/data/config/projects</code> 全部来自 <code>$FM_HOME</code>；</li><li>四大目录按生命周期分工：<code>data/</code> 持久档案、<code>state/</code> 运行时记录、<code>config/</code> 本地偏好、<code>projects/</code> 只读的项目克隆；</li><li>共享 tracked 材料随发行版走 git，<code>.env/data/state/config/projects/.no-mistakes/</code> 属于船长私有的 gitignored 材料；</li><li><code>bin/fm-send.sh</code> 要求显式 <code>FM_HOME</code> 否则失败关闭，杜绝 steer 发错家；相对路径在持久化前必须能解析为绝对路径；</li><li>多实例 = 多个独立 <code>FM_HOME</code>，secondmate 同样以独立 home 实现隔离。</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>分别在 <code>FM_HOME</code> 未设置和设置为 <code>~/fm-homes/lab</code> 两种情况下各启动一次 firstmate 并派发一个小任务，对比两种布局下 <code>data/</code>、<code>state/</code> 出现的位置，画出你机器上的实际目录树。</li><li>故意在未设置 <code>FM_HOME</code> 的 shell 里调用 <code>bin/fm-send.sh &lt;id&gt; &#39;ping&#39;</code>，观察它的失败行为；再设置 <code>FM_HOME</code> 后重试，验证「fails closed」语义。</li><li>为「personal」和「work」两个场景分别创建独立 home，各派发一个不同项目的任务，然后用 <code>ls</code> 检查两个 home 的 <code>projects/</code> 内容，确认克隆彼此隔离。</li></ol></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("firstmate/ch05.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
