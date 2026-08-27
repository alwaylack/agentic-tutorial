import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"第 13 章 · 两层技能体系与自定义扩展","description":"","frontmatter":{},"headers":[],"relativePath":"firstmate/ch13.md","filePath":"firstmate/ch13.md","lastUpdated":1787528977000}');
const __default__ = { name: "firstmate/ch13.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: ".agents/skills/ 中的技能为什么要携带 metadata.internal: true？",
        options: [
          "为了加快 firstmate 加载速度",
          "为了让 skills.sh 等安装器在发现阶段跳过它们，避免被装进其他项目",
          "为了加密技能内容",
          "为了标记哪些技能已经过时"
        ],
        answer: 1,
        explain: "官方说明该 flag hides them from installer discovery without affecting how firstmate itself loads them——内部技能离开 firstmate home 就是误导性的，不该被外部安装。"
      },
      {
        question: "内部版与公共版 stow 技能是什么关系？",
        options: [
          "同一文件的两个符号链接",
          "公共版是内部版的精简子集",
          "两个刻意独立的文件，零共享代码，各自演进",
          "内部版已废弃，只剩公共版"
        ],
        answer: 2,
        explain: "README 明确写道：It intentionally shares no code with the firstmate-internal .agents/skills/stow it is named after, so the two can evolve independently。"
      },
      {
        question: "fm-send.sh 在 FM_HOME 不明确时的行为是？",
        options: [
          "自动选择当前目录所在的 home",
          "提示后默认使用主 home",
          "fail closed：直接失败而不猜测目标",
          "把消息广播到所有 home"
        ],
        answer: 2,
        explain: "AGENTS.md 写明 fm-send.sh fails closed unless FM_HOME is explicit，防止一次 steer 静默解析到另一个 home 上。"
      },
      {
        question: "想写一个任何项目都能用的通用技能，正确的放置位置与要求是？",
        options: [
          "放 .agents/skills/ 并加 internal 标记",
          "放 skills/ 下且必须保持 standalone：不含私有路径、工具假设或环境分支",
          "放 skills/ 下但可以引用 FM_HOME 路径",
          "放仓库根目录即可"
        ],
        answer: 1,
        explain: "skills/ 目录的定位就是 installer-facing standalone 技能，官方维护注释要求 keep it standalone, with no private project paths, tool assumptions, or environment branching。"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-13-章-·-两层技能体系与自定义扩展" tabindex="-1">第 13 章 · 两层技能体系与自定义扩展 <a class="header-anchor" href="#第-13-章-·-两层技能体系与自定义扩展" aria-label="Permalink to &quot;第 13 章 · 两层技能体系与自定义扩展&quot;">​</a></h1><blockquote><p>本章目标：理解 <code>.agents/skills/</code> 内部技能与 <code>skills/</code> 公共技能的两层布局差异，学会 SKILL.md 的结构规范，并导览 <code>bin/</code> 工具带，为编写自定义技能打基础。</p></blockquote><h2 id="_13-1-两层布局-为什么技能要分家" tabindex="-1">13.1 两层布局：为什么技能要分家 <a class="header-anchor" href="#_13-1-两层布局-为什么技能要分家" aria-label="Permalink to &quot;13.1 两层布局：为什么技能要分家&quot;">​</a></h2><p>打开 FirstMate 仓库，会发现技能存放在两个不同的目录：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>firstmate/</span></span>
<span class="line"><span>├── .agents/skills/     # agent-loaded 内部技能（约 20 个）</span></span>
<span class="line"><span>│   ├── afk/SKILL.md</span></span>
<span class="line"><span>│   ├── ahoy/SKILL.md</span></span>
<span class="line"><span>│   ├── bearings/SKILL.md</span></span>
<span class="line"><span>│   ├── stow/SKILL.md</span></span>
<span class="line"><span>│   ├── secondmate-provisioning/SKILL.md</span></span>
<span class="line"><span>│   └── ...</span></span>
<span class="line"><span>└── skills/             # 公共、面向安装器的独立技能</span></span>
<span class="line"><span>    └── stow/SKILL.md   # 目前只有这一个</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>这个分家不是随意的组织方式，而是由**受众（audience）**决定的：</p><ul><li><strong><code>.agents/skills/</code></strong>：由 firstmate 自己加载。其中每一个都假定「存在一个活的 firstmate home」——离开这个上下文它们就毫无意义，甚至 actively misleading（主动误导）。比如 <code>secondmate-provisioning</code> 技能引用的路径、工具和词汇只在 firstmate home 里才成立。</li><li><strong><code>skills/</code></strong>：公共的、可独立安装的技能，目标是装进任何项目都能用，不依赖 firstmate 的任何私有路径、工具或词汇。</li></ul><p>一个有趣的细节是 stow 的「双胞胎」设计：<code>.agents/skills/stow</code> 和 <code>skills/stow</code> 是<strong>两个刻意独立的文件，零共享代码</strong>。官方维护注释写道：keep them independent——两者各自演进互不拖累。内部版会写 firstmate home 的运营记忆并级联 secondmates；公共版则通过显式指令 → 本地约定 → 私有 <code>.stow-notes.md</code> 兜底的三级规则路由到任意项目。</p><h2 id="_13-2-metadata-internal-true-对安装器隐身" tabindex="-1">13.2 metadata.internal: true：对安装器隐身 <a class="header-anchor" href="#_13-2-metadata-internal-true-对安装器隐身" aria-label="Permalink to &quot;13.2 metadata.internal: true：对安装器隐身&quot;">​</a></h2><p>对比两个 stow 的 frontmatter，能发现关键差异：</p><div class="language-yaml vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># .agents/skills/stow/SKILL.md（内部版）</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">---</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">name</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">stow</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">description</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">Sweep the current session for uncaptured durable knowledge...</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">user-invocable</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">true</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">metadata</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">:</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">  internal</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">true</span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">          # ← 内部标记</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">---</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># skills/stow/SKILL.md（公共版）</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">---</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">name</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">stow</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">description</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">Sweep the current conversation for durable knowledge...</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">user-invocable</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">true</span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">      # ← 没有 metadata.internal</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">---</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p><code>metadata.internal: true</code> 这个标记的作用是：让 <code>npx skills add</code> 这类安装器在发现（discovery）阶段跳过该技能——内部技能不该被装到别处去。而它对 firstmate 自身的技能加载器完全无感（frontmatter metadata 对 loader 是 inert 的）：该加载照常加载，触发点照常触发。</p><p>这就是两层体系的安全机制：<strong>可见性由受众决定，加载行为由触发点决定</strong>。</p><h2 id="_13-3-skill-md-解剖与触发点" tabindex="-1">13.3 SKILL.md 解剖与触发点 <a class="header-anchor" href="#_13-3-skill-md-解剖与触发点" aria-label="Permalink to &quot;13.3 SKILL.md 解剖与触发点&quot;">​</a></h2><p>每个技能的核心就是一个 <code>SKILL.md</code> 文件，其结构分三部分：</p><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">---</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">name</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">bearings</span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">                      # 全局唯一的技能名</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">description</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">Generate a concise four-section chat digest...</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">user-invocable</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">true</span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">                # 是否可被用户直接调用</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">metadata</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">:</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">  internal</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">true</span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">                    # 仅内部技能携带</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">---</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">&lt;!-- 面向维护者的注释区 --&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}"># bearings</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">正文：方法论、步骤、边界约束……</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">agent 在触发点命中后加载全文遵循执行。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>触发点有两类：</p><ol><li><strong>用户调用</strong>（<code>user-invocable: true</code>）：船长敲 <code>/ahoy</code>、<code>$stow</code> 等命令；</li><li><strong>Agent-only 引用</strong>：没有 user-invocable 标记的纯参考技能（如 <code>ask-user-authority</code>、<code>captain-hold-lifecycle</code>、<code>diagnostic-reasoning</code>、<code>harness-adapters</code> 等），由 AGENTS.md 在特定程序节点命名并按需加载。</li></ol><h2 id="_13-4-为-firstmate-编写自定义技能的方法论" tabindex="-1">13.4 为 FirstMate 编写自定义技能的方法论 <a class="header-anchor" href="#_13-4-为-firstmate-编写自定义技能的方法论" aria-label="Permalink to &quot;13.4 为 FirstMate 编写自定义技能的方法论&quot;">​</a></h2><p>基于以上结构，为 firstmate 添加自定义技能的思路是清晰的：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1. 判断受众：</span></span>
<span class="line"><span>   - 依赖 FM_HOME/state/projects 等第一副手语境？</span></span>
<span class="line"><span>     → 放 .agents/skills/ 并加 metadata.internal: true</span></span>
<span class="line"><span>   - 任何项目都可能用到？</span></span>
<span class="line"><span>     → 考虑做成 skills/ 下的 standalone 技能</span></span>
<span class="line"><span>2. 写 SKILL.md：</span></span>
<span class="line"><span>   - name 唯一、description 说清何时触发</span></span>
<span class="line"><span>   - 正文写可执行的方法论而非空洞描述</span></span>
<span class="line"><span>3. 明确写入边界：</span></span>
<span class="line"><span>   - 内部技能只能通过 FirstMate 既有的所有权和写入边界落盘</span></span>
<span class="line"><span>4. 测试：仓库自带行为测试运行器 fm-test-run.sh 可验证</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>一条来自官方维护注释的重要纪律：公共技能必须保持 standalone——不含私有项目路径、工具假设或环境分支逻辑。</p><h2 id="_13-5-bin-工具带导览" tabindex="-1">13.5 bin/ 工具带导览 <a class="header-anchor" href="#_13-5-bin-工具带导览" aria-label="Permalink to &quot;13.5 bin/ 工具带导览&quot;">​</a></h2><p>技能负责「知道怎么做」，<code>bin/</code> 下的几十个脚本负责「真正去做」。官方在 docs/scripts.md 中给出完整清单，这里按职能分组认识最核心的一批：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>会话生命周期</span></span>
<span class="line"><span>├── fm-session-start.sh    # 组合 lock/bootstrap/wake-drain 成单一有序摘要</span></span>
<span class="line"><span>├── fm-bootstrap.sh        # 工具链自检 + 安装已批准的缺失工具</span></span>
<span class="line"><span>├── fm-teardown.sh         # landed-work 完整性测试的所有者（硬规则 3）</span></span>
<span class="line"><span>└── fm-send.sh             # 向任务发消息；FM_HOME 不明确则 fail closed</span></span>
<span class="line"><span></span></span>
<span class="line"><span>任务派发与简报</span></span>
<span class="line"><span>├── fm-spawn.sh            # 生成 crewmates/scouts/batches/secondmates</span></span>
<span class="line"><span>├── fm-brief.sh            # 脚手架化 ship/scout/charter 简报（--mode 显式指定）</span></span>
<span class="line"><span>└── fm-captain-hold.sh     # 任务挂起等船长决策、记录答案、把关完成</span></span>
<span class="line"><span></span></span>
<span class="line"><span>监督引擎</span></span>
<span class="line"><span>├── fm-watch.sh            # 单例安全的常驻 watcher（第 11 章）</span></span>
<span class="line"><span>├── fm-turnend-guard.sh    # no turn ends blind 判定谓词（第 11 章）</span></span>
<span class="line"><span>└── fm-guard.sh            # 拉取式中途警告</span></span>
<span class="line"><span></span></span>
<span class="line"><span>配置与合并</span></span>
<span class="line"><span>├── fm-config-push.sh      # 把声明的继承材料推送到本地/远程 secondmate</span></span>
<span class="line"><span>├── fm-merge-local.sh      # 批准后快进 local-only 项目的本地默认分支</span></span>
<span class="line"><span>└── fm-project-mode.sh     # 从 data/projects.md 解析项目交付姿态</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>两个使用要点值得单独强调：</p><p>第一，<strong><code>fm-send.sh</code> 的 fail-closed 设计</strong>：如果 <code>FM_HOME</code> 不明确，发送直接失败而不是猜测目标——防止一次 steer 静默地打到另一个 home 上。这是「多 home 隔离」原则在脚本层的体现。</p><p>第二，<strong>读 header 再用</strong>：docs/scripts.md 每行只给一句用途概括，每个脚本的头部注释才是其行为、flag 和契约的权威描述。官方反复强调 read the header before first use。</p><p>另外注意 <code>fm-decision-hold.sh</code> 的特殊性：它是一个 one-release 兼容垫片（shim），把已退役的 decision 命令映射到 <code>fm-captain-hold.sh</code>——说明这套工具带本身也在演进，遇到旧命令先查是否有 shim 接管。</p><h2 id="本章小结" tabindex="-1">本章小结 <a class="header-anchor" href="#本章小结" aria-label="Permalink to &quot;本章小结&quot;">​</a></h2><ul><li>技能分两层：<code>.agents/skills/</code> 是依赖 firstmate home 语境的内部技能；<code>skills/</code> 是零依赖、可独立安装的公共技能。</li><li><code>metadata.internal: true</code> 让内部技能对 skills.sh 等安装器隐身，同时不影响 firstmate 自身的加载——frontmatter 元数据对 loader 是惰性的。</li><li>SKILL.md = frontmatter（name/description/user-invocable/metadata）+ 方法论正文；触发点分用户斜杠调用与 AGENTS.md 命名的 agent-only 加载两类。</li><li>编写自定义技能先判受众再定位置；公共技能必须 standalone；内部技能必须走既有写入边界。</li><li><code>bin/</code> 是执行层工具带：<code>fm-send.sh</code> 的 FM_HOME fail-closed 与「读 header 再用」是最重要的两条使用纪律。</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>列出你克隆中 <code>.agents/skills/</code> 下的全部技能目录，逐个检查 frontmatter：哪些带 <code>metadata.internal: true</code>？哪些有 <code>user-invocable: true</code>？把结果整理成一张两列表格（用户可调用 / agent-only），对照第 12 章验证五个内置技能的位置。</li><li>对比阅读 <code>.agents/skills/stow/SKILL.md</code> 与 <code>skills/stow/SKILL.md</code> 的正文，找出至少三处因受众不同而产生的行为差异（如写入目标、路由规则），写一段短评说明为什么官方坚持零共享代码。</li><li>挑选三个你在意的 <code>bin/fm-*.sh</code> 脚本（建议含 fm-send.sh），通读各自的头部注释，用自己的话总结每条的使用契约（参数、环境变量要求、失败行为），并与 docs/scripts.md 中的一句话概括互相印证。</li></ol></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("firstmate/ch13.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
