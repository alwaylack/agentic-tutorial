import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"第 20 章 · 工作流哲学与团队实践","description":"","frontmatter":{},"headers":[],"relativePath":"pi/ch20.md","filePath":"pi/ch20.md","lastUpdated":1787480284000}');
const __default__ = { name: "pi/ch20.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: "pi 官方不内置 to-do 功能的理由是？",
        options: [
          "实现难度太大",
          "官方认为 to-do 列表会让模型困惑，推荐用 TODO.md 文件",
          "与 git 冲突",
          "为了节省磁盘空间"
        ],
        answer: 1,
        explain: "README Philosophy 原文：不内置 to-do 功能——它们会让模型困惑；请用 TODO.md 文件，或用 extension 自建。"
      },
      {
        question: "同一目录下同时存在 AGENTS.md 和 AGENTS.override.md 时，pi 会？",
        options: [
          "两个都加载，override 追加在后",
          "只加载 AGENTS.override.md 取代另一个",
          "报错要求二选一",
          "随机加载其一"
        ],
        answer: 1,
        explain: "usage 文档：如果目录中存在 AGENTS.override.md，pi 会加载它而不是该目录下的 AGENTS.md 或 CLAUDE.md；其他目录的上下文文件仍正常叠加。"
      },
      {
        question: "关于团队组合中各类资源的分工，正确的是？",
        options: [
          "个人 API key 应放进项目的 .pi/settings.json 统一管理",
          "部署 SOP 适合写成 skill；危险命令拦截适合写成 extension",
          "AGENTS.md 应该写得越全面越好，不限长度",
          "prompt template 用于定义主题配色"
        ],
        answer: 1,
        explain: "skills 承载多步骤流程知识，extensions 承载行为约束与 UI（如自定义确认流）；密钥属于个人凭据应放环境变量/auth 文件；AGENTS.md 要控制篇幅保持高信噪比。"
      },
      {
        question: "想把一次疑难 bug 的完整排查过程归档给团队学习，最合适的做法是？",
        options: [
          "截图终端窗口发群里",
          "用 /export 导出 HTML 或 /share 生成私有 gist 链接",
          "把 session.jsonl 手动复制到 wiki",
          "无法导出，只能口头转述"
        ],
        answer: 1,
        explain: "/export 可生成 HTML（也可导出 JSONL），/share 会上传为私有 GitHub gist 并返回可分享链接；CLI 还有 pi --export <in> [out] 可批量归档历史会话。"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-20-章-·-工作流哲学与团队实践" tabindex="-1">第 20 章 · 工作流哲学与团队实践 <a class="header-anchor" href="#第-20-章-·-工作流哲学与团队实践" aria-label="Permalink to &quot;第 20 章 · 工作流哲学与团队实践&quot;">​</a></h1><blockquote><p>本章目标：精读 pi 的设计哲学，理解&quot;极简核心 + 按需加装&quot;背后的取舍，并落地一套可直接复制的团队工作流：上下文文件规范、模板/技能/扩展组合、会话分享与推广检查单。</p></blockquote><h2 id="_20-1-philosophy-精读-六个-不做" tabindex="-1">20.1 Philosophy 精读：六个&quot;不做&quot; <a class="header-anchor" href="#_20-1-philosophy-精读-六个-不做" aria-label="Permalink to &quot;20.1 Philosophy 精读：六个&quot;不做&quot;&quot;">​</a></h2><p>pi 的 README 用一整节声明了它<strong>刻意不内置</strong>的功能，每一条都有明确替代路径：</p><table tabindex="0"><thead><tr><th>不内置</th><th>官方替代方案</th></tr></thead><tbody><tr><td><strong>No MCP</strong></td><td>给 CLI 工具写 README 当技能用；或写一个提供 MCP 支持的扩展</td></tr><tr><td><strong>No sub-agents</strong></td><td>用 tmux 起多个 pi 实例；或用扩展自建；或装第三方包</td></tr><tr><td><strong>No permission popups</strong></td><td>跑在容器里；或用扩展按你的环境实现确认流</td></tr><tr><td><strong>No plan mode</strong></td><td>计划写成文件；或扩展实现；或装包</td></tr><tr><td><strong>No built-in to-dos</strong></td><td>&quot;它们会让模型困惑&quot;——用 TODO.md 文件，或扩展实现</td></tr><tr><td><strong>No background bash</strong></td><td>用 tmux，获得完整可观测性与直接交互</td></tr></tbody></table><p>这六条背后是同一条原则：<strong>凡是团队间分歧大的工作流偏好，都不该焊死在核心里</strong>。内置 = 替你做决定 = 不合用的功能变成负担。pi 选择把核心压到最小（模型 + 7 个工具 + 会话树），把&quot;子代理怎么做、计划怎么管&quot;留给扩展与包生态。</p><div class="tip custom-block"><p class="custom-block-title">与&quot;大而全&quot;工具的对比思路</p><p>不是说不该有这些能力，而是说它们应该以<strong>可替换的组件</strong>存在。你不喜欢官方默认？装别人的包，或者让 pi 自己给你写一个扩展——这正是前几章 Extensions/Skills/Packages 的意义。</p></div><h2 id="_20-2-一套推荐的团队组合" tabindex="-1">20.2 一套推荐的团队组合 <a class="header-anchor" href="#_20-2-一套推荐的团队组合" aria-label="Permalink to &quot;20.2 一套推荐的团队组合&quot;">​</a></h2><p>基于前十九章的内容，给出一套经过验证的最小组合（全部落在仓库里随代码走）：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>repo/</span></span>
<span class="line"><span>├── AGENTS.md                  # 项目约定（下一节详讲）</span></span>
<span class="line"><span>├── .pi/</span></span>
<span class="line"><span>│   ├── settings.json          # 项目级设置（defaultProjectTrust 等由个人全局管）</span></span>
<span class="line"><span>│   ├── prompts/</span></span>
<span class="line"><span>│   │   └── review.md          # /review 提示词模板</span></span>
<span class="line"><span>│   ├── skills/</span></span>
<span class="line"><span>│   │   └── deploy/SKILL.md    # 部署流程技能</span></span>
<span class="line"><span>│   └── extensions/</span></span>
<span class="line"><span>│       └── guardrails.ts      # 危险命令确认扩展</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>分工逻辑：</p><ul><li><strong>AGENTS.md</strong> 管&quot;这个项目是什么、规矩是什么&quot;——静态、人人相同；</li><li><strong>Prompt Templates</strong> 管高频指令的标准化——<code>/review</code>、<code>/release-notes</code> 这类动作统一措辞；</li><li><strong>Skills</strong> 管多步流程知识——部署、发布这类有固定顺序的操作写成技能，模型按 SKILL.md 执行；</li><li><strong>Extensions</strong> 管行为约束与 UI——比如拦截 <code>rm -rf</code> 类命令要求二次确认（自己实现的 permission popup）；</li><li><strong>个人差异</strong>（主题、思考级别、API key）放用户全局目录，不进仓库。</li></ul><h2 id="_20-3-上下文文件工程-agents-md-写法规范" tabindex="-1">20.3 上下文文件工程：AGENTS.md 写法规范 <a class="header-anchor" href="#_20-3-上下文文件工程-agents-md-写法规范" aria-label="Permalink to &quot;20.3 上下文文件工程：AGENTS.md 写法规范&quot;">​</a></h2><p>加载规则回顾（详见 usage 文档）：启动时从 <code>~/.pi/agent/AGENTS.md</code>（全局）→ 当前目录的各层父目录 → 当前目录逐层加载；同目录若有 <code>AGENTS.override.md</code> 则<strong>取代</strong>该目录的 AGENTS.md/CLAUDE.md。需要整体替换系统提示词时用 <code>.pi/SYSTEM.md</code>，只追加用 <code>.pi/APPEND_SYSTEM.md</code>。</p><p>一份好的项目 AGENTS.md 应包含四块内容（这也是官方建议的用途：项目约定、命令、安全规则、偏好）：</p><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}"># 项目约定</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## 构建与测试</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 包管理器用 pnpm，不要用 npm install</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 测试命令：pnpm test --filter &lt;pkg&gt;；全量测试超过 5 分钟，禁止主动全跑</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## 代码风格</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 提交信息遵循 Conventional Commits</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> TypeScript strict 模式，禁用 any 断言</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## 安全红线</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 不要修改 .github/workflows/ 下任何文件</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 数据库迁移必须人工审查后才执行</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 密钥一律走环境变量，出现硬编码立即报告</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## 已知坑</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> src/legacy/ 下是待下线代码，不要重构它</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>写作要诀：<strong>具体、可判定、少量高价值</strong>。&quot;写好注释&quot;这种模糊要求没有用；&quot;禁止全量测试&quot;这种硬约束最有用。上下文文件会占 token，保持在一屏到两屏内。</p><h2 id="_20-4-会话分享与团队学习" tabindex="-1">20.4 会话分享与团队学习 <a class="header-anchor" href="#_20-4-会话分享与团队学习" aria-label="Permalink to &quot;20.4 会话分享与团队学习&quot;">​</a></h2><p>pi 把&quot;怎么用 agent&quot;本身变成可沉淀的知识：</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 交互内：导出为 HTML / 上传私有 GitHub gist 拿到可分享链接</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">/export</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> review-demo.html</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">/share</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 命令行：把任意历史会话导出成网页归档</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">pi</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> --export</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> ~/.pi/agent/sessions/--path--/2024_xxx.jsonl</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> out.html</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>做开源的同学还可以用社区的 <code>badlogic/pi-share-hf</code> 把会话发布成 Hugging Face 数据集——真实开发会话对提示词、工具和评测的研究都很有价值。团队内部建议：每个疑难 bug 的攻坚会话用 <code>/share</code> 归档进 wiki，新人通过读&quot;高手是怎么跟 agent 协作的&quot;来上手，比读文档快得多。</p><h2 id="_20-5-团队落地检查单" tabindex="-1">20.5 团队落地检查单 <a class="header-anchor" href="#_20-5-团队落地检查单" aria-label="Permalink to &quot;20.5 团队落地检查单&quot;">​</a></h2><p>从零在团队推行 pi 工作流的顺序清单：</p><ol><li>[ ] 统一版本：全员升级到同一 pi 版本（<code>pi update --self</code>），避免行为漂移；</li><li>[ ] 全局底线：每人配置好 provider 凭据（<code>/login</code> 或环境变量），关闭遥测按需选择；</li><li>[ ] 仓库接入：提交 <code>AGENTS.md</code>（先从构建命令和安全红线两块写起）；</li><li>[ ] 标准动作模板化：把 code review、发版说明等高频指令做成 <code>.pi/prompts/</code>；</li><li>[ ] 流程技能化：部署/排障 SOP 写成 skills，让新手也能走专家路径；</li><li>[ ] 行为护栏扩展化：危险命令确认、输出过滤等用 extensions 兜底；</li><li>[ ] 隔离策略：约定什么任务必须容器里跑（第 19 章），CI 统一用 <code>-na</code> + 显式参数；</li><li>[ ] 知识回流：定期 <code>/share</code> 典型会话，迭代 AGENTS.md 的&quot;已知坑&quot;区。</li></ol><h2 id="_20-6-本章小结" tabindex="-1">20.6 本章小结 <a class="header-anchor" href="#_20-6-本章小结" aria-label="Permalink to &quot;20.6 本章小结&quot;">​</a></h2><ul><li>六个&quot;不做&quot;共享同一哲学：有争议的工作流决策不进核心，交给扩展/技能/包生态；</li><li>团队组合公式：AGENTS.md 管约定 + prompts 管高频指令 + skills 管流程 + extensions 管约束，个人偏好留在全局；</li><li>AGENTS.md 要具体可判定，覆盖约定/命令/红线/已知坑四块，控制篇幅；</li><li><code>/export</code>、<code>/share</code>、<code>pi --export</code> 让协作过程本身可归档、可学习；</li><li>推行顺序：版本统一 → 全局凭据 → 仓库接入 → 模板 → 技能 → 护栏 → 隔离 → 知识回流。</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>为你的团队仓库起草第一版 <code>AGENTS.md</code>：只写构建命令、三条安全红线和两条已知坑，控制在 30 行以内，然后验证 pi 是否真的遵守了其中每一条。</li><li>选一个团队里最常被问到的操作（如&quot;如何本地起完整环境&quot;），做成 prompt template 或 skill，请两位同事实测并收集反馈迭代一版。</li><li>完整走一遍第 20.5 节检查单的前 4 项，记录每一项在你的团队中遇到的实际阻力与解决办法。</li></ol></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pi/ch20.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
